import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { Box, ListItemButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useAppStateContext } from "contexts/AppContext";
import { superAdminTabs } from "data/dummy";
import styles from "./Sidebar.module.scss";
import { Logo } from "components/Icons";

const cx = classNames.bind(styles);

const Sidebar = () => {
  const theme = useTheme();

  const { sidebarRef, overlayRef } = useAppStateContext();
  const [navLinkActived, setNavLinkActived] = useState("home");

  // CHECK ROLE
  // useEffect(() => {
  //     const sessionRole = sessionStorage.getItem("role");
  //     if (
  //         !sessionRole ||
  //         Number(sessionRole) < 0 ||
  //         Number(sessionRole) > 1
  //     ) {
  //         navigate("/auth");
  //     }
  //     setRole(Number(sessionRole));
  // }, []);

  // USE EFFECT TO CHECK SHOW SIDEBAR WHEN RESIZE SCREEN WIDTH
  useEffect(() => {
    const resizeEventId = window.addEventListener("resize", () => {
      if (sidebarRef.current) {
        if (window.innerWidth >= 1200) {
          sidebarRef.current.style.left = 0;
          sidebarRef.current.style.opacity = 1;
        } else {
          sidebarRef.current.style.left = "-110%";
          sidebarRef.current.style.opacity = 0;
        }
      }
    });
    return () => window.removeEventListener("resize", resizeEventId);
  }, []);

  // HANDLE ON CLICK LINK ITEM
  const handleOnClickLink = (name) => {
    setNavLinkActived(name);
    if (window.innerWidth < 1200) {
      sidebarRef.current.style.left = "-110%";
      sidebarRef.current.style.opacity = 0;
      overlayRef.current.style.display = "none";
    }
  };

  return (
    <Box
      ref={sidebarRef}
      sx={{
        backgroundColor: theme.palette.background.main,
        left: {
          xs: "-110%",
          lg: 0,
        },
        zIndex: {
          xs: 9999,
          lg: 999,
        },
      }}
      className={cx("wrapper")}
    >
      {/* LOGO */}
      <Box
        sx={{
          color: theme.palette.color.main,
          borderBottom: theme.palette.border,
        }}
        className={cx("header")}
      >
        <Box className={cx("logo")}>
          <Logo />
          {/* <Link to="/admin" style={{ height: "36px" }}>
                    </Link> */}

          <Box
            sx={{
              width: "1px",
              height: "32px",
              margin: "0 0.6rem",
              backgroundColor: theme.palette.color.border,
            }}
          />

          <Box>
            <Typography
              sx={{
                color: theme.palette.color.primary,
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              Hi Jobs
            </Typography>
            <Typography
              sx={{
                color: theme.palette.color.primary,
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              v1
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* LINKS */}
      {/* {role === 0 && (
                <Box className={cx("links")}>
                    {normalAdminTabs.map((link) => (
                        <Box className={cx("link-item")} key={link.title}>
                            <Typography>{link.title}</Typography>
                            {link.links.map((link) => (
                                <Link
                                    to={`${link.path}`}
                                    key={link.name}
                                    onClick={() => handleOnClickLink(link.name)}
                                >
                                    <Box
                                        sx={[
                                            {
                                                color:
                                                    navLinkActived === link.name
                                                        ? theme.palette.color
                                                              .active
                                                        : theme.palette.color
                                                              .main,
                                                backgroundColor:
                                                    navLinkActived === link.name
                                                        ? theme.palette
                                                              .background.active
                                                        : theme.palette
                                                              .background.main,
                                            },
                                            (theme) => ({
                                                "&:hover": {
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .hover,
                                                },
                                            }),
                                        ]}
                                        className={cx("nav-link")}
                                    >
                                        {link.icon}
                                        <span>{link.name}</span>
                                    </Box>
                                </Link>
                            ))}
                        </Box>
                    ))}
                </Box>
            )} */}

      {/* {role === 1 && (
                <Box className={cx("links")}>
                    {superAdminTabs.map((link) => (
                        <Box className={cx("link-item")} key={link.title}>
                            <Typography>{link.title}</Typography>
                            {link.links.map((link) => (
                                <Link
                                    to={`${link.path}`}
                                    key={link.name}
                                    onClick={() => handleOnClickLink(link.name)}
                                >
                                    <Box
                                        sx={[
                                            {
                                                color:
                                                    navLinkActived === link.name
                                                        ? theme.palette.color
                                                              .active
                                                        : theme.palette.color
                                                              .main,
                                                backgroundColor:
                                                    navLinkActived === link.name
                                                        ? theme.palette
                                                              .background.active
                                                        : theme.palette
                                                              .background.main,
                                            },
                                            (theme) => ({
                                                "&:hover": {
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .hover,
                                                },
                                            }),
                                        ]}
                                        className={cx("nav-link")}
                                    >
                                        {link.icon}
                                        <span>{link.name}</span>
                                    </Box>
                                </Link>
                            ))}
                        </Box>
                    ))}
                </Box>
            )} */}

      <Box className={cx("links")}>
        {superAdminTabs.map((link) => (
          <Box className={cx("link-item")} key={link.title}>
            <Typography>{link.title}</Typography>
            {link.links.map((link) => (
              <>
                <ListItemButton
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.background.active,
                    },
                  }}
                >
                  <Link
                    to={`${link.path}`}
                    key={link.name}
                    onClick={() => handleOnClickLink(link.name)}
                    style={{ width: "100%" }}
                  >
                    <Box
                      sx={[
                        {
                          color:
                            navLinkActived === link.name
                              ? theme.palette.color.active
                              : theme.palette.color.main,
                          backgroundColor:
                            navLinkActived === link.name
                              ? theme.palette.background.active
                              : theme.palette.background.main,
                        },
                        (theme) => ({
                          "&:hover": {
                            backgroundColor: theme.palette.background.hover,
                          },
                        }),
                      ]}
                      className={cx("nav-link")}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Box>
                  </Link>
                </ListItemButton>
                {
                  link.sub_link && (
                    <Collapse in={true} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {link.sub_link.map((sub_link) => (
                          <ListItemButton
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: theme.palette.background.active,
                              },
                            }}
                          >
                            <Link

                              to={`${sub_link.path}`}
                              key={sub_link.name}
                              onClick={() => handleOnClickLink(sub_link.name)}
                              style={{ width: "100%" }}
                            >
                              <Box

                                sx={[
                                  {
                                    color:
                                      navLinkActived === sub_link.name
                                        ? theme.palette.color.active
                                        : theme.palette.color.main,
                                    backgroundColor:
                                      navLinkActived === sub_link.name
                                        ? theme.palette.background.active
                                        : theme.palette.background.main,
                                  },
                                  (theme) => ({
                                    "&:hover": {
                                      backgroundColor: theme.palette.background.hover,
                                    },
                                  }),
                                ]}
                                className={cx("nav-link")}
                              >
                                {sub_link.icon}
                                <span>{sub_link.name}</span>
                              </Box>
                            </Link>
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )
                }
              </>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
