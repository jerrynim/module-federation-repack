import React from "react"
import { SafeAreaView, ScrollView } from "react-native"

import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import screens from "./screens"

const Stack = createNativeStackNavigator()

const HomeScreen = () => {
	const navigation = useNavigation()
	return (
		<ScrollView style={{ flex: 1, backgroundColor: "white" }}>
			{["평당가차트", "시세거래량차트", "거래량라인차트", "시세흐름차트", "StacedkBarChartScreen"]
				.sort()
				.map((route) => (
					<Pressable
						key={route}
						onPress={() => {
							navigation.navigate(route)
						}}>
						<ListTableItem title={route} ratio={100} />
					</Pressable>
				))}
		</ScrollView>
	)
}

const WithNavigationContainer = ({ children, isHost }) => {
	if (isHost) {
		return children
	}
	return <NavigationContainer>{children}</NavigationContainer>
}

const App = ({ isHost }) => {
	return (
		<WithNavigationContainer isHost={isHost}>
			<Provider>
				<SafeAreaView style={{ flex: 1 }}>
					<Stack.Navigator
						initialRouteName={"app_chartHome"}
						screenOptions={{
							headerShown: true,
							header: (props) => {
								return (
									<TopBar
										title={props.route.name}
										divider
										left={
											<Icon
												shape="ArrowLeft"
												width={24}
												height={24}
												onPress={() => props.navigation.goBack()}
											/>
										}
									/>
								)
							},
						}}>
						<Stack.Screen name={"app_chartHome"} component={HomeScreen} />
						<Stack.Screen name={"StacedkBarChartScreen"} component={screens.StacedkBarChartScreen} />
						<Stack.Screen name={"평당가차트"} component={screens.PriceDateLineChartScreen} />
						<Stack.Screen name={"시세흐름차트"} component={screens.PriceFlowChartScreen} />
						<Stack.Screen name={"시세거래량차트"} component={screens.PriceVolumeChartScreen} />
						<Stack.Screen name={"거래량라인차트"} component={screens.VolumeLineChartScreen} />
					</Stack.Navigator>
				</SafeAreaView>
			</Provider>
		</WithNavigationContainer>
	)
}

export type RootStackParamList = {
	Home: undefined
	StacedkBarChartScreen: undefined
	평당가차트: undefined
	시세흐름차트: undefined
	시세거래량차트: undefined
	거래량라인차트: undefined
}

export default App
