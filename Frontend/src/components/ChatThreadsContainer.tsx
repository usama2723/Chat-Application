import {
  IconButton,
  Typography,
  Stack,
  Paper,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoChatbubble, IoPeople, IoSearch } from "react-icons/io5";
import { CustomMenu } from "./CustomMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchUsersDrawer } from "./SearchUsersDrawer";
import ChatLoading from "./ChatLoading";
import { ChatState, UserInfo } from "../Context/ChatProvider";
import axios from "axios";
import { getSender } from "../config/ChatLogics";
import GroupChats from "./GroupChats";
import ProfileDrawer from "./ProfileDrawer";

export const ChatThreadsContainer = ({ fetchAgain }: {
  fetchAgain: boolean;
}) => {
  const [searchResult, setSearchResult] = useState();
  const [loggedUser, setLoggedUser] = useState<UserInfo | null>(null);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openNewChatsDrawer, setOpenNewChatsDrawer] = React.useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  const toggleNewChatsDrawer = () => {
    setOpenNewChatsDrawer(!openNewChatsDrawer);
  };

  const handleLogout = () => {
    navigate("/sign-in");
    toast.success("Logged out successfully!");
  };
  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Enter Something in Search");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Error searching");
    }
  };


  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/chat`, config);
      setChats(data);

      localStorage.setItem(`${user?._id}_chats`, JSON.stringify(data));
    } catch (error) {
      toast.error("Error fetching chats");
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setLoggedUser(parsedUser);

      const savedChats = localStorage.getItem(`${parsedUser._id}_chats`);
      if (savedChats) {
        setChats(JSON.parse(savedChats));
      } else {
        fetchChats();
      }
    }
  }, [fetchAgain]);

  const options = [
    { label: "New chats", callback: toggleNewChatsDrawer },
    { label: "New group", callback: handleCloseModal },
    { label: "Log out", callback: handleLogout },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setLoading(true);

    if (e.target.value.trim() === "") {
      setLoading(false);
    }
  };

  const handleChatSelection = (chat: any) => {
    setSelectedChat(chat);

    const userChats = chats.filter((c) => c._id === chat._id);
    localStorage.setItem(`${user?._id}_selectedChats`, JSON.stringify(userChats));
  };

  const filteredChats = chats.filter((chat) => {
    const senderName = !chat.isGroupChat
      ? getSender(loggedUser, chat.users)
      : chat.chatName;

    return senderName && senderName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Box className="bg-[#202c33] flex items-center justify-between text-white h-16 pl-3">
        <Box className="flex items-center space-x-4">
          <img
            src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
            alt="User Avatar"
            className="h-10 w-10 rounded-full"
            onClick={() => setOpenDrawer(true)}
          />
        </Box>
        <Box className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 pr-3">
          <IoPeople className="text-[#aebac1] cursor-pointer" size={20} />
          <IoChatbubble className="text-[#aebac1] cursor-pointer" size={20} />
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

      <Box sx={{ padding: 2, maxWidth: '100%' }}>
        <div className="flex items-center bg-[#202c33] rounded-[10px] px-4 py-1 w-full">
          <IoSearch
            onClick={handleSearch}
            className="text-[#aebac1] cursor-pointer"
            size={18}
          />
          <input
            className="flex-1 bg-[#202c33] text-white border-none outline-none px-2 w-full"
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </Box>

      <Box sx={{
        flex: 1,
        overflow: "auto",
      }}>
        {loading && search ? (
          <ChatLoading />
        ) : filteredChats.length > 0 ? (
          <Stack spacing={2} alignItems="center" justifyContent="center">
            {filteredChats.map((chat) => (
              <Paper
                elevation={3}
                key={chat._id}
                sx={{
                  backgroundColor: selectedChat === chat ? "#ffffff" : "#2a3942",
                  color: selectedChat === chat ? "black" : "white",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#38B2AC",
                    color: "white",
                  },
                  width: "90%",
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  marginBottom: 2,
                  borderRadius: "8px",
                }}
                onClick={() => handleChatSelection(chat)}
              >
                <Typography>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Typography>
              </Paper>
            ))}
          </Stack>
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", color: "lightgray" }}>
            No chats 
          </Typography>
        )}
      </Box>

      <ProfileDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      <SearchUsersDrawer openNewChatsDrawer={openNewChatsDrawer} setOpenNewChatsDrawer={setOpenNewChatsDrawer} />
      <GroupChats openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
