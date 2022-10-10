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
    public void handleClick(String name, Callback callback){
        try{
            String message = "Hi " + name;
            callback.invoke(null, message);

        } catch (Exception e){
            callback.invoke(e, null);
        }
    }

    @ReactMethod
    public void openIntent(){
        Intent open_activity = new Intent(getCurrentActivity(), AndroidActivity.class);
        getCurrentActivity().startActivity(open_activity);
    }

    @ReactMethod
    public void safeCameraOpen() {
        boolean qOpened = false;

        try {
            releaseCameraAndPreview();
            camera = Camera.open(0);
            qOpened = (camera != null);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void releaseCameraAndPreview() {
        if (camera != null) {
            camera.release();
            camera = null;
        }
    }




}
