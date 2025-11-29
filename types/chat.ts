export type SenderType = "me" | "them";

export type MessageAttachment = {
  uri: string;
  name: string;
  mimeType: string;
};

export type Message = {
  id: number;
  text: string;
  sender: SenderType;
  time: string;
  read: boolean;
  attachment?: MessageAttachment;
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
  unreadCount: number;
};