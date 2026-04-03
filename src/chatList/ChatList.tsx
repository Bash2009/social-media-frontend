import { useState, useEffect, useRef } from "react";
import { socket } from "../backend";
import { NewChatModal } from "./components/NewChatModal";
import { NewGroupModal } from "./components/NewGroupModal";
import "./ChatList.css";
import ChatTypeDropdown from "./components/ChatTypeDropdown";
import Chat from "./components/Chat";
import type {
	ChatStructure,
	Modal,
	Participant,
	UserStatus,
} from "./constants";

// ── ChatList
const ChatList = ({
	activeChatId,
	onSelectChat,
}: {
	activeChatId?: string;
	onSelectChat: (id: string) => void;
}) => {
	const [chats, setChats] = useState<ChatStructure[]>([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [modal, setModal] = useState<Modal>(null);
	const [dropdown, setDropdown] = useState(false);
	const [userStatus, setUserStatus] = useState<UserStatus>("idle");
	const [foundUser, setFoundUser] = useState<Participant>();
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		socket.connect();
		socket.emit("getChats");

		socket.on("chats", (data: ChatStructure[]) => {
			setChats(data);
			setLoading(false);
		});
		socket.on("connect_error", () => {
			setError("Couldn't load conversations.");
			setLoading(false);
		});
		socket.on("chatCreated", (newChat: ChatStructure) => {
			setChats((prev) => [newChat, ...prev]);
			onSelectChat(newChat.id);
		});
		socket.on("userSearch", (data) => {
			if (data.userExists) {
				setFoundUser({
					...data.profile,
					uid: data.profile.user.uid,
				});
				setUserStatus("found");
			} else {
				setUserStatus("not_found");
			}
		});

		return () => {
			socket.off("chats");
			socket.off("connect_error");
			socket.off("chatCreated");
			socket.disconnect();
		};
	}, []);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			)
				setDropdown(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const handlePrivateChat = (username: string) => {
		socket.emit("createChat", { username });
		setModal(null);
	};

	const handleGroupChat = (name: string, participants: { uid: string }[]) => {
		socket.emit("createGroup", {
			name,
			participants: participants.map((p) => p.uid),
		});
		setModal(null);
	};

	const handleSearch = (username: string) => {
		setUserStatus("loading");
		socket.emit("getUser", { username });
	};

	const filtered = chats.filter((c) => {
		const fullName =
			`${c.participant.firstName} ${c.participant.lastName}`.toLowerCase();
		const q = search.toLowerCase();
		return fullName.includes(q) || c.participant.username.includes(q);
	});

	return (
		<>
			{modal === "private" && (
				<NewChatModal
					onClose={() => setModal(null)}
					onStart={handlePrivateChat}
					onSearch={handleSearch}
					userStatus={userStatus}
					foundUser={foundUser}
				/>
			)}
			{modal === "group" && (
				<NewGroupModal
					onClose={() => setModal(null)}
					onStart={handleGroupChat}
					onSearch={handleSearch}
					searchStatus={userStatus}
					foundUser={foundUser}
				/>
			)}

			<div className="chatlist-root">
				{/* Header */}
				<div className="chatlist-header">
					<h1 className="chatlist-title">Messages</h1>

					{/* + button with dropdown */}
					<div className="chatlist-dropdown-wrap" ref={dropdownRef}>
						<button
							className="chatlist-icon-btn"
							title="New chat"
							onClick={() => setDropdown((v) => !v)}
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
							>
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" />
							</svg>
						</button>

						{dropdown && (
							<ChatTypeDropdown
								setDropdown={setDropdown}
								setModal={setModal}
							/>
						)}
					</div>
				</div>

				{/* Search */}
				<div className="chatlist-search-wrap">
					<svg
						className="chatlist-search-icon"
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.2"
						strokeLinecap="round"
					>
						<circle cx="11" cy="11" r="8" />
						<line x1="21" y1="21" x2="16.65" y2="16.65" />
					</svg>
					<input
						type="text"
						className="chatlist-search"
						placeholder="Search conversations…"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				{/* List */}
				<div className="chatlist-items">
					{loading && <p className="chatlist-status">Loading…</p>}
					{error && <p className="chatlist-status error">{error}</p>}
					{!loading && !error && filtered.length === 0 && (
						<p className="chatlist-status">
							No conversations found.
						</p>
					)}

					{filtered.map((chat, i) => {
						const { participant: p } = chat;
						const fullName = `${p.firstName} ${p.lastName}`;

						return (
							<Chat
								key={chat.id}
								chat={chat}
								activeChatId={activeChatId!}
								onSelectChat={onSelectChat}
								i={i}
								fullName={fullName}
								p={p}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default ChatList;
