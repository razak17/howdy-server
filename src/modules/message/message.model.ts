import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Chat } from '../chat/chat.model';
import { User } from '../user/user.model';

export class Message extends TimeStamps {
	@prop({ required: true, ref: () => Chat })
	public chatId: Ref<Chat>;

	@prop({ required: true, ref: () => User })
	public senderId: Ref<User>;

	@prop({ required: true, ref: () => User })
	public receiverId: Ref<User>;

	@prop({ required: true })
	public description: string;
}

export const MessageModel = getModelForClass(Message, {
	schemaOptions: { timestamps: true }
});
