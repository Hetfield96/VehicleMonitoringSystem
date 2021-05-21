package com.siroytman.vehiclemonitoringsystemmobile.util;
import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;

import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.IAttachmentManager;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static android.app.Activity.RESULT_OK;

public class AttachmentPicker {
    public static final String TAG = "AttachmentPicker";

    public static String getAttachmentUrl(String attachmentName) {
        return ApiController.BACKEND_URL + "/attachment/" + attachmentName;
    }

    // Permissions for accessing the storage
    private final int REQUEST_EXTERNAL_STORAGE = 1;
    private String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };

    private final int PICK_IMAGE_REQUEST = 1;
    private Bitmap bitmap;
    private String filePath;

    private Activity activity;
    private IAttachmentManager attachmentManager;

    public AttachmentPicker(Activity activity, IAttachmentManager attachmentManager) {
        this.activity = activity;
        this.attachmentManager = attachmentManager;
    }

    public void showImagePicker() {
        boolean permissionsGranted = verifyStoragePermissions();
        if (!permissionsGranted) {
            return;
        }

        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        activity.startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST);
    }

    // this function is triggered when user
    // selects the image from the imageChooser
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            Uri picUri = data.getData();
            filePath = getPath(picUri);
            if (filePath != null) {
                try {
                    Log.d(TAG, "filePath = " + filePath);
                    bitmap = MediaStore.Images.Media.getBitmap(activity.getContentResolver(), picUri);
                    byte[] fileContent = getFileDataFromDrawable(bitmap);

                    this.attachmentManager.fileAttached(fileContent);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                Toast.makeText(activity, "No image selected", Toast.LENGTH_LONG).show();
            }
        }
    }

    private String getPath(Uri uri) {
        String path = null;
        String[] imageProjection = {MediaStore.Images.Media.DATA};
        Cursor cursor = activity.getContentResolver().query(uri, imageProjection, null, null, null);
        if(cursor != null) {
            cursor.moveToFirst();
            int indexImage = cursor.getColumnIndex(imageProjection[0]);
            path = cursor.getString(indexImage);
        }

        return path;
    }

    private byte[] getFileDataFromDrawable(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 80, byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }

    private boolean verifyStoragePermissions() {
        // Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE);

        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                    activity,
                    PERMISSIONS_STORAGE,
                    REQUEST_EXTERNAL_STORAGE
            );
            return false;
        }
        return true;
    }
}
