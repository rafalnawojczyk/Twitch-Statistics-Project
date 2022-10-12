import styles from "./LoginForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleLogo from "../../public/google-icon.png";
import { ReactElement } from "react";

const LoginForm: React.FC<{ signup: boolean }> = props => {
    const loginWithGoogleHandler = () => {
        alert("LOGIN WITH GOOGLE HERE");
    };

    const initialValues = props.signup
        ? {
              email: "",
              password: "",
              name: "",
          }
        : {
              email: "",
              password: "",
          };
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string()
                .min(8, "Password must contain 8 or more characters.")
                .required("Required"),
            name: Yup.string().min(8, "Your nickname must contain 8 or more characters."),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    let formMarkup: ReactElement;
    let buttonTitle: string;

    // if (props.signup === "LOGIN") {

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
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

            <label htmlFor="name">name Address</label>
            <input
                id="name"
                name="name"
                type="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

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
        </>
    );

    // if (props.signup === "SIGNUP") {
    if (!props.signup) {
        buttonTitle = "Signup";

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

{
    /* <div>
<label>
    <Field type="checkbox" name="checked" value="Remember me" />
    Remember me
</label>
<Link href="/login/new-password">Forgot password</Link>
</div> */
}
