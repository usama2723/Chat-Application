import { Box } from "@mui/material";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { SearchUsersDrawer } from "../components/SearchUsersDrawer";
import { ChatThreadsContainer } from "../components/ChatThreadsContainer";
import ConversationContainer from "../components/ConversationContainer";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [openNewChatsDrawer, setOpenNewChatsDrawer] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && (
        <SearchUsersDrawer
          openNewChatsDrawer={openNewChatsDrawer}
          setOpenNewChatsDrawer={setOpenNewChatsDrawer}
        />
      )}
      <Box>
        {user && (
          <ChatThreadsContainer fetchAgain={fetchAgain} />
        )}
        {user && (
          <ConversationContainer fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
