package com.siroytman.vehiclemonitoringsystemmobile.api;

import android.content.Context;
import android.text.TextUtils;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HurlStack;
import com.android.volley.toolbox.Volley;
import com.siroytman.vehiclemonitoringsystemmobile.BuildConfig;

/**
 * Volley queue for executing requests to server
 */
class VolleyQueue {
    /**
     * Log or request TAG
     */
    static final String TAG = "VolleyPatterns";

    /**
     * Global request queue for Volley
     */
    private RequestQueue mRequestQueue;

    Context context;

    VolleyQueue(Context context){
        this.context = context;
    }

    /**
     * @return The Volley Request queue, the queue will be created if it is null
     */
    RequestQueue getRequestQueue() {
        // lazy initialize the request queue, the queue instance will be
        // created when it is accessed for the first time
        if (mRequestQueue == null) {
            if (BuildConfig.DEBUG) {
                // TODO HTPS
                // Https connection with localhost
//                mRequestQueue = Volley.newRequestQueue(context,
//                        new HurlStack(null, SSLSocketFactoryProvider.getSocketFactory(context)));

                // Http connection
                mRequestQueue = Volley.newRequestQueue(context);
            } else {
                // Http connection
                mRequestQueue = Volley.newRequestQueue(context);
            }
        }

        return mRequestQueue;
    }

    /**
     * Adds the specified request to the global queue, if tag is specified
     * then it is used else Default TAG is used.
     *
     * @param req
     * @param tag
     */
    public <T> void addToRequestQueue(Request<T> req, String tag) {
        // set the default tag if tag is empty
        req.setTag(TextUtils.isEmpty(tag) ? TAG : tag);

        VolleyLog.d("Adding request to queue: %s", req.getUrl());

        getRequestQueue().add(req);
    }

    /**
     * Adds the specified request to the global queue using the Default TAG.
     *
     * @param req
     */
    public <T> void addToRequestQueue(Request<T> req) {
        // set the default tag if tag is empty
        req.setTag(TAG);

        getRequestQueue().add(req);
    }

    /**
     * Cancels all pending requests by the specified TAG, it is important
     * to specify a TAG so that the pending/ongoing requests can be cancelled.
     *
     * @param tag
     */
    void cancelPendingRequests(Object tag) {
        if (mRequestQueue != null) {
            mRequestQueue.cancelAll(tag);
        }
    }

}
