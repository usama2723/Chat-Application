import {
  AppBar,
  Box,
  Drawer,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IoChatbubble, IoPeople, IoSearch } from "react-icons/io5";
import { CustomMenu } from "./CustomMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchUsersDrawer } from "./SearchUsersDrawer";
import { ChatState } from "../Context/ChatProvider";
// import axios from "axios";

export const ChatThreadsContainer = () => {
  const { chats } = ChatState();
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

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const toggleNewChatsDrawer = () => {
    setOpenNewChatsDrawer(!openNewChatsDrawer);
  };

  const handleLogout = () => {
    navigate("/signin");
    toast.success("Logged out successfully!");
    localStorage.removeItem("userInfo");
  };

  const options = [
    { label: "New chats", callback: toggleNewChatsDrawer },
    { label: "Group chat", callback: handleCloseModal },
    { label: "Log out", callback: handleLogout },
  ];

  return (
    <>
      <div className="bg-[#202c33] flex items-center justify-between text-white h-16 pl-3 ">
        <div className="flex items-center space-x-4">
          <img
            src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
            alt=""
            className="h-10 w-10 rounded-full"
            onClick={() => setOpenDrawer(true)}
          />
        </div>
        <div className="flex items-center space-x-10 pr-3">
          <IoPeople className="text-[#aebac1] cursor-pointer" size={20} />
          <IoChatbubble className="text-[#aebac1] cursor-pointer" size={20} />

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon sx={{ color: "#aebac1" }} />
          </IconButton>
          <CustomMenu
            anchorEl={anchorEl}
            open={open}
            options={options}
            onClose={handleClose}
          />
        </div>
      </div>

      <div className="p-3 ">
        <div className="flex items-center space-x-4 bg-[#2a3942] rounded-[10px] px-6 py-1">
          <IoSearch className="text-[#aebac1] cursor-pointer" size={18} />
          <input
            className="flex-1 bg-[#2a3942] text-white border-none outline-none px-2 "
            type="text"
            placeholder="Search or start new chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll">
        {chats.map((chat, index) => (
          <SearchUsersDrawer key={index} {...chat} />
        ))}
      </div>

      <Drawer
        variant="persistent"
        open={openDrawer}
        onClose={() => toggleDrawer()}
        PaperProps={{
          sx: {
            backgroundColor: "#111b21",
            color: "white",
            margin: "20px",
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
              onClick={() => toggleDrawer()}
              sx={{ marginTop: 7 }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography
              sx={{ marginTop: 7, marginLeft: 2 }}
              variant="h6"
              component="div"
            >
              Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            width: 450,
          }}
          role="presentation"
        >
          <Avatar
            sx={{
              width: 200,
              height: 200,
              margin: "auto",
              marginTop: 5,
            }}
            src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
          />
          <Typography
            sx={{
              paddingTop: 5,
              paddingLeft: 3,
              color: "#05805d",
              fontSize: "13px",
            }}
          >
            Your Name
          </Typography>
          <Typography sx={{ paddingTop: 3, paddingLeft: 3, fontSize: "17px" }}>
            〽️R $@m...♌
          </Typography>
          <Typography
            sx={{
              paddingTop: 3,
              paddingLeft: 3,
              fontSize: "15px",
              color: "gray",
            }}
          >
            This is not your username or pin. This name will be vsible to your
            contacts.
          </Typography>
          <Typography
            sx={{
              color: "#05805d",
              paddingTop: 5,
              paddingLeft: 3,
              fontSize: "13px",
            }}
          >
            About
          </Typography>
          <Typography
            sx={{
              paddingTop: 3,
              paddingLeft: 3,
              fontSize: "17px",
            }}
          >
            ∆™ ♾️ $impli¢îTy îs My St¥le~ 😇
          </Typography>
        </Box>
      </Drawer>

      <SearchUsersDrawer
        openNewChatsDrawer={openNewChatsDrawer}
        setOpenNewChatsDrawer={setOpenNewChatsDrawer}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

// const contacts = [
//   {
//     name: "Umer",
//     status: "Online",
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMr0HZTQI2cK-Fo6_ood-9-8jAg84m9aGT3mLDP5fL80X83XYEZVD01Ilr9vfY8AdvRg&usqp=CAU",
//   },
//   {
//     name: "Ahmad Mughal",
//     status: "Offline",
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU",
//   },
//   {
//     name: "Alina",
//     status: "Online",
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU",
//   },
//   {
//     name: "Daniyal",
//     status: "Offline",
//     imageUrl:
//       "https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg",
//   },
//   {
//     name: "Usama",
//     status: "Online",
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMr0HZTQI2cK-Fo6_ood-9-8jAg84m9aGT3mLDP5fL80X83XYEZVD01Ilr9vfY8AdvRg&usqp=CAU",
//   },
//   {
//     name: "Rizwan",
//     status: "Offline",
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU",
//   },
//   {
//     name: "Sana",
//     status: "Online",
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU",
//   },
//   {
//     name: "Hamza",
//     status: "Offline",
//     imageUrl:
//       "https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg",
//   },
// ];
