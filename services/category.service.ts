import FetchService from "./fetch.service"

export interface CategoryProps {
    createdAt: string,
    name: string,
    id: number
}

class CategoryService {
    private static _instance?: CategoryService;

    fetchService: FetchService

    private constructor() {
        if (CategoryService._instance)
            throw new Error("Use Singleton.instance instead of new.");
        CategoryService._instance = this;
        this.fetchService = new FetchService('/categories')
    }

    static get instance() {
        return CategoryService._instance ?? (CategoryService._instance = new CategoryService());
    }

    async listAllCategories(): Promise<CategoryProps[]> {
        const result = await this.fetchService.get('/')
        if (result.request.success) {
            return result.data
        }
        throw new Error()
    }
}

export default CategoryService