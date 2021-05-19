import {getBackendServerUrl} from "../api";

export function getAttachmentUrl(attachmentName: string|null): string|null {
    if (!attachmentName) {
        return null;
    }
    return `${getBackendServerUrl()}attachment/${attachmentName}`
}
