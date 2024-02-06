import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../Context/ChatProvider";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const ChatPage = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/chat`,
        config
      );
      console.log(data);

      setChats(data);
    } catch (error) {
      toast.error("error");
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  });
  function ImageAvatars() {
    return (
      <Stack direction="row" spacing={2}>
        <Avatar
          src={imageUrl}
          sx={{
            height: "47px",
            width: "47px",
          }}
        />
      </Stack>
    );
  }
  return (
    <div className=" p-3 hover:bg-[#394b53] cursor-pointer  border-b border-[#394b53]">
      <div className="flex items-center space-x-4">
        <ImageAvatars />
        <div>
          <p className="text-lg text-white  ">{name}</p>
          <p className="text-xs text-gray-500">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
