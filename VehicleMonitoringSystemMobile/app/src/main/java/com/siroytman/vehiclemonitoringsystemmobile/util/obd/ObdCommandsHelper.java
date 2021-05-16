package com.siroytman.vehiclemonitoringsystemmobile.util.obd;

import android.util.Log;

import com.github.pires.obd.commands.ObdCommand;
import com.github.pires.obd.commands.engine.RPMCommand;
import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;

import java.util.ArrayList;

public class ObdCommandsHelper {
    public static final String TAG = "ObdCommandsHelper";
    
    public static ArrayList<ObdCommand> getDefaultCommands() {
        ArrayList<ObdCommand> obdCommandList = new ArrayList<ObdCommand>() {{
            // Control
//            add(new DistanceMILOnCommand()); // not real data
//            add(new DistanceSinceCCCommand()); // no data
            // Engine
            add(new RPMCommand());
            // Fuel
//            add(new FuelLevelCommand()); not real data
//            add(new ConsumptionRateCommand()); // no data
            // Pressure
//            add(new FuelPressureCommand()); // no data
            // Temperature
//            add(new EngineCoolantTemperatureCommand()); // no data
            // Speed
//            add(new SpeedCommand()); // not real data
        }};
        
        return obdCommandList;
    }

    public static VehicleData parseDefaultCommandsResult(VehicleData vehicleData, ArrayList<String> result) {
        Log.d(TAG, "parseDefaultCommandsResult");

        int i = 0;

        // Control
        // not real data
//        try {
//            vehicleData.distanceMilControl = Integer.parseInt(result.get(i++));
//        } catch (NumberFormatException e) {
//            Log.e(TAG, i + ". distanceMilControl: error parsing " + e);
//        }

        // no data
//        try {
//            vehicleData.distanceSinceCcControl = Integer.parseInt(result.get(i++));
//        } catch (NumberFormatException e) {
//            Log.e(TAG, i + ". distanceSinceCcControl: error parsing " + e);
//        }

        // Engine
        try {
            vehicleData.rpm_engine = Integer.parseInt(result.get(i++));
        } catch (NumberFormatException e) {
            Log.e(TAG, i + ". rpm_engine: error parsing " + e);
        }

        // Fuel
        // not real data
//        try {
//            vehicleData.levelFuel = Byte.parseByte(result.get(i++));
//        } catch (NumberFormatException e) {
//            Log.e(TAG, i + ". levelFuel: error parsing " + e);
//        }

        // no data
//        try {
//            vehicleData.consumptionRateFuel = Byte.parseByte(result.get(i++));
//        } catch (NumberFormatException e) {
//            Log.e(TAG, i + ". consumptionRateFuel: error parsing " + e);
//        }

        // Pressure
        // no data
//        try {
//            vehicleData.fuelPressure = Byte.parseByte(result.get(i++));
//        } catch (NumberFormatException e) {
//            Log.e(TAG, i + ". pressureFuel: error parsing " + e);
//        }

        // Temperature
        // not real data
//        try {
//            vehicleData.engineCoolantTemperature = Byte.parseByte(result.get(i++));
//        } catch (NumberFormatException e) {
//            Log.e(TAG, i + ". engineCoolantTemperature: error parsing " + e);
//        }

        // Speed
        // not real data
//        try {
//            vehicleData.speed = Byte.parseByte(result.get(i++));
//        } catch (NumberFormatException e) {
//            Log.e(TAG, i + ". speed: error parsing " + e);
//        }

        return vehicleData;
    }
}
