import { Controller, Post, Body, Param, Get, Patch, Delete, UseGuards, Request, UnauthorizedException ,NotFoundException  } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

@UseGuards(AuthGuard) // Protect all routes with AuthGuard by default
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    // Create a new product, with user info from AuthGuard
    @Post()
    async createProduct(@Body() body: CreateProductDto, @Request() req) {
        const userId = req.user?.id;
        if (!userId) {
            throw new UnauthorizedException('User not authenticated');
        }

        // Assign the user who created the product
        body.createdBy = userId;

        const product = await this.productService.createProduct(body);
        return { product };
    }

    // Get all products
    @Get()
    async getAllProducts() {
        const products = await this.productService.getAllProducts();
        return { products };
    }

    // Get a single product by its ID
    @Get(":id")
    async getOneProduct(@Param('id') id: string) {
        const product = await this.productService.getProductById(id);
        return { product };
    }

    // Update a product by its ID
    @Patch(":id")
    async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
        const product = await this.productService.updateProduct(id, body);
        return { product };
    }

    // Delete all products (only accessible by admin roles)
    @UseGuards(RoleGuard)
    @Delete()
    async deleteAllProducts() {
        await this.productService.deleteAllProducts();
        return { message: 'All products have been deleted' };
    }

    // Delete a single product by its ID (only accessible by admin roles)
    @UseGuards(RoleGuard)
    @Delete(':id')
    async deleteOneProduct(@Param('id') id: string) {
        await this.productService.deleteOneProduct(id);
        return { message: `Product with ID ${id} has been deleted` };
    }
}
