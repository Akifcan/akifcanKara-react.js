import React from "react";
import { render, screen, waitFor } from "../test-utils";
import ProductDetail from '@/pages/product/[slug]'
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe("Product Detail", () => {

    beforeAll(() => {
        useRouter.mockImplementation(() => ({
            query: { slug: '1' },
            prefetch: jest.fn(() => Promise.resolve()),
        }))

    })

    it("Loader should be exists at first frame", () => {
        render(<ProductDetail />);
        const loader = screen.getByTestId("loader");
        expect(loader).toBeDefined();
    });
    it("main content should be exists after load", async () => {
        render(<ProductDetail />);
        await waitFor(() => screen.getByTestId("product-details"), { timeout: 10000 })
        const main = screen.getByTestId("product-details")
        expect(main).toBeDefined();
    });
});