package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.app.Application;
import android.content.Context;

import androidx.room.Room;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.model.Vehicle;
import com.siroytman.vehiclemonitoringsystemmobile.room.AppRoomDatabase;
import com.siroytman.vehiclemonitoringsystemmobile.util.SharedPrefsUtil;

public class AppController extends Application {
    private static final String TAG = "AppController";
    private static AppController mInstance;
    private Employee currentDbUser;
    private Vehicle currentVehicle;
    private AppRoomDatabase roomDatabase;

    public boolean useOBD;
    public String deviceNameOBD;

    @Override
    public void onCreate() {
        super.onCreate();

        roomDatabase = Room
                .databaseBuilder(getApplicationContext(), AppRoomDatabase.class, "vms-room")
                .fallbackToDestructiveMigration()
                .build();
        mInstance = this;

        this.useOBD = SharedPrefsUtil.readBooleanFromSharedPrefs(getAppContext(), getResources().getString(R.string.shared_prefs__use_obd));
        this.deviceNameOBD = SharedPrefsUtil.readStringFromSharedPrefs(getAppContext(), getResources().getString(R.string.shared_prefs__obd_name));
    }

    public static synchronized AppController getInstance() {
        if (mInstance == null) {
            return new AppController();
        }
        else {
            return mInstance;
        }
    }

    public AppRoomDatabase getRoomDatabase() {
        return roomDatabase;
    }

    public Context getAppContext() {
        return getApplicationContext();
    }

    public Employee getCurrentDbUser() {
        return currentDbUser;
    }

    public void setCurrentDbUser(Employee user) {
        this.currentDbUser = user;
    }

    public void setCurrentVehicle(Vehicle currentVehicle) {
        this.currentVehicle = currentVehicle;
    }

    public Vehicle getCurrentVehicle() {
        return currentVehicle;
    }
}