package com.siroytman.vehiclemonitoringsystemmobile.api;

import com.android.volley.VolleyError;

import org.json.JSONArray;

public interface IVolleyCallbackJSONArray {
    void onSuccessResponse(JSONArray result);
    void onErrorResponse(VolleyError error);
}
