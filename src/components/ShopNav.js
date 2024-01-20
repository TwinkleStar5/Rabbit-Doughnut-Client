import { Card, Box, Typography, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import shopDonutPic from "../img/shopPIC.webp";
import gifting from "../img/gifting.webp";
const caption = {
  bgcolor: "white",
  opacity: "0.5",
  textAlign: "center",
  position: "absolute",
  zIndex: "999",
  bottom: "0",
  width: "100%",
  borderBottomLeftRadius: "0",
  borderBottomRightRadius: "0",
  height: "30px",
  color: "#041E42",
  fontWeight: "bold !important",
  //   pt: "12px",
};

export function shopDonut() {
  <Grid item sm={6}>
    <Card
      sx={{
        width: "100%",
        borderRadius: "10px",
        border: "none",
        mb: 3,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia height="130" component="img" image={shopDonutPic.src} />
        <Typography variant="h6" sx={caption}>
          Shop Doughnuts
        </Typography>
      </Box>
    </Card>
  </Grid>;
}

export function Gifting() {
  <Grid item sm={6}>
    <Card
      sx={{
        width: "100%",
        borderRadius: "20px",
        border: "none",
        mb: 3,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia height="130" component="img" image={gifting.src} />
        <Typography variant="h6" sx={caption}>
          Gifting
        </Typography>
      </Box>
    </Card>
  </Grid>;
}
