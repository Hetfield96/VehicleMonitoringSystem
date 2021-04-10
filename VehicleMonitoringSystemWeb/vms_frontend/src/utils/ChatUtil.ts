import ChatMessage from "../models/ChatMessage";
import {getDbUserId} from "./UserUtil";
import ChatContact from "../models/ChatContact";
import Employee from "../models/Employee";

export function countUnreadMessages(chatMessages: ChatMessage[]): number {
    const userId = getDbUserId();
    let res = 0;
    for (const msg of chatMessages) {
        if (msg.receiver.id === userId && msg.unread) {
            res += 1;
        }
    }
    return res;
}

export function getContactsList(chatMessages: ChatMessage[]|null): ChatContact[] {
    const contactList: ChatContact[] = [];

    if (!!chatMessages) {
        const userId = getDbUserId();
        const contacts = new Map<string, Employee>();
        const contactMessages = new Map<string, ChatMessage[]>();
        for (const msg of chatMessages) {
            const contact = msg.receiver.id === userId ? msg.sender : msg.receiver;
            if (!contactMessages.has(contact.id)) {
                contacts.set(contact.id, contact);
                contactMessages.set(contact.id, [msg]);
            } else {
                const existingContactMessages = contactMessages.get(contact.id);
                if (!!existingContactMessages) {
                    contactMessages.set(contact.id, [...existingContactMessages, msg]);
                }
            }
        }

        for (const [key] of contacts) {
            const contact = contacts.get(key);
            const contactMsg = contactMessages.get(key);
            if (!!contact && !!contactMsg) {
                const chatContact = new ChatContact(contact, contactMsg);
                contactList.push(chatContact);
            }
        }
    }

    return contactList;
}
