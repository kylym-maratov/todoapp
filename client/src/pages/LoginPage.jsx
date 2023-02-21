import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { AppContext } from "../store";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Loading } from "../components/Loading";
import { useAxios } from "../api/api";
import { useAuth } from "../hooks/use.auth";

const style = {
    main: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        boxShadow: 2,
        borderRadius: 3,
        p: 4,
    },
    separate: {
        marginTop: 2
    }
}


export const LoginPage = () => {
    const { state } = useContext(AppContext);
    const { isDarkTheme, loading } = state;
    const { requestApi } = useAxios();
    const { login } = useAuth();

    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required()
    });

    const formik = useFormik({
        initialValues: {
            email: "", password: ""
        },
        validationSchema: validationSchema,
        onSubmit: submitHandler
    });

    async function submitHandler(values) {
        const { data } = await requestApi("/api/user/login", "POST", { ...values });

        login(data.user, data.accessToken);
    }

    return (
        <>
            <Box sx={{ ...style.main, background: isDarkTheme ? "#212120" : "white" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img alt="logo" src={logo} style={{ height: "120px", width: "120px", marginBottom: 10 }} />
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ ...style.separate }}>
                        <TextField type="text" fullWidth label="Email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            onChange={formik.handleChange}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Box>
                    <Box sx={{ ...style.separate }}>
                        <TextField type="password" fullWidth label="Password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            value={formik.values.password}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Link> <Typography fontSize={12}>Forgot password?</Typography></Link>
                    </Box>
                    <Box sx={{ ...style.separate, display: 'flex', justifyContent: 'center' }}>
                        {
                            loading
                                ?
                                <Loading />
                                :
                                <Button variant="contained" type="submit">Login</Button>
                        }
                    </Box>
                </form>
                <Typography sx={{ fontSize: 12, textAlign: "center", marginTop: 10 }}>
                    You don't have account? <Link to="/signup">/Signup</Link>
                </Typography>
            </Box>
        </>
    )
}