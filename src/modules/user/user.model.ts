import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class User extends TimeStamps {
	@prop({ required: true })
	public firstName: string;

	@prop({ required: true })
	public lastName: string;

	@prop({ required: true, unique: true })
	public username: string;

	@prop({ required: true, unique: true })
	public email: string;

	@prop({ required: true })
	public password: string;

	@prop()
	public about: string;

	@prop()
	public profilePicture: string;

	@prop()
	public coverPicture: string;

	@prop()
	public city: string;

	@prop()
	public country: string;

	@prop()
	public workplace: string;

	@prop()
	public relationship: string;

	@prop({ default: false })
	public isAdmin: boolean;

	@prop({ type: () => [String] })
	public followers: string[];

	@prop({ type: () => [String] })
	public following: string[];
}

export const UserModel = getModelForClass(User, {
	schemaOptions: { timestamps: true }
});
