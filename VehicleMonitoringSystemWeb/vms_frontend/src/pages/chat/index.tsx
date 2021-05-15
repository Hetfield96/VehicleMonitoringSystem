import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";
import 'react-chat-elements/dist/main.css';
import { MessageList, ChatList, Input, Button,  } from 'react-chat-elements'
import {StylesDictionary} from "../../components/utils/stylesDictionary";
import {useEffect, useState} from "react";
import * as ChatApi from "../../api/chatApi";
import ChatContact from "../../models/chatContact";
import {getContactsList} from "../../utils/chatUtil";
import ChatMessage from "../../models/chatMessage";
import {getDbUser} from "../../utils/userUtil";
import {IconButton} from "@material-ui/core";
import {PersonAdd} from "@material-ui/icons";
import Popup from "reactjs-popup";
import {AddEmployeeContactForm} from "../../components/employee/addEmployeeContact";
import Employee from "../../models/employee";
import Colors from "../../constants/colors";

export const ChatComponent = () => {
    const [chatContacts, setChatContacts] = useState<ChatContact[]>();
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>();
    const [receiver, setReceiver] = useState<ChatContact|null>();
    const [inputMessage, setInputMessage] = useState<string>('');

    // // Receive chat message endpoint
    //  SignalRService.addEndpoint("receiveChatMessage", message => {
    //     console.log(`Message from server received: ${JSON.stringify(message)}`);
    // });

    useEffect(() => {
        (async function() {
            await updateChat();
        })();
    }, []);

    const updateChat = async () => {
        const messages = await ChatApi.getAllEmployeeMessages();
        const contactList: ChatContact[] = await getContactsList(messages);
        setChatContacts(contactList);

        if (!!receiver) {
            const chatContact = contactList.find(c => c.employee.id === receiver.employee.id);
            if (!!chatContact) {
                setReceiver(chatContact);
                setChatMessages(chatContact.chatMessages);
            }
        } else {
            if (contactList.length > 0) {
                const chatContact = contactList[0];
                setReceiver(chatContact);
                setChatMessages(chatContact.chatMessages);
            }
        }
    }

    const contactListClick = (chatContact: any) => {
        setReceiver(chatContact);
        setChatMessages(chatContact.chatMessages);
    }

    const sendMessage = async () => {
        const dbUser = await getDbUser();
        if (!!dbUser && !!receiver) {
            const msg = new ChatMessage(undefined, dbUser.companyId, inputMessage,
                undefined, true, dbUser, receiver.employee);
            await ChatApi.createMessage(msg);
            setInputMessage('');
            await updateChat();
        }
    }

    const selectContact = async (e: Employee) => {
        const chatContact = chatContacts && chatContacts.find(c => c.employee.id === e.id);
        if (chatContact) {
            // Contact from selected
            setReceiver(chatContact);
            setChatMessages(chatContact.chatMessages);
        } else {
            // New contact
            const newChatContact = new ChatContact(e, []);
            if (chatContacts !== undefined) {
                chatContacts.push(newChatContact);
            }
            setReceiver(newChatContact);
            setChatMessages([]);
        }
    }

    return (
      <div style={styles.container}>
        <div style={styles.contactList}>

            <Popup
                trigger={
                    <IconButton>
                        <PersonAdd/>
                    </IconButton>
                }
                modal={true}
                nested={true}
            >
                {(close: any) => {

                    return (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div>
                                <AddEmployeeContactForm closeModal={close} selectContact={selectContact}/>
                            </div>
                        </div>
                    )
                }}
            </Popup>

            <ChatList
                className='chat-list'
                dataSource={chatContacts}
                onClick={e => contactListClick(e)}
            />
        </div>
        <div style={styles.conversationContainer}>
          <div style={styles.messageList}>
            <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={chatMessages}
            />
          </div>
          <div style={styles.input}>
            <Input
                placeholder="Type here..."
                onChange={event => setInputMessage(event.target.value)}
                multiline={true}
                rightButtons={
                    <div>
                        <Button
                            // TODO change color
                            color='white'
                            backgroundColor='black'
                            text='Update'
                            onClick={updateChat}
                        />
                        <Button
                            color='white'
                            backgroundColor='black'
                            text='Send'
                            onClick={sendMessage}
                        />
                    </div>
                }
            />
          </div>
        </div>
      </div>
    );
}

const styles: StylesDictionary  = {
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    conversationContainer: {
        flexDirection: 'column',
        width: '70vw',
    },
    contactList: {
        width: '30vw',
        backgroundColor: Colors.contactList
    },
    messageList: {
        height: '95vh',
        backgroundColor: Colors.background
    },
    input: {
        // width: 300,
        // alignSelf: 'flex-end'
    },
    addContactIcon: {
        // blockSize: 50,
        // alignSelf: 'center'
    }
};


const authCondition = (authUser: any) => !!authUser;
export const Chat = withAuthorization(authCondition)(ChatComponent);
