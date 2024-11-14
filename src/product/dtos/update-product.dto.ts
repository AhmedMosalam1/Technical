import { IsString , IsNotEmpty ,IsNumber , Min, IsOptional} from "class-validator";
export class UpdateProductDto {

    @IsOptional()
    @IsString()
    name?:string;

    @IsOptional()
    @IsString()
    description?:string;
    
    @IsOptional()
    @IsNumber()  
    @Min(0)   
    price?:number;

    @IsOptional()
    @IsString()
    category?:string;

}