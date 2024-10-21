import { Box } from "@mui/material";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { SearchUsersDrawer } from "../components/SearchUsersDrawer";
import { ChatThreadsContainer } from "../components/ChatThreadsContainer";
import ConversationContainer from "../components/ConversationContainer";

const ChatPage = () => {
  const { user } = ChatState();

  const [openNewChatsDrawer, setOpenNewChatsDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && (
        <SearchUsersDrawer
          openNewChatsDrawer={openNewChatsDrawer}
          setOpenNewChatsDrawer={setOpenNewChatsDrawer}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      <Box>
        {user && <ChatThreadsContainer />}
        {user && <ConversationContainer/>}

      </Box>
    </div>
  );
};

export default ChatPage;
