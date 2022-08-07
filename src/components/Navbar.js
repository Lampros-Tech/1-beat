import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import "../styles/Navbar/navbar.scss";
import logo from "../styles/logo.png";
import "../styles/Navbar/navbar.scss";
import Dropdown from "./users/generalblocks/Dropdown";
import dropdownsvg from "../styles/Navbar/arrow.svg";

const Navbar = ({ setOpenWalletOption }) => {
  const cookie = new Cookies();
  const [address, setAddress] = useState(cookie.get("account"));
  const location = useLocation();
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const addr = cookie.get("account");
    if (addr) {
      setAddress(addr);
    }
  }, [cookie]);

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  // ******Drop down code************

  const onMouseEnter = () => {
    if (window.innerWidth < 900) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 900) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  return (
    <>
      <div className="navbar-main">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src={logo} alt="logo" width="128px" height="128px"></img>
          </div>
        </div>
        <div className="navbar-middle">
          {/* <div className="searchbar">
            <input type="text" />
          </div> */}
        </div>
        <div className="navbar-right">
          <ul>
            <li className={window.location.pathname === "/" ? "active" : null}>
              <Link to="/">Home</Link>
            </li>
            {address ? (
              <>
                <li
                  className={
                    window.location.pathname === "/streams" ? "active" : null
                  }
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <Link to="/streams">
                    All Streams{" "}
                    <img
                      className="dropdown-arrow"
                      src={dropdownsvg}
                      alt="dropdownarrow"
                    />
                  </Link>
                  {dropdown && <Dropdown />}
                </li>
                {/* <li
                  className={
                    window.location.pathname === "/schedule-stream"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/schedule-stream">Scheduled Streams</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/create-stream"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/create-stream">Create Streams</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/live-stream"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/live-stream">Live Streams</Link>
                </li> */}
                <li
                  className={
                    window.location.pathname === "/all-artists"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/all-artists">All Artists</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/all-nfts" ? "active" : null
                  }
                >
                  <Link to="/all-nfts">All NFTs</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/make-schedule"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/make-schedule">Make Schedule</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/profile" ? "active" : null
                  }
                >
                  <Link to="/profile">Profile</Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="connect-btn"
                  onClick={() => {
                    setOpenWalletOption(true);
                  }}
                >
                  Connect
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
