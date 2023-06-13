import { Box, Container, Grid } from "@mui/material";
import SignupForm from "./SignupForm";
import style from "../style.module.css";
import GirlImage from "../../../assets/girl.png";

const SignupPage = () => {
  return (
    <>
      <Container className={style.container} maxWidth={"xl"}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} order={{ xs: 2 }}>
            <SignupForm />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            order={{ xs: 1, sm: 2 }}
          >
            <Box sx={{ height: "400px", width: "400px" }}>
              <img src={GirlImage} className={style.girlImage} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignupPage;
