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
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyMultipartRequest;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.controller.ChatController;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
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
        MessagesListAdapter.SelectionListener {

    public static final String TAG = "ChatMessagesActivity";

    // Permissions for accessing the storage
    private static final int REQUEST_EXTERNAL_STORAGE = 1;
    private static String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };

    private static final int PICK_IMAGE_REQUEST = 1;
    private Bitmap bitmap;
    private String filePath;

    protected ImageLoader imageLoader;
    protected MessagesListAdapter<ChatMessage> messagesAdapter;
    private MessagesList messagesList;

    private Menu menu;
    private int selectionCount;

    private ChatDialog dialog;

    private ChatController chatController;

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

    // TODO put into some util service
    void showImagePicker() {
        verifyStoragePermissions(ChatMessagesActivity.this);

        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST);
    }

    // this function is triggered when user
    // selects the image from the imageChooser
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            Uri picUri = data.getData();
            filePath = getPath(picUri);
            if (filePath != null) {
                try {

                    Log.d(TAG, "filePath = " + String.valueOf(filePath));
                    bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), picUri);
                    uploadBitmap(bitmap);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                Toast.makeText(
                        this, "no image selected",
                        Toast.LENGTH_LONG).show();
            }
        }
    }

    public String getPath(Uri uri) {
        String path = null;
        String[] imageProjection = {MediaStore.Images.Media.DATA};
        Cursor cursor = getContentResolver().query(uri, imageProjection, null, null, null);
        if(cursor != null) {
            cursor.moveToFirst();
            int indexImage = cursor.getColumnIndex(imageProjection[0]);
            path = cursor.getString(indexImage);
        }

        return path;
    }


    public byte[] getFileDataFromDrawable(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 80, byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }

    private void uploadBitmap(final Bitmap bitmap) {
        Employee dbUser = AppController.getInstance().getDbUser();
        int companyId = dbUser.getCompanyId();
        String userId = dbUser.getId();
        String receiverId = dialog.getId();
        // TODO text
        String text = "[image]";
        // TODO Put into API controller
        VolleyMultipartRequest volleyMultipartRequest = new VolleyMultipartRequest(Request.Method.POST,
                ApiController.BACKEND_URL + "/chat/withAttachment/" + companyId + "/" + userId + "/" + receiverId + "/" + text,
                new Response.Listener<NetworkResponse>() {
                    @Override
                    public void onResponse(NetworkResponse response) {
                        try {
                            JSONObject obj = new JSONObject(new String(response.data));
                            ChatMessage message = ChatMessage.parseChatMessage(obj);
                            onNewMessageUpdateView(message);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_LONG).show();
                        Log.e(TAG,""+error.getMessage());
                    }
                }) {

            @Override
            protected Map<String, DataPart> getByteData() {
                Map<String, DataPart> params = new HashMap<>();
                long imagename = System.currentTimeMillis();
                params.put("formFile", new DataPart(imagename + ".png", getFileDataFromDrawable(bitmap), "image/png"));
                return params;
            }
        };

        //adding the request to volley
        ApiController.getInstance().volleyQueue.addToRequestQueue(volleyMultipartRequest);
    }

    public static void verifyStoragePermissions(Activity activity) {
        // Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE);

        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                    activity,
                    PERMISSIONS_STORAGE,
                    REQUEST_EXTERNAL_STORAGE
            );
        }
    }

    @Override
    public void onAddAttachments() {
        showImagePicker();
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
