import { useEffect, useState } from "react";
import { useStoryblokApi } from "@storyblok/react";
import { Link } from "react-router-dom";
import getVersion from "../utils/getVersion";

const Bands = () => {
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
      <ul className="menu-list">
        {bands.map((band) => (
          <li key={band.id}>
            <Link
              to={`/${band.full_slug}`}
              className="has-text-link"
            >
              {band.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Bands;




// import { useEffect, useState } from "react";
// import { StoryblokComponent, useStoryblokApi } from "@storyblok/react";
// import { Link } from "react-router-dom";

// const Bands = () => {
    
//     const [bands, setBands] = useState([]);
//     const storyblokApi = useStoryblokApi();

//     useEffect(() => {
//         const fetchBands = async () => {
//             try {
//                 const res = await storyblokApi.get("cdn/stories", {
//                     starts_with: "bands-folder/",
//                     version: "draft",
//                 });
//                 setBands(res.data.stories);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchBands();
//     }, [storyblokApi]);
    
    
    
//     return (
//         <div>
//             {bands.map((band) => (
//                 <Link key={band.id} to={`/${band.full_slug}`}>
//                     {band.name}
//                 </Link>

//             ))}
//         </div>
//     );
// };

// export default Bands;

