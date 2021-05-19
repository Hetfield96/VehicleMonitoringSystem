package com.siroytman.vehiclemonitoringsystemmobile.util;

import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;

public class AttachmentUtil {
    public static String getAttachmentUrl(String attachmentName) {
        return ApiController.BACKEND_URL + "/attachment/" + attachmentName;
    }
}
