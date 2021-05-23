package com.siroytman.vehiclemonitoringsystemmobile.api.controller;

import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.IVolleyCallbackJSONObject;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.model.CompanySettings;
import com.siroytman.vehiclemonitoringsystemmobile.services.LocationService;
import com.siroytman.vehiclemonitoringsystemmobile.services.OBDService;
import com.siroytman.vehiclemonitoringsystemmobile.services.VehicleDataSynchronizationService;

import org.json.JSONObject;


public class CompanySettingsApiController {
    private static final String TAG = "CompanySettingsApi";
    private final ApiController apiController;

    private static CompanySettingsApiController instance;

    private CompanySettingsApiController() {
        apiController = ApiController.getInstance();
    }

    public static synchronized CompanySettingsApiController getInstance() {
        if (instance == null) {
            instance = new CompanySettingsApiController();
        }
        return instance;
    }

    // Get and set company settings
    public void configureCompanySettings() {
        int companyId = AppController.getInstance().getDbUser().getCompanyId();

        apiController.getJSONObjectResponse(
                Request.Method.GET,
                ApiController.BACKEND_URL,
                "companySettings/" + companyId,
                null,
                new IVolleyCallbackJSONObject() {
                    @Override
                    public void onSuccessResponse(JSONObject result) {
                        CompanySettings companySettings = CompanySettings.parseCompanySettings(result);
                        VehicleDataSynchronizationService.SYNCHRONIZATION_INTERVAL = companySettings.getAndroidIntervalSynchronization();
                        LocationService.RECORDING_INTERVAL_MS = companySettings.getAndroidIntervalRecording();
                        OBDService.RECORDING_INTERVAL_MS = companySettings.getAndroidIntervalRecording();
                        Log.d(TAG, "CompanySettings are applied");
                    }

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d(TAG, "Volley error = " + error.toString());
                    }
                });
    }
}
