import React from "react"
import { SafeAreaView, Text, View } from "react-native"
import { Federated } from "@callstack/repack/client"


const App1 = React.lazy(() => Federated.importModule("app1", "./App"))


const App = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<React.Suspense
			fallback={
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>{"loading app1"}</Text>
                </View>
			}>
			<App1 />
		</React.Suspense>
		</SafeAreaView>
	)
}



export default App
