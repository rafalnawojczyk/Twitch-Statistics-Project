import styles from "./LoginForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleLogo from "../../public/google-icon.png";

interface Values {
    password: string;
    email: string;
}

const LoginForm: React.FC<{ signup: boolean }> = props => {
    const loginWithGoogleHandler = () => {
        alert("LOGIN WITH GOOGLE HERE");
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string()
                .min(8, "Password must contain 8 or more characters.")
                .required("Required"),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form className={styles["login-form"]} onSubmit={formik.handleSubmit}>
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

            <button className={styles["login-form__button"]} type="submit">
                Login
            </button>
            <button
                type="button"
                onClick={loginWithGoogleHandler}
                className={`${styles["login-form__button"]} ${styles["login-form__button--google"]}`}
            >
                <img src={GoogleLogo} />
                Login with Google
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
