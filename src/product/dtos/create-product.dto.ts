import { IsString , IsNotEmpty ,IsNumber , Min, IsOptional} from "class-validator";
import { Types } from 'mongoose';
export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsString()
    @IsOptional()   
    description?:string;

    @IsNotEmpty()
    @IsNumber()  
    @Min(0)   
    price:number;

    @IsString()
    @IsOptional()
    category?:string;

    createdBy?:Types.ObjectId;
}