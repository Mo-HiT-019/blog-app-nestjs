import { IsOptional , IsArray, IsString} from 'class-validator';

export class CreateBlogDto{

    @IsString()
    title:string;

    @IsString()
    content:string;

    @IsOptional()
    @IsArray()
    tags?:string[]

    @IsString()
    @IsOptional()
    imageUrl?:string;

}