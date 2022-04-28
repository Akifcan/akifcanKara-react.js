import React from "react";
import { render, screen, waitFor } from "../test-utils";
import ProductDetail from '@/pages/product/[slug]'
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe("Product Detail", () => {

    beforeAll(() => {
        useRouter.mockImplementationOnce(() => ({
            query: { slug: '1' },
        }))
    })

    it("Loader should be exists at first frame", () => {
        render(<ProductDetail />);
        const loader = screen.getByTestId("loader");
        expect(loader).toBeDefined();
    });
    // it("main content should be exists after load", async () => {
    //     render(<Home />);
    //     await waitFor(() => screen.getByTestId("main"), { timeout: 10000 })
    //     const main = screen.getByTestId("main");
    //     expect(main).toBeDefined();
    // });
});