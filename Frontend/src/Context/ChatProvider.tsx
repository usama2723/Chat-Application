import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useNavigate } from "react-router-dom";

interface ChatContextProps {
  user: UserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  chats: IChat[];
  setChats: React.Dispatch<React.SetStateAction<IChat[]>>;
  selectedChat?: IChat;
  setSelectedChat?: React.Dispatch<React.SetStateAction<IChat | undefined>>;
}

interface UserInfo {
    user: {
    email: "";
    password: "";
    token: "";
    name: "";
    
  };
}
const initialContextValue: ChatContextProps = {
  user: null,
  setUser: () => {},
  chats: [],
  setChats() {},
};

const ChatContext = createContext<ChatContextProps>(initialContextValue);

interface ChatProviderProps {
  children: ReactNode;
}
interface IChat {
  _id: string;
  message: string;
}
interface ChatState {
  messages: string[];
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [selectedChat, setSelectedChat] = useState<IChat>();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    setUser(userInfo);

    if (!userInfo) navigate("/signin");
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, chats, setChats, selectedChat, setSelectedChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

