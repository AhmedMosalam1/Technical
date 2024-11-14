import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema'
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
    async create(body: CreateUserDto) {
        return await this.userModel.create(body);
    }
    
    async findOne(email: string) {
        return await this.userModel.findOne({ email: email }).select("+password");//to get password in login process

    }
    async findOneById(id: string) {
        return await this.userModel.findOne({ _id: id })

    }
}
