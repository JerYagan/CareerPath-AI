export type SenderType = "me" | "them";

export type Message = {
  id: number;
  text: string;
  sender: SenderType;
  time: string;
  read: boolean;
};

export type Chat = {
  id: number;
  company: string;
  representative: string;
  lastMessage: string;
  lastSeen?: string;
  time: string;
  unread: boolean;
  logo: string;
  messages: Message[];
  online: boolean;
};