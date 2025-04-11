import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const Page404 = () => {
  return (
    <StyledBox>
      <Typography variant="h1" component="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" component="p">
        Sorry, the page you are looking for does not exist.
      </Typography>
    </StyledBox>
  );
};

export default Page404;
