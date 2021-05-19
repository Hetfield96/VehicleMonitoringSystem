import axios from 'axios';
import {getDbUser, getDbUserCompanyId} from "../utils/userUtil";
import TaskComment from "../models/taskComment";

const basicUrl = 'taskComment';

export async function getAllTaskComments(taskId: number|undefined): Promise<TaskComment[] | null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId || !taskId) {
    return null;
  }

  try {
    const response = await axios.get<TaskComment[]>(`${basicUrl}/getAllForTask/${companyId}/${taskId}`);
    const comments = response.data;

    for(let i = 0; i < comments.length; i++) {
      const c = comments[i];
      comments[i] = await TaskComment.parseFromApi(c);
    }

    return comments;
  } catch (e) {
    console.log("Error:getAllTaskComments ", e.response);
    return null;
  }
}

export async function createComment(comment: TaskComment) {
  const dbUser = await getDbUser();
  if (!dbUser) {
    return null;
  }
  const companyId = dbUser.companyId;
  const authorId = dbUser.id;

  try {
    const response = await axios.post(`${basicUrl}`, {companyId, authorId, text: comment.text, taskId: comment.taskId});
    // console.log(`createComment: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    console.log("Error:createComment ", e.response);
    return null;
  }
}

export async function createCommentWithAttachment(taskId: number|undefined, text: string, attachment: FormData) {
  const dbUser = await getDbUser();
  if (!dbUser) {
    return null;
  }
  const companyId = dbUser.companyId;
  const authorId = dbUser.id;

  try {
    const response = await axios.post(`${basicUrl}/withAttachment/${companyId}/${authorId}/${taskId}/${text}`, attachment);
    // console.log(`createMessage: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:createMessage ", e.response);
    return null;
  }
}
