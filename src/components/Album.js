import { useEffect, useState } from "react";
import { useStoryblokApi } from "@storyblok/react";
import { useLocation } from "react-router-dom";
import getVersion from "../utils/getVersion"; 

const LAST_FM_API_KEY = process.env.REACT_APP_LASTFM_API_KEY;

const Album = () => {
  const location = useLocation();
  const storyblokApi = useStoryblokApi();
  const lastSegment = window.location.pathname.split("/").filter(Boolean).pop() || "home";

  const [album, setAlbum] = useState(null);
  const [lastFmData, setLastFmData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await storyblokApi.get("cdn/stories", {
          starts_with: `albums-folder/${lastSegment}`,
          version: getVersion(),
          resolve_relations: "album.album_band",
        });

        const story = res.data.stories[0];
        setAlbum(story);

        const artistName = story.content?.album_band?.content?.band_name;
        const albumTitle = story.content?.album_title;

        if (artistName && albumTitle) {
          const lastFmRes = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${LAST_FM_API_KEY}&artist=${encodeURIComponent(
              artistName
            )}&album=${encodeURIComponent(albumTitle)}&format=json`
          );

          const data = await lastFmRes.json();
          setLastFmData(data.album);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlbum();
  }, [storyblokApi, lastSegment]);

  if (!album) return <p>Loading album...</p>;

  const bioText = lastFmData?.wiki?.summary ? stripHtml(lastFmData.wiki.summary) : "";
  const paragraphs = bioText.split(/\n\s*\n/);
  const displayParagraphs = expanded ? paragraphs : paragraphs.slice(0, 2);

  return (
    <div className="container mt-5">
      {/* Storyblok Data */}
      <div>
        <h2 className="title is-3">{album.content?.album_title}</h2>
        <p><strong>Band:</strong> {album.content?.album_band?.content?.band_name}</p>
        <p><strong>Year:</strong> {album.content?.album_year}</p>
        <p><strong>Format:</strong> {album.content?.album_format}</p>
      </div>

      <hr />

      {/* Last.fm Data */}
      <h3 className="title is-5 has-text-grey-dark">Information from Last.fm</h3>
      {/* Disclaimer al inicio */}
      <p className="has-text-grey-dark is-size-7 mb-2">
        Note: Information from Last.fm may be incomplete or missing some fields.
      </p>

      {lastFmData ? (
        <article className="media">
          {/* Imagen */}
          {lastFmData.image && lastFmData.image[2] && (
            <figure className="media-left">
              <p className="image is-128x128">
                <img
                  src={lastFmData.image[2]["#text"]}
                  alt={lastFmData.name}
                  style={{ borderRadius: "6px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
                />
              </p>
            </figure>
          )}

          {/* Contenido */}
          <div className="media-content">
            <div className="content">
              {lastFmData.wiki?.published && (
                <p><strong>Published:</strong> {lastFmData.wiki.published}</p>
              )}
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

              {/* Tracklist */}
              {lastFmData.tracks?.track && (
                <div className="mt-3">
                  <h4 className="title is-6">Track List:</h4>
                  <ol>
                    {lastFmData.tracks.track.map((track, index) => (
                      <li key={index}>{track.name}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </article>
      ) : (
        <p className="has-text-grey-dark has-text-weight-semibold mt-2">
          No information available in Last.fm
        </p>
      )}
    </div>
  );
};

export default Album;


