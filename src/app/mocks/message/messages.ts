import { USER_LIST } from "../user/user";
import { Message } from "../../models/message.interface";


const userList = USER_LIST;
const messageList: Message[] = [];
userList.forEach((user) => {
    // messageList.push({id: 1, user: user, date: new Date()});
});

// const messageList: Message[] = [
//     {user: userList[0], date: new Date() },
//     {user: userList[1], date: new Date() },
//     {user: userList[2], date: new Date() },
//     {user: userList[3], date: new Date() },
// ];

export const MESSAGE_LIST = messageList;