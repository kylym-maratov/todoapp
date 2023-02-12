import React, { useContext, useState } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { Box } from "@mui/system";
import { Button, FormGroup, Grow, Slide, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { AppContext } from "../store";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from "react-router-dom";

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

const steps = [
    'Email & password',
    'Name & username',
    'Done'
]

export const SignupPage = () => {
    const { state } = React.useContext(AppContext);
    const { isDarkTheme } = state;
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [form, setForm] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        username: ""
    });

    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required()
    });

    const formik = useFormik({
        initialValues: {
            email: "", password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setForm({ ...form, email: values.email, password: values.password });
            setActiveStep(1);
        }
    });


    function nextStep(key) {
        if (!form.email && !form.email) return;
        setActiveStep(key);
    }

    function formHandler(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function onSubmitHandler() {
        setActiveStep(2);
    }

    function onDoneHandler() {
        navigate('/');
    }

    return (
        <>
            <Box sx={{ width: '100%', marginTop: 6, }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, key) => (
                        <Step key={label}>
                            <StepLabel
                                sx={{ cursor: "pointer" }}
                                onClick={() => nextStep(key)}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Box sx={{ ...style.main, background: isDarkTheme ? "#212120" : "white" }}>
                {activeStep === 0 &&
                    <>
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{ ...style.separate }}>
                                <TextField type="text" fullWidth label="Email"
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
                            </Box>
                            <Box sx={{ ...style.separate, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" type="submit">Next</Button>
                            </Box>
                        </form>
                        <Typography sx={{ fontSize: 12, textAlign: "center" }}>
                            You have account? <Link to="/">/Login</Link>
                        </Typography>
                    </>
                }
                {
                    activeStep === 1
                    &&
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                        <FormGroup>
                            <Box sx={{ ...style.separate }}>
                                <TextField fullWidth label="Firstname" name="firstname"
                                    value={form.firstname}
                                    onChange={formHandler}
                                />
                            </Box>
                            <Box sx={{ ...style.separate }}>
                                <TextField fullWidth label="Lastname" name="lastname"
                                    value={form.lastname}
                                    onChange={formHandler}
                                />
                            </Box>
                            <Box sx={{ ...style.separate }}>
                                <TextField fullWidth label="Username" name="username"
                                    value={form.username}
                                    onChange={formHandler}
                                />
                            </Box>
                            <Box sx={{ ...style.separate, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" type="submit" onClick={onSubmitHandler}>{!form.firstname || !form.lastname || !form.username ? "Skip" : "Next"}</Button>
                            </Box>
                        </FormGroup>
                    </Slide>
                }
                {activeStep === 2
                    &&
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Grow in={true}>
                                <CheckCircleIcon sx={{ fontSize: 100, color: 'green' }} />
                            </Grow>
                        </Box>
                        <Typography textAlign="center">
                            You are successfully registered!
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Button variant="contained" type="button" onClick={onDoneHandler}>Done</Button>
                        </Box>
                    </>
                }
            </Box >
        </>
    )
}


export const LoginPage = () => {
    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;

    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required()
    });

    const formik = useFormik({
        initialValues: {
            email: "", password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => { }
    });

    return (
        <>
            <Box sx={{ ...style.main, background: isDarkTheme ? "#212120" : "white" }}>
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
                        <Button variant="contained" type="submit">Login</Button>
                    </Box>
                </form>
                <Typography sx={{ fontSize: 12, textAlign: "center" }}>
                    You don't have account? <Link to="/signup">/Signup</Link>
                </Typography>
            </Box>
        </>
    )
}