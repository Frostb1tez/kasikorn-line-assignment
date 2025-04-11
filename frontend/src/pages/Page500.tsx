import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const Page500 = () => {
  return (
    <StyledBox>
      <Typography variant="h1" component="h2" gutterBottom>
        500
      </Typography>
      <Typography variant="h6" component="p">
        Oops! Something went wrong on our end.
      </Typography>
    </StyledBox>
  );
};

export default Page500;
