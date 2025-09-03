export default function getVersion() {
 return process.env.REACT_APP_STORYBLOK_IS_PREVIEW === "true" ? "draft" : "published";
}