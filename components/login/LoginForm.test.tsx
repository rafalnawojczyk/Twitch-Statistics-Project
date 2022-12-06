import { act, render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

describe("LoginForm component", () => {
    test("shows nickname, email and password textboxes on signup", () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);

        expect(passwordInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(nicknameInput).toBeInTheDocument();
    });

    test("shows email and password textboxes on login", () => {
        render(<LoginForm signup={false} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);

        expect(passwordInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
    });

    test("shows error message when nickname is empty and loses focus", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const nicknameInput = screen.getByLabelText(/nickname/i);

        fireEvent.focus(nicknameInput);
        fireEvent.blur(nicknameInput);

        const errorMessage = await screen.findByText(/Nickname is required/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when password is empty and loses focus", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.focus(passwordInput);
        fireEvent.blur(passwordInput);

        const errorMessage = await screen.findByText(/Password is required/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when email is empty and loses focus", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        fireEvent.focus(emailInput);
        fireEvent.blur(emailInput);

        const errorMessage = await screen.findByText(/Email is required/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when password has 21 characters", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const user = userEvent.setup();

        user.type(passwordInput, "asdasdasdasdasdasdasd");
        fireEvent.focus(passwordInput);
        fireEvent.blur(passwordInput);

        const errorMessage = await screen.findByText(
            /Password must contain less than 20 characters./i
        );

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows no error message when password has 15 characters", () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const user = userEvent.setup();

        user.type(passwordInput, "asdasdasdasdasd");
        fireEvent.focus(passwordInput);
        fireEvent.blur(passwordInput);

        const errorMessageShort = screen.queryByText(
            /Password must contain 8 or more characters./i
        );

        const errorMessageLong = screen.queryByText(
            /Password must contain less than 20 characters./i
        );

        expect(errorMessageShort).toBeNull();
        expect(errorMessageLong).toBeNull();
    });

    test("shows error message when password has 7 characters", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const user = userEvent.setup();

        user.type(passwordInput, "asdasd1");
        fireEvent.focus(passwordInput);
        fireEvent.blur(passwordInput);

        const errorMessage = await screen.findByText(
            /Password must contain 8 or more characters./i
        );

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when nickname has less than 8 chars", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const user = userEvent.setup();

        user.type(nicknameInput, "asdasd1");
        fireEvent.focus(nicknameInput);
        fireEvent.blur(nicknameInput);

        const errorMessage = await screen.findByText(
            /Your nickname must contain 8 or more characters./i
        );

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows no error message when nickname has more than 8 chars", () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const user = userEvent.setup();

        user.type(nicknameInput, "asdasdasdasd");
        fireEvent.focus(nicknameInput);
        fireEvent.blur(nicknameInput);

        const errorMessage = screen.queryByText(
            /Your nickname must contain 8 or more characters./i
        );

        expect(errorMessage).not.toBeInTheDocument();
    });

    test("shows error message when email is invalid", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const user = userEvent.setup();

        user.type(emailInput, "asdasdasdasd");
        fireEvent.focus(emailInput);
        fireEvent.blur(emailInput);

        const errorMessage = await screen.findByText(/Invalid email address/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows no error message when email is valid", () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const user = userEvent.setup();

        user.type(emailInput, "asdasdasdasd@wp.pl");
        fireEvent.focus(emailInput);
        fireEvent.blur(emailInput);

        const errorMessage = screen.queryByText(/Invalid email address/i);

        expect(errorMessage).not.toBeInTheDocument();
    });

    test("submit button is disabled when password is invalid", () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const button = screen.getByRole("button", { name: "Signup" });
        const user = userEvent.setup();

        fireEvent.focus(emailInput);
        user.type(emailInput, "asdasdasdasd@wp.pl");

        fireEvent.focus(passwordInput);
        user.type(passwordInput, "asd");

        fireEvent.focus(nicknameInput);
        user.type(nicknameInput, "validnicknameitis");
        fireEvent.blur(nicknameInput);

        expect(button).toBeDisabled();
    });

    test("submit button is disabled when nickname is invalid", () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const button = screen.getByRole("button", { name: "Signup" });
        const user = userEvent.setup();

        fireEvent.focus(emailInput);
        user.type(emailInput, "asdasdasdasd@wp.pl");

        fireEvent.focus(passwordInput);
        user.type(passwordInput, "asdasdasdasdas");

        fireEvent.focus(nicknameInput);
        user.type(nicknameInput, "asdasd");
        fireEvent.blur(nicknameInput);

        expect(button).toBeDisabled();
    });

    test("submit button is disabled when email is invalid", () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const button = screen.getByRole("button", { name: "Signup" });
        const user = userEvent.setup();

        fireEvent.focus(emailInput);
        user.type(emailInput, "asdasdasdas");

        fireEvent.focus(passwordInput);
        user.type(passwordInput, "asdasdasdasdas");

        fireEvent.focus(nicknameInput);
        user.type(nicknameInput, "asdasdsaasdd");
        fireEvent.blur(nicknameInput);

        expect(button).toBeDisabled();
    });

    test("submit button is disabled when checkbox is double clicked", () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const button = screen.getByRole("button", { name: "Signup" });
        const checkbox = screen.getByLabelText(/I agree with Terms and Conditions/i);
        const user = userEvent.setup();

        fireEvent.focus(emailInput);
        user.type(emailInput, "asdasdasdasd@wp.pl");

        fireEvent.focus(passwordInput);
        user.type(passwordInput, "asdasdasdasdas");

        fireEvent.focus(nicknameInput);
        user.type(nicknameInput, "asdasdasdasd");
        fireEvent.blur(nicknameInput);

        expect(button).toBeDisabled();
    });

    test("submit button is enabled when all inputs are valid", () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const checkbox = screen.getByLabelText(/I agree with Terms and Conditions/i);
        const button = screen.getByRole("button", { name: "Signup" });
        const user = userEvent.setup();

        user.type(emailInput, "abcdefg@wp.kl");
        user.type(nicknameInput, "asdasdasdasda");
        user.type(passwordInput, "asdasdasdasdas");

        fireEvent.click(checkbox);

        expect(button).toBeEnabled();
    });
});
