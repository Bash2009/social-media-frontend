export interface ChatStructure {
	id: string;
	participant: {
		uid: string;
		firstName: string;
		lastName: string;
		username: string;
		avatarUrl?: string;
		online: boolean;
	};
	lastMessage: string;
	lastMessageAt: string;
	unread: number;
}

export type Modal = "private" | "group" | null;
export type UserStatus = "idle" | "loading" | "found" | "not_found";

export interface Participant {
	uid: string;
	firstName: string;
	lastName: string;
	username: string;
	avatarUrl?: string;
}

export interface NewChatModalProps {
	onClose: () => void;
	onStart: (username: string) => void;
	onSearch: (username: string) => void;
	userStatus: UserStatus;
	foundUser?: Participant;
}

export interface NewGroupModalProps {
	onClose: () => void;
	onStart: (name: string, participants: Participant[]) => void;
	onSearch: (username: string) => void;
	searchStatus: UserStatus;
	foundUser?: Participant;
}
