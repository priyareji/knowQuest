export interface CreateConversation {
  studentId: string;
  studentName: string;
  instructorId: string;
  instructorName: string;
  comment : {
      sender: string;
      message: string;
  }
}
export interface mConversation {
  senderId: string;
  senderName: string;
  recieverId: string;
  receiverName: string;
  comment : {
      sender: string;
      message: string;
  }
}

export interface ConversationUpdate {
  sender: string;
  message: string;
}

export interface CommentConversation {
  _id: string;
  sender: string;
  message: string;
  time: Date;
}

export interface Conversation {
  _id: string;
  studentId: string;
  studentName: string;
  instructorId: string;
  instructorName: string;
  conversation: CommentConversation[];
  lastUpdated: Date;
}

export interface CommentUser {
  userId: string;
  name: string;
  userType: 'instructor' | 'student';
  subjects: {subjectId: string, subjectName: string}[];
}
