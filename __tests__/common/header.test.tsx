import React from "react";
import { render, screen } from "../../test-utils";
import Header from '@/components/common/Header'

describe("Header", () => {
    it("should exists header title", () => {
        render(<Header />);
        const title = screen.getByTestId("title");
        expect(title).toBeDefined();
    });
    it("should exists register link", () => {
        render(<Header />);
        const title = screen.getByTestId("register-title");
        expect(title).toBeDefined();
    });
});