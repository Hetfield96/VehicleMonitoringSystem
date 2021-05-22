package com.siroytman.vehiclemonitoringsystemmobile.util.obd;

import android.util.Log;

import com.github.pires.obd.commands.ObdCommand;
import com.github.pires.obd.commands.SpeedCommand;
import com.github.pires.obd.commands.control.DistanceMILOnCommand;
import com.github.pires.obd.commands.control.DistanceSinceCCCommand;
import com.github.pires.obd.commands.control.DtcNumberCommand;
import com.github.pires.obd.commands.control.PendingTroubleCodesCommand;
import com.github.pires.obd.commands.control.PermanentTroubleCodesCommand;
import com.github.pires.obd.commands.control.TroubleCodesCommand;
import com.github.pires.obd.commands.engine.AbsoluteLoadCommand;
import com.github.pires.obd.commands.engine.LoadCommand;
import com.github.pires.obd.commands.engine.RPMCommand;
import com.github.pires.obd.commands.fuel.AirFuelRatioCommand;
import com.github.pires.obd.commands.fuel.FuelLevelCommand;
import com.github.pires.obd.commands.temperature.AirIntakeTemperatureCommand;
import com.github.pires.obd.commands.temperature.AmbientAirTemperatureCommand;
import com.github.pires.obd.commands.temperature.EngineCoolantTemperatureCommand;
import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;

import java.util.ArrayList;

public class ObdCommandsHelper {
    public static final String TAG = "ObdCommandsHelper";
    
    public static ArrayList<ObdCommand> getDefaultCommands() {
        ArrayList<ObdCommand> obdCommandList = new ArrayList<ObdCommand>() {{
            // Control
            add(new DistanceMILOnCommand()); //1
            add(new DistanceSinceCCCommand()); //2
            add(new DtcNumberCommand()); //3
            add(new PendingTroubleCodesCommand());//4
            add(new PermanentTroubleCodesCommand());//5
            add(new TroubleCodesCommand());//6
            // Engine
            add(new RPMCommand());//7
            add(new AbsoluteLoadCommand());//8
            add(new LoadCommand());//9
            // Fuel
            add(new FuelLevelCommand());//10
            add(new AirFuelRatioCommand()); //11
            // Temperature
            add(new EngineCoolantTemperatureCommand());//12
            add(new AirIntakeTemperatureCommand());//13
            add(new AmbientAirTemperatureCommand());//14
            // Speed
            add(new SpeedCommand());//15
        }};
        
        return obdCommandList;
    }

    public static VehicleData parseDefaultCommandsResult(VehicleData vehicleData, ArrayList<ObdCommandResult> commandResults) {
        Log.d(TAG, "parseDefaultCommandsResult");

        int i = 0;
        ObdCommandResult commandResult;

        // Control
        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.distance_mil_control = Integer.parseInt(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". distanceMilControl: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". distanceMilControl not calculated: " + commandResult.error);
        }

        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.distance_since_cc_control = Integer.parseInt(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". distanceSinceCcControl: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". distanceSinceCcControl not calculated: " + commandResult.error);
        }

        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.dtc_number = Byte.parseByte(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". dtc_number: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". dtc_number not calculated: " + commandResult.error);
        }

        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.pending_trouble_codes = commandResult.result;
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". pending_trouble_codes: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". pending_trouble_codes not calculated: " + commandResult.error);
        }

        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.permanent_trouble_codes = commandResult.result;
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". permanent_trouble_codes: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". permanent_trouble_codes not calculated: " + commandResult.error);
        }

        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.trouble_codes = commandResult.result;
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". trouble_codes: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". trouble_codes not calculated: " + commandResult.error);
        }


        // Engine
        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.rpm_engine = Integer.parseInt(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". rpm_engine: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". rpm_engine not calculated: " + commandResult.error);
        }

        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.absolute_load = Double.parseDouble(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". absolute_load: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". absolute_load not calculated: " + commandResult.error);
        }

        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.load = Double.parseDouble(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". load: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". load not calculated: " + commandResult.error);
        }

        // Fuel
        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.level_fuel = Double.parseDouble(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". levelFuel: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". levelFuel not calculated: " + commandResult.error);
        }

        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.air_fuel_ratio = Double.parseDouble(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". air_fuel_ratio: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". air_fuel_ratio not calculated: " + commandResult.error);
        }

        // Temperature
        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.engine_coolant_temperature = Double.parseDouble(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". engineCoolantTemperature: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". engineCoolantTemperature not calculated: " + commandResult.error);
        }

        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.air_intake_temperature = Double.parseDouble(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". air_intake_temperature: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". air_intake_temperature not calculated: " + commandResult.error);
        }

        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.ambient_air_temperature = Double.parseDouble(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". ambient_air_temperature: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". ambient_air_temperature not calculated: " + commandResult.error);
        }

        // Speed
        commandResult = commandResults.get(i++);
        if (commandResult.calculated) {
            try {
                vehicleData.speed = Byte.parseByte(commandResult.result);
            } catch (NumberFormatException e) {
                Log.e(TAG, i + ". speed: error parsing " + e);
            }
        } else {
            Log.e(TAG, i + ". speed not calculated: " + commandResult.error);
        }

        return vehicleData;
    }
}
