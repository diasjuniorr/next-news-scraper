import { Container, Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <div
      style={{
        width: "100vw",
        height: "220px",
        marginTop: "64px",
        background: "#333333",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4} textAlign="center">
            <a href="#" style={{color: "#fff"}}>
              <Typography variant="h4" style={{ color: "#fff" }}>
                About
              </Typography>
            </a>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} textAlign="center">
            <a href="#" style={{color: "#fff"}}>
              <Typography variant="h4" style={{ color: "#fff" }}>
                Subscripe
              </Typography>
            </a>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} textAlign="center">
            <a href="#" style={{color: "#fff"}}>
              <Typography variant="h4" style={{ color: "#fff" }}>
                Contact
              </Typography>
            </a>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
