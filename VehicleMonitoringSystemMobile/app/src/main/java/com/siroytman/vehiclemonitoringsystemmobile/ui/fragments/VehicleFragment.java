package com.siroytman.vehiclemonitoringsystemmobile.ui.fragments;

import android.content.Context;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.api.controller.CompanySettingsApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.controller.VehicleDriverLinkApiController;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.model.Vehicle;
import com.siroytman.vehiclemonitoringsystemmobile.services.LocationForegroundService;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class VehicleFragment extends Fragment {
    private static final String TAG = "VehicleFragment";
    private Context context;

    private View rootView;
    private Button btnStartTrack;
    private TextView vehicleNameView;
    private TextView bluetoothStatusText;
    private ImageView bluetoothStatusIcon;
    private TextView startWorkTime;
    private TextView workingTime;

    private boolean isVehicleAttached = false;
    private boolean isLocating = false;
    private Vehicle vehicle;

    private CountDownTimer countDownTimer;

    private static VehicleFragment instance;

    public static VehicleFragment getInstance() {
        if (instance == null) {
            return new VehicleFragment();
        }
        else {
            return instance;
        }
    }
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_vehicle, container, false);
        context = getActivity();

        btnStartTrack = rootView.findViewById(R.id.vehicle__btn_start_track);
        btnStartTrack.setEnabled(this.isVehicleAttached);

        vehicleNameView = rootView.findViewById(R.id.vehicle__vehicle_name);

        bluetoothStatusText = rootView.findViewById(R.id.vehicle__bluetooth_status_text);
        bluetoothStatusIcon = rootView.findViewById(R.id.vehicle__bluetooth_status_icon);

        workingTime = rootView.findViewById(R.id.vehicle__working_time);
        startWorkTime = rootView.findViewById(R.id.vehicle__start_work_time);

        btnStartTrack.setOnClickListener(v -> {
            if (!isLocating) {
                btnStartTrack.setText(R.string.vehicle__track_button__stop);

                Calendar calendar = Calendar.getInstance();

                SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm");
                startWorkTime.setText(dateFormat.format(calendar.getTime()));

                countDownTimer = new CountDownTimer(Long.MAX_VALUE, 1000) {
                    public void onTick(long millisUntilFinished) {
                        long secCount = (Long.MAX_VALUE / 1000) - (millisUntilFinished / 1000);

                        long sec = secCount % 60;
                        long min = secCount / 60 % 60;
                        long hour = secCount / 60 / 60;

                        String secText = String.valueOf(sec);
                        secText = secText.length() == 1 ? "0" + secText : secText;

                        String minText = String.valueOf(min);
                        minText = minText.length() == 1 ? "0" + minText : minText;

                        String hourText = String.valueOf(hour);
                        hourText = hourText.length() == 1 ? "0" + hourText : hourText;

                        String workingTimeText = hourText + ":" + minText + ":" + secText;

                        workingTime.setText(workingTimeText);
                    }

                    @Override
                    public void onFinish() { }
                };
                countDownTimer.start();

                LocationForegroundService.startService(getActivity());
            } else
            {
                countDownTimer.cancel();
                startWorkTime.setText(R.string.vehicle__start_work_time_text);
                workingTime.setText(R.string.vehicle__working_time_text);

                if (!LocationForegroundService.checkPermissions(context)) {
                    LocationForegroundService.requestPermissions(getActivity());
                }
                btnStartTrack.setText(R.string.vehicle__track_button__start);
                LocationForegroundService.stopService(context);
            }
            isLocating = !isLocating;
        });

        if (!AppController.getInstance().useOBD) {
            bluetoothStatusText.setVisibility(View.GONE);
            bluetoothStatusIcon.setVisibility(View.GONE);
        }

        return rootView;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        instance = this;

        VehicleDriverLinkApiController.getInstance().getCurrentVehicle();

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

    public void updateObdConnected(boolean obdConnected) {
        if (obdConnected) {
            this.bluetoothStatusText.setText(R.string.vehicle__obd_connected);
            this.bluetoothStatusIcon.setImageResource(R.drawable.ic_bluetooth_24);
        } else {
            this.bluetoothStatusText.setText(R.string.vehicle__obd_not_connected);
            this.bluetoothStatusIcon.setImageResource(R.drawable.ic_black_bluetooth_24);
        }
    }
}