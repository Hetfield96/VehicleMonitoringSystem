import * as React from "react";
import {useEffect, useState} from "react";
import {StylesDictionary} from "../../utils/stylesDictionary";
import Task from "../../../models/task";
import * as TaskCommentApi from "../../../api/taskCommentsApi";
import TaskComment from "../../../models/taskComment";
import Colors from "../../../constants/colors";
import {Button, Input, MessageList,} from 'react-chat-elements'
import {getDbUser} from "../../../utils/userUtil";
import {MessageTypeConstants} from "../../../models/chatMessage";

interface InterfaceProps {
    closeModal: () => void;
    task: Task;
}

export const PropertiesCommentsTaskFormName = 'Comments';

export const PropertiesCommentsTaskForm: React.FunctionComponent<InterfaceProps> = (props) => {
    const {task} = props;
    const [comments, setComments] = useState<TaskComment[]|null>();
    const [inputMessage, setInputMessage] = useState<string>('');

    const [attachmentFile, setAttachmentFile] = useState();
    const [attachmentFileName, setAttachmentFileName] = useState();

    let messageInputRef: HTMLInputElement | null;

    useEffect(() => {
        (async function() {
            await updateComments();
        })();
    }, []);

    const updateComments = async () => {
        await setComments(await TaskCommentApi.getAllTaskComments(task.id));
    }

    const onSendMessageClick = async () => {
        const dbUser = await getDbUser();
        if (!!dbUser) {
            if (!attachmentFile) {
                const comment = new TaskComment(undefined, inputMessage, undefined,
                    dbUser, MessageTypeConstants.TEXT, null, task.id);
                await TaskCommentApi.createComment(comment);
            } else {
                // const formData = new FormData();
                // formData.append("formFile", attachmentFile);
                // formData.append("fileName", attachmentFileName);
                //
                // await ChatApi.createMessageWithAttachment(dbUser.companyId, dbUser.id, receiver.employee.id, inputMessage, formData);
            }
            if (messageInputRef) {
                messageInputRef.value = '';
            }
            setInputMessage('');
            await updateComments();
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.messageList}>
                <MessageList
                    className='message-list'
                    dataSource={comments}
                />
            </div>
            <div style={styles.input}>
                <Input
                    inputRef={node => (messageInputRef = node)}
                    placeholder="Type here..."
                    onChange={event => setInputMessage(event.target.value)}
                    multiline={true}

                    rightButtons={
                        <div>
                            <Button
                                // TODO may be removed
                                color='white'
                                backgroundColor={Colors.primary}
                                text='Update'
                                onClick={updateComments}
                            />
                            <Button
                                color='white'
                                backgroundColor={Colors.primary}
                                text='Send'
                                onClick={onSendMessageClick}
                            />
                        </div>
                    }
                />
            </div>
        </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        height: 510,
        margin: 20,
    },
    messageList: {
        height: 420,
        backgroundColor: Colors.background,
        overflowY: 'scroll',
    },
    input: {
    },
};
