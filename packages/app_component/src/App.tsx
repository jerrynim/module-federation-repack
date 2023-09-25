import React from "react"
import { SafeAreaView, View } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

import { useRecoilValue } from "recoil"
import atom from "./recoil/atom"

const WithNavigationContainer = ({ children, isHost }) => {
	if (isHost) {
		return children
	}
	return <NavigationContainer>{children}</NavigationContainer>
}

const HomeScreen = () => {
	const recoilValue = useRecoilValue(atom.sampleState)
	console.log(recoilValue)
	return <View></View>
}

const App = ({ isHost }) => {
	return (
		<WithNavigationContainer isHost={isHost}>
			<SafeAreaView style={{ flex: 1 }}>
				<Stack.Navigator initialRouteName={"Home"}>
					<Stack.Screen name={"Home"} component={HomeScreen} />
				</Stack.Navigator>
			</SafeAreaView>
		</WithNavigationContainer>
	)
}

export type RootStackParamList = {
	Home: undefined
}

export default App
