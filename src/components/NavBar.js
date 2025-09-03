import { useState } from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const NavBar = ({ blok }) => {
  const [isActive, setIsActive] = useState(false);

  if (!blok || !blok.Items) {
    return null;
  }

  const toggleBurger = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="container">
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      {...storyblokEditable(blok)}
    >
      {/* Navbar Brand + Burger */}
      <div className="navbar-brand">
        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive ? "true" : "false"}
          onClick={toggleBurger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      {/* Navbar Menu */}
      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          {blok.Items.map((item) => (
            <StoryblokComponent blok={item} key={item._uid} />
          ))}
        </div>
      </div>
    </nav>
    <hr></hr>
    </div>
  );
};

export default NavBar;





// import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

// const NavBar = ({ blok }) => {
//     if (!blok || !blok.Items) {
//       return null;
//     }

//     return (
//         <nav {...storyblokEditable(blok)}>
//             {blok.Items.map((item) => (
//                 <StoryblokComponent blok={item} key={item._uid} />
//             ))}
//         </nav>
//     );
// };

// export default NavBar;