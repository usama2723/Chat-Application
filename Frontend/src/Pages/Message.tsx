import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

interface MessageProps {
  text: string;
  timestamp: string;
  isSent: boolean;
  name: string;
  imageUrl?: string;
  key: number;
}
function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  // if (imageUrl) {
  //   return {
  //     src: imageUrl,
  //   };
  // }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
function BackgroundLetterAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar("Kent Dodds")} />
      {/* {imageUrl ? (
          <Avatar src={imageUrl} />
        ) : (
          <Avatar {...stringAvatar(name)} />
        )} */}
    </Stack>
  );
}
const Message: React.FC<MessageProps> = ({ text, timestamp, isSent }) => {
  return (
    <div
      className={`flex ${
        isSent ? "justify-end" : "justify-start"
      } items-center space-x-2 mb-2`}
    >
      {!isSent && <BackgroundLetterAvatars />}
      <div
        className={`py-1 px-2 rounded-lg max-w-[70%] 
        ${
          isSent
            ? "bg-[#005c4b] text-white self-end"
            : "bg-[#202c33] text-white "
        }`}
      >
        <p className="text-sm">{text}</p>
        <p className=" text-xs flex float-right  text-[#aebac1]">{timestamp}</p>
      </div>
    </div>
  );
};
export default Message;
