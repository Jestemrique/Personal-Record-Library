import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

import { storyblokInit, apiPlugin } from "@storyblok/react";

import Page from "./components/Page";
import PageHeader from "./components/PageHeader";
import PageDescription from "./components/PageDescription";
import BandsPage from "./components/BandsPage";
import Bands from "./components/Bands";
import AlbumsPage from "./components/AlbumsPage";
import Albums from "./components/Albums";
import NavBar from "./components/NavBar.js";
import NavItem from "./components/NavItem.js";
import BandPage from "./components/BandPage.js";
import Band from "./components/Band.js";
import Album from "./components/Album.js";


storyblokInit({
  accessToken: process.env.REACT_APP_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    //teaser: Teaser,
    //grid: Grid,
    //feature: Feature,
    page_header: PageHeader,
    page_description: PageDescription,
    bands_page: BandsPage,
    bands: Bands,
    albums_page: AlbumsPage,
    albums: Albums,
    nav_bar: NavBar,
    nav_item: NavItem,
    band_page: BandPage,
    band: Band,
    album: Album,


  },
  apiOptions: {
    // for spaces located in the US or China:
    // region: "us" or "cn", // you need to specify the region
    region: ''
  }
});

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
