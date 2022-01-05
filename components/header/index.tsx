import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Breakpoint } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Header({maxWidth = "lg"}: {maxWidth: Breakpoint}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const { data: session, status } = useSession() 

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!loggedIn) {
     return signIn();
    }

    signOut()
  };

  useEffect(() => {
    if (status === "authenticated") {
      return setLoggedIn(true)
    }

    setLoggedIn(false)
  },[status])
  
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/">
                <a>News Scraper</a>
              </Link>
            </Typography>
            <Button color="inherit" onClick={handleClick}>
              {loggedIn ? "Logout" : "Login"}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
}
