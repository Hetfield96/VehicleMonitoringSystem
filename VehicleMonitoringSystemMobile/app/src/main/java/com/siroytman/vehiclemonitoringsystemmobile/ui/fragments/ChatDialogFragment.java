package com.siroytman.vehiclemonitoringsystemmobile.ui.fragments;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.PopupMenu;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.controller.ChatApiController;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.ChatMessagesActivity;
import com.squareup.picasso.Picasso;
import com.stfalcon.chatkit.commons.ImageLoader;
import com.stfalcon.chatkit.dialogs.DialogsList;
import com.stfalcon.chatkit.dialogs.DialogsListAdapter;

import java.util.ArrayList;
import java.util.function.Predicate;


public class ChatDialogFragment extends Fragment
        implements DialogsListAdapter.OnDialogClickListener<ChatDialog>, MenuItem.OnMenuItemClickListener {
    public static final String TAG = "ChatDialogFragment";

    protected ImageLoader imageLoader;
    protected DialogsListAdapter<ChatDialog> dialogsAdapter;
    private DialogsList dialogsListView;
    private ChatApiController chatApiController;

    private ArrayList<ChatDialog> newDialogOptions;

    private Button addNewContactButton;

    private static ChatDialogFragment instance;

    public static synchronized ChatDialogFragment getInstance() {
        if (instance == null) {
            instance = new ChatDialogFragment();
        }
        return instance;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        chatApiController = ChatApiController.getInstance();

        instance = this;
    }

    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_chat_dialog, container, false);

        this.imageLoader = (imageView, url, payload) -> Picasso.get().load(url).into(imageView);
        this.dialogsListView = rootView.findViewById(R.id.chat__dialogs_list);

        this.addNewContactButton = rootView.findViewById(R.id.chat__add_new_contact);
        this.addNewContactButton.setOnClickListener(v -> {
            PopupMenu dropDownMenu = new PopupMenu(getContext(), addNewContactButton);
            for (int i = 0; i < newDialogOptions.size(); i++) {
                dropDownMenu.getMenu().add(0, i, i, newDialogOptions.get(i).getDialogName());
            }
            dropDownMenu.getMenuInflater().inflate(R.menu.new_contact_menu, dropDownMenu.getMenu());
            dropDownMenu.setOnMenuItemClickListener(menuItem -> {
                ChatDialog dialog = newDialogOptions.get(menuItem.getOrder());
                onNewDialog(dialog);
                return true;
            });
            dropDownMenu.show();
        });

        initAdapter();

        return rootView;
    }

    @Override
    public void onDialogClick(ChatDialog dialog) {
        ChatMessagesActivity.open(getActivity(), dialog);
        Log.d(TAG, "onDialogClick, dialogName: " + dialog.getDialogName());
    }

    private void initAdapter() {
        this.dialogsAdapter = new DialogsListAdapter<>(this.imageLoader);
        this.dialogsAdapter.setOnDialogClickListener(this);
        this.dialogsListView.setAdapter(this.dialogsAdapter);

        chatApiController.getDialogs();
    }

    public void newDialogsOptionsUpdateView(ArrayList<ChatDialog> dialogsOptions) {
        this.newDialogOptions = dialogsOptions;
    }

    public void dialogsFetchedUpdateView(ArrayList<ChatDialog> chatDialogs) {
        this.dialogsAdapter.setItems(chatDialogs);
        chatApiController.getNewDialogsOptions(chatDialogs);
    }

    public void onNewMessage(String dialogId, ChatMessage message) {
        boolean isUpdated = dialogsAdapter.updateDialogWithMessage(dialogId, message);
        if (!isUpdated) {
            //Dialog with this ID doesn't exist, so you can create new Dialog or update all dialogs list
        }
    }

    private void onNewDialog(ChatDialog dialog) {
        dialogsAdapter.addItem(dialog);
        for (int i = 0; i < newDialogOptions.size(); i++) {
            if (newDialogOptions.get(i).getDialogName().equals(dialog.getDialogName())) {
                newDialogOptions.remove(i);
                return;
            }
        }
    }

    @Override
    public boolean onMenuItemClick(MenuItem item) {
        return false;
    }
}