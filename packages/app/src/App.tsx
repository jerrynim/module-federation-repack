import React from "react"
import { SafeAreaView, StyleSheet, View, Text } from "react-native"
import { Federated } from "@callstack/repack/client"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
//? mini app에서 사용시 필요
import "react-native-webview"
import "@react-navigation/drawer"

import { ErrorBoundary } from "./components/ErrorBoundary"
import { RecoilRoot } from "recoil"
const Component = React.lazy(() => Federated.importModule("component", "./App"))
const Chart = React.lazy(() => Federated.importModule("chart", "./App"))

const Stack = createNativeStackNavigator()

const MainScreen = () => {
	const navigation = useNavigation()
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<Text
				onPress={() => {
					navigation.navigate("Components")
				}}>
				Go to Recoil Sample
			</Text>
			{/* <View>
				<Text
					onPress={() => {
						navigation.navigate("Charts")
					}}>
					Go to Charts
				</Text>
			</View> */}
		</SafeAreaView>
	)
}

const ComponentScreen = () => (
	<ErrorBoundary fallback={<Text>{"fetching Component App error"}</Text>}>
		<React.Suspense
			fallback={
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text>Components 를 불러오고 있습니다...</Text>
				</View>
			}>
			<SafeAreaView style={s.root}>
				<Component isHost={true} Stack={Stack} />
			</SafeAreaView>
		</React.Suspense>
	</ErrorBoundary>
)

const ChartScreen = () => (
	<ErrorBoundary fallback={<Text>{"fetching Chart App error"}</Text>}>
		<React.Suspense
			fallback={
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text>Charts 를 불러오고 있습니다...</Text>
				</View>
			}>
			<Chart isHost={true} Stack={Stack} />
		</React.Suspense>
	</ErrorBoundary>
)

const App = () => {
	return (
		<View style={s.root}>
			<RecoilRoot>
				<React.Suspense>
					<NavigationContainer>
						<Stack.Navigator>
							<Stack.Screen options={{ headerShown: false }} name="Main" component={MainScreen} />
							<Stack.Screen
								options={{ headerShown: false }}
								name="Components"
								component={ComponentScreen}
							/>
							<Stack.Screen options={{ headerShown: false }} name="Charts" component={ChartScreen} />
						</Stack.Navigator>
					</NavigationContainer>
				</React.Suspense>
			</RecoilRoot>
		</View>
	)
}

const s = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "white",
	},
})

export default App
