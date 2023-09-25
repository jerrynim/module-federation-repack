import { atom } from "recoil"

const sampleState = atom({
	key: "sample",
	default: "default",
})

export default {
	sampleState,
}
