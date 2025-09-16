// src/models/Conversation.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IConversation extends Document {
  participants: Types.ObjectId[];
  project?: Types.ObjectId;
  createdAt: Date;
}
const ConversationSchema = new Schema<IConversation>({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  project: { type: Schema.Types.ObjectId, ref: 'Project' }
}, { timestamps: true });

export default model<IConversation>('Conversation', ConversationSchema);

// Message model
// src/models/Message.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  conversation: Types.ObjectId;
  sender: Types.ObjectId;
  text?: string;
  attachments?: { filename: string; url: string }[];
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: String,
  attachments: [{ filename: String, url: String }]
}, { timestamps: true });

export default model<IMessage>('Message', MessageSchema);
