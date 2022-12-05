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
        // nicknameInput.focus();
        //  nicknameInput.blur();

        const errorMessage = await screen.findByText(/Nickname is required/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when password is empty and loses focus", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.focus(passwordInput);
        fireEvent.blur(passwordInput);
        // passwordInput.focus();
        // passwordInput.blur();

        const errorMessage = await screen.findByText(/Password is required/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when email is empty and loses focus", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        fireEvent.focus(emailInput);
        fireEvent.blur(emailInput);
        // emailInput.focus();
        // emailInput.blur();

        const errorMessage = await screen.findByText(/Email is required/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when password has 21 characters", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);

        userEvent.type(passwordInput, "asdasdasdasdasdasdasd");
        fireEvent.focus(passwordInput);
        fireEvent.blur(passwordInput);
        // passwordInput.focus();
        // passwordInput.blur();

        const errorMessage = await screen.findByText(
            /Password must contain less than 20 characters./i
        );

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows no error message when password has 15 characters", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);

        userEvent.type(passwordInput, "asdasdasdasdasd");
        fireEvent.focus(passwordInput);
        fireEvent.blur(passwordInput);

        // passwordInput.focus();
        // passwordInput.blur();

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

        userEvent.type(passwordInput, "asdasd1");
        fireEvent.focus(passwordInput);
        fireEvent.blur(passwordInput);
        // passwordInput.focus();
        // passwordInput.blur();

        const errorMessage = await screen.findByText(
            /Password must contain 8 or more characters./i
        );

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when nickname has less than 8 chars", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const nicknameInput = screen.getByLabelText(/nickname/i);

        userEvent.type(nicknameInput, "asdasd1");
        fireEvent.focus(nicknameInput);
        fireEvent.blur(nicknameInput);
        // nicknameInput.focus();
        // nicknameInput.blur();

        const errorMessage = await screen.findByText(
            /Your nickname must contain 8 or more characters./i
        );

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows no error message when nickname has more than 8 chars", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const nicknameInput = screen.getByLabelText(/nickname/i);

        userEvent.type(nicknameInput, "asdasdasdasd");
        fireEvent.focus(nicknameInput);
        fireEvent.blur(nicknameInput);
        // nicknameInput.focus();
        // nicknameInput.blur();

        const errorMessage = screen.queryByText(
            /Your nickname must contain 8 or more characters./i
        );

        expect(errorMessage).not.toBeInTheDocument();
    });

    test("shows error message when email is invalid", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const emailInput = screen.getByLabelText(/Email Address/i);

        userEvent.type(emailInput, "asdasdasdasd");
        fireEvent.focus(emailInput);
        fireEvent.blur(emailInput);
        // emailInput.focus();
        // emailInput.blur();

        const errorMessage = await screen.findByText(/Invalid email address/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows no error message when email is valid", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const emailInput = screen.getByLabelText(/Email Address/i);

        userEvent.type(emailInput, "asdasdasdasd@wp.pl");
        fireEvent.focus(emailInput);
        fireEvent.blur(emailInput);
        // emailInput.focus();
        // emailInput.blur();

        const errorMessage = screen.queryByText(/Invalid email address/i);

        expect(errorMessage).not.toBeInTheDocument();
    });

    // // test if form is submittable when all inputs are invalid/empty

    test("submit button is disabled when password is invalid", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const button = screen.getByRole("button", { name: "Signup" });

        // emailInput.focus();
        fireEvent.focus(emailInput);
        userEvent.type(emailInput, "asdasdasdasd@wp.pl");
        fireEvent.focus(passwordInput);
        // passwordInput.focus();
        userEvent.type(passwordInput, "asd");
        fireEvent.focus(nicknameInput);
        // nicknameInput.focus();
        userEvent.type(nicknameInput, "validnicknameitis");
        // nicknameInput.blur();
        fireEvent.blur(nicknameInput);
        expect(button).toBeDisabled();
    });

    test("submit button is disabled when nickname is invalid", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const button = screen.getByRole("button", { name: "Signup" });

        // emailInput.focus();
        fireEvent.focus(emailInput);
        userEvent.type(emailInput, "asdasdasdasd@wp.pl");
        fireEvent.focus(passwordInput);
        // passwordInput.focus();
        userEvent.type(passwordInput, "asdasdasdasdas");
        fireEvent.focus(nicknameInput);
        // nicknameInput.focus();
        userEvent.type(nicknameInput, "asdasd");
        // nicknameInput.blur();
        fireEvent.blur(nicknameInput);
        expect(button).toBeDisabled();
    });

    test("submit button is disabled when email is invalid", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const button = screen.getByRole("button", { name: "Signup" });

        // emailInput.focus();
        fireEvent.focus(emailInput);
        userEvent.type(emailInput, "asdasdasdas");
        fireEvent.focus(passwordInput);
        // passwordInput.focus();
        userEvent.type(passwordInput, "asdasdasdasdas");
        fireEvent.focus(nicknameInput);
        // nicknameInput.focus();
        userEvent.type(nicknameInput, "asdasdsaasdd");
        // nicknameInput.blur();
        fireEvent.blur(nicknameInput);
        expect(button).toBeDisabled();
    });

    test("submit button is enabled when all inputs are valid", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const nicknameInput = screen.getByLabelText(/nickname/i);
        const checkbox = screen.getByLabelText(/I agree with Terms and Conditions/i);
        const button = screen.getByRole("button", { name: "Signup" });

        // emailInput.focus();
        await userEvent.clear(emailInput);
        await userEvent.type(nicknameInput, "asdasdasdasda");
        await userEvent.type(emailInput, "abcdefg@wp.kl");

        // passwordInput.focus();
        await userEvent.type(passwordInput, "asdasdasdasdas");

        // nicknameInput.focus();

        // nicknameInput.blur();
        fireEvent.click(checkbox);

        await waitFor(() => {
            expect(button).toBeEnabled();
        });
    });

    // test if form is
});
