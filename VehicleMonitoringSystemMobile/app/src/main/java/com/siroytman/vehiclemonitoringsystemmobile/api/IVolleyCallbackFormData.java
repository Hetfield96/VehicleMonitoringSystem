package com.siroytman.vehiclemonitoringsystemmobile.api;

import com.android.volley.NetworkResponse;
import com.android.volley.VolleyError;

import org.json.JSONObject;

public interface IVolleyCallbackFormData {
    void onSuccessResponse(NetworkResponse response);
    void onErrorResponse(VolleyError error);
}
