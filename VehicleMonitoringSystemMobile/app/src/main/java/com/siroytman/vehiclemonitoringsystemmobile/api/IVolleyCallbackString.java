package com.siroytman.vehiclemonitoringsystemmobile.api;

import com.android.volley.VolleyError;

public interface IVolleyCallbackString
{
    void onSuccessResponse(String result);
    void onErrorResponse(VolleyError error);
}
