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
import { signUp, UserDatatype, logOut } from "../../store/UserSlice/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const [imageString, setImageString] = useState("");
  const { isError, error } = useAppSelector((state) => state.user);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(15, "Atleast 15 character required")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNo: Yup.string()
      .matches(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/, "Invalid phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm password is required"),
    imageUrl: Yup.mixed()
      .test("fileType", "Invalid file format", (value) => {
        if (value) {
          const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];
          return supportedFormats.includes(value.type);
        }
        return true; // Allow empty field
      })
      .test("fileSize", "File size too large", (value) => {
        if (value) {
          const maxSize = 2 * 1024 * 1024; // 2MB
          return value.size <= maxSize;
        }
        return true; // Allow empty field
      }),
  });

  const userData: UserDatatype = {
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    imageUrl: "",
  };

  const onSubmit = (values: UserDatatype) => {
    dispatch(signUp({ ...values, imageUrl: imageString }));
    console.log(values);
  };

  const onReset = () => {
    formik.resetForm();
    setImageString("");
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
      {isError && <ToastContainer />}
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h3"
          className={style.heading}
          fontWeight={500}
          marginBottom={7}
          color="hsl(34, 20%, 20%)"
        >
          Sign Up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box className={style.profileContainer}>
                {imageString.length > 0 && (
                  <Avatar
                    src={imageString}
                    sx={{
                      width: "100px",
                      height: "100px",
                      margin: "10px auto",
                    }}
                  />
                )}
                <label htmlFor="imageUrl" className={style.inputFileLabel}>
                  Photo +
                </label>
                <input
                  hidden
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  className={style.inputFile}
                  onChange={(event: any) => {
                    formik.setFieldValue(
                      "imageUrl",
                      event.currentTarget.files[0]
                    );

                    let imageFile = event.currentTarget.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(imageFile);
                    reader.addEventListener("load", () => {
                      imageFile = reader.result;
                      setImageString(imageFile);
                    });
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.imageUrl && (
                  <Typography variant="subtitle1">
                    {formik.errors.imageUrl}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <InputLabel className={style.inputLabel}>Name</InputLabel>
              <TextField
                inputProps={{
                  sx: { background: "hsl(34, 78%, 91%)" },
                }}
                fullWidth
                variant="outlined"
                label={null}
                id="name"
                name="name"
                className={style.inputText}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

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
              <InputLabel className={style.inputLabel}>Phone No</InputLabel>
              <TextField
                inputProps={{
                  sx: { background: "hsl(34, 78%, 91%)" },
                }}
                fullWidth
                variant="outlined"
                label={null}
                id="phoneNo"
                name="phoneNo"
                className={style.inputText}
                value={formik.values.phoneNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
                helperText={formik.touched.phoneNo && formik.errors.phoneNo}
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

            <Grid item xs={12}>
              <InputLabel className={style.inputLabel}>
                Confirm Password
              </InputLabel>
              <TextField
                inputProps={{
                  sx: { background: "hsl(34, 78%, 91%)" },
                }}
                fullWidth
                variant="outlined"
                label={null}
                id="confirmPassword"
                name="confirmPassword"
                className={style.inputText}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>

            <Grid item xs={12} marginBottom={5}>
              <Button variant="contained" sx={{ mr: 2 }} type="submit">
                Submit
              </Button>
              <Button
                variant="contained"
                color="error"
                type="reset"
                onClick={onReset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="subtitle1" className={style.inputLabel}>
          Already Have an Account?{" "}
          <NavLink to="/login" className={style.linkText}>
            Log In
          </NavLink>
        </Typography>
      </Box>
    </>
  );
};

export default SignupForm;
