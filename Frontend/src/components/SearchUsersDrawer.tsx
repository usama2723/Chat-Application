import { useState, Dispatch, SetStateAction } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChatState, } from "../Context/ChatProvider";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserAvatar/UserListItem";

export const SearchUsersDrawer = ({
  openNewChatsDrawer,
  setOpenNewChatsDrawer,
}: {
  openNewChatsDrawer: boolean;
  setOpenNewChatsDrawer: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loadingChat, setLoadingChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setSelectedChat, user, chats, setChats } = ChatState();
  const [searchResult, setSearchResult] = useState();
  const [search, setSearch] = useState("");

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

  const accessChat = async (userId: string) => {
    console.log("user :", userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      console.log(data);
      setOpenNewChatsDrawer(false);
      setLoadingChat(false);
    } catch (error) {
      toast.error('Error loading chats');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (e.target.value.trim() !== "") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  return (
    <Drawer
      variant="persistent"
      open={openNewChatsDrawer}
      onClose={setOpenNewChatsDrawer}
      PaperProps={{
        sx: {
          backgroundColor: "#111b21",
          color: "white",
          margin: "20px 0 20px 20px",
        },
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "#202c33", height: 110 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenNewChatsDrawer(false)}
            sx={{ marginTop: 7 }}
          >
            <ArrowBackIcon />
          </IconButton>

          <div className="flex-1 ml-2 mt-14">
            <div className="flex items-center space-x-4 bg-[#2a3942] rounded-[10px] px-2 py-1">
              <input
                className="flex-1 bg-[#2a3942] text-white border-none outline-none px-2"
                type="text"
                placeholder="Search new chats"
                value={search}
                onChange={handleSearchChange}
              />
              <IoSearch
                onClick={handleSearch}
                className="text-[#aebac1] cursor-pointer"
                size={18}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 4,
          width: 450,
        }}

        role="presentation"
      >
        {loading ? <ChatLoading /> : (

          searchResult?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
          ))
        )}
        {loadingChat && <CircularProgress color="inherit" size={50} />}
      </Box>
    </Drawer>

  );

};
