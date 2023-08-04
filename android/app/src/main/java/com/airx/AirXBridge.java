package com.airx;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;
import java.util.List;

public class AirXBridge extends ReactContextBaseJavaModule {
    static {
        System.loadLibrary("airx");
    }

    private static Thread discoveryServiceThread;
    private static Thread dataServiceThread;

    private static ReactApplicationContext sharedReactContext;

    public AirXBridge(ReactApplicationContext reactContext) {
        super(reactContext);
        sharedReactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "AirXBridge";
    }

    private static void emitMessage(String eventName, WritableMap params) {
        if (sharedReactContext == null) {
            return;
        }
        sharedReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

    public static void onTextPacketReceived(
        String text,
        String socketAddress
    ) {
        WritableMap event = Arguments.createMap();
        event.putString("text", text);
        event.putString("socketAddress", socketAddress);

        emitMessage("onTextPacketReceived", event);
    }

    public static void onFileComingPacketReceived(
        long fileSize,
        String remoteFullPath,
        String socketAddress
    ) {
        WritableMap event = Arguments.createMap();
        event.putString("fileSize", String.valueOf(fileSize));
        event.putString("remoteFullPath", remoteFullPath);
        event.putString("socketAddress", socketAddress);

        emitMessage("onFileComingPacketReceived", event);
    }

    public static void onFileSendingPacketReceived(
        short fileId,
        long progress,
        long total,
        short status
    ) {
        WritableMap event = Arguments.createMap();
        event.putString("fileId", String.valueOf(fileId));
        event.putString("progress", String.valueOf(progress));
        event.putString("total", String.valueOf(total));
        event.putString("status", String.valueOf(status));

        emitMessage("onFileSendingPacketReceived", event);
    }

    public static void onFilePartPacketReceived(
        short fileId,
        long offset,
        long length,
        byte[] data
    ) {
        WritableMap event = Arguments.createMap();
        List<Byte> bytes = new ArrayList<>();

        for (byte b : data) {
            bytes.add(b);
        }

        WritableNativeArray byteArray = Arguments.makeNativeArray(bytes);

        event.putString("fileId", String.valueOf(fileId));
        event.putString("offset", String.valueOf(offset));
        event.putString("length", String.valueOf(length));
        event.putArray("data", byteArray);

        emitMessage("onFilePartPacketReceived", event);
    }

    @ReactMethod
    public void getAirXVersion(Promise promise) {
        promise.resolve(airXVersion());
    }

    @ReactMethod
    public void getAirXCompatibilityNumber(Promise promise) {
        promise.resolve(airXCompatibilityNumber());
    }

    @ReactMethod
    public void getAirXVersionString(Promise promise) {
        promise.resolve(airXVersionString());
    }

    @ReactMethod
    public void initialize(Promise promise) {
        airXInit();
        promise.resolve(null);
    }

    @ReactMethod
    public static void createService(
        double discoveryServiceServerPort,
        double discoveryServiceClientPort,
        String textServiceListenAddress,
        double textServiceListenPort,
        double groupIdentifier,
        Promise promise
    ) {
        long airXOpaquePointer = airXCreateService(
            (short) discoveryServiceServerPort,
            (short) discoveryServiceClientPort,
            textServiceListenAddress,
            (short) textServiceListenPort,
            (int) groupIdentifier
        );
        promise.resolve((double) airXOpaquePointer);
    }

    @ReactMethod
    public static void lanDiscoveryService(
        double airXOpaquePointer,
        Promise promise
    ) {
        if (discoveryServiceThread != null) {
            discoveryServiceThread.interrupt();
        }
        discoveryServiceThread = new Thread(() -> {
            airXLanDiscoveryService((long) airXOpaquePointer);
        });
        discoveryServiceThread.start();
        promise.resolve(null);
    }

    @ReactMethod
    public static void airXDataService(
        double airXOpaquePointer,
        Promise promise
    ) {
        if (dataServiceThread != null) {
            dataServiceThread.interrupt();
        }
        dataServiceThread = new Thread(() -> {
            airXDataService((long) airXOpaquePointer);
        });
        dataServiceThread.start();
        promise.resolve(null);
    }

    @ReactMethod
    public static void sendText(
        double airXOpaquePointer,
        String host,
        String text,
        Promise promise
    ) {
        airXSendText((long) airXOpaquePointer, host, text);
        promise.resolve(null);
    }

    @ReactMethod
    public static void respondToFile(
        double airXOpaquePointer,
        String host,
        double fileId,
        double fileSize,
        String filePath,
        boolean accept,
        Promise promise
    ) {
        airXResponseToFile(
            (long) airXOpaquePointer,
            host,
            (short) fileId,
            (long) fileSize,
            filePath,
            accept
        );
        promise.resolve(null);
    }

    @ReactMethod
    public static void trySendFile(
        double airXOpaquePointer,
        String host,
        String filePath,
        Promise promise
    ) {
        airXTrySendFile((long) airXOpaquePointer, host, filePath);
        promise.resolve(null);
    }

    @ReactMethod
    public static void getPeers(
        double airXOpaquePointer,
        Promise promise
    ) {
        String peers = airXGetPeers((long) airXOpaquePointer);
        promise.resolve(peers);
    }

    @ReactMethod
    public static void broadcastText(
        double airXOpaquePointer,
        String text,
        Promise promise
    ) {
        airXBroadcastText((long) airXOpaquePointer, text);
        promise.resolve(null);
    }

    private static native int airXVersion();

    private static native int airXCompatibilityNumber();

    private static native String airXVersionString();

    private static native void airXInit();

    private static native long airXCreateService(
        short discoveryServiceServerPort,
        short discoveryServiceClientPort,
        String textServiceListenAddress,
        short textServiceListenPort,
        int groupIdentifier
    );

    private static native void airXDataService(
        long airXOpaquePointer
    );

    private static native void airXLanDiscoveryService(
        long airXOpaquePointer
    );

    private static native void airXSendText(
        long airXOpaquePointer,
        String host,
        String text
    );

    private static native void airXResponseToFile(
        long airXOpaquePointer,
        String host,
        short fileId,
        long fileSize,
        String filePath,
        boolean accept
    );

    private static native void airXTrySendFile(
        long airXOpaquePointer,
        String host,
        String filePath
    );

    private static native String airXGetPeers(
        long airXOpaquePointer
    );

    private static native void airXBroadcastText(
        long airXOpaquePointer,
        String text
    );
}
