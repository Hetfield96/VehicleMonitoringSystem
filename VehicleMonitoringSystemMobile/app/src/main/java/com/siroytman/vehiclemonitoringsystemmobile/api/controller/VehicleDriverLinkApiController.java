package com.siroytman.vehiclemonitoringsystemmobile.api.controller;

import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.IVolleyCallbackJSONObject;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.model.Vehicle;
import com.siroytman.vehiclemonitoringsystemmobile.ui.fragments.LocationFragment;

import org.json.JSONObject;

public class VehicleDriverLinkApiController {
    private static final String TAG = "VehicleDriverLinkApi";
    private final ApiController apiController;

    private static VehicleDriverLinkApiController instance;

    private VehicleDriverLinkApiController() {
        apiController = ApiController.getInstance();
    }

    public static synchronized VehicleDriverLinkApiController getInstance() {
        if (instance == null) {
            instance = new VehicleDriverLinkApiController();
        }
        return instance;
    }

    public void getCurrentVehicle(LocationFragment locationFragment) {
        String driverId = AppController.getInstance().getCurrentDbUser().getId();

        ApiController.getInstance()
                .getJSONObjectResponse(Request.Method.GET, ApiController.BACKEND_URL,
                        "vehicleDriverLink/getCurrentVehicle/" + driverId,
                        null,
                        new IVolleyCallbackJSONObject() {
                            @Override
                            public void onSuccessResponse(JSONObject result) {
                                Vehicle vehicle = Vehicle.parseVehicle(result);
                                locationFragment.updateDriverVehicle(vehicle);
                            }

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.e(TAG, "Vehicle is not fetched: " + error.getMessage());
                            }
                        });
    }
}
