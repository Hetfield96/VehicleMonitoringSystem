package com.siroytman.vehiclemonitoringsystemmobile.model;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

import com.siroytman.vehiclemonitoringsystemmobile.util.DateUtil;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;

public class Vehicle implements Parcelable {
    public static final String TAG = "Vehicle";

    private int id;
    private String name;
    private String number;

    public Vehicle() { }


    public static Vehicle parseVehicle(JSONObject json) {
        Vehicle task = new Vehicle();

        try {
            task.id = json.getInt("id");
            task.name = json.getString("name");
            task.number = json.getString("number");
        } catch (JSONException e) {
            Log.d(TAG, "Parse error: " + e.getMessage());
            return null;
        }

        return task;
    }


    protected Vehicle(Parcel in) {
        id = in.readInt();
        name = in.readString();
        number = in.readString();
    }

    public static final Creator<Vehicle> CREATOR = new Creator<Vehicle>() {
        @Override
        public Vehicle createFromParcel(Parcel in) {
            return new Vehicle(in);
        }

        @Override
        public Vehicle[] newArray(int size) {
            return new Vehicle[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(id);
        dest.writeString(name);
        dest.writeString(number);
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getNumber() {
        return this.number;
    }

    public String getFormattedName() {
        return this.name + " (" + this.number + ")";
    }
}
