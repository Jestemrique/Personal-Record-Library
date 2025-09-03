import { useEffect, useState } from "react";
import { StoryblokComponent, useStoryblokApi } from "@storyblok/react";
import { Link } from "react-router-dom";
import getVersion from "../utils/getVersion"; 

const BandList = () => {
  const [bands, setBands] = useState([]);
  const storyblokApi = useStoryblokApi();

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const res = await storyblokApi.get("cdn/stories", {
          starts_with: "bands-folder/",
          version: getVersion(),
        });
        setBands(res.data.stories);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBands();
  }, [storyblokApi]);

  return (
    <aside className="menu">
      <div className="is-size-5">
        {bands.map((band) => (
          <div key={band.id}>
            <Link to={`/${band.full_slug}`}>
              {band.name}
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default BandList;