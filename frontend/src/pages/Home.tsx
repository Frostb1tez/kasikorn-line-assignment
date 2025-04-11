import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Kasikorn Line
      </Typography>
      <Typography variant="body1">
        This is the home page of your application.
      </Typography>
    </Box>
  );
};

export default Home;
