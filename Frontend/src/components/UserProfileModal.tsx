import { Dispatch, SetStateAction, ReactNode } from "react";
import {
  Dialog,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface UserInfo {
  name: string;
  email: string;
  pic?: string;
}

export interface UserProfileModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  user: string | UserInfo; // Adjust if the type is different
  children?: ReactNode;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  openModal,
  setOpenModal,
  user,
  children,
}) => {
  return (
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
          position: "relative",
        },
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "white",
        }}
        onClick={() => setOpenModal(false)}
      >
        <CloseIcon />
      </IconButton>
      <Box role="presentation">
        <Avatar
          sx={{
            width: 200,
            height: 200,
            margin: "auto",
            marginTop: 2,
          }}
          src={(user as UserInfo)?.pic}
          alt={(user as UserInfo)?.name}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            marginTop: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "29px",
            }}
          >
            {(user as UserInfo)?.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              color: "gray",
            }}
          >
            Email: {(user as UserInfo)?.email}
          </Typography>
        </Box>
      </Box>

      {children}
    </Dialog>
  );
};

export default UserProfileModal;
