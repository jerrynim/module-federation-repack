const path = require("path")
const fs = require("fs")
const TerserPlugin = require("terser-webpack-plugin")
const Repack = require("@callstack/repack")
const STANDALONE = Boolean(process.env.STANDALONE)
const ANALYZE = Boolean(process.env.ANALYZE)

const StatoscopeWebpackPlugin = require("@statoscope/webpack-plugin").default

const { deps } = require("./shared/dependencies.cjs")
const loadJSON = (_path) =>
	JSON.parse(fs.readFileSync(new URL(_path, "file://" + path.resolve(__dirname, "webpack.config.cjs"))))

const appJson = loadJSON("./app.json")

module.exports = (env) => {
	console.log(env, "env=====================")
	console.log(process.env.PLATFORM)

	const {
		mode,
		context,
		entry = "./index.js",
		platform,
		minimize = mode === "production",
		devServer,
		bundleFilename,
		sourceMapFilename = undefined,
		assetsPath = undefined,
		reactNativePath,
	} = env

	const dirname = Repack.getDirname("file://" + path.resolve(__dirname, "webpack.config.cjs"))

	if (!platform) {
		throw new Error("Missing platform")
	}
	if (devServer) {
		devServer.hmr = true
	}
	return {
		mode,
		devtool: false,
		context,
		entry: [
			...Repack.getInitializationEntries(reactNativePath, {
				hmr: devServer && devServer.hmr,
			}),
			entry,
		],
		resolve: {
			/**
			 * `getResolveOptions` returns additional resolution configuration for React Native.
			 * If it's removed, you won't be able to use `<file>.<platform>.<ext>` (eg: `file.ios.js`)
			 * convention and some 3rd-party libraries that specify `react-native` field
			 * in their `package.json` might not work correctly.
			 */
			...Repack.getResolveOptions(platform),

			/**
			 * Uncomment this to ensure all `react-native*` imports will resolve to the same React Native
			 * dependency. You might need it when using workspaces/monorepos or unconventional project
			 * structure. For simple/typical project you won't need it.
			 */
			alias: {
	
			},
		},
		/**
		 * Configures output.
		 * It's recommended to leave it as it is unless you know what you're doing.
		 * By default Webpack will emit files into the directory specified under `path`. In order for the
		 * React Native app use them when bundling the `.ipa`/`.apk`, they need to be copied over with
		 * `Repack.OutputPlugin`, which is configured by default inside `Repack.RepackPlugin`.
		 */
		output: {
			clean: true,
			path: path.join(dirname, "build/generated", platform),
			filename: "index.bundle",
			chunkFilename: "[name].chunk.bundle",
			publicPath: Repack.getPublicPath({ platform, devServer }),
		},
		/**
		 * Configures optimization of the built bundle.
		 */
		optimization: {
			/** Enables minification based on values passed from React Native CLI or from fallback. */
			minimize,
			/** Configure minimizer to process the bundle. */
			minimizer: [
				new TerserPlugin({
					test: /\.(js)?bundle(\?.*)?$/i,
					/**
					 * Prevents emitting text file with comments, licenses etc.
					 * If you want to gather in-file licenses, feel free to remove this line or configure it
					 * differently.
					 */
					extractComments: false,
					terserOptions: {
						format: {
							comments: false,
						},
					},
				}),
			],

			chunkIds: "named",
		},
		module: {
			/**
			 * This rule will process all React Native related dependencies with Babel.
			 * If you have a 3rd-party dependency that you need to transpile, you can add it to the
			 * `include` list.
			 *
			 * You can also enable persistent caching with `cacheDirectory` - please refer to:
			 * https://github.com/babel/babel-loader#options
			 */
			rules: [
				{
					test: /\.[jt]sx?$/,
					include: [
						/node_modules(.*[/\\])+react/,
						/node_modules(.*[/\\])+@react-native/,
						/node_modules(.*[/\\])+@react-navigation/,
						/node_modules(.*[/\\])+@react-native-community/,
						/node_modules(.*[/\\])+@expo/,
						/node_modules(.*[/\\])+pretty-format/,
						/node_modules(.*[/\\])+metro/,
						/node_modules(.*[/\\])+abort-controller/,
						/node_modules(.*[/\\])+@callstack\/repack/,
					],
					use: "babel-loader",
				},
				/**
				 * Here you can adjust loader that will process your files.
				 *
				 * You can also enable persistent caching with `cacheDirectory` - please refer to:
				 * https://github.com/babel/babel-loader#options
				 */
				{
					test: /\.[jt]sx?$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							/** Add React Refresh transform only when HMR is enabled. */
							plugins: devServer && devServer.hmr ? ["module:react-refresh/babel"] : undefined,
						},
					},
				},
				/**
				 * This loader handles all static assets (images, video, audio and others), so that you can
				 * use (reference) them inside your application.
				 *
				 * If you wan to handle specific asset type manually, filter out the extension
				 * from `ASSET_EXTENSIONS`, for example:
				 * ```
				 * Repack.ASSET_EXTENSIONS.filter((ext) => ext !== 'svg')
				 * ```
				 */
				{
					test: Repack.getAssetExtensionsRegExp(Repack.ASSET_EXTENSIONS.filter((ext) => ext !== "svg")),
					use: {
						loader: "@callstack/repack/assets-loader",
						options: {
							platform,
							devServerEnabled: Boolean(devServer),

							/**
							 * Defines which assets are scalable - which assets can have
							 * scale suffixes: `@1x`, `@2x` and so on.
							 * By default all images are scalable.
							 */
							scalableAssetExtensions: Repack.SCALABLE_ASSETS,
						},
					},
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: "@svgr/webpack",
							options: {
								native: true,
								dimensions: false,
							},
						},
					],
				},
			],
		},
		plugins: [
			ANALYZE ? new StatoscopeWebpackPlugin() : undefined,

			/**
			 * Configure other required and additional plugins to make the bundle
			 * work in React Native and provide good development experience with
			 * sensible defaults.
			 *
			 * `Repack.RepackPlugin` provides some degree of customization, but if you
			 * need more control, you can replace `Repack.RepackPlugin` with plugins
			 * from `Repack.plugins`.
			 */
			new Repack.RepackPlugin({
				context,
				mode,
				platform,
				devServer,
				output: {
					bundleFilename,
					sourceMapFilename,
					assetsPath,
				},
			}),
			new Repack.plugins.ModuleFederationPlugin({
				/**
				 * The name of the module is used to identify the module in URLs resolver and imports.
				 */
				name: "host",
				/**
				 * Shared modules are shared in the share scope.
				 * React, React Native and React Navigation should be provided here because there should be only one instance of these modules.
				 * Their names are used to match requested modules in this compilation.
				 */
				shared: deps,
			}),
		],
	}
}
