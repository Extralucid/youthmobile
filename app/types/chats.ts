// types/chat.ts
export type Message = {
  id: string;
  text: string;
  time: string;
  sender: 'me' | 'other';
  senderName?: string;
};

export type ChatRoom = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isGroup: boolean;
  avatar: string;
  members?: string[];
};

// Navigation Types
export type RootStackParamList = {
  ChatRoomList: undefined;
  ChatConversation: { roomId: string; roomName: string };
};

// Socket.io Types
export interface SocketClient {
  on: (event: string, callback: (data: any) => void) => void;
  emit: (event: string, data: any) => void;
  disconnect: () => void;
}