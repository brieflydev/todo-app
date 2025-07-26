"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Alert } from "@mui/material";

export default function LogoutPage() {
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
    setLoggedOut(true);
  }, []);

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h4" mb={2}>Logout</Typography>
      {loggedOut && <Alert severity="success">You have been logged out.</Alert>}
    </Box>
  );
} 