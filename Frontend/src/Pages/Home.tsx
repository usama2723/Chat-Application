import { ChatThreadsContainer } from "../components/ChatThreadsContainer";
// import { ConversationContainer } from "../components/ConversationContainer";

const Home = () => {
  return (
    <div className="flex h-screen py-5 px-5 bg-[#0c1317]">
      <div className="w-[30%] bg-[#111b21] text-white border-r overflow-y-scroll border-[#394b53] ">
        <ChatThreadsContainer />
      </div>
{/* 
      <div className="container flex-1 flex flex-col ">
        <ConversationContainer />
      </div> */}
    </div>
  );
};

export default Home;
