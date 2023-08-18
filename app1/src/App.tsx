import React from "react"
import { SafeAreaView, Text, View } from "react-native"
import WebView from "react-native-webview"
import { Federated } from "@callstack/repack/client"




const App = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
      <WebView  source={{uri:"https://ko.legacy.reactjs.org/"}}/>
      <View>
			  <Text>{"app1"}</Text>
      </View>
		</SafeAreaView>
	)
}



export default App
