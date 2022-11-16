import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

// check if type is properly passed from props to component
// check for undefined, button, submit, reset
// check if button gets className from props

describe("Button component", () => {
    // test("is passing class to span element from props", () => {
    //     render(<Button actualAmount={70} maxAmount={100} className={"class"} />);
    //     const spanElement = screen.getByTestId("color-span");
    //     expect(spanElement.classList.contains("class")).toBe(true);
    // });
    // test("is passing class to div element from props", () => {
    //     render(<Button actualAmount={70} maxAmount={100} divClassName={"class"} />);
    //     const divElement = screen.getByTestId("color-bar-wrapper");
    //     expect(divElement.classList.contains("class")).toBe(true);
    //     expect(divElement.classList.contains("color-bar")).toBe(true);
    // });
    // test("adds proper width value to span", () => {
    //     const actualAmount = 70;
    //     const maxAmount = 100;
    //     const diffValue = +(actualAmount / maxAmount).toFixed(2) * 100;
    //     render(<Button actualAmount={actualAmount} maxAmount={maxAmount} className={"class"} />);
    //     const spanElement = screen.getByTestId("color-span");
    //     expect(spanElement.style.width === `${diffValue}%`).toBe(true);
    // });
});
