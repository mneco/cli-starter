import { DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { omit } from "lodash";

@modelOptions({
	schemaOptions: { timestamps: true },
})
export class User {
	@prop({ index: true, lowercase: true })
	email?: string;

	@prop({ required: true, index: true })
	name!: string;

	@prop({ index: true, unique: true })
	token?: string;

	strippedAndFilled(
		this: DocumentType<User>,
		{ withExtra = false, withToken = true }: { withExtra?: boolean; withToken?: boolean } = {}
	) {
		const stripFields = ["createdAt", "updatedAt", "__v"];
		if (!withExtra) {
			stripFields.push("token");
			stripFields.push("email");
		}
		if (!withToken) {
			stripFields.push("token");
		}
		return omit(this.toObject(), stripFields);
	}
}

export const UserModel = getModelForClass(User);

export async function findOrCreateUser(loginOptions: { name: string; email?: string }) {
	const user = await UserModel.findOneAndUpdate(
		loginOptions,
		{},
		{
			upsert: true,
			new: true,
		}
	);
	if (!user) {
		throw new Error("User not found");
	}
	return user;
}
