import StatsTitle from "./StatsTitle";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Stats title component", () => {
    test("renders given title as a heading", () => {
        render(<StatsTitle title={"Title"} />);
        const headingElement = screen.getByText("Title", { exact: true });
        expect(headingElement).toBeInTheDocument();
    });
});
