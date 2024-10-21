import { UserInfo } from "../Context/ChatProvider";

export const getSender = (loggedUser: UserInfo | null, users: UserInfo[]): string => {
    if (!loggedUser) return ""; 

    return users[0]?._id === loggedUser._id ? users[1]?.name : users[0]?.name;
};
