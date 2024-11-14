import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/user.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;
    
    @Prop({ required: true })
    price: number;

    @Prop()
    category: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'User'})
    createdBy: User;
}


export const ProductSchema = SchemaFactory.createForClass(Product);