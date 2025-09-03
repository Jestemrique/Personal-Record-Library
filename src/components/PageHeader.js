import { storyblokEditable } from "@storyblok/react";

const PageHeader = ({ blok }) => (
  <div {...storyblokEditable(blok)} className="title is-3" >
    {blok.page_header}
  </div>
);

export default PageHeader;