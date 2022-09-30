import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Post extends TimeStamps {
	@prop({ required: true })
	public userId: string;

	@prop({ required: true })
	public description: string;

	@prop({ type: () => [String] })
	public likes: string[];

	@prop()
	public image: string;
}

export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true }
});
