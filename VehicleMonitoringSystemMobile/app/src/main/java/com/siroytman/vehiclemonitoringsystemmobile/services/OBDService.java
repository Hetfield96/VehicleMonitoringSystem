package com.siroytman.vehiclemonitoringsystemmobile.services;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.location.Location;
import android.util.Log;

import com.github.pires.obd.commands.protocol.EchoOffCommand;
import com.github.pires.obd.commands.protocol.LineFeedOffCommand;
import com.github.pires.obd.commands.protocol.SelectProtocolCommand;
import com.github.pires.obd.commands.protocol.TimeoutCommand;
import com.github.pires.obd.enums.ObdProtocols;
import com.google.firebase.auth.FirebaseAuth;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.IBluetoothConnectManager;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.ILocationManager;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.IObdManager;
import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;
import com.siroytman.vehiclemonitoringsystemmobile.util.obd.BluetoothConnectThread;
import com.siroytman.vehiclemonitoringsystemmobile.util.obd.MyObdMultiCommand;
import com.siroytman.vehiclemonitoringsystemmobile.util.obd.ObdCommandResult;
import com.siroytman.vehiclemonitoringsystemmobile.util.obd.ObdCommandsHelper;

import java.util.ArrayList;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

import static androidx.core.app.ActivityCompat.startActivityForResult;

/**
 * Service for gather vehicle statistic from OBD when location updates
 */
public class OBDService implements IBluetoothConnectManager, ILocationManager {
    public static final String TAG = "OBDService";

    // Default value, that will be reset by companySettings if they exist
    public static int RECORDING_INTERVAL_MS = 10000;

    // Singleton
    public static OBDService instance;

    private Activity activity;

    private final IObdManager obdManager;

    private boolean isObdConfigured = false;

    // Bluetooth adapter to enable bluetooth and discover devices
    BluetoothAdapter bluetoothAdapter;
    // Bluetooth device which represents OBD-|| adapter
    BluetoothDevice bluetoothDevice;
    // Bluetooth socket to transmit data within bluetooth device
    BluetoothSocket bluetoothSocket;

    public static OBDService getInstance(Activity activity, IObdManager obdManager) {
        if (instance != null) {
            return instance;
        }

        return new OBDService(activity, obdManager);
    }

    private OBDService(Activity activity, IObdManager obdManager) {
        this.obdManager = obdManager;
        this.activity = activity;

        this.bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        configureBluetooth();

        instance = this;
    }

    //    @Override
//    public void getLastKnownLocation(Location lastLocation) {
//
//    }

    // On new location - gather vehicle data from OBD
    @Override
    public void onLocationUpdate(Location location) {
        if (isObdConfigured) {
            String userId = Objects.requireNonNull(FirebaseAuth.getInstance().getCurrentUser()).getUid();
            // TODO vehicleId
            VehicleData vehicleData =
                    new VehicleData(2, userId, new Date(), location.getLatitude(), location.getLongitude());

            vehicleData = gatherVehicleData(vehicleData);

            if (vehicleData != null) {
//                Log.d(TAG, "LocationChanged: " + vehicleData.toString());
                obdManager.onObdUpdate(vehicleData);
            } else {
                Log.e(TAG, "Vehicle data is not gathered");
            }
        } else {
            Log.d(TAG, "onLocationChanged. odb is not configured yet");
        }
    }

    // Gather vehicle data object - fires on location updates
    private VehicleData gatherVehicleData(VehicleData vehicleData) {
        Log.d(TAG, "gatherVehicleData");

        MyObdMultiCommand obdMultiCommand = new MyObdMultiCommand(ObdCommandsHelper.getDefaultCommands());

        try {
            obdMultiCommand.sendCommands(bluetoothSocket.getInputStream(), bluetoothSocket.getOutputStream());
            ArrayList<ObdCommandResult> commandsResults = obdMultiCommand.getCalculatedResults();
            ObdCommandsHelper.parseDefaultCommandsResult(vehicleData, commandsResults);

            Log.d(TAG, "Parse result: " + vehicleData.toString());
            return vehicleData;
        } catch (Exception e) {
            Log.d(TAG, "Error at multiCommand: " + e.getMessage());
            return null;
        }
    }

