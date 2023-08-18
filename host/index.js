import { AppRegistry, Platform } from "react-native";
import { ScriptManager, Script, Federated } from "@callstack/repack/client";
import App from "./src/App";
import { name as appName, localChunks, remoteChunkUrl, remoteChunkPort } from "./app.json";

/**
 * We can also add a listener to the ScriptManager to get notified about the loading process. This is useful for debugging.
 *
 * This is optional and can be removed.
 */
ScriptManager.shared.on("resolving", (...args) => {
  console.log("DEBUG/resolving", ...args);
});

ScriptManager.shared.on("resolved", (...args) => {
  console.log("DEBUG/resolved", ...args);
});

ScriptManager.shared.on("prefetching", (...args) => {
  console.log("DEBUG/prefetching", ...args);
});

ScriptManager.shared.on("loading", (...args) => {
  console.log("DEBUG/loading", ...args);
});

ScriptManager.shared.on("loaded", (...args) => {
  console.log("DEBUG/loaded", ...args);
});

ScriptManager.shared.on("error", (...args) => {
  console.log("DEBUG/error", ...args);
});

/**
 * We need to register the root component of the app with the AppRegistry.
 * Just like in the default React Native setup.
 */

const resolveURL = Federated.createURLResolver({
  containers: {
    app1: "http://localhost:9001/[name][ext]",
    app2: "http://localhost:9002/[name][ext]",
  },
});

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  console.log(scriptId, caller, "caller=====================");
  let url;
  if (caller === "main") {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }
  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
});

AppRegistry.registerComponent(appName, () => App);
