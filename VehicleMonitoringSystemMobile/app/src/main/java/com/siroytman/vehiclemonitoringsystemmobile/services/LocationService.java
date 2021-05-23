package com.siroytman.vehiclemonitoringsystemmobile.services;

import android.content.Context;
import android.location.Location;
import android.util.Log;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.ILocationManager;

import static android.Manifest.permission.ACCESS_COARSE_LOCATION;
import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.content.pm.PackageManager.PERMISSION_GRANTED;
import static androidx.core.content.ContextCompat.checkSelfPermission;

/**
 * Service which gets updates about the current device location
 */
public class LocationService {
    public static final String TAG = "LocationService";

    // Singleton
    public static LocationService instance;

    // Default value, that will be reset by companySettings if they exist
    public static int RECORDING_INTERVAL_MS = 10000;

    private FusedLocationProviderClient fusedLocationClient;

    private final ILocationManager locationManager;
    private LocationCallback locationCallback;
    private LocationRequest locationRequest;

    public static LocationService getInstance(Context context, ILocationManager locationManager) {
        if (instance != null) {
            return instance;
        }

        return new LocationService(context, locationManager);
    }

    public LocationService(Context context, ILocationManager locationManager) {
        this.locationManager = locationManager;
        if (fusedLocationClient == null) {
            fusedLocationClient = LocationServices.getFusedLocationProviderClient(context);
        }

        createLocationRequest();
        createLocationCallBack();

        instance = this;
    }

    private void createLocationCallBack() {
        Log.d(TAG, "createLocationCallBack");
        if (locationCallback == null) {
            locationCallback = new LocationCallback() {
                @Override
                public void onLocationResult(LocationResult locationResult) {
                    Log.d(TAG, "onLocationResult");
                    super.onLocationResult(locationResult);
                    if (locationResult != null) {
                        for (Location location : locationResult.getLocations()) {
                            if (location != null && locationManager != null) {
                                locationManager.onLocationUpdate(location);
                            }
                        }
                    }
                }
            };
        }
    }

    private void createLocationRequest() {
        locationRequest = new LocationRequest();
        locationRequest.setInterval(RECORDING_INTERVAL_MS);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    }

    public void startLocationUpdates(Context context) {
        if (checkSelfPermission(context, ACCESS_FINE_LOCATION) != PERMISSION_GRANTED
                && checkSelfPermission(context, ACCESS_COARSE_LOCATION) != PERMISSION_GRANTED) {
            Log.d(TAG, "No permissions to get location");
            return;
        }

        Log.d(TAG, "startLocationUpdates");
        fusedLocationClient.requestLocationUpdates(locationRequest,
                locationCallback,
                null /* Looper */);
    }

    public void stopLocationUpdates() {
        Log.d(TAG, "stopLocationUpdates");
        fusedLocationClient.removeLocationUpdates(locationCallback);
    }

//    private void getLastKnownLocation(Context context) {
//        if (fusedLocationClient == null) {
//            fusedLocationClient = LocationServices.getFusedLocationProviderClient(context);
//        }
//
//        if (checkSelfPermission(context, ACCESS_FINE_LOCATION) != PERMISSION_GRANTED
//                && checkSelfPermission(context, ACCESS_COARSE_LOCATION) != PERMISSION_GRANTED) {
//            return;
//        }
//
//        fusedLocationClient.getLastLocation().addOnSuccessListener(location -> {
//            if (locationManager != null) {
//                locationManager.getLastKnownLocation(location);
//            }
//        });
//    }
}
