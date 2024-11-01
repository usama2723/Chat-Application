import { Box, Typography } from "@mui/material";
import { ChatState } from "../Context/ChatProvider";

const SingleChat = ({ fetchAgain, setFetchAgain }: {
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { selectedChat, setSelectedChat } = ChatState();

    return (
        <>
            {selectedChat ? (
                <>
                </>
            ) : (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="h6" color="textSecondary">
                        Click on a user to start chatting
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default SingleChat;
