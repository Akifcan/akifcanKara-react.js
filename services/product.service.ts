import FetchService from "./fetch.service"

export interface ProductProps {
    createdAt: number,
    name: string,
    id: number,
    avatar: string,
    developerEmail: string,
    category: string,
    description: string,
    price: string
}

export interface CreateProductDto {
    name: string,
    price: number,
    category: string,
    description: string,
    avatar: string,
    developerEmail: string,
}

class ProductService {
    private static _instance?: ProductService;

    fetchService: FetchService

    private constructor() {
        if (ProductService._instance)
            throw new Error("Use Singleton.instance instead of new.");
        ProductService._instance = this;
        this.fetchService = new FetchService('/products')
    }

    static get instance() {
        return ProductService._instance ?? (ProductService._instance = new ProductService());
    }

    async listAllProducts(): Promise<ProductProps[]> {
        const result = await this.fetchService.get('/')
        if (result.request.success) {
            return result.data
        }
        throw new Error()
    }

    async listProduct(id: string): Promise<ProductProps> {
        const result = await this.fetchService.get(`/${id}`)
        if (result.request.success) {
            return result.data
        }
        window.location.href = '/404'
        throw new Error()
    }

    async createProduct(createProduct: CreateProductDto): Promise<boolean> {
        const result = await this.fetchService.post('/', createProduct)
        console.log(result);
        return result.request.success
    }
}

export default ProductService