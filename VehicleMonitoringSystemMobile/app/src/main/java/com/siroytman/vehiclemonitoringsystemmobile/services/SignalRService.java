package com.siroytman.vehiclemonitoringsystemmobile.services;

import android.util.Log;

import com.microsoft.signalr.HubConnection;
import com.microsoft.signalr.HubConnectionBuilder;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;

import java.net.URI;

import io.reactivex.Single;

public class SignalRService {
    public static final String TAG = "SignalRService";

    public static SignalRService instance;

    public HubConnection hubConnection;

    public static synchronized SignalRService getInstance() {
        if (instance == null) {
            return new SignalRService();
        }
        else {
            return instance;
        }
    }

    public SignalRService() {
        hubConnection = HubConnectionBuilder.create(ApiController.BACKEND_URL + "/chatHub")
                .build();

        hubConnection.start().blockingAwait();
    }

    public void configureSignalREndpoints(String userId) {
        hubConnection.on("connectionEstablished", (message) -> {
            Log.d(TAG, "connectionEstablished: " + message);
        }, String.class);

        hubConnection.on("receiveChatMessage", (message) -> {
            Log.d(TAG, "receiveChatMessage: " + message.getText());
        }, ChatMessage.class);

        establishSignalRConnection(userId);
    }

    private void establishSignalRConnection(String userId) {
        hubConnection.send("establishConnection", userId);
    }
}
