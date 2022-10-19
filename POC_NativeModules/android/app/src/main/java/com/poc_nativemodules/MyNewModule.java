package com.poc_nativemodules;

import android.content.Intent;
import android.hardware.Camera;
import android.provider.MediaStore;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyNewModule extends ReactContextBaseJavaModule {

    public Camera camera;

    public MyNewModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "MyNewModule";
    }

    @ReactMethod
    public void openIntent(){
        Intent open_activity = new Intent(getCurrentActivity(), AndroidActivity.class);
        getCurrentActivity().startActivity(open_activity);
    }

    @ReactMethod
    public void openMediapipeActivity(){
        Intent open_mediapipe = new Intent(getCurrentActivity(), MediapipeAcitivy.class);
        getCurrentActivity().startActivity(open_mediapipe);
    }




}
