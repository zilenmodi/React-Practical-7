import { Typography, Container, Avatar, Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logOut } from "../../store/UserSlice/userSlice";
import style from "./style.module.css";

const HomePage = () => {
  const { userData } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <>
      <Container className={style.container} maxWidth={"xl"}>
        <Button
          variant="contained"
          className={style.logout_btn}
          onClick={handleLogout}
        >
          Log Out
        </Button>
        <Typography
          variant="h3"
          className={style.heading}
          fontWeight={500}
          marginBottom={7}
          color="hsl(34, 20%, 20%)"
        >
          Home
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={userData?.imageUrl as string}
            sx={{ width: "150px", height: "150px", mb: 5 }}
          />
          <Typography variant="h6" color="hsl(34, 20%, 20%)">
            Hello {userData?.name}, you are registered with the email id -{" "}
            {userData?.email} and phone number - {userData?.phoneNo}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
