import { storyblokEditable } from "@storyblok/react";
import { Link } from "react-router-dom";

const NavItem = ({ blok }) => {
  const url = blok.url?.cached_url || "/";

  return (
    <Link
      {...storyblokEditable(blok)}
      to={url === "/" ? "/" : `/${url}`}
      className="navbar-item"
    >
      {blok.label || "No label"}
    </Link>
  );
};

export default NavItem;


// import { storyblokEditable } from "@storyblok/react";
// import { Link } from "react-router-dom";

// const NavItem = ({ blok }) => {
//     const url = blok.url?.cached_url || "/";

//     return (
//         <Link
//             {...storyblokEditable(blok)}
//             to={url === "/" ? "/" : `/${url}`}
//             className="navbar-item"
//         >
//             {blok.label || "No label"}
//         </Link>
//     );
// };

// export default NavItem;
