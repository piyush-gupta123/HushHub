import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const linksArr = ["home", "auth"];
const loggedInLinks = ["home", "add", "auth"];
const Header = () => {
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <div>
      <AppBar sx={{ bgcolor: "transparent", position: "sticky" }}>
        <Toolbar>
          <Link to={"/"}>
            <img src="./logo.png" height={20} width={20} className="rounded-full absolute left-1 top-1" />
          </Link>

          <Tabs
            value={value}
            onChange={(e, val) => setValue(val)}
            sx={{ ml: "auto", textDecoration: "none" }}
          >
            {isLoggedIn
              ? loggedInLinks.map((link) => (
                  <Tab
                    LinkComponent={Link}
                    to={`/${link === "home" ? "" : link}`}
                    sx={{
                      textDecoration: "none",
                      ":hover": {
                        textDecoration: "underline",
                        textUnderlineOffset: "18px",
                      },
                    }}
                    key={link}
                    label={link}
                  />
                ))
              : linksArr.map((link) => (
                  <Tab
                    LinkComponent={Link}
                    to={`/${link === "home" ? "" : link}`}
                    sx={{
                      textDecoration: "none",
                      ":hover": {
                        textDecoration: "underline",
                        textUnderlineOffset: "18px",
                      },
                    }}
                    key={link}
                    label={link}
                  />
                ))}
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;