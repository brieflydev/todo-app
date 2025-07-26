'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('token'));
      const handleStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button component={Link} href="/" color="inherit">Home</Button>
              {/* Remove Register and Login from top bar, show Logout only if logged in */}
              {isLoggedIn ? (
                <Button component={Link} href="/logout" color="inherit">Logout</Button>
              ) : null}
            </Box>
          </Toolbar>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
