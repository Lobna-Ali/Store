import { Product, ProductModel } from "../../models/product";

const productModel = new ProductModel();

/**
 * get all products
 * @returns Promise<Product[] | null>
 */
export const getAllProducts = async (): Promise<Product[] | null> => {
  try {
    const products = await productModel.index();

    return products;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * get certain product by ID
 * @param { number } id
 * @returns Promise<Product[] | null>
 */
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const user = await productModel.show(id);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * get certain product by Name
 * @param { number } id
 * @returns Promise<Product[] | null>
 */
export const getProductByName = async (
  name: string
): Promise<Product | null> => {
  try {
    const product = await productModel.showByName(name);

    return product;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * create new product by calling Model file
 * @param {Product} product
 * @returns Promise<Product | null>
 */
export const createProduct = async (
  product: Product
): Promise<Product | null> => {
  try {
    const productCreated = await productModel.create(product);

    return productCreated;
  } catch (error) {
    throw new Error(error);
  }
};
