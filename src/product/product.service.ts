import { Injectable ,NotFoundException ,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose , { Model } from 'mongoose';
import { Product } from './product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

    // Create a new product
    async createProduct(createProductDto: CreateProductDto) {
        const product = new this.productModel(createProductDto);
        return await product.save();  
    }

    // Get all products
    async getAllProducts() {
        return await this.productModel.find(); 
    }

    // Get a product by its ID
    async getProductById(id: string) {

        if (!mongoose.Types.ObjectId.isValid(id)) { //to handle error if id is wrong
            throw new BadRequestException('Invalid product ID');
        }

        const product = await this.productModel.findById(id);
        
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    // Update a product by ID
    async updateProduct(id: string, updatedProduct: UpdateProductDto) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid product ID');
          }
        const product = await this.productModel.findByIdAndUpdate(id, updatedProduct, { new: true }).exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    // Delete all products
    async deleteAllProducts() {
         await this.productModel.deleteMany();
        return 'All products deleted successfully';
    }

    // Delete a single product by ID
    async deleteOneProduct(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid product ID');
          }

         await this.productModel.findByIdAndDelete(id);
         
        return 'Product deleted successfully';
    }
}
