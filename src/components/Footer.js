import { Box, Grid, IconButton, Typography } from "@mui/material";
import instagram from "../img/instagram.png";
import facebook from "../img/facebook.png";
import american from "../img/american-express.png";
import apple from "../img/apple-pay.png";
import google from "../img/google-pay.png";
import jcb from "../img/jcb.png";
import mastercard from "../img/mastercard.png";
import union from "../img/union-pay.png";
import visa from "../img/visa.png";

function Footer() {
  return (
    <Grid
      container
      sx={{ bgcolor: "#041E42", color: "white", pt: 3, px: 5, pb: 5 }}
    >
      <Grid item md={4} sx={{ mt: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Operation Hours
          </Typography>
          <Typography variant="subtitle1">Mon-Fri: 8AM-6PM</Typography>
          <Typography variant="subtitle1">Sat: 8AM-8PM</Typography>
          <Typography variant="subtitle1">Sun: Closed</Typography>
        </Box>
      </Grid>
      <Grid item md={4} sx={{ mt: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Location
          </Typography>
          <Typography>
            584, Love Lane, Georgetown, 10200 George Town, Penang
          </Typography>
        </Box>
      </Grid>
      <Grid item md={4} sx={{ mt: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="subtitle1">
            Email:
            <a href="/" style={{ textDecoration: "underline" }}>
              rabbitCircles@gmail.com
            </a>
          </Typography>
          <Typography variant="subtitle1">
            Follow us on social media:
          </Typography>
          <IconButton disableRipple >
            <img src={instagram.src} style={{ width: "30px" }} />
          </IconButton>
          <IconButton disableRipple>
            <img src={facebook.src} style={{ width: "30px" }} />
          </IconButton>
        </Box>
      </Grid>

      <Grid item sx={{ mt: 3 }} sm={12}>
        <Box>
          <Typography>© 2024, Rabbit Doughnuts. Powered by Stripe</Typography>
        </Box>
        <Box sx={{ display: "flex", width: "30px" }}>
          <img src={american.src} style={{ marginRight: "20px" }} />
          <img src={visa.src} style={{ marginRight: "20px" }} />
          <img src={mastercard.src} style={{ marginRight: "20px" }} />
          <img src={jcb.src} style={{ marginRight: "20px" }} />
          <img src={union.src} style={{ marginRight: "20px" }} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Footer;
