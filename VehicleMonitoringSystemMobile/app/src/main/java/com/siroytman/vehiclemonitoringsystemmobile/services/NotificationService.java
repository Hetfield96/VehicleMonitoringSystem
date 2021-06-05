package com.siroytman.vehiclemonitoringsystemmobile.services;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.ChatMessagesActivity;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.NavigationActivity;
import com.siroytman.vehiclemonitoringsystemmobile.ui.fragments.ChatDialogFragment;

public class NotificationService {
    public static final String NOTIFICATION_CHANNEL_ID = "VMS_NotificationChannel";

    public static NotificationService instance;

    public static synchronized NotificationService getInstance() {
        if (instance == null) {
            return new NotificationService();
        }
        else {
            return instance;
        }
    }

    public NotificationService() {
        createNotificationChannel();
    }

    public void showChatMessagePushNotification(ChatMessage message) {
        Context context = AppController.getInstance().getAppContext();

        // Create an explicit intent for an Activity in your app
        Intent intent = new Intent(context, NavigationActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        intent.putExtra("fromNotification", true);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, NOTIFICATION_CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_truck_24)
                .setContentTitle(message.getSender().getName())
                .setContentText(message.getText())
                // Set the intent that will fire when the user taps the notification
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setContentIntent(pendingIntent)
                .setAutoCancel(true);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);

        // notificationId is a unique int for each notification that you must define
        notificationManager.notify(message.getIntId(), builder.build());
    }

    private void createNotificationChannel() {
        Context context = AppController.getInstance().getAppContext();

        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, NOTIFICATION_CHANNEL_ID, importance);
            channel.setDescription(NOTIFICATION_CHANNEL_ID);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}
