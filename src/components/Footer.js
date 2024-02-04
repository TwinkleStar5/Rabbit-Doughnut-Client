import { Box, Grid, IconButton, Typography } from "@mui/material";
import instagram from "../img/instagram.png";
import facebook from "../img/facebook.png";
import american from "../img/american-express.png";
import jcb from "../img/jcb.png";
import mastercard from "../img/mastercard.png";
import union from "../img/union-pay.png";
import visa from "../img/visa.png";
import "../app/globals.css";
function Footer() {
  return (
    <Grid
      container
      sx={{ bgcolor: "#041E42", color: "white", py: 1, px: 2, pb: 3 }}
    >
      <Grid item md={4} sx={{ mt: 3, p: 3 }}>
        <Box >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Operation Hours
          </Typography>
          <Typography variant="h6" className="footerText">
            Mon-Fri: 8AM-6PM
          </Typography>
          <Typography variant="h6" className="footerText">
            Sat: 8AM-8PM
          </Typography>
          <Typography variant="h6" className="footerText">
            Sun: Closed
          </Typography>
        </Box>
      </Grid>
      <Grid item md={4} sx={{ mt: 3, p: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {" "}
            Location
          </Typography>
          <Typography variant="h6" className="footerText">
            584, Love Lane, Georgetown, 10200 George Town, Penang
          </Typography>
        </Box>
      </Grid>
      <Grid item md={4} sx={{ mt: 3, p: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="h6" className="footerText">
            Email:{" "}
            <a
              href="mailto:rabbitdoughnuts@gmail.com"
              style={{ textDecoration: "underline" }}
            >
              rabbitdoughnuts@gmail.com
            </a>
          </Typography>
          <Typography variant="h6" className="footerText">
            Follow us on social media:
          </Typography>
          <IconButton disableRipple>
            <img src={instagram.src} style={{ width: "30px" }} />
          </IconButton>
          <IconButton disableRipple>
            <img src={facebook.src} style={{ width: "30px" }} />
          </IconButton>
        </Box>
      </Grid>

      <Grid
        container
        sx={{
          mt: 3,
          px: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid item sm={6}>
          <Typography variant="h6">
            © 2024, Rabbit Doughnuts. Powered by Stripe
          </Typography>
        </Grid>
        <Grid
          item
          sm={6}
          sx={{ display: "flex", justifyContent: "flex-end", pr: 8 }}
        >
          <img src={american.src} style={{ width: "38px" }} />
          <img src={visa.src} style={{ width: "38px", marginLeft: "30px" }} />
          <img
            src={mastercard.src}
            style={{ width: "38px", marginLeft: "30px" }}
          />
          <img src={jcb.src} style={{ width: "38px", marginLeft: "30px" }} />
          <img src={union.src} style={{ width: "38px", marginLeft: "30px" }} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
