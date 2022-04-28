import React from "react";
import { render, screen } from "../../../test-utils";
import FormInput from '@/components/common/form/FormInput'

describe("Form Input", () => {
    it("Error Message Should be Appear if error message not empty", () => {
        render(<FormInput isRequired={false} errorMessage='Please fill this area'>
            <input placeholder="Testing input" />
        </FormInput>);
        const p = screen.getByTestId("error-message");
        expect(p).toBeDefined();
    })
    it("Error Message Shouldn't be Appear if error message is empty", () => {
        const { queryByTestId } = render(<FormInput isRequired={false} errorMessage=''>
            <input placeholder="Testing input" />
        </FormInput>);
        expect(queryByTestId('error-message')).toBeNull();
    })
});