import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product , ProductSchema } from './product.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name:Product.name , schema:ProductSchema }]),
    UserModule,
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
