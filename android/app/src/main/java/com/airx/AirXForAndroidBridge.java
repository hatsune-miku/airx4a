package com.airx;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AirXForAndroidBridge extends ReactContextBaseJavaModule {
    static {
        System.loadLibrary("airx4a");
    }

    public AirXForAndroidBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "AirXForAndroidBridge";
    }

    @ReactMethod
    public void connectivityTest(String name, Promise promise) {
        promise.resolve(connectivityTestNative(name));
    }

    private static native String connectivityTestNative(String name);
}
