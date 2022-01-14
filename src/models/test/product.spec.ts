import { ProductModel } from '../product';

const productModel = new ProductModel()
beforeAll(async () => {
    await productModel.create({
        name: 'tv',
        category: 'electronics',
        price: 8000
    });
})
describe("Product Model", () => {
    it('should have an index method', () => {
        expect(productModel.index).toBeDefined();
    });
    it('should have an create method', () => {
        expect(productModel.create).toBeDefined();
    });
    it('should have an show method', () => {
        expect(productModel.show).toBeDefined();
    });
    it('should have an showByName method', () => {
        expect(productModel.showByName).toBeDefined();
    });

    it('create method should add a new product', async () => {
        const result = await productModel.create({
            name: 'laptop',
            category: 'electronics',
            price: 8000
        });
        expect(result).toEqual({
            id: 2,
            name: 'laptop',
            category: 'electronics',
            price: '8000.00'
        });
    });
    it('index method should get all products', async () => {
        const result = await productModel.index();
        expect(result.length).toBeDefined();
    });
    it('show method should get product by id', async () => {
        const result = await productModel.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'tv',
            category: 'electronics',
            price: '8000.00'
        });
    });
    it('showByName method should get product by name', async () => {
        const result = await productModel.showByName('tv');
        expect(result).toEqual({
            id: 1,
            name: 'tv',
            category: 'electronics',
            price: '8000.00'
        });
    });
})