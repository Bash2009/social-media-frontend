const ChatTypeDropdown = ({
	setDropdown,
	setModal,
}: {
	setDropdown: (value: boolean) => void;
	setModal: (value: "private" | "group" | null) => void;
}) => {
	return (
		<div className="chatlist-dropdown">
			<button
				className="chatlist-dropdown-item"
				onClick={() => {
					setDropdown(false);
					setModal("private");
				}}
			>
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				>
					<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
				</svg>
				Private chat
			</button>
			<button
				className="chatlist-dropdown-item"
				onClick={() => {
					setDropdown(false);
					setModal("group");
				}}
			>
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				>
					<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
					<circle cx="9" cy="7" r="4" />
					<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
					<path d="M16 3.13a4 4 0 0 1 0 7.75" />
				</svg>
				Group chat
			</button>
		</div>
	);
};

export default ChatTypeDropdown;
