import * as React from "react";
import { withAuthorization } from "../../firebase/withAuthorization";
import 'react-chat-elements/dist/main.css';
import { MessageList, ChatList, Input, Button,  } from 'react-chat-elements'
import {StylesDictionary} from "../../utils/stylesDictionary";
import {useEffect, useState} from "react";
import * as ChatApi from "../../api/chatApi";
import ChatContact from "../../models/chatContact";
import {getContactsList} from "../../utils/chatUtil";
import ChatMessage from "../../models/chatMessage";
import {getDbUser} from "../../utils/userUtil";

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
        const contactList: ChatContact[] = getContactsList(messages);
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
        const dbUser = getDbUser();
        if (!!dbUser && !!receiver) {
            const msg = new ChatMessage(undefined, dbUser.companyId, inputMessage,
                undefined, true, dbUser, receiver.employee);
            await ChatApi.createMessage(msg);
            setInputMessage('');
            await updateChat();
        }
    }

    return (
      <div style={styles.container}>
        <div style={styles.contactList}>
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
    // backgroundColor: Colors.tint,
  },
  conversationContainer: {
    flexDirection: 'column',
    width: '70vw',
  },
  contactList: {
    width: '30vw'
  },
  messageList: {
    height: '95vh',
    backgroundColor: 'lightgrey'
  },
  input: {
    // width: 300,
    // alignSelf: 'flex-end'
  }
};


const authCondition = (authUser: any) => !!authUser;
export const Chat = withAuthorization(authCondition)(ChatComponent);