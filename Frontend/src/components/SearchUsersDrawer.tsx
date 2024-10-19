import { useState, Dispatch, SetStateAction } from "react";
import {
  AppBar,
  Box,
  Drawer,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserAvatar/UserListItem";
interface UserInfo {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export const SearchUsersDrawer = ({
  openNewChatsDrawer,
  setOpenNewChatsDrawer,
  openModal,
  setOpenModal,
}: {
  openNewChatsDrawer: boolean;
  setOpenNewChatsDrawer: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {

  const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState(false);
  const { setSelectedChat, user, chats, setChats } = ChatState();
  const [searchResult, setSearchResult] = useState<UserInfo[]>([]);
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Enter Something in Search");
      return;
    }
    if (!user?.token) {
      toast.error("User not authenticated");
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
      toast.error("error");
    }
  };

  const accessChat = async (userId: string) => {
    console.log(userId);
    if (!user?.token) {
      toast.error("User not authenticated");
      return;
    }


    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/chat`,
        { userId },
        config
      );
     

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
        setSelectedChat(data);
      }
    } catch (error) {
      toast.error("error");
    }
  };

  console.log({ openNewChatsDrawer });

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
      <Dialog
        open={openModal}
        onClose={setOpenModal}
        maxWidth="md"
        PaperProps={{
          sx: {
            height: "50vh",
            width: "30%",
            backgroundColor: "#2a3942",
            color: "white",
            padding: 2,
          },
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ margin: 3, textAlign: "center" }}
        >
          Group Chat
        </Typography>
        <Box mb={2}>
          <TextField
            sx={{
              color: "white",
              "& fieldset": { borderColor: "white" },
              "& label": { color: "white" },
            }}
            fullWidth
            variant="outlined"
            label="Search user"
          // value={search}
          // onChange={(e) => handleSearch(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            sx={{
              color: "white",
              "& fieldset": { borderColor: "white" },
              "& label": { color: "white" },
            }}
            fullWidth
            variant="outlined"
            label="Enter name"
          // value={input2}
          // onChange={(e) => handleInput2Change(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: "#005c4b ",
              "&:hover": {
                backgroundColor: "gray",
              },
            }}
          >
            Create Group Chat
          </Button>
        </Box>
      </Dialog>

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
                onChange={(e) => setSearch(e.target.value)}
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
      </Box>
    </Drawer>
  );
};
