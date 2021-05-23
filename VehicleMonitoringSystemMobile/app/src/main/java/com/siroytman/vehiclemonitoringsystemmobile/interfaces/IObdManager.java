package com.siroytman.vehiclemonitoringsystemmobile.interfaces;

import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;

public interface IObdManager {
    void onObdUpdate(VehicleData vehicleData);
}
