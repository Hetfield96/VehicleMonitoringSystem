import axios from 'axios';
import Role from "../models/role";

export async function getRoles(): Promise<Role[] | null> {
  try {
    const response = await axios.get<Role[]>('role/getAll');

    return await translateRoles(response.data);
  } catch (e) {
    // console.log("Error:getRoles ", e.response);
    return null;
  }
}

async function translateRoles(roleArray: Role[]|null) {
  const language = await localStorage.getItem("language");
  if (roleArray && language === 'ru') {
    roleArray[0].name = 'Администратор';
    roleArray[1].name = 'Оператор';
    roleArray[2].name = 'Водитель';
  }
  return roleArray;
}
