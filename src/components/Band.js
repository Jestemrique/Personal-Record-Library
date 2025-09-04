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

  const bioText = lastFmData ? lastFmData.bio?.content : "";
  const paragraphs = bioText.split(/\n\s*\n/); 
  const displayParagraphs = expanded ? paragraphs : paragraphs.slice(0, 2);

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
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: p }}
                  style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}
                />
              ))}
              {paragraphs.length > 2 && (
                <button
                  className="button is-small is-light mt-3"
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

