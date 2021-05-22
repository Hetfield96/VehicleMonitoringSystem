package com.siroytman.vehiclemonitoringsystemmobile.services;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.IVolleyCallbackJSONArray;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;
import com.siroytman.vehiclemonitoringsystemmobile.room.AppRoomDatabase;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import java.util.Timer;
import java.util.TimerTask;

public class VehicleDataSynchronizationService {
    public static final String TAG = "LocationDataSyncService";

    // Default value, that will be reset by companySettings if they exist
    public static int SYNCHRONIZATION_INTERVAL = 30000;
    private static boolean isSynchronizationTaskScheduled = false;

    private static List<VehicleData> vehicleDataList;
    private static JSONArray vehicleDataArray;

    public static void scheduleSynchronizationTask() {
        if (!isSynchronizationTaskScheduled) {
            isSynchronizationTaskScheduled = true;
            Log.d(TAG, "scheduleSynchronizationTask started");
            new Timer().schedule(new TimerTask() {
                @Override
                public void run() {
                    Log.d(TAG, "VehicleDataSynchronizationService Task execute");
                    if (isNetworkConnected()) {
                        AppRoomDatabase roomDb = AppController.getInstance().getRoomDatabase();
                        vehicleDataList = roomDb.vehicleDataDao().getAll();
                        vehicleDataArray = getJsonArray(vehicleDataList);

                        if (vehicleDataList.size() == 0 || vehicleDataArray == null) {
                            Log.d(TAG, "VehicleDataList.size = 0. Return");
                            return;
                        }

                        ApiController.getInstance()
                                .getJSONArrayResponse(Request.Method.POST, ApiController.GEODATA_PROCESSING_SERVICE_URL,
                                        "vehicleData", vehicleDataArray, new IVolleyCallbackJSONArray() {
                                    @Override
                                    public void onSuccessResponse(JSONArray result)
                                    {
                                        AsyncTask.execute(new Runnable() {
                                            @Override
                                            public void run() {
                                                AppRoomDatabase roomDb = AppController.getInstance().getRoomDatabase();
                                                roomDb.vehicleDataDao().deleteAll(vehicleDataList);
                                                Log.d(TAG, "List with size = " + vehicleDataList.size() + " synced with server");
                                            }
                                        });
                                    }
                                    @Override
                                    public void onErrorResponse(VolleyError error) {
                                        Log.d(TAG, "Volley error = " + error.toString());
                                    }
                                });

                    } else {
                        Log.d(TAG, "Network is NOT connected");
                    }
                }
            }, 0, SYNCHRONIZATION_INTERVAL);
        }
    }

    private static boolean isNetworkConnected() {
        Context context = AppController.getInstance().getAppContext();
        ConnectivityManager cm = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
        return activeNetwork != null && activeNetwork.isConnectedOrConnecting();
    }

    private static JSONArray getJsonArray(List<VehicleData> vehicleDataList) {
        JSONArray res = new JSONArray();
        for(int i = 0; i < vehicleDataList.size(); ++i) {
            JSONObject item = vehicleDataList.get(i).toJSON();
            res.put(item);
        }
        return res;
    }
}
