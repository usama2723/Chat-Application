import { Box, IconButton, TextField, Typography, Avatar } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
// import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import EmojiPicker from 'emoji-picker-react';
import UserProfileModal from "./UserProfileModal";

const ConversationContainer = ({ fetchAgain, setFetchAgain }: {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };
  const handleEmojiSelect = (emojiObject: any) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#e5ddd5",
        }}
      >
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
            <IconButton sx={{ color: "#fff" }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            backgroundColor: "gray",
          }}
        >

          {/* <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> */}
          {/* {messages.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "lightgray" }}
            >
              No messages yet.
            </Typography>
          ) : (
            [...messages]
              .map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: msg.sender === user.id ? "flex-end" : "flex-start",
                    mb: "4px", // Adds space between messages
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: msg.sender === user.id ? "#dcf8c6" : "#fff",
                      color: "#111",
                      padding: "8px 12px",
                      borderRadius: msg.sender === user.id ? "10px 0 10px 10px" : "0 10px 10px 10px",
                      maxWidth: "70%", // Limit the width to avoid full span
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                      wordWrap: "break-word",
                    }}
                  >
                    {msg.content}
                  </Box>
                </Box>
              ))
          )} */}

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
            onChange={(e) => setNewMessage(e.target.value)}
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
          <IconButton sx={{ color: "#aebac1" }} onClick={handleSendMessage}>
            <IoSend size={24} />
          </IconButton>
        </Box>
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
