"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Topnav from "@/components/Topnav";
import Footer from "@/components/Footer";
import Checkout from "./checkout/page";
const inter = Inter({ subsets: ["latin"] });
const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const baseTheme = createTheme();

const theme = createTheme({
  // ...baseTheme,
  palette: {
    primary: { main: "#ADDFB3" }, //green
    error: { main: "#D85F5F", light: "#F9BABA" }, //red, pink
    warning: { main: "#E1DCA7" }, //yellow
    success: { main: "#A5C9A5" }, //green
    info: { main: "#041E42" }, //dark blue
  },
  typography: {
    h1: {
      fontFamily: ["Rubik Doodle Shadow", "Vast Shadow", "Londrina Shadow"],
    },
    h2: { fontFamily: "Archivo Black" },
    h3: { fontFamily: "Archivo Black" },
    h4: { fontFamily: "Archivo Black" },
    h5: { fontFamily: "Archivo Black" },
    h6: { fontFamily: "Work Sans" },
    subtitle1: { fontFamily: "Work Sans" },
    button: {
      fontFamily: "Paytone One",
      fontSize: "20px",
      color: "white",
      background: "#041E42 !important",
      borderRadius: "40px !important",
      width: "300px",
      // disableRipple: true,
      [baseTheme.breakpoints.down("sm")]: {
        width: "200px",
      },
      "&:hover": {
        width: "200px",
        transition: "width  2s",
      },
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider theme={theme}>
            <Topnav />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
