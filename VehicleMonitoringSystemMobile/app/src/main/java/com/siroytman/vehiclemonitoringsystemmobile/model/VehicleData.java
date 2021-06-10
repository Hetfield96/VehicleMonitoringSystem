package com.siroytman.vehiclemonitoringsystemmobile.model;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.room.Converters;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

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
    @ColumnInfo(name = "distance_mil_control") //1
    public Integer distance_mil_control;

    @ColumnInfo(name = "distance_since_cc_control")//2
    public Integer distance_since_cc_control;

    @ColumnInfo(name = "dtc_number")//3
    public Byte dtc_number;

    @ColumnInfo(name = "pending_trouble_codes")//4
    public String pending_trouble_codes;

    @ColumnInfo(name = "permanent_trouble_codes")//5
    public String permanent_trouble_codes;

    @ColumnInfo(name = "trouble_codes")//6
    public String trouble_codes;

    // Engine
    @ColumnInfo(name = "rpm_engine")//7
    public Integer rpm_engine;

    @ColumnInfo(name = "absolute_load")//8
    public double absolute_load;

    @ColumnInfo(name = "load")//9
    public double load;

    // Fuel
    @ColumnInfo(name = "level_fuel")//10
    public double level_fuel;

    @ColumnInfo(name = "air_fuel_ratio")//11
    public double air_fuel_ratio;

    // Temperature
    @ColumnInfo(name = "engine_coolant_temperature")//12
    public Double engine_coolant_temperature;

    @ColumnInfo(name = "air_intake_temperature")//13
    public Double air_intake_temperature;

    @ColumnInfo(name = "ambient_air_temperature")//14
    public double ambient_air_temperature;

    // Speed
    @ColumnInfo(name = "speed")//15
    public Byte speed;


    public VehicleData(int vehicle_id, String employee_id, Date datetime, double latitude, double longitude) {
        this.vehicle_id = vehicle_id;
        this.employee_id = employee_id;
        this.datetime = datetime;
        this.latitude = latitude;
        this.longitude = longitude;
    }


    public JSONObject toJSON() {
        JSONObject item = new JSONObject();

        try {
            item.put("vehicleId", vehicle_id);
            item.put("employeeId", employee_id);
            String datetimeFormat = new SimpleDateFormat("yyMMddHHmmss", Locale.US).format(datetime);
            item.put("datetimeString", datetimeFormat);
            item.put("latitude", latitude);
            item.put("longitude", longitude);

            // OBD related data
            if (AppController.getInstance().useOBD) {
                // Control
                item.put("distanceMilControl", distance_mil_control);
                item.put("distanceSinceCcControl", distance_since_cc_control);
                item.put("dtcNumber", dtc_number);
                item.put("pendingTroubleCodes", pending_trouble_codes);
                item.put("permanentTroubleCodes", permanent_trouble_codes);
                item.put("troubleCodes", trouble_codes);

                // Engine
                item.put("rpmEngine", rpm_engine);
                item.put("absoluteLoad", absolute_load);
                item.put("load", load);

                // Fuel
                item.put("levelFuel", level_fuel);
                item.put("airFuelRatio", air_fuel_ratio);

                // Temperature
                item.put("engineCoolantTemperature", engine_coolant_temperature);
                item.put("airIntakeTemperature", air_intake_temperature);
                item.put("ambientAirTemperature", ambient_air_temperature);

                // Speed
                item.put("speed", speed);
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }

        return item;
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
            res += ", distance_mil_control = " + distance_mil_control;
            res += ", distance_since_cc_control = " + distance_since_cc_control;
            res += ", dtc_number = " + dtc_number;
            res += ", pending_trouble_codes = " + pending_trouble_codes;
            res += ", permanent_trouble_codes = " + permanent_trouble_codes;
            res += ", trouble_codes = " + trouble_codes;

            // Engine
            res += ", rpm_engine = " + rpm_engine;
            res += ", absolute_load = " + absolute_load;
            res += ", load = " + load;

            // Fuel
            res += ", level_fuel = " + level_fuel;
            res += ", air_fuel_ratio = " + air_fuel_ratio;

            // Temperature
            res += ", engine_coolant_Temperature = " + engine_coolant_temperature;
            res += ", air_intake_temperature = " + air_intake_temperature;
            res += ", ambient_air_temperature = " + ambient_air_temperature;

            // Speed
            res += ", speed = " + speed;
        }

        return res;
    }
}
