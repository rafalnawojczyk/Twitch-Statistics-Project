import { act, render, screen } from "@testing-library/react";
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

        await act(async () => {
            nicknameInput.focus();
            nicknameInput.blur();
        });
        const errorMessage = await screen.findByText(/Nickname is required/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when password is empty and loses focus", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        await act(async () => {
            passwordInput.focus();
            passwordInput.blur();
        });

        const errorMessage = await screen.findByText(/Password is required/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when email is empty and loses focus", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        await act(async () => {
            emailInput.focus();
            emailInput.blur();
        });
        const errorMessage = await screen.findByText(/Email is required/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows error message when password has 21 characters", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        await act(async () => {
            userEvent.type(passwordInput, "asdasdasdasdasdasdasd");
            passwordInput.focus();
            passwordInput.blur();
        });

        const errorMessage = await screen.findByText(
            /Password must contain less than 20 characters./i
        );

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows no error message when password has 15 characters", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const passwordInput = screen.getByLabelText(/password/i);
        await act(async () => {
            userEvent.type(passwordInput, "asdasdasdasdasd");
            passwordInput.focus();
            passwordInput.blur();
        });

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
        await act(async () => {
            userEvent.type(passwordInput, "asdasd1");
            passwordInput.focus();
            passwordInput.blur();
        });

        const errorMessage = await screen.findByText(
            /Password must contain 8 or more characters./i
        );

        expect(errorMessage).toBeInTheDocument();
    });

    //nickname has to be at least 8 chars. Test 7. 12

    test("shows error message when nickname has less than 8 chars", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const nicknameInput = screen.getByLabelText(/nickname/i);

        await act(async () => {
            userEvent.type(nicknameInput, "asdasd1");
            nicknameInput.focus();
            nicknameInput.blur();
        });
        const errorMessage = await screen.findByText(
            /Your nickname must contain 8 or more characters./i
        );

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows no error message when nickname has more than 8 chars", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const nicknameInput = screen.getByLabelText(/nickname/i);

        await act(async () => {
            userEvent.type(nicknameInput, "asdasdasdasd");
            nicknameInput.focus();
            nicknameInput.blur();
        });
        const errorMessage = screen.queryByText(
            /Your nickname must contain 8 or more characters./i
        );

        expect(errorMessage).not.toBeInTheDocument();
    });

    test("shows error message when email is invalid", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        act(() => {
            userEvent.type(emailInput, "asdasdasdasd");
            emailInput.focus();
            emailInput.blur();
        });
        const errorMessage = await screen.findByText(/Invalid email address/i);

        expect(errorMessage).toBeInTheDocument();
    });

    test("shows no error message when email is valid", async () => {
        render(<LoginForm signup={true} onSubmit={() => {}} />);
        const emailInput = screen.getByLabelText(/Email Address/i);
        act(() => {
            userEvent.type(emailInput, "asdasdasdasd@wp.pl");
            emailInput.focus();
            emailInput.blur();
        });
        const errorMessage = screen.queryByText(/Invalid email address/i);

        expect(errorMessage).not.toBeInTheDocument();
    });

    // test if form is submittable when there is any error shown
});
