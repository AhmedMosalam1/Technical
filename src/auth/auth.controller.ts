import { Controller } from '@nestjs/common';
import { Body , Post  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: LoginDto){
        return this.authService.login(body);
    }
}
