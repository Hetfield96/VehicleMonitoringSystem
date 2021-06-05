package com.siroytman.vehiclemonitoringsystemmobile.services;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.os.AsyncTask;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.ILocationManager;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.IObdManager;
import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;
import com.siroytman.vehiclemonitoringsystemmobile.room.AppRoomDatabase;
import com.siroytman.vehiclemonitoringsystemmobile.ui.fragments.VehicleFragment;

import java.util.Date;
import java.util.Objects;

import static android.Manifest.permission.ACCESS_COARSE_LOCATION;
import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.content.pm.PackageManager.PERMISSION_GRANTED;

/**
 * Foreground service for running locationService in background
 * Sends location to GeodataProcessingService via volley
 */
public class LocationForegroundService extends Service implements ILocationManager, IObdManager {
    public static final String TAG = "LocationForeService";
    public static final String NOTIFICATION_CHANNEL_ID = "ForegroundServiceNotificationChannel";
    public static final int CHANNEL_ID = 420;
    private static final int REQUEST_LOCATION = 1234;
    private static final String[] PERMISSIONS = new String[]{ACCESS_COARSE_LOCATION, ACCESS_FINE_LOCATION};

    private static Activity activity;

    private LocationService locationService;
    private OBDService obdService;
    private ILocationManager locationManager;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        createNotificationChannel();

        Intent notificationIntent = new Intent(this, VehicleFragment.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,
                0, notificationIntent, 0);

        Notification notification = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
                .setContentTitle(getString(R.string.app_name))
                .setContentText(getString(R.string.location_service__notification_text))
                .setSmallIcon(R.drawable.ic_truck_24)
                .setContentIntent(pendingIntent)
                .build();
        startForeground(CHANNEL_ID, notification);

        if (AppController.getInstance().useOBD) {
            obdService = OBDService.getInstance(activity, this);

            // Obd service subscribes on location updates
            locationManager = obdService;
        } else {
            // This service subscribe on location updates
            locationManager = this;
        }

        // Starts locationService on a background thread
        locationService = LocationService.getInstance(getApplicationContext(), locationManager);
        locationService.startLocationUpdates(getApplicationContext());

        return START_STICKY;
    }

    public static void startService(Activity startFromActivity) {
        Log.d(TAG, "startService");
        activity = startFromActivity;
        Intent serviceIntent = new Intent(startFromActivity, LocationForegroundService.class);
        ContextCompat.startForegroundService(startFromActivity, serviceIntent);

        // Starts synchronization AsyncTask mechanism
        VehicleDataSynchronizationService.scheduleSynchronizationTask();
    }

    public static void stopService(Context context) {
        Intent serviceIntent = new Intent(context, LocationForegroundService.class);
        context.stopService(serviceIntent);
    }

    public static boolean checkPermissions(Context context) {
        return ContextCompat.checkSelfPermission(context, ACCESS_FINE_LOCATION) == PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(context, ACCESS_COARSE_LOCATION) == PERMISSION_GRANTED;
    }

    public static void requestPermissions(Activity activity) {
        ActivityCompat.requestPermissions(activity, PERMISSIONS, REQUEST_LOCATION);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        locationService.stopLocationUpdates();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    // Callback for locationService
    @Override
    public void onLocationUpdate(Location location) {
        String userId = Objects.requireNonNull(AppController.getInstance().getCurrentDbUser()).getId();
        int vehicleId = Objects.requireNonNull(AppController.getInstance().getCurrentVehicle()).getId();
        VehicleData vehicleData =
                new VehicleData(vehicleId, userId, new Date(), location.getLatitude(), location.getLongitude());

        Log.d(TAG, "LocationChanged: " + vehicleData.toString());
        saveVehicleDataToDb(vehicleData);
    }

    @Override
    public void onObdUpdate(VehicleData vehicleData) {
        saveVehicleDataToDb(vehicleData);
    }

    /**
     * Inserts data in android room
     * @param vehicleData - piece of data
     */
    private void saveVehicleDataToDb(VehicleData vehicleData) {
        AsyncTask.execute(new Runnable() {
            @Override
            public void run() {
                AppRoomDatabase roomDb = AppController.getInstance().getRoomDatabase();
                roomDb.vehicleDataDao().insert(vehicleData);
            }
        });
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    NOTIFICATION_CHANNEL_ID,
                    "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            assert manager != null;
            manager.createNotificationChannel(serviceChannel);
        }
    }
}

