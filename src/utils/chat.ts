import { Message } from "@/src/types/chat";

export const formatTime = (date: Date): string => {
  const h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, "0");
  const am = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m} ${am}`;
};

export const castMessages = (raw: any[]): Message[] => {
  return raw.map((m): Message => ({
    id: m.id,
    text: m.text,
    sender: m.sender === "me" ? "me" : "them",
    time: m.time,
    read: m.read ?? true,
  }));
};

export const simulateReply = (
  setTyping: (v: boolean) => void,
  setMessages: (fn: (prev: Message[]) => Message[]) => void
) => {
  setTyping(true);

  setTimeout(() => {
    setTyping(false);

    const reply: Message = {
      id: Date.now(),
      text: "Got it!",
      sender: "them",
      time: formatTime(new Date()),
      read: true,
    };

    setMessages((prev) => {
      const markRead = prev.map((m) =>
        m.sender === "me" ? { ...m, read: true } : m
      );

      return [...markRead, reply];
    });
  }, 1500);
};