import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

export interface UserInfo {
  _id: string;
  email: string;
  password: string;
  token: string;
  name: string;
  pic: string;
}

interface ChatContextProps {
  user: UserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  chats: IChat[];
  setChats: React.Dispatch<React.SetStateAction<IChat[]>>;
  selectedChat?: IChat;
  setSelectedChat: React.Dispatch<React.SetStateAction<IChat | undefined>>;
}
export interface IChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean; // Added to resolve issue
  users: UserInfo[]; // Assuming each chat has an array of users
  latestMessage?: string;
}

// Initial Context Value
const initialContextValue: ChatContextProps = {
  user: null,
  setUser: () => { },
  chats: [],
  setChats: () => { },
  selectedChat: undefined,
  setSelectedChat: () => {},
};

const ChatContext = createContext<ChatContextProps>(initialContextValue);

interface ChatProviderProps {
  children: ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null); 
  const [selectedChat, setSelectedChat] = useState<IChat | undefined>();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    console.log("Retrieved user info:", userInfo); 

    if (userInfo) {
      setUser(userInfo);
    } else {
      navigate("/sign-in"); 
    }
  }, [navigate]);
  const saveUserToLocalStorage = (userData: UserInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  // Whenever the user state changes, we save it to localStorage
  useEffect(() => {
    if (user) {
      saveUserToLocalStorage(user);
    }
  }, [user]);

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
