import { Avatar } from "./Avatar";
import { useNavigate } from "react-router-dom";

const Chat = ({
	chat,
	activeChatId,
	onSelectChat,
	i,
	fullName,
	p,
}: {
	chat: any;
	activeChatId: string;
	onSelectChat: (id: string) => void;
	i: number;
	fullName: string;
	p: any;
}) => {
	const navigate = useNavigate();

	const formatTime = (iso: string): string => {
		const diff = Date.now() - new Date(iso).getTime();
		const mins = Math.floor(diff / 60_000);
		const hours = Math.floor(diff / 3_600_000);
		if (mins < 60) return `${mins}m`;
		if (hours < 24) return `${hours}h`;
		if (hours < 48) return "Yesterday";
		return new Date(iso).toLocaleDateString("en-US", { weekday: "short" });
	};

	return (
		<div
			className={`chatlist-item ${
				activeChatId === chat.id ? "active" : ""
			}`}
			style={{ animationDelay: `${i * 40}ms` }}
			onClick={() => onSelectChat(chat.id)}
		>
			<Avatar
				name={fullName}
				avatarUrl={p.avatarUrl}
				online={p.online}
				onClick={(e) => {
					e.stopPropagation();
					navigate(`/profile/${p.username}`);
				}}
			/>
			<div className="chatlist-item-body">
				<div className="chatlist-item-row">
					<span className="chatlist-item-name">{fullName}</span>
					<span className="chatlist-item-time">
						{formatTime(chat.lastMessageAt)}
					</span>
				</div>
				<div className="chatlist-item-row">
					<span className="chatlist-item-msg">
						{chat.lastMessage}
					</span>
					{chat.unread > 0 && (
						<span className="chatlist-badge">{chat.unread}</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Chat;
