import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface UserInfo {
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
  setSelectedChat?: React.Dispatch<React.SetStateAction<IChat | undefined>>;
}

interface IChat {
  _id: string;
  message: string;
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
    // Parse the user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    console.log("Retrieved user info:", userInfo); 

    if (userInfo) {
      setUser(userInfo);
    } else {
      navigate("/sign-in"); // Redirect to sign in if no user found
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, chats, setChats, selectedChat, setSelectedChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook to use ChatState
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
