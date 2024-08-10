import { container } from "tsyringe";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import ProductRepository from "../repositories/product.repository";


container.registerSingleton<UserRepository>("UserRepository", UserRepository);
container.registerSingleton<UserService>("UserService", UserService);

container.registerSingleton<ProductRepository>("UserService", ProductRepository);
container.registerSingleton<ProductRepository>("UserService", ProductRepository);
