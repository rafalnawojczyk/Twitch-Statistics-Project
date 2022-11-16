import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import StatsLabel from "./StatsLabel";

describe("Stats label component", () => {
    test("renders given title", () => {
        render(<StatsLabel title={"Title"} />);
        const spanElement = screen.getByText("Title", { exact: true });
        expect(spanElement).toBeInTheDocument();
    });

    test("adds class from props", () => {
        render(<StatsLabel title={"Title"} className={"class"} />);
        const spanElement = screen.getByText("Title", { exact: true });
        expect(spanElement.classList.contains("class")).toBe(true);
    });

    test("is not adding upperTitle class when its false", () => {
        render(<StatsLabel title={"Title"} upperTitle={false} />);
        const spanElement = screen.getByText("Title", { exact: true });
        expect(spanElement.classList.contains("title__upper")).toBe(false);
    });

    test("is adding upperTitle class when its true", () => {
        render(<StatsLabel title={"Title"} upperTitle={true} />);
        const spanElement = screen.getByText("Title", { exact: true });
        expect(spanElement.classList.contains("title__upper")).toBe(true);
    });
});
