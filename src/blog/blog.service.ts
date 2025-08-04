import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Not, Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';


@Injectable()
export class BlogService {
    constructor (
        @InjectRepository(Blog)
        private blogRepository:Repository<Blog>
    ){}

    generateSlug(title:string):string{
        return title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    async create(createBlogDto:CreateBlogDto):Promise<Blog>{

        const slug = this.generateSlug(createBlogDto.title);
        const blog= this.blogRepository.create({...createBlogDto,slug});
        return this.blogRepository.save(blog);

    }

    async findAll():Promise<Blog[]>{
        return this.blogRepository.find({order:{createdAt:'DESC'}})
    } 

    async findBySlug(slug:string):Promise<Blog>{
        const blog = await this.blogRepository.findOne({where:{slug}});
        if(!blog){
            throw new NotFoundException('Blog not found');
        }
        return blog;
    }

    async update(id:string,updateDto:UpdateBlogDto):Promise<Blog>{
        const blog = await this.blogRepository.preload({
            id,
            ...updateDto,
            slug:updateDto.title? this.generateSlug(updateDto.title):undefined
        });
        if(!blog){
            throw new NotFoundException('Blog not found for the update')
        }
        return this.blogRepository.save(blog);
    }

    async remove(id:string):Promise<void>{
        const blog = await this.blogRepository.findOne({where:{id}})
        if(!blog) throw new NotFoundException('Blog for deletion not found');
        await this.blogRepository.remove(blog);
    }

}



