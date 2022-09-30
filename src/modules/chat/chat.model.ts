import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from '../user/user.model';

export class Chat extends TimeStamps {
	@prop({ required: true, ref: () => User })
	public creatorId: Ref<User>;

	@prop({ type: () => [String] })
	public members: string[];
}

export const ChatModel = getModelForClass(Chat, {
	schemaOptions: { timestamps: true }
});
