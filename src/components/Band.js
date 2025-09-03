import { useEffect, useState } from "react";
import { useStoryblokApi } from "@storyblok/react";
import { useLocation } from "react-router-dom";
import getVersion from "../utils/getVersion";  

const LAST_FM_API_KEY = process.env.REACT_APP_LASTFM_API_KEY;

const Band = () => {
  const location = useLocation();
  const storyblokApi = useStoryblokApi();
  const lastSegment = window.location.pathname.split("/").filter(Boolean).pop() || "home";

  const [band, setBand] = useState(null);
  const [lastFmData, setLastFmData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  useEffect(() => {
    const fetchBand = async () => {
      try {
        const res = await storyblokApi.get("cdn/stories", {
          starts_with: `bands-folder/${lastSegment}`,
          version: getVersion(),
        });

        const story = res.data.stories[0];
        setBand(story);

        const artistName = story.content?.band_name;
        if (artistName) {
          const lastFmRes = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
              artistName
            )}&api_key=${LAST_FM_API_KEY}&format=json`
          );
          const data = await lastFmRes.json();
          setLastFmData(data.artist);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBand();
  }, [storyblokApi, lastSegment]);

  if (!band) return <p>Loading band...</p>;

  const bioText = lastFmData ? stripHtml(lastFmData.bio?.content) : "";
  const paragraphs = bioText.split(/\n\s*\n/); // separar párrafos por línea vacía

  const displayParagraphs = expanded ? paragraphs : paragraphs.slice(0, 2); // truncate: primeros 2 párrafos

  return (
    <div className="container mt-5">
      <div className="columns is-variable is-8">
        {/* Storyblok Data */}
        <div className="column is-one-third">
          <h2 className="title is-3">{band.content?.band_name}</h2>
          <p>{band.content?.band_bio}</p>
        </div>

        {/* Last.fm Data */}
        <div
          className="column is-two-thirds"
          style={{ borderLeft: "1px solid #dbdbdb", paddingLeft: "2rem" }}
        >
          {lastFmData && (
            <>
              <h3 className="title is-5 has-text-grey-dark">Information from Last.fm</h3>

              {displayParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {paragraphs.length > 2 && (
                <button
                  className="button is-small is-light mt-2"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Read less" : "Read more"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Band;







// import { useEffect, useState } from "react";
// import { useStoryblokApi } from "@storyblok/react";
// import { useLocation } from "react-router-dom"; 

// const LAST_FM_API_KEY = process.env.REACT_APP_LASTFM_API_KEY;

// const Band = () => {
//     const location = useLocation();
//     const storyblokApi = useStoryblokApi();
//     const lastSegment = window.location.pathname.split("/").filter(Boolean).pop() || "home";

//     const [band, setBand] = useState(null);
//     const [lastFmData, setLastFmData] = useState(null);

//     // Función para quitar etiquetas HTML
//     const stripHtml = (html) => {
//         if (!html) return "";
//         return html.replace(/<[^>]*>/g, "");
//     };

//     useEffect(() => {
//         const fetchBand = async () => {
//             try {
//                 // Obtener datos de Storyblok
//                 const res = await storyblokApi.get("cdn/stories", {
//                     starts_with: `bands-folder/${lastSegment}`,
//                     version: "draft",
//                 });

//                 const story = res.data.stories[0];
//                 setBand(story);

//                 // Obtener datos de Last.fm
//                 const artistName = story.content?.band_name;

//                 if (artistName) {
//                     const lastFmRes = await fetch(
//                         `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
//                             artistName
//                         )}&api_key=${LAST_FM_API_KEY}&format=json`
//                     );

//                     const data = await lastFmRes.json();
//                     console.log("laast fm data: ", data);
//                     setLastFmData(data.artist);
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchBand();
//     }, [storyblokApi, lastSegment]);

//     if (!band) return <p>Loading band...</p>;

//     return (
//         <div>
//             <h2>{band.content?.band_name}</h2>
//             <p>{band.content?.band_bio}</p>

//             {lastFmData && (
//                 <div>
//                     <h3>Last.fm Bio</h3>
//                     <p>{stripHtml(lastFmData.bio?.content)}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Band;




