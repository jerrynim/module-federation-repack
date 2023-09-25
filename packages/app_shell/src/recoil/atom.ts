import { Platform } from "react-native"
import { atom } from "recoil"
import DeviceInfo from "react-native-device-info"

const websocketConnectState = atom({
	key: "websocketConnectState",
	default: false,
})

const appInfoState = atom({
	key: "appInfoState",
	default: {
		uuid: DeviceInfo.getUniqueIdSync(),
		name: DeviceInfo.getModel(),
		os: Platform.OS,
	},
})

const receivedFigmaCodeState = atom({
	key: "receivedFigmaCodeState",
	default: "",
})

export default {
	websocketConnectState,
	appInfoState,
	receivedFigmaCodeState,
}
