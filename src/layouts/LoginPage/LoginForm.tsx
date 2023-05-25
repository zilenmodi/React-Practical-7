import {
  Avatar,
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { logIn, logOut, UserLoginType } from "../../store/UserSlice/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { isError, error } = useAppSelector((state) => state.user);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const userData: UserLoginType = {
    email: "",
    password: "",
  };

  const onSubmit = (values: UserLoginType) => {
    dispatch(logIn(values));
    console.log(values);
  };

  const formik = useFormik({
    initialValues: userData,
    validationSchema,
    onSubmit,
  });

  if (isError) {
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(logOut());
    formik.resetForm();
  }
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h3"
          className={style.heading}
          fontWeight={500}
          marginBottom={7}
          color="hsl(34, 20%, 20%)"
        >
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <InputLabel className={style.inputLabel}>Email</InputLabel>
              <TextField
                inputProps={{
                  sx: { background: "hsl(34, 78%, 91%)" },
                }}
                fullWidth
                variant="outlined"
                label={null}
                id="email"
                name="email"
                className={style.inputText}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel className={style.inputLabel}>Password</InputLabel>
              <TextField
                inputProps={{
                  sx: { background: "hsl(34, 78%, 91%)" },
                }}
                fullWidth
                variant="outlined"
                label={null}
                id="password"
                name="password"
                className={style.inputText}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid item xs={12} marginBottom={5}>
              <Button variant="contained" sx={{ mr: 2 }} type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="subtitle1" className={style.inputLabel}>
          Don't Have Account?{" "}
          <NavLink to="/signup" className={style.linkText}>
            Sign Up
          </NavLink>
        </Typography>
      </Box>
    </>
  );
};

export default LoginForm;
