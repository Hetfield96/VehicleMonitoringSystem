import {getBackendServerUrl} from "../api";

export enum MessageTypeConstants {
    TEXT = 'text',
    PHOTO = 'photo',
    // FILE = 'file'
}

export function getAttachmentUrl(attachmentName: string|null): string|null {
    if (!attachmentName) {
        return null;
    }
    return `${getBackendServerUrl()}attachment/${attachmentName}`
}
