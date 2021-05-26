package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.app.Application;
import android.content.Context;

import androidx.room.Room;

import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.model.Vehicle;
import com.siroytman.vehiclemonitoringsystemmobile.room.AppRoomDatabase;

public class AppController extends Application {
    private static final String TAG = "AppController";
    private static AppController mInstance;
    private Employee currentDbUser;
    private Vehicle currentVehicle;
    private AppRoomDatabase roomDatabase;

    // TODO to settings
    public boolean useOBD = true;
    public String deviceNameOBD = "OBDII";

    @Override
    public void onCreate() {
        super.onCreate();

        roomDatabase = Room
                .databaseBuilder(getApplicationContext(), AppRoomDatabase.class, "vms-room")
                .fallbackToDestructiveMigration()
                .build();
        mInstance = this;
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