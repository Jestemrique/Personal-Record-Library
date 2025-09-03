import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
 
const BandsPage = ({ blok }) => (
  <main {...storyblokEditable(blok)}>

    {blok.body
      ? blok.body.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))
      : null}
  </main>
);
 
export default BandsPage;