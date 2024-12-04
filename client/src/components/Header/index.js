import React from "react";
import {Link} from "react-router-dom"
const Header = () => {
  return (
    <Link to="/"><header
    className="flexCenter"
    style={{
      width: "100vw",
      height: "10vh",
      backgroundColor: "#1f3e72",
      fontSize: "30px",
      fontWeight: "600",
      color: 'white'
    }}
  >
    Poditivity Blog Scroller
  </header></Link>
  );
};

export default Header;
