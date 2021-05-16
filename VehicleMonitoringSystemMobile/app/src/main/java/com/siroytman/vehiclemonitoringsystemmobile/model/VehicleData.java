package com.siroytman.vehiclemonitoringsystemmobile.model;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.room.Converters;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Entity
public class VehicleData {
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    public long id;
    @ColumnInfo(name = "vehicle_id")
    public int vehicle_id;
    @ColumnInfo(name = "employee_id")
    public String employee_id;
    @TypeConverters(Converters.class)
    @ColumnInfo(name = "datetime")
    public Date datetime;
    @ColumnInfo(name = "latitude")
    public double latitude;
    @ColumnInfo(name = "longitude")
    public double longitude;

    // Control
    // not real data
//    @ColumnInfo(name = "distanceMilControl")
//    public Integer distanceMilControl;

    /**
     * Distance traveled since codes cleared-up.
     */
    // no data
//    @ColumnInfo(name = "distanceSinceCcControl")
//    public Integer distanceSinceCcControl;

    // Engine
    // Checked
    /**
     * Displays the current engine revolutions per minute (RPM).
     */
    @ColumnInfo(name = "rpm_engine")
    public Integer rpm_engine;

    // Fuel
    /**
     * Fuel level percentage
     */
    // not real data
//    @ColumnInfo(name = "levelFuel")
//    public Byte levelFuel;

    /**
     * Fuel Consumption Rate per hour
     */
    // no data
//    @ColumnInfo(name = "consumptionRateFuel")
//    public Byte consumptionRateFuel;

    // Pressure
    // no data
//    @ColumnInfo(name = "fuelPressure")
//    public Byte fuelPressure;

    // Temperature
    // Checked
//            not real data
//    @ColumnInfo(name = "engineCoolantTemperature")
//    public Byte engineCoolantTemperature;

    // Speed
    // not real data
//    @ColumnInfo(name = "speed")
//    public Byte speed;


    public VehicleData(int vehicle_id, String employee_id, Date datetime, double latitude, double longitude) {
        this.vehicle_id = vehicle_id;
        this.employee_id = employee_id;
        this.datetime = datetime;
        this.latitude = latitude;
        this.longitude = longitude;
    }


    public Map<String, Object> toMap() {
        Map<String, Object> vehicle_data = new HashMap<>();
        vehicle_data.put("vehicle_id", vehicle_id);
        vehicle_data.put("employee_id", employee_id);
        vehicle_data.put("timestamp", datetime);
        vehicle_data.put("latitude", latitude);
        vehicle_data.put("longitude", longitude);

        // OBD related data
        if (AppController.getInstance().useOBD) {
            // Control
//            vehicle_data.put("distanceMilControl", distanceMilControl);
//            vehicle_data.put("distanceSinceCcControl", distanceSinceCcControl);

            // Engine
            vehicle_data.put("rpm_engine", rpm_engine);

            // Fuel
//            vehicle_data.put("levelFuel", levelFuel);
//            vehicle_data.put("consumptionRateFuel", consumptionRateFuel);

            // Pressure
//            vehicle_data.put("pressureFuel", fuelPressure);

            // Temperature
//            vehicle_data.put("engineCoolantTemperature", engineCoolantTemperature);

            // Speed
//            vehicle_data.put("speed", speed);
        }

        return vehicle_data;
    }

    @NonNull
    @Override
    public String toString() {
        String res = "vehicle_id = " + vehicle_id + ", " +
                "employee_id = " + employee_id + ", " +
                "timestamp = " + datetime.toString() + ", " +
                "latitude = " + latitude + ", " +
                "longitude = " + longitude;

        if (AppController.getInstance().useOBD) {
            // Control
//            res += ", distanceMilControl = " + distanceMilControl;
//            res += ", distanceSinceCcControl = " + distanceSinceCcControl;

            // Engine
            res += ", rpm_engine = " + rpm_engine;

            // Fuel
//            res += ", levelFuel = " + levelFuel;
//            res += ", consumptionRateFuel = " + consumptionRateFuel;

            // Pressure
//            res += ", pressureFuel = " + fuelPressure;

            // Temperature
//            res += ", engineCoolantTemperature = " + engineCoolantTemperature;

            // Speed
//            res += ", speed = " + speed;
        }

        return res;
    }
}
