import { ProductModel } from '../../../models/product';
import { createProduct, getAllProducts, getProductById, getProductByName } from "../../product/product";

describe("Product functions", () => {
    const productModel = new ProductModel();
    beforeAll(async() => {
        await productModel.create({
            name: 'tv',
            category: 'elec',
            price: 8000
        });
      })
    it('should have getAllProducts method', () => {
        expect(getAllProducts).toBeDefined();
    });
    it('should return all products', async () => {
        const result = await getAllProducts();
        expect(result).toBeDefined();
    });

    it('should have getProductById method', () => {
        expect(getProductById).toBeDefined();
    });
    it('should return product if exist if not will return undefined', async () => {
        const result = await getProductById(1);
        expect(result).toBeDefined();
    });
    it('should have getProductByName method', () => {
        expect(getProductByName).toBeDefined();
    });

    it('should have createProduct method', () => {
        expect(createProduct).toBeDefined();
    });
    it('should return product after creation', async () => {
        const result = await createProduct({
            name: 'Iphone',
            category: 'elec',
            price: 20000
        });
        expect(result).toBeDefined();
    });
})