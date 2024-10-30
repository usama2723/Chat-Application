import { Box, IconButton, TextField, Typography, Avatar } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const ConversationContainer = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");


    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, newMessage]);
            setNewMessage("");
        }
    };

    return (
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
                        src="https://via.placeholder.com/150"
                        sx={{ width: 40, height: 40 }}
                    />
                    <Typography variant="h6" sx={{ marginLeft: "10px" }}>
                        Contact Name
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
                    overflowY: "auto",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    backgroundColor:"gray", 
                }}
            >
                {messages.length === 0 ? (
                    <Typography
                        variant="body1"
                        sx={{ textAlign: "center", color: "lightgray" }}
                    >
                        No messages yet.
                    </Typography>
                ) : (
                    messages.map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                                backgroundColor: index % 2 === 0 ? "#fff" : "#dcf8c6",
                                padding: "10px",
                                borderRadius: "10px",
                                maxWidth: "60%",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                            }}
                        >
                            {msg}
                        </Box>
                    ))
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
                <IconButton sx={{ color: "#aebac1" }}>
                    <BsEmojiSmile size={24} />
                </IconButton>
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
    );
};

export default ConversationContainer;
