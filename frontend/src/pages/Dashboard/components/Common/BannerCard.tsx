import { Banner } from "@/types/auth";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

interface BannerCardProps {
  banner: Banner;
}

const BannerCard: React.FC<BannerCardProps> = ({ banner }) => {
  return (
    <Card sx={{ bgcolor: "#f5f5f5" }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <img src={banner.image} alt={banner.title} />
          <Box>
            <Typography variant="h6" gutterBottom>
              {banner.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {banner.description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BannerCard;
