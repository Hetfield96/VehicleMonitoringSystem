package com.siroytman.vehiclemonitoringsystemmobile.api.controller;

import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.IVolleyCallbackJSONArray;
import com.siroytman.vehiclemonitoringsystemmobile.api.IVolleyCallbackJSONObject;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.ChatMessagesActivity;
import com.siroytman.vehiclemonitoringsystemmobile.ui.fragments.ChatDialogFragment;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;


public class ChatApiController {
    private static final String TAG = "ChatApiController";
    private final ApiController apiController;

    private static ChatApiController instance;

    private ChatApiController() {
        apiController = ApiController.getInstance();
    }

    public static synchronized ChatApiController getInstance() {
        if (instance == null) {
            instance = new ChatApiController();
        }
        return instance;
    }

    public void getDialogs() {
        Employee user = AppController.getInstance().getCurrentDbUser();
        String senderId = user.getId();
        int companyId = user.getCompanyId();

        apiController.getJSONArrayResponse(Request.Method.GET,
                        ApiController.BACKEND_URL,
                        "chat/getAllEmployeeMessages/" + companyId + "/" + senderId,
                        null,
                        new IVolleyCallbackJSONArray() {
                            @Override
                            public void onSuccessResponse(JSONArray result) {
                                ArrayList<ChatMessage> chatMessages = ChatMessage.parseChatMessageArray(result);
                                ArrayList<ChatDialog> chatDialogs = ChatDialog.getDialogsList(chatMessages);
                                ChatDialogFragment.getInstance().dialogsFetchedUpdateView(chatDialogs);
                            }

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.d(TAG, "Volley error = " + error.toString());
                            }
                        });
    }

    public void sendMessage(ChatMessage message) {
        apiController.getJSONObjectResponse(Request.Method.POST,
                ApiController.BACKEND_URL,
                "chat",
                message.toJSONObject(),
                new IVolleyCallbackJSONObject() {
                    @Override
                    public void onSuccessResponse(JSONObject result) {
                        ChatMessage message = ChatMessage.parseChatMessage(result);
                        ChatMessagesActivity.getInstance().onNewMessageUpdateView(message);
                    }

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d(TAG, "Volley error = " + error.toString());
                    }
                });
    }
}
