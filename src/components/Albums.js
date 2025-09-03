import { useEffect, useState } from "react";
import { useStoryblokApi } from "@storyblok/react";
import { Link } from "react-router-dom";
import getVersion from "../utils/getVersion";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const storyblokApi = useStoryblokApi();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await storyblokApi.get("cdn/stories", {
          starts_with: "albums-folder/",
          version:  getVersion(),
        });
        setAlbums(res.data.stories);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlbums();
  }, [storyblokApi]);

  return (
    <ul className="menu-list">
      {albums.map((album) => (
        <li key={album.id}>
          <Link
            to={`/${album.full_slug}`}
            className="has-text-link"
          >
            {album.content.album_title || "Untitled"}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Albums;



// import { useEffect, useState } from "react";
// import { StoryblokComponent, useStoryblokApi } from "@storyblok/react";
// import { Link } from "react-router-dom";

// const Albums = () => {
    
//     const [albums, setAlbums] = useState([]);
//     const storyblokApi = useStoryblokApi();

//     useEffect(() => {
//         const fetchAlbums = async () => {
//             try {
//                 const res = await storyblokApi.get("cdn/stories", {
//                     starts_with: "albums-folder/",
//                     version: "draft",
//                 });
//                 setAlbums(res.data.stories);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchAlbums();
//     }, [storyblokApi]);
    
    
    
//     return (
//         <div>
//             {albums.map((album) => (
//                 <Link key={album.id} to={`/${album.full_slug}`}>
//                     {album.content.album_title}
//                 </Link>

//             ))}
//         </div>
//     );
// };

// export default Albums;



// import { useEffect, useState } from "react";
// import { StoryblokComponent, useStoryblokApi } from "@storyblok/react";
// import { Link } from "react-router-dom";

// const Albums = () => {
//     return (
//         <h2>
//             List of Albums will go here.
//         </h2>
//     );
// };

// export default Albums;