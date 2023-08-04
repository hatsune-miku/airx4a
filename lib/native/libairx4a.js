import { NativeModules } from "react-native";
const bridge = NativeModules.AirXForAndroidBridge;

export default class AirXForAndroid {
    static async getGreetings(name) {
        return "Android received: " + await bridge.connectivityTest(name);
    }
};
