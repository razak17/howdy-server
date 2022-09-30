import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from '../user/user.model';

export class Post extends TimeStamps {
	@prop({ required: true, ref: () => User })
	public userId: Ref<User>;

	@prop({ required: true })
	public description: string;

	@prop({ type: () => [String] })
	public likes: string[];

	@prop({ type: () => [String] })
	public dislikes: string[];

	@prop()
	public image?: string;
}

export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true }
});
