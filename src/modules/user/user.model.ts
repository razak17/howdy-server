import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Post extends TimeStamps {
	@prop({ required: true })
	public firstName: string;

	@prop({ required: true })
	public lastName: string;

	@prop({ required: true })
	public username: string;

	@prop({ required: true })
	public email: string;

	@prop({ required: true })
	public password: string;

	@prop({ required: true })
	public about: string;

	@prop({ required: true })
	public profilePicture: string;

	@prop({ required: true })
	public coverPicture: string;

	@prop({ required: true })
	public city: string;

	@prop({ required: true })
	public country: string;

	@prop({ required: true })
	public workplace: string;

	@prop({ required: true })
	public relationship: string;

	@prop({ default: false })
	public isAdmin: boolean;

	@prop({ type: () => [String] })
	public followers: string[];

	@prop({ type: () => [String] })
	public following: string[];
}

export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true }
});
