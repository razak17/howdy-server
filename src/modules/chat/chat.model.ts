import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Chat extends TimeStamps {
	@prop({ type: () => [String] })
	public members: string[];
}

export const ChatModel = getModelForClass(Chat, {
	schemaOptions: { timestamps: true }
});
