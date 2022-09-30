import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { customAlphabet } from 'nanoid';
import { User } from '../user/user.model';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

export class Message extends TimeStamps {
	@prop({ unique: true, default: () => nanoid() })
	public messageId: string;

	@prop({ required: true, ref: () => User })
	public senderId: Ref<User>;

	@prop({ required: true })
	public description: string;
}

export const MessageModel = getModelForClass(Message, {
	schemaOptions: { timestamps: true }
});
