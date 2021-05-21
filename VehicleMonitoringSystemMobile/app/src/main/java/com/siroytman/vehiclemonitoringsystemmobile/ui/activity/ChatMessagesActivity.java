package com.siroytman.vehiclemonitoringsystemmobile.ui.activity;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.Menu;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.Volley;
import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.DataPart;
import com.siroytman.vehiclemonitoringsystemmobile.api.IVolleyCallbackFormData;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyMultipartRequest;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.controller.ChatController;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.IAttachmentManager;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.util.AttachmentPicker;
import com.squareup.picasso.Picasso;
import com.stfalcon.chatkit.commons.ImageLoader;
import com.stfalcon.chatkit.messages.MessageInput;
import com.stfalcon.chatkit.messages.MessagesList;
import com.stfalcon.chatkit.messages.MessagesListAdapter;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ChatMessagesActivity extends AppCompatActivity
        implements MessageInput.InputListener,
        MessageInput.AttachmentsListener,
        MessagesListAdapter.SelectionListener,
        IAttachmentManager {

    public static final String TAG = "ChatMessagesActivity";

    protected ImageLoader imageLoader;
    protected MessagesListAdapter<ChatMessage> messagesAdapter;
    private MessagesList messagesList;

    private Menu menu;
    private int selectionCount;

    private ChatDialog dialog;

    private ChatController chatController;

    private AttachmentPicker attachmentPicker;

    private static ChatMessagesActivity instance;

    public static synchronized ChatMessagesActivity getInstance() {
        if (instance == null) {
            instance = new ChatMessagesActivity();
        }
        return instance;
    }

    public static void open(Context context, ChatDialog dialog) {
        Intent intent = new Intent(context, ChatMessagesActivity.class);
        intent.putExtra("dialog", dialog);
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_messages);

        instance = this;

        chatController = ChatController.getInstance();

        // Get dialog from bundle
        Bundle arguments = getIntent().getExtras();
        if(arguments != null) {
            dialog = arguments.getParcelable("dialog");
        }
        else {
            Log.e(TAG, "Error: Arguments are null!");
        }

        this.attachmentPicker = new AttachmentPicker(this, this);

        this.messagesList = findViewById(R.id.chat_messages__messagesList);
        initAdapter();

        MessageInput input = findViewById(R.id.chat_messages__input);
        input.setInputListener(this);
        input.setAttachmentsListener(this);
    }

    @Override
    public boolean onSubmit(CharSequence input) {
        Employee user = AppController.getInstance().getDbUser();
        String userId = user.getId();
        int companyId = user.getCompanyId();

        ChatMessage message = new ChatMessage(companyId, userId, dialog.getId(), input.toString(), "text", null);
        chatController.sendMessage(message);
        return true;
    }

    public void onNewMessageUpdateView(ChatMessage message) {
        messagesAdapter.addToStart(message, true);
    }

    @Override
    public void fileAttached(byte[] fileContent) {
        Employee dbUser = AppController.getInstance().getDbUser();
        int companyId = dbUser.getCompanyId();
        String userId = dbUser.getId();
        String receiverId = dialog.getId();
        String text = "[image]";
        ApiController.getInstance().getFormDataResponse(Request.Method.POST,
                ApiController.BACKEND_URL,
                "chat/withAttachment/" + companyId + "/" + userId + "/" + receiverId + "/" + text,
                fileContent,
                new IVolleyCallbackFormData() {
                    @Override
                    public void onSuccessResponse(NetworkResponse response) {
                        try {
                            JSONObject obj = new JSONObject(new String(response.data));
                            ChatMessage message = ChatMessage.parseChatMessage(obj);
                            onNewMessageUpdateView(message);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.e(TAG,"Error while sending attachment: " + error.getMessage());
                    }
                });
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        this.attachmentPicker.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onAddAttachments() {
        this.attachmentPicker.showImagePicker();
    }

    private void initAdapter() {
        imageLoader = (imageView, url, payload) -> Picasso.get().load(url).into(imageView);
        String senderId = AppController.getInstance().getDbUser().getId();
        messagesAdapter = new MessagesListAdapter<>(senderId, imageLoader);
        messagesAdapter.enableSelectionMode(this);
        this.messagesList.setAdapter(messagesAdapter);

        messagesAdapter.addToEnd(dialog.getMessages(), true);
    }

    @Override
    public void onBackPressed() {
        if (selectionCount == 0) {
            super.onBackPressed();
        } else {
            messagesAdapter.unselectAllItems();
        }
    }

    @Override
    public void onSelectionChanged(int count) {
        this.selectionCount = count;
//        menu.findItem(R.id.action_delete).setVisible(count > 0);
//        menu.findItem(R.id.action_copy).setVisible(count > 0);
    }
}
