import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from '../user/user.model';

export class Post extends TimeStamps {
	@prop({ required: true, ref: () => User })
	public owner: string;

	@prop({ required: true })
	public description: string;

	@prop({ type: () => [String] })
	public likes: string[];

	@prop()
	public image?: string;
}

export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true }
});
