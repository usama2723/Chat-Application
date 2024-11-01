import { Dispatch, SetStateAction, ReactNode, useState } from "react";
import {
  Dialog,
  Typography,
  Button,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChatState, UserInfo } from "../Context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import UserListItem from "./UserAvatar/UserListItem";
import UserBadgeItem from "./UserAvatar/UserBadgeItem";


const GroupChats = ({
  openModal,
  setOpenModal,
  children,
}: {
  openModal: boolean;
  children?: ReactNode;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [groupChatName, setGroupChatName] = useState<string | undefined>();
  const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd: UserInfo) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.warning('User already added');
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
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
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error('Error Searching');
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.warning('Please fill all the fields');
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setOpenModal(false);
      toast.success('New Group Chat Created!');
    } catch (error) {
      toast.error('Failed to Create the Chat!');
    }
  };

  const handleDelete = (delUser: UserInfo) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  return (
    <>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        PaperProps={{
          sx: {
            height: "50vh",
            width: "30%",
            backgroundColor: "#111b21",
            color: "white",
            padding: 2,
            position: 'relative'
          },
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
          }}
          onClick={() => setOpenModal(false)}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ margin: 3, textAlign: "center" }}
        >
          Group Chat
        </Typography>

        <Box mb={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              sx={{
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
              }}
              htmlFor="component-outlined"
            >
              Chat Name
            </InputLabel>
            <OutlinedInput
              id="component-outlined"
              sx={{
                color: "white",
                "& fieldset": { borderColor: "white" },
                "& .MuiOutlinedInput-input": { color: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              }}
              fullWidth
              label="Chat Name"
              onChange={(e) => setGroupChatName(e.target.value)}

            />
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              sx={{
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
              }}
              htmlFor="component-outlined"
            >
              Add Users
            </InputLabel>
            <OutlinedInput
              id="component-outlined"
              sx={{
                color: "white",
                "& fieldset": { borderColor: "white" },
                "& .MuiOutlinedInput-input": { color: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              }}
              fullWidth
              label="Add Users"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>

        </Box>
        <Box>
          {selectedUsers.map((u) => (
            <UserBadgeItem
              key={u._id}
              user={u}
              handleFunction={() => handleDelete(u)}
            />
          ))}
        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 2,
        }}>
        {loading ? (
          <div>Loading....</div>
        ) : (
          searchResult?.slice(0, 4).map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => handleGroup(user)}
            />
          ))
        )}
        </Box>
       
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: "#005c4b",
            "&:hover": {
              backgroundColor: "gray",
            },
          }}
        >
          Create Group Chat
        </Button>

        {children}
      </Dialog>
    </>
  );
};

export default GroupChats;
