import { Avatar, Typography } from "@mui/material";
import React from "react";

interface UserProfileProps {
  avatarUrl: string;
  userName: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  avatarUrl,
  userName,
}) => {
  return (
    <>
      <Avatar src={avatarUrl} sx={{ width: 92, height: 92, mb: 1 }} />
      <Typography variant="h6" color="white" sx={{ mb: 3 }}>
        {userName}
      </Typography>
    </>
  );
};
