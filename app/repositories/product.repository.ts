import { injectable } from "tsyringe";
import { ProductModel } from "../models/productModel";


@injectable()
export default class ProductRepository{

    async getAllProducts():Promise<ProductModel[]>{
        return await ProductModel.findAll()
    }

}