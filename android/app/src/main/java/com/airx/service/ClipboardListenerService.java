package com.airx.service;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import java.util.Objects;

public class ClipboardListenerService extends Service implements ClipboardManager.OnPrimaryClipChangedListener {
    private final Binder binder = new LocalBinder();
    private final static String TAG = "ClipboardListenerService";

    private ClipboardManager clipboardManager;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "Service created.");

        clipboardManager = (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
        clipboardManager.addPrimaryClipChangedListener(this);
        Log.d(TAG, "Clipboard listener added.");
    }

    @Override
    public void onPrimaryClipChanged() {
        ClipData clip = clipboardManager.getPrimaryClip();
        if (clip == null || clip.getItemCount() == 0) {
            return;
        }

        Log.d(TAG, "Primary clip changed.");
        String text = clip.getItemAt(0).getText().toString();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        NotificationChannel channel = new NotificationChannel(
                "clipboard",
                "Clipboard",
                NotificationManager.IMPORTANCE_DEFAULT
        );
        NotificationManager notificationManager = getSystemService(NotificationManager.class);
        Objects.requireNonNull(notificationManager).createNotificationChannel(channel);

        Notification notification = new Notification.Builder(getApplicationContext(), "clipboard")
                .setContentTitle("AirX")
                .setContentText("AirX is running in the background")
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .build();

        startForeground(1, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC);
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return binder;
    }

    public class LocalBinder extends Binder {
        public ClipboardListenerService getService() {
            return ClipboardListenerService.this;
        }
    }
}
