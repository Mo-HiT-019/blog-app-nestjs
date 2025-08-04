import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogservice : BlogService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto:CreateBlogDto){
        return this.blogservice.create(dto)
    }

    @Get()
    findAll(){
        return this.blogservice.findAll();
    }

    @Get(':slug')
    findOne(@Param('slug') slug:string){
        return this.blogservice.findBySlug(slug);
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() dto:UpdateBlogDto){
        return this.blogservice.update(id,dto);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return  this.blogservice.remove('id');
    }
    

}
