import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const linksArr = ["home", "login", "signup"];
const loggedInLinks = ["home", "add", "logout"];
const Header = () => {
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <div className="flex-between w-full mb-16">
      <AppBar sx={{ bgcolor: "transparent", position: "sticky", padding:"7px" }}>
        <Toolbar className="pt-2">
          <Link to={"/"}>
            <img
              src="./logo.png"
              alt="HushHub Logo"
              width={60}
              height={70}
              className="object-contain rounded-full"
            />
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
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      ":hover": {
                        textDecoration: "underline",
                        textUnderlineOffset: "18px",
                        fontSize: "16px"
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
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      ":hover": {
                        textDecoration: "underline",
                        textUnderlineOffset: "18px",
                        fontSize: "16px",
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