    private void configureBluetooth() {
        Log.d(TAG, "configureBluetooth");
        enableBluetooth();
        this.bluetoothDevice = findBluetoothDevice();
        if (this.bluetoothDevice == null) {
            Log.e(TAG, "No bluetooth device was found");
            return;
        }
        connectBluetooth();
    }

    private void enableBluetooth() {
        if (!bluetoothAdapter.isEnabled()) {
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(this.activity, enableBtIntent, 240, null);
        }
    }

    private BluetoothDevice findBluetoothDevice() {
        Log.d(TAG, "findBluetoothDevice start");
        Set<BluetoothDevice> pairedDevices = bluetoothAdapter.getBondedDevices();
        if (pairedDevices.size() > 0) {
            // There are paired devices. Get the name and address of each paired device.
            for (BluetoothDevice device : pairedDevices) {
                String deviceName = device.getName();
//                String deviceHardwareAddress = device.getAddress(); // MAC address

                // TODO get deviceName from settings
                if (deviceName.equals(AppController.getInstance().deviceNameOBD)) {
                    Log.d(TAG, "bluetoothDeviceFound");
                    return device;
                }
            }
        } else {
            // TODO no paired bluetooth devices
            Log.e(TAG, "No paired devices: need to pair with some");
        }
        return null;
    }

    private void connectBluetooth() {
        BluetoothConnectThread bluetoothConnectThread = new BluetoothConnectThread(this.bluetoothDevice, this);
        bluetoothConnectThread.start();
    }

    // Bluetooth socket attached
    @Override
    public void onBluetoothSocketAttached(BluetoothSocket bluetoothSocket) {
        Log.d(TAG, "Bluetooth socket is attached");
        this.bluetoothSocket = bluetoothSocket;
        this.isObdConfigured = configureObdDevice();
    }

    /**
     * Execute obd protocol commands
     * @return success
     */
    private boolean configureObdDevice() {
        Log.d(TAG, "configureObdDevice");
        try {
            EchoOffCommand echoOffCommand = new EchoOffCommand();
            echoOffCommand.run(bluetoothSocket.getInputStream(), bluetoothSocket.getOutputStream());
            Log.d(TAG, "echoOffCommand.getResult() = " + echoOffCommand.getResult());
            if (!echoOffCommand.getResult().equals("OK")) {
                return false;
            }

            LineFeedOffCommand lineFeedOffCommand = new LineFeedOffCommand();
            lineFeedOffCommand.run(bluetoothSocket.getInputStream(), bluetoothSocket.getOutputStream());
            Log.d(TAG, "lineFeedOffCommand.getResult() = " + lineFeedOffCommand.getResult());
            if (!echoOffCommand.getResult().equals("OK")) {
                return false;
            }

            TimeoutCommand timeoutCommand = new TimeoutCommand(125);
            timeoutCommand.run(bluetoothSocket.getInputStream(), bluetoothSocket.getOutputStream());
            Log.d(TAG, "timeoutCommand.getResult() = " + timeoutCommand.getResult());
            if (!echoOffCommand.getResult().equals("OK")) {
                return false;
            }

            SelectProtocolCommand selectProtocolCommand = new SelectProtocolCommand(ObdProtocols.AUTO);
            selectProtocolCommand.run(bluetoothSocket.getInputStream(), bluetoothSocket.getOutputStream());
            Log.d(TAG, "selectProtocolCommand.getResult() = " + selectProtocolCommand.getResult());
            if (!echoOffCommand.getResult().equals("OK")) {
                return false;
            }

            return true;
        } catch (Exception e) {
            // handle errors
            Log.d(TAG, e.getMessage());
            return false;
        }
    }
}
