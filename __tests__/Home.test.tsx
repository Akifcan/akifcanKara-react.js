import React from "react";
import { render, screen, waitFor } from "../test-utils";
import Home from '@/pages/index'
import "isomorphic-fetch"

describe("Home", () => {
    it("Loader should be exists at first frame", () => {
        render(<Home />);
        const loader = screen.getByTestId("loader");
        expect(loader).toBeDefined();
    });
    it("main content should be exists after load", async () => {
        render(<Home />);
        await waitFor(() => screen.getByTestId("main"), { timeout: 10000 })
        const main = screen.getByTestId("main");
        expect(main).toBeDefined();
    });
});