import { useStoryblok, StoryblokComponent } from "@storyblok/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";

//import NavBar from "./components/MainNavigation.js";


function App() {

  const location = useLocation();
  let slug =
    window.location.pathname === "/"
      ? "home"
      : window.location.pathname.replace("/", "");
  
  //const navStory = useStoryblok("main-navigation", { version: "draft" });
  const navStory = useStoryblok("main-navigation", { version: "published" });
  console.log("Nav Story:", navStory);
  const story = useStoryblok(slug, { version: "draft" });

  if (!story || !story.content) {
    return <div>Loading...</div>;
  }


  return (
    <>
      {/* <NavBar blok={navStory?.content} /> */}
      <NavBar blok={navStory?.content} />
      <Routes>
        <Route path="/" element={<StoryblokComponent blok={story.content} />} />
        <Route path="/*" element={<StoryblokComponent blok={story.content} />} />
      </Routes>
    </>
  )

}
export default App;