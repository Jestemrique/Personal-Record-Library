import { storyblokEditable } from "@storyblok/react";

const PageDescription = ({ blok }) => (
  <div {...storyblokEditable(blok)} className="subtitle" >
    {blok.page_description}
  </div>
);

export default PageDescription;