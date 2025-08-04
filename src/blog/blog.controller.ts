import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogservice : BlogService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto:CreateBlogDto){
        return this.blogservice.create(dto)
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(){
        return this.blogservice.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':slug')
    findOne(@Param('slug') slug:string){
        return this.blogservice.findBySlug(slug);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id:string, @Body() dto:UpdateBlogDto){
        return this.blogservice.update(id,dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id:string){
        return  this.blogservice.remove(id);
    }
    

}
