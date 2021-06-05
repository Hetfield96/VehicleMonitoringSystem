package com.siroytman.vehiclemonitoringsystemmobile.ui.fragments;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.api.controller.CompanySettingsApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.controller.VehicleDriverLinkApiController;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.model.Vehicle;
import com.siroytman.vehiclemonitoringsystemmobile.services.LocationForegroundService;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class VehicleFragment extends Fragment {
    private static final String TAG = "VehicleFragment";
    private Context context;

    private View rootView;
    private Button btnStartTrack;
    private TextView vehicleNameView;

    private boolean isVehicleAttached = false;
    private boolean isLocating = false;
    private Vehicle vehicle;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_vehicle, container, false);
        context = getActivity();

        btnStartTrack = rootView.findViewById(R.id.vehicle__btn_start_track);
        btnStartTrack.setEnabled(this.isVehicleAttached);

        btnStartTrack.setOnClickListener(v -> {
            if (!isLocating) {
                btnStartTrack.setText(R.string.vehicle__track_button__stop);
                LocationForegroundService.startService(getActivity());
            } else
            {
                if (!LocationForegroundService.checkPermissions(context)) {
                    LocationForegroundService.requestPermissions(getActivity());
                }
                btnStartTrack.setText(R.string.vehicle__track_button__start);
                LocationForegroundService.stopService(context);
            }
            isLocating = !isLocating;
        });

        vehicleNameView = rootView.findViewById(R.id.vehicle__vehicle_name);

        return rootView;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        VehicleDriverLinkApiController.getInstance().getCurrentVehicle(this);

        // Configure companySettings params
        CompanySettingsApiController.getInstance().configureCompanySettings();
    }

    public void updateDriverVehicle(Vehicle vehicle) {
        AppController.getInstance().setCurrentVehicle(vehicle);

        this.vehicle = vehicle;
        this.isVehicleAttached = true;
        btnStartTrack.setEnabled(true);

        this.vehicleNameView.setText(vehicle.getFormattedName());
    }
}