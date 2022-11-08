import styles from "./LoginForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
const GoogleLogo = require("../../public/google-icon.png");
import { ReactElement } from "react";
import Link from "next/link";

type LoginFormProps = { signup: boolean };

const LoginForm = ({ signup }: LoginFormProps) => {
    const loginWithGoogleHandler = () => {
        alert("LOGIN WITH GOOGLE HERE");
    };

    const initialValues = signup
        ? {
              email: "",
              password: "",
              name: "",
              checkbox: false,
          }
        : {
              email: "",
              password: "",
              checkbox: false,
          };

    const validationSchema = signup
        ? Yup.object({
              email: Yup.string().email("Invalid email address").required("Email is required"),
              password: Yup.string()
                  .min(8, "Password must contain 8 or more characters.")
                  .required("Password is required"),
              name: Yup.string()
                  .min(8, "Your nickname must contain 8 or more characters.")
                  .required("Nickname is required"),
              checkbox: Yup.bool()
                  .oneOf([true], "Accept Terms & Conditions is required")
                  .required("Accept Terms & Conditions is required"),
          })
        : Yup.object({
              email: Yup.string().email("Invalid email address").required("Email is required"),
              password: Yup.string()
                  .min(8, "Password must contain 8 or more characters.")
                  .required("Password is required"),
              checkbox: Yup.bool().oneOf([true, false], ""),
          });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    let formMarkup: ReactElement;
    let buttonTitle: string;

    // if (signup === "LOGIN") {

    buttonTitle = "Signup";
    formMarkup = (
        <>
            <label htmlFor="name">Nickname</label>
            <input
                id="name"
                name="name"
                type="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
            ) : null}

            <div className={`${styles["login-form__checkbox"]} ${styles["margin-top"]}`}>
                <input
                    id="checkbox"
                    name="checkbox"
                    type="checkbox"
                    // @ts-ignore
                    value={formik.values.checkbox}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <label htmlFor="checkbox">
                    I agree with <Link href="/terms">Terms and Conditions</Link>
                </label>
                {formik.touched.checkbox && formik.errors.checkbox ? (
                    <div>{formik.errors.checkbox}</div>
                ) : null}
            </div>
        </>
    );

    // if (signup === "SIGNUP") {
    if (!signup) {
        buttonTitle = "Login";

        formMarkup = (
            <>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}

                <div className={styles["login-form__remember-box"]}>
                    <div className={styles["login-form__checkbox"]}>
                        <input
                            id="checkbox"
                            name="checkbox"
                            type="checkbox"
                            // @ts-ignore
                            value={formik.values.checkbox}
                        />
                        <label htmlFor="checkbox">Remember me</label>
                    </div>
                    <Link href="/login/new-password">Recovery password</Link>
                </div>
            </>
        );
    }

    return (
        <form className={styles["login-form"]} onSubmit={formik.handleSubmit}>
            {formMarkup}
            <button className={styles["login-form__button"]} type="submit">
                {buttonTitle}
            </button>
            <button
                type="button"
                onClick={loginWithGoogleHandler}
                className={`${styles["login-form__button"]} ${styles["login-form__button--google"]}`}
            >
                <div className={styles["login-form__button--wrapper"]}>
                    <img src={GoogleLogo} />
                    {`${buttonTitle} with Google`}
                </div>
            </button>
        </form>
    );
};

export default LoginForm;
