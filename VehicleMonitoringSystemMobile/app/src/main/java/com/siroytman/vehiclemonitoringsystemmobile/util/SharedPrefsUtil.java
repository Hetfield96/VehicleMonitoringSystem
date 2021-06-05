package com.siroytman.vehiclemonitoringsystemmobile.util;

import android.content.Context;
import android.content.SharedPreferences;

import com.siroytman.vehiclemonitoringsystemmobile.R;

public class SharedPrefsUtil {
    public static void writeBooleanToSharedPrefs(Context context, String key, boolean value) {
        SharedPreferences sharedPref = context.getSharedPreferences(context.getResources().getString(R.string.shared_prefs__vms), Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putBoolean(key, value);
        editor.apply();
    }

    public static boolean readBooleanFromSharedPrefs(Context context, String key) {
        SharedPreferences sharedPref = context.getSharedPreferences(context.getResources().getString(R.string.shared_prefs__vms), Context.MODE_PRIVATE);
        boolean value = sharedPref.getBoolean(key, false);
        return value;
    }

    public static void writeStringToSharedPrefs(Context context, String key, String value) {
        SharedPreferences sharedPref = context.getSharedPreferences(context.getResources().getString(R.string.shared_prefs__vms), Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(key, value);
        editor.apply();
    }

    public static String readStringFromSharedPrefs(Context context, String key) {
        SharedPreferences sharedPref = context.getSharedPreferences(context.getResources().getString(R.string.shared_prefs__vms), Context.MODE_PRIVATE);
        String value = sharedPref.getString(key, "");
        return value;
    }
}
