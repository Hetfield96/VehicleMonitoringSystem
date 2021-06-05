package com.siroytman.vehiclemonitoringsystemmobile.ui.fragments;

import android.content.Context;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.TextView;

import com.firebase.ui.auth.AuthUI;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.switchmaterial.SwitchMaterial;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.AuthActivity;
import com.siroytman.vehiclemonitoringsystemmobile.util.SharedPrefsUtil;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.StringRes;
import androidx.fragment.app.Fragment;

import org.jetbrains.annotations.NotNull;

public class SettingsFragment extends Fragment {
    private static final String TAG = "SettingsFragment";
    private Context context;
    private View rootView;
    private TextView userEmailText;
    private TextView userDisplayNameText;
    private Button signOutButton;
    private SwitchMaterial obdSwitch;
    private TextInputLayout obdBluetoothName;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_settings, container, false);
        context = getActivity();

        userEmailText = rootView.findViewById(R.id.settings__user_email);
        userDisplayNameText = rootView.findViewById(R.id.settings__user_name);

        obdSwitch = rootView.findViewById(R.id.settings__obd_switch);
        obdSwitch.setChecked(AppController.getInstance().useOBD);
        obdSwitch.setOnCheckedChangeListener((buttonView, isChecked) -> {
            AppController.getInstance().useOBD = isChecked;
            SharedPrefsUtil.writeBooleanToSharedPrefs(getContext(), getString(R.string.shared_prefs__use_obd), isChecked);
        });

        obdBluetoothName = rootView.findViewById(R.id.settings__obd_bluetooth_name);
        obdBluetoothName.getEditText().setText(AppController.getInstance().deviceNameOBD);
        obdBluetoothName.getEditText().addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) { }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) { }

            @Override
            public void afterTextChanged(Editable s) {
                AppController.getInstance().deviceNameOBD = s.toString();
                SharedPrefsUtil.writeStringToSharedPrefs(getContext(), getString(R.string.shared_prefs__obd_name), s.toString());
            }
        });

        signOutButton = rootView.findViewById(R.id.settings__sign_out);
        signOutButton.setOnClickListener(v -> signOut());


        populateProfile();

        return rootView;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    private void signOut() {
        AuthUI.getInstance()
                .signOut(context)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        startActivity(AuthActivity.createIntent(context));
                    } else {
                        Log.w(TAG, "signOut:failure", task.getException());
                        showSnackbar(R.string.sign_out_failed);
                    }
                });
    }

    private void populateProfile() {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        String userEmail = TextUtils.isEmpty(user.getEmail()) ? "No email" : user.getEmail();

        Employee dbUser = AppController.getInstance().getCurrentDbUser();
        String displayName = TextUtils.isEmpty(dbUser.getName()) ? "No name" : dbUser.getName();

        userEmailText.setText(userEmail);
        userDisplayNameText.setText(displayName);
    }

    private void showSnackbar(@StringRes int errorMessageRes) {
        Snackbar.make(rootView, errorMessageRes, Snackbar.LENGTH_LONG).show();
    }
}