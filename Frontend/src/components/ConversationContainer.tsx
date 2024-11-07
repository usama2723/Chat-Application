import { Box, IconButton, TextField, Typography, Avatar, CircularProgress } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ChatState, IChat } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import EmojiPicker from 'emoji-picker-react';
import UserProfileModal from "./UserProfileModal";
import { toast } from "react-toastify";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import { CustomMenu } from "./CustomMenu";
import { io, Socket } from "socket.io-client";
import animationData from "./animations/typing.json";
import Lottie from "react-lottie";

type Message = {
  _id: string;
  sender: {
    _id: string;
    name: string;
    pic?: string;
  };
  content: string;
};

const ENDPOINT = "http://localhost:5000";
var socket: Socket, selectedChatCompare: IChat | undefined;;

const ConversationContainer = () => {
  const { user, selectedChat } = ChatState();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);     
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const handleEmojiSelect = (emojiObject: any) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    { label: "Contact Info", callback: handleCloseModal },
  ];

 const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get<Message[]>(
        `${import.meta.env.VITE_API_BASE_URL}/message/${selectedChat._id}`,
        config
      );
      console.log(messages);
      
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast('Error Occurred!');
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(()=>{
    fetchMessages();
    selectedChatCompare = selectedChat;
  },[selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare || 
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) 
      {
       // notification
      } 
      else {
        setMessages([...messages, newMessageReceived]);
      }
  });
  });

  const sendMessage = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat?._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error('Error Occurred');
      }
    }
  };
  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
        <Box
          sx={{
            height: '9.4%',
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            backgroundColor: "#202c33",
            color: "#fff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Contact"
              src={"https://via.placeholder.com/150"}
              sx={{ width: 40, height: 40 }}
              onClick={handleCloseModal}
            />
            <Typography variant="h6" sx={{ marginLeft: "10px" }}>
              {selectedChat ? (
                !selectedChat.isGroupChat ? (
                  getSender(user, selectedChat.users)
                ) : (
                  selectedChat.chatName.toUpperCase()
                )
              ) : (
                " "
              )}
            </Typography>
          </Box>
          <Box>
          <IconButton
            aria-label="more"
            onClick={handleClick}
            className="p-1"
          >
            <MoreVertIcon sx={{ color: "#aebac1" }} />
          </IconButton>
          <CustomMenu
            anchorEl={anchorEl}
            open={open}
            options={options}
            onClose={handleClose}
          />
          </Box>
        </Box>

        <Box
          sx={{
            overflowY: "auto",
            flex: 1,
            padding: "10px",
            backgroundColor: "gray",
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="inherit" size={50} />
            </Box>
            ) : (
            <div className="messages">
              <ScrollableChat messages={messages}/>
            </div>
          )}

        {isTyping ? (
          <Box
            sx={{
              // marginRight: 50,
            }}
          >
            <Lottie
              options={defaultOptions}
              width={80}
            />
          </Box>
        ) : (
          <></>
        )}
        </Box>

        <Box
          sx={{
            height: '10%',
            display: "flex",
            alignItems: "center",
            padding: "16px",
            backgroundColor: "#202c33",
          }}
        >

          <IconButton
            sx={{ color: "#aebac1" }}
            onClick={() => setShowEmojiPicker((prev: boolean) => !prev)}
          >
            <BsEmojiSmile size={24} />
          </IconButton>

          {showEmojiPicker && (
            <Box
              sx={{
                position: "absolute",
                bottom: "80px",
                right: "46%",
                zIndex: 1000,
                overflowY: "auto",
                "@media (max-width: 500px)": {
                  maxWidth: "90%",
                  left: "5%",
                },
              }}
            >
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </Box>
          )}
          <IconButton sx={{ color: "#aebac1" }}>
            <FaPlus size={24} />
          </IconButton>
       
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Type a message"
            value={newMessage}
              onKeyDown={sendMessage}
            onChange={typingHandler}
            sx={{
              padding: "16px",
              "& .MuiOutlinedInput-root": {
                height: "45px",
                borderRadius: "10px",
                backgroundColor: "#2a3942",
                color: "white",
                "& fieldset": {
                  borderColor: "#2a3942",
                },
                "&:hover fieldset": {
                  borderColor: "#2a3942",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2a3942",
                },
                "&:hover .MuiInputBase-input": {
                  color: "white",
                },
              },
              "& .MuiOutlinedInput-root .MuiInputBase-input::placeholder": {
                color: "gray",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <IconButton sx={{ color: "#aebac1" }} onClick={() => sendMessage({ key: "Enter" } as React.KeyboardEvent)}>
            <IoSend size={24} />
          </IconButton>
        </Box>
      <UserProfileModal
        user={
          selectedChat && !selectedChat.isGroupChat
            ? getSenderFull(user, selectedChat.users)
            : ''
        }
        openModal={openModal} setOpenModal={setOpenModal} />

    </>
  );
};

export default ConversationContainer;
