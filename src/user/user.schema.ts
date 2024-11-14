import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { hash } from 'bcrypt';

export type UserDocument = HydratedDocument<User>;


@Schema()
export class User {
    @Prop({ required: true , unique: true })
    email: string;

    @Prop({ required: true , select:false})
    password: string;
    
    @Prop({ default:'User' })
    role: string;
}


export const UserSchema = SchemaFactory.createForClass(User);

//hash password every time a new user is created or updated
UserSchema.pre<UserDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
   
    this.password = await hash(this.password, 12);
    next();
});

