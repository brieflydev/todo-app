import { Box, Typography, Paper } from "@mui/material";

export default function Home() {
  return (
    <Box maxWidth={600} mx="auto" mt={8}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" mb={2}>Welcome to the Todo App</Typography>
        <Typography variant="body1" mb={2}>
          Use the navigation bar to register, log in, or log out. After logging in, you will receive a JWT token. You can use this token to access protected endpoints in the backend.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          (This is a demo. For production, store JWT securely and implement route protection.)
        </Typography>
      </Paper>
    </Box>
  );
}
