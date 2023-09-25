import { AppRegistry, Platform } from "react-native"
import { ScriptManager, Federated } from "@callstack/repack/client"
import App from "./src/App"
import { name as appName } from "./app.json"
import { RecoilRoot } from "recoil"

/**
 * We can also add a listener to the ScriptManager to get notified about the loading process. This is useful for debugging.
 *
 * This is optional and can be removed.
 */
ScriptManager.shared.on("resolving", (...args) => {
	console.log("DEBUG/resolving", ...args)
})

ScriptManager.shared.on("resolved", (...args) => {
	console.log("DEBUG/resolved", ...args)
})

ScriptManager.shared.on("prefetching", (...args) => {
	console.log("DEBUG/prefetching", ...args)
})

// ScriptManager.shared.on("loading", (...args) => {
// 	console.log("DEBUG/loading", ...args)
// })

ScriptManager.shared.on("loaded", (...args) => {
	console.log("DEBUG/loaded", args.scriptId)
})

ScriptManager.shared.on("error", (...args) => {
	console.log("DEBUG/error", ...args)
})

ScriptManager.shared.on("invalidated", (...args) => {
	console.log("DEBUG/invalidated", ...args)
})

/**
 * We need to register the root component of the app with the AppRegistry.
 * Just like in the default React Native setup.
 */

const resolveURL = Federated.createURLResolver({
	containers: {
		shell: __DEV__
			? "http://localhost:9000/[name][ext]"
			: `https://www.yours.com/chunks/app_shell/${Platform.OS}/[name][ext]`,
		component: __DEV__
			? "http://localhost:9001/[name][ext]"
			: `https://www.yours.com/chunks/app_component/${Platform.OS}/[name][ext]`,
		chart: __DEV__
			? "http://localhost:9002/[name][ext]"
			: `https://www.yours.com/chunks/app_chart/${Platform.OS}/[name][ext]`,
	},
})

ScriptManager.shared.addResolver(async (scriptId, caller) => {
	const url = resolveURL(scriptId, caller)

	return {
		url,
		cache: false,
		query: {
			platform: Platform.OS,
		},
	}
})

export function Root() {
	return (
		<RecoilRoot>
			<App />
		</RecoilRoot>
	)
}

AppRegistry.registerComponent(Platform.OS === "android" ? appName : "RepackDemo", () => Root)
