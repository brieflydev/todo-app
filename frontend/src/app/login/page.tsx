"use client";
import { useState } from "react";
import { TextField, Button, Box, Typography, Alert, Link as MuiLink } from "@mui/material";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  // Register form state
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        email,
        password, 
      });
      if (res.status !== 200) {
        throw new Error(res.data.message || "Login failed");
      }
      const data = res.data;
      localStorage.setItem('token', data.access_token);
      setSuccess("Login successful!");
      setEmail("");
      setPassword("");
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError("");
    setRegSuccess("");
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        email: regEmail,
        password: regPassword,
        name: regName,
      });
      if (res.status !== 201) {
        throw new Error(res.data.message || "Registration failed");
      }
      setRegSuccess("Registration successful! You can now log in.");
      setRegEmail("");
      setRegPassword("");
      setRegName("");
    } catch (err: any) {
      setRegError(err.message);
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      {showRegister ? (
        <>
          <Typography variant="h4" mb={2}>Register</Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Email"
              type="email"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Name"
              value={regName}
              onChange={e => setRegName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={regLoading}
              sx={{ mt: 2 }}
            >
              {regLoading ? "Registering..." : "Register"}
            </Button>
          </form>
          {regError && <Alert severity="error" sx={{ mt: 2 }}>{regError}</Alert>}
          {regSuccess && <Alert severity="success" sx={{ mt: 2 }}>{regSuccess}</Alert>}
          <MuiLink component="button" onClick={() => setShowRegister(false)} sx={{ mt: 2, display: 'block' }}>
            Already have an account? Login
          </MuiLink>
        </>
      ) : (
        <>
          <Typography variant="h4" mb={2}>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <MuiLink component="button" onClick={() => setShowRegister(true)} sx={{ mt: 2, display: 'block' }}>
            Don't have an account? Register
          </MuiLink>
        </>
      )}
    </Box>
  );
} 