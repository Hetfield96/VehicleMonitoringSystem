package com.siroytman.vehiclemonitoringsystemmobile.model;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.IChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.util.AttachmentPicker;
import com.siroytman.vehiclemonitoringsystemmobile.util.DateUtil;
import com.stfalcon.chatkit.commons.models.IUser;
import com.stfalcon.chatkit.commons.models.MessageContentType;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

public class ChatMessage implements Parcelable,
        IChatMessage<ChatMessage>,
        MessageContentType.Image {
    public static final String TAG = "ChatMessage";

    protected ChatMessage(Parcel in) {
        id = in.readString();
        text = in.readString();
        date = new Date(in.readLong());
        sender = in.readParcelable(Employee.class.getClassLoader());
        receiver = in.readParcelable(Employee.class.getClassLoader());
        type = in.readString();
        attachment_name = in.readString();
    }

    public static final Creator<ChatMessage> CREATOR = new Creator<ChatMessage>() {
        @Override
        public ChatMessage createFromParcel(Parcel in) {
            return new ChatMessage(in);
        }

        @Override
        public ChatMessage[] newArray(int size) {
            return new ChatMessage[size];
        }
    };

    public static ChatMessage parseChatMessage(JSONObject json) {
        ChatMessage chatMessage = new ChatMessage();

        try {
            chatMessage.id = json.getString("id");
            chatMessage.text = json.getString("text");
            chatMessage.date = DateUtil.getDateFromString(json.getString("date"));
            chatMessage.sender = Employee.parseEmployee(json.getJSONObject("sender"));
            chatMessage.receiver = Employee.parseEmployee(json.getJSONObject("receiver"));
            chatMessage.type = json.getString("type");
            chatMessage.attachment_name = json.getString("attachmentName");
        } catch (JSONException e) {
            Log.d(TAG, "Parse error: " + e.getMessage());
            return null;
        }

        return chatMessage;
    }

    public static ArrayList<ChatMessage> parseChatMessageArray(JSONArray jsonArray)
    {
        ArrayList<ChatMessage> result = new ArrayList<>(jsonArray.length());
        for(int i = 0; i < jsonArray.length(); ++i)
        {
            try {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                ChatMessage message = parseChatMessage(jsonObject);
                result.add(message);
            }
            catch (JSONException e)
            {
                Log.d(TAG, "Array parse error: " + e.getMessage());
            }
        }
        return result;
    }

    public JSONObject toJSONObject() {
        HashMap<String, Object> param = new HashMap<>();
        param.put("companyId", companyId);
        param.put("senderId", senderId);
        param.put("receiverId", receiverId);
        param.put("text", text);
        param.put("type", type);
        param.put("attachment_name", attachment_name);
        return new JSONObject(param);
    }

    private String id;
    private int companyId;
    private String text;
    private Date date;
    private Employee sender;
    private String senderId;
    private Employee receiver;
    private String receiverId;
    private boolean isRead;
    private String type;
    private String attachment_name;

    public ChatMessage() {
    }

    public ChatMessage(int companyId, String senderId, String receiverId, String text, String type, String attachmentName) {
        this.companyId = companyId;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.text = text;
        this.type = type;
        this.attachment_name = attachmentName;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public String getDialogPhoto() {
        return null;
    }

    @Override
    public String getDialogName() {
        return null;
    }

    @Override
    public List<? extends IUser> getUsers() {
        return null;
    }

    @Override
    public ChatMessage getLastMessage() {
        return null;
    }

    @Override
    public void setLastMessage(ChatMessage message) { }

    @Override
    public int getUnreadCount() {
        return 0;
    }

    @Override
    public String getText() {
        return text;
    }

    @Override
    public Date getCreatedAt() {
        return date;
    }

    @Override
    public Employee getUser() {
        return this.sender;
    }

    public Employee getSender() {
        return this.sender;
    }

    public Employee getReceiver() {
        return this.receiver;
    }

    @Override
    public String getImageUrl() {
        return type.equals("photo")
                ? AttachmentPicker.getAttachmentUrl(this.attachment_name)
                : null;
    }

    public boolean getIsRead() {
        return isRead;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(id);
        dest.writeString(text);
        dest.writeLong(date.getTime());
        dest.writeParcelable(sender, flags);
        dest.writeParcelable(receiver, flags);
        dest.writeString(type);
        dest.writeString(attachment_name);
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

