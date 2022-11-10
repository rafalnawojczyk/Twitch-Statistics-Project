import { render, screen } from "@testing-library/react";
import StatsLabel from "./StatsLabel";
import "@testing-library/jest-dom";

// check if it renders title span
// check if upperTitle class login works as intended
// check for both upperTitle classes

describe("Stats label component", () => {
    test("renders given title", () => {
        render(<StatsLabel title={"Title"} />);
        const spanElement = screen.getByText("Title", { exact: true });
        expect(spanElement).toBeInTheDocument();
    });
});
