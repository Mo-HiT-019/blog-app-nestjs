import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto'; 
import * as bcrypt from 'bcrypt';
import passport from 'passport';
import { LoginAdminDto } from './dto/login-admin.dto';
import { access } from 'fs';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Admin)
        private adminRepo:Repository<Admin>,
        private jwtService:JwtService
    ){}

    async registerAdmin(dto:CreateAdminDto){
        const existing = await this.adminRepo.findOne({where:{email:dto.email}})
        if(existing) throw new ConflictException('Admin of this mail id already exists ');

        const hashed = await bcrypt.hash(dto.password,10);
        const admin = this.adminRepo.create({...dto,password:hashed})
        return this.adminRepo.save(admin)
    }

    async login(dto:LoginAdminDto){
        const admin=await this.adminRepo.findOne({where:{email:dto.email}})
        if(!admin) throw new UnauthorizedException('Invalid credentials');

        const match=await bcrypt.compare(dto.password,admin.password);
        if(!match) throw new UnauthorizedException('Invalid credentials');

        const payload= {sub:admin.id, email:admin.email};
        const token = this.jwtService.sign(payload);

        return {
            accessToken:token,
            admin:{
                id:admin.id,
                email:admin.email
            }
        }
    }
}
