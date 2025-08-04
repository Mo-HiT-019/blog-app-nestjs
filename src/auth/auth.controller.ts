import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('register')
    register(@Body() dto:CreateAdminDto ){
        return this.authService.registerAdmin(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto:LoginAdminDto){
        return this.authService.login(dto);
    }

}
