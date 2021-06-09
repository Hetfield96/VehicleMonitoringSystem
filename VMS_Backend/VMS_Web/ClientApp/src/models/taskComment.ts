import Employee from "./employee";
import {getDbUserId} from "../utils/userUtil";
import {getAttachmentUrl, MessageTypeConstants} from "../utils/attachmentUtil";

export default class TaskComment {

  public static async parseFromApi(c: TaskComment): Promise<TaskComment> {
    const dbUserId = await getDbUserId();
    const comment = new TaskComment(c.id, c.text, c.date, c.author, c.type, c.attachmentName, c.taskId);
    comment.position = dbUserId === comment.author.id ? 'right' : 'left';
    comment.title = dbUserId === comment.author.id ? 'You' : comment.author.getFullName();
    return comment;
  }

  public taskId: number;

  public id: number|undefined;
  public text: string;
  public date: Date|undefined;
  public author: Employee;

  public position: string;
  public title: string;
  public type: MessageTypeConstants;
  public attachmentName: string|null;
  public data: any;

  constructor(id: number|undefined, text: string,
              date: Date|undefined, author: Employee,
              type: MessageTypeConstants, attachmentName: string|null,
              taskId: number|undefined) {
    this.id = id;
    this.text = text;
    if (date) {
      this.date = new Date(date);
    }

    if (taskId) {
      this.taskId = taskId;
    }

    author = Object.setPrototypeOf(author, Employee.prototype);
    this.author = author;

    this.type = type;
    if (type === MessageTypeConstants.PHOTO) {
      this.attachmentName = attachmentName;
      this.data = {
        uri: getAttachmentUrl(attachmentName),
      };
    }
  }

}
