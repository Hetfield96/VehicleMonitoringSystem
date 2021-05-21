package com.siroytman.vehiclemonitoringsystemmobile.ui.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.IVolleyCallbackFormData;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.controller.TaskController;
import com.siroytman.vehiclemonitoringsystemmobile.interfaces.IAttachmentManager;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.model.Task;
import com.siroytman.vehiclemonitoringsystemmobile.model.TaskComment;
import com.siroytman.vehiclemonitoringsystemmobile.model.TaskStatus;
import com.siroytman.vehiclemonitoringsystemmobile.util.AttachmentPicker;
import com.squareup.picasso.Picasso;
import com.stfalcon.chatkit.commons.ImageLoader;
import com.stfalcon.chatkit.messages.MessageInput;
import com.stfalcon.chatkit.messages.MessagesList;
import com.stfalcon.chatkit.messages.MessagesListAdapter;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class TaskActivity extends AppCompatActivity
        implements MessageInput.InputListener,
        MessageInput.AttachmentsListener,
        IAttachmentManager {
    public static final String TAG = "TaskActivity";

    private Task task;

    @BindView(R.id.task_activity__name) TextView taskName;
    @BindView(R.id.task_activity__status) TextView taskStatus;
    @BindView(R.id.task_activity__description) TextView taskDescription;
    @BindView(R.id.task_activity__create_date) TextView taskCreateDate;
    @BindView(R.id.task_activity__operator)TextView taskOperator;
    @BindView(R.id.task_activity__due_date) TextView taskDueDate;
    @BindView(R.id.task_activity__prev_status) Button taskPrevStatus;
    @BindView(R.id.task_activity__next_status) Button taskNextStatus;

    @BindView(R.id.task_activity__comments_list) MessagesList commentsList;
    @BindView(R.id.task_activity__comment_input) MessageInput commentInput;

    private MessagesListAdapter<TaskComment> commentsListAdapter;
    private ImageLoader imageLoader;
    private AttachmentPicker attachmentPicker;

    private TaskController taskController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_task);
        ButterKnife.bind(this);

        this.taskController = TaskController.getInstance();

        // Get task from bundle
        Bundle arguments = getIntent().getExtras();
        if(arguments != null) {
            task = arguments.getParcelable(Task.class.getSimpleName());
        }
        else {
            Log.e(TAG, "Error: Arguments are null!");
        }

        this.attachmentPicker = new AttachmentPicker(this, this);

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-mm-yyyy hh:mm");

        taskName.setText(task.getName());
        taskStatus.setText(TaskStatus.getStatusIdToNameMap().get(task.getStatusId()));
        taskDescription.setText(task.getDescription());
        taskCreateDate.setText(dateFormat.format(task.getCreateDate()));
        taskDueDate.setText(dateFormat.format(task.getDueDate()));
        taskOperator.setText(task.getOperator().getName());

        if (task.getStatusId() == 1) {
            taskPrevStatus.setEnabled(false);
        }
        if (task.getStatusId() >= 3) {
            taskNextStatus.setEnabled(false);
        }

        initAdapter();

        commentInput.setInputListener(this);
        commentInput.setAttachmentsListener(this);
    }

    @OnClick(R.id.task_activity__prev_status)
    protected void handleTaskPrevStatusClick() {
        task.setPrevStatusId();
        taskStatus.setText(TaskStatus.getStatusIdToNameMap().get(task.getStatusId()));
        if (task.getStatusId() == 1) {
            taskPrevStatus.setEnabled(false);
        }
        if (task.getStatusId() <= 2) {
            taskNextStatus.setEnabled(true);
        }

        taskController.updateTaskStatus(task);
    }

    @OnClick(R.id.task_activity__next_status)
    protected void handleTaskNextStatusClick() {
        if (task.getStatusId() <= 2) {
            task.setNextStatusId();
            taskStatus.setText(TaskStatus.getStatusIdToNameMap().get(task.getStatusId()));
            if (task.getStatusId() >= 2) {
                taskPrevStatus.setEnabled(true);
            }
            if (task.getStatusId() == 3) {
                taskNextStatus.setEnabled(false);
            }
        }

        taskController.updateTaskStatus(task);
    }

    @Override
    public boolean onSubmit(CharSequence input) {
        Employee user = AppController.getInstance().getDbUser();
        String userId = user.getId();
        int companyId = user.getCompanyId();

        TaskComment comment = new TaskComment(companyId, userId, task.getId(), input.toString());
        taskController.createTaskComment(comment, this);
        return true;
    }

    public void updateTaskComments(ArrayList<TaskComment> comments) {
        commentsListAdapter.addToEnd(comments, true);
    }

    public void addNewTaskComment(TaskComment comment) {
        commentsListAdapter.addToStart(comment, true);
    }

    private void initAdapter() {
        imageLoader = (imageView, url, payload) -> Picasso.get().load(url).into(imageView);
        String senderId = AppController.getInstance().getDbUser().getId();
        commentsListAdapter = new MessagesListAdapter<>(senderId, imageLoader);
        this.commentsList.setAdapter(commentsListAdapter);

        taskController.getAllTaskComments(task.getId(), this);
    }

    @Override
    public void onAddAttachments() {
        this.attachmentPicker.showImagePicker();
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        this.attachmentPicker.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onFileAttached(byte[] fileContent) {
        Employee dbUser = AppController.getInstance().getDbUser();
        int companyId = dbUser.getCompanyId();
        String userId = dbUser.getId();
        String text = "[image]";
        ApiController.getInstance().getFormDataResponse(Request.Method.POST,
                ApiController.BACKEND_URL,
                "taskComment/withAttachment/" + companyId + "/" + userId + "/" + task.getId() + "/" + text,
                fileContent,
                new IVolleyCallbackFormData() {
                    @Override
                    public void onSuccessResponse(NetworkResponse response) {
                        try {
                            JSONObject json = new JSONObject(new String(response.data));
                            TaskComment comment = TaskComment.parseTaskComment(json);
                            addNewTaskComment(comment);
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
}