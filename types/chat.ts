export type RawMessage = {
  id: number;
  text: string;
  sender: string;
  time: string;
  read?: boolean;
};

export type Message = {
  id: number;
  text: string;
  sender: "me" | "them";
  time: string;
  read?: boolean;
};

export type Chat = {
  id: number;
  company: string;
  representative: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  logo?: string;
  lastSeen?: string;
  messages: RawMessage[];
};