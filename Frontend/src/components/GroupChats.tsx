import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  Typography,
  Button,
  TextField,
  Box,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const GroupChats = ({ openModal, setOpenModal }: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
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
          backgroundColor: "#2a3942",
          color: "white",
          padding: 2,
          position: 'relative'
        },
      }}
    >
      {/* Close Button */}
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
        <TextField
          sx={{
            color: "white",
            "& fieldset": { borderColor: "white" },
            "& label": { color: "white" },
          }}
          fullWidth
          variant="outlined"
          label="Search user"
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
        />
        <Button
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
      </Box>
    </Dialog>
  )
}

export default GroupChats;
