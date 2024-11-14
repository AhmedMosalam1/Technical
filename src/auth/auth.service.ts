import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dtos/create-user.dto'
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async register(body:CreateUserDto){
        const existUser = await this.userService.findOne(body.email);
        if(existUser){
            throw new ConflictException('Email is already in use. Please enter another email.');
        }
        await this.userService.create(body);
        return {message: 'User Registered Successful'};
    }

    async login(body:LoginDto){
        
        const user = await this.userService.findOne(body.email);

        if(!user || !(await compare(body.password,user.password))){
            throw new UnauthorizedException('Invalid email or password');//NotFoundException
        }
        const token = this.jwtService.sign({id:user._id,role:user.role})
        return { token }
    }
}
