import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
 
const BandsPage = ({ blok }) => (
  <main {...storyblokEditable(blok)}>
    <p>this is BandsPage.js</p>

    {blok.body
      ? blok.body.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))
      : null}
  </main>
);
 
export default BandsPage;