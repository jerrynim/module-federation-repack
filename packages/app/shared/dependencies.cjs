const packages = require("../package.json")

const deps = {
	react: {
		/**
		 * singleton means that only one version of the module is loaded.
		 */
		singleton: true,
		/**
		 * eager means that the module is added into the initial bundle and will not be loaded later.
		 * All shared module in the host app should be eager. In remote containers it depends on build proposes.
		 * If bundle should work as a standalone application, then it should be eager.
		 * Here is STANDALONE env variable shows if bundle is standalone and eager should be enabled.
		 */
		eager: true,
		/**
		 * requiredVersion is used to match requested modules in bundle.
		 * It's recommended to use the same version as in the host app.
		 */
		requiredVersion: packages.devDependencies.react,
	},
	"react-native": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["react-native"],
	},
	"@react-navigation/native": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["@react-navigation/native"],
	},
	"@react-navigation/native-stack": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["@react-navigation/native-stack"],
	},
	"@react-navigation/drawer": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["@react-navigation/drawer"],
	},
	"react-native-safe-area-context": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["react-native-safe-area-context"],
	},
	"react-native-screens": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["react-native-screens"],
	},
	"react-native-gesture-handler": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["react-native-gesture-handler"],
	},
	"react-native-svg": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["react-native-svg"],
	},
	"react-native-linear-gradient": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["react-native-linear-gradient"],
	},
	"react-native-webview": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["webview"],
	},
	"react-native-reanimated": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["react-native-reanimated"],
	},
	"react-native-haptic-feedback": {
		singleton: true,
		eager: true,
		requiredVersion: packages.devDependencies["react-native-haptic-feedback"],
	},
}

module.exports = { deps }
