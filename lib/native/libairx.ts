import {NativeModules} from 'react-native';
const bridge = NativeModules.AirXBridge;

export default class AirX {
  static async getAirXVersion(): Promise<number> {
    return await bridge.getAirXVersion();
  }

  static async getAirXCompatibilityNumber(): Promise<number> {
    return await bridge.getAirXCompatibilityNumber();
  }

  static async getAirXVersionString(): Promise<string> {
    return await bridge.getAirXVersionString();
  }

  static async airXInit(): Promise<void> {
    return await bridge.initialize();
  }

  static async airXCreateService(
    discoveryServiceServerPort: number,
    discoveryServiceClientPort: number,
    textServiceListenAddress: string,
    textServiceListenPort: number,
    groupIdentifier: number,
  ): Promise<number> {
    return await bridge.createService(
      discoveryServiceServerPort,
      discoveryServiceClientPort,
      textServiceListenAddress,
      textServiceListenPort,
      groupIdentifier,
    );
  }

  static async airXLanDiscoveryService(
    airXOpaquePointer: number,
  ): Promise<void> {
    return await bridge.lanDiscoveryService(airXOpaquePointer);
  }

  static async airXDataService(airXOpaquePointer: number): Promise<void> {
    return await bridge.dataService(airXOpaquePointer);
  }

  static async airXSendText(
    airXOpaquePointer: number,
    host: string,
    text: string,
  ): Promise<void> {
    return await bridge.sendText(airXOpaquePointer, host, text);
  }

  static async airXRespondToFile(
    airXOpaquePointer: number,
    host: string,
    fileId: number,
    fileSize: number,
    filePath: string,
    accept: boolean,
  ): Promise<void> {
    return await bridge.respondToFile(
      airXOpaquePointer,
      host,
      fileId,
      fileSize,
      filePath,
      accept,
    );
  }

  static async airXTrySendFile(
    airXOpaquePointer: number,
    host: string,
    filePath: number,
  ): Promise<void> {
    return await bridge.trySendFile(airXOpaquePointer, host, filePath);
  }

  static async airXGetPeers(airXOpaquePointer: number): Promise<string> {
    return await bridge.getPeers(airXOpaquePointer);
  }

  static async airXBroadcastText(
    airXOpaquePointer: number,
    text: string,
  ): Promise<void> {
    return await bridge.broadcastText(airXOpaquePointer, text);
  }
}
