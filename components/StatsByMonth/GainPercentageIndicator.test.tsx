import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GainPercentageIndicator from "./GainPercentageIndicator";

describe("GainPercentageIndicator component", () => {
    test("is passing class to div element from props", () => {
        render(<GainPercentageIndicator actualAmount={100} prevAmount={200} className={"class"} />);
        const divElement = screen.getByTestId("gain-wrapper");
        expect(divElement.classList.contains("class")).toBe(true);
        expect(divElement.classList.contains("percentage")).toBe(true);
    });
});
