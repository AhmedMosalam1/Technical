import { IsEmail , IsString , IsNotEmpty , IsEnum ,IsOptional} from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail({},{message: "Please enter a valid email address"})
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsEnum(['User', 'Admin'], { message: 'role must be either User or Admin' })
    @IsOptional() 
    role?: 'User' | 'Admin';
}
