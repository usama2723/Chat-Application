import { isSameUser } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

type Message = {
	_id: string;
	sender: {
		_id: string;
		name: string;
		pic?: string;
	};
	content: string;
};

type ScrollableChatProps = {
	messages: Message[];
};

const ScrollableChat: React.FC<ScrollableChatProps> = ({ messages }) => {
	const { user } = ChatState();
	if (!user || !user._id) {
		return null;
	}

	return (
		<div>
			{messages &&
				messages.map((m, i) => (
					<div
						style={{
							display: "flex",
							flexDirection: m.sender._id === user._id ? "row-reverse" : "row",
							margin: "8px",
							marginBottom: "10px",
						}}
						key={m._id}
					>
						<span
							style={{
								backgroundColor: m.sender._id === user._id ? "#005c4b" : "#202c33",
								color: m.sender._id === user._id ? "white" : "white",
								alignSelf: m.sender._id === user._id ? "flex-end" : "flex-start",
								marginTop: isSameUser(messages, m, i) ? 3 : 10,
								borderRadius: "10px",
								padding: "8px 15px",
								wordBreak: "break-word",
							}}
						>
							{m.content}
						</span>
					</div>
				))}
		</div>
	);
};

export default ScrollableChat;
