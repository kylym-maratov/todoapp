import React, { useState } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { AppContext } from "../store";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Loading } from "../components/Loading";
import { useAxios } from "../api/api";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from "../hooks/use.auth";

const style = {
    main: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        boxShadow: 2,
        borderRadius: 3,
        p: 4,
    },
    separate: {
        marginTop: 2
    }
}


export const SignupPage = () => {
    const { state, dispatch } = React.useContext(AppContext);
    const { isDarkTheme, loading } = state;
    const [activeStep, setActiveStep] = useState(0);
    const [created, setCreated] = useState(false);
    const { requestApi } = useAxios();
    const { login } = useAuth()


    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required(),
        username: yup.string().min(3).required(),
        firstname: yup.string(),
        lastname: yup.string(),
        phone: yup.string()
    });

    const formik = useFormik({
        initialValues: {
            email: "", password: "", username: "", firstname: "", lastname: "", phone: ""
        },
        validationSchema: validationSchema,
        onSubmit: submitHandler
    });

    async function submitHandler(values, { resetForm }) {
        if (activeStep === 0) {
            const { data } = await requestApi("/api/user/check-user", "POST", { username: values.username, email: values.email });
            if (!data.username && !data.email) {
                return setActiveStep(1);
            }
            if (data.username) {
                return dispatch({ type: "SET_ERROR", payload: "User with username exists" })
            }
            if (data.email) {
                return dispatch({ type: "SET_ERROR", payload: "User with email exists" })
            }

            return dispatch({ type: "SET_ERROR", payload: "Username and email exists" })
        }

        const { data } = await requestApi("/api/user/signup", "POST", { ...values });
        dispatch({ type: "SET_MESSAGE", payload: data.message });
        setCreated(true);
        setTimeout(() => {
            requestApi("/api/user/login", "POST", { ...values }).then(({ data }) => {
                login(data.user, data.accessToken)
            })
        }, 3000)
    }

    return (
        <>
            <Box sx={{ ...style.main, background: isDarkTheme ? "#212120" : "white" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img alt="logo" src={logo} style={{ height: "120px", width: "120px", marginBottom: 10 }} />
                </Box>
                {activeStep === 0 && <>
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
                            <TextField type="text" fullWidth label="Username"
                                id="username"
                                name="username"
                                value={formik.values.username}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                onChange={formik.handleChange}
                                helperText={formik.touched.username && formik.errors.username}
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
                        </Box>
                        <Box sx={{ ...style.separate, display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" type="submit" disabled={loading}>Continue</Button>
                        </Box>
                    </form>
                </>
                }
                {activeStep === 1 &&
                    <>
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{ ...style.separate }}>
                                <TextField type="text" fullWidth label="Firstname"
                                    id="firstname"
                                    name="firstname"
                                    value={formik.values.firstname}
                                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                    onChange={formik.handleChange}
                                    helperText={formik.touched.firstname && formik.errors.firstname}
                                />
                            </Box>
                            <Box sx={{ ...style.separate }}>
                                <TextField type="text" fullWidth label="Lastname"
                                    id="lastname"
                                    name="lastname"
                                    value={formik.values.lastname}
                                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                    onChange={formik.handleChange}
                                    helperText={formik.touched.lastname && formik.errors.lastname}
                                />
                            </Box>
                            <Box sx={{ ...style.separate }}>
                                <TextField type="phone" fullWidth label="Phone"
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    onChange={formik.handleChange}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Box>
                            <Box sx={{ ...style.separate, display: 'flex', justifyContent: 'center' }}>
                                {created ? <CheckCircleIcon sx={{ height: 50, width: 50, color: "green" }} /> :
                                    <>{
                                        loading
                                            ?
                                            <Loading />
                                            :
                                            <Button variant="contained" type="submit">Done</Button>
                                    }</>
                                }
                            </Box>
                        </form>
                    </>
                }
                <Typography sx={{ fontSize: 12, textAlign: "center", marginTop: 5 }}>
                    You have account? <Link to="/login">/Login</Link>
                </Typography>
            </Box>
        </>
    )
}