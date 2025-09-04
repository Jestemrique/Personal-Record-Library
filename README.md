# Personal Record Library Project

## Definition
Website created with [Storyblok](https://www.storyblok.com/) and React to maintain a catalog of the records I own.  
It maintains a list of albums, their artists, and the format, allowing me to keep track of my collection and avoid buying duplicates.

Information about the band and the album is entered using the Storyblok user interface.  
A basic set of information is required: just the **name** and a **short bio** of the band.  
(Currently, I also use this field to make personal notes about the band's records — e.g., *“Looking for a specific vinyl for this band”*).  

For every album, the following information is stored:
- Album name
- Band (chosen from a dropdown list of artists already stored)
- Year
- Format (currently *Vinyl* and *CD* — more can be added later)

Additionally, the app pulls extra information about the band and album from the **Last.fm API**.

---

## Project Details
- **CMS used:** Storyblok
- **Frontend:** React + Storyblok React SDK
- **Repository:** [GitHub Repo](https://github.com/Jestemrique/Personal-Record-Library)
- **Deployment:** Vercel (Production and Preview environments)
- **External API:** Last.fm (to pull info from bands and albums)

---

## Live Links
- **Production site:** [personal-record-library.vercel.app](https://personal-record-library.vercel.app/)  
- **Preview site:** [dev-personal-record-library.vercel.app](https://dev-personal-record-library.vercel.app/)

