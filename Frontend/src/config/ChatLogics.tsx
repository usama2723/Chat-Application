import { UserInfo } from "../Context/ChatProvider";
type Message = {
    sender: {
        _id: string;
    };
};
export const getSender = (loggedUser: UserInfo | null, users: UserInfo[]): string => {
    if (!loggedUser) return "";
    return users[0]?._id === loggedUser._id ? users[1]?.name : users[0]?.name;
};

export const getSenderFull = (loggedUser: UserInfo | null, users: UserInfo[]) => {
    if (!loggedUser) return "";
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages: Message[], m: Message, i: number, userId: string): boolean => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};
export const isLastMessage = (messages: Message[], i: number, userId: string): boolean => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        !!messages[messages.length - 1].sender._id
    );
};
export const isSameUser = (messages: Message[], m: Message, i: number): boolean => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};