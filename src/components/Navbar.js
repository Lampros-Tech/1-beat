import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar/navbar.scss";
import logo from "../styles/logo.png";
function Navbar() {
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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/streams">All Streams</Link>
            </li>
            <li>
              <Link to="/schedule-stream">Scheduled Streams</Link>
            </li>
            <li>
              <Link to="/create-stream">Create Streams</Link>
            </li>
            <li>
              <Link to="/live-stream">Live Streams</Link>
            </li>
            <li>
              <Link to="/all-artists">All Artists</Link>
            </li>
            <li>
              <Link to="/all-nfts">All NFTs</Link>
            </li>
            <li>
              <Link to="/make-schedule">Make Schedule</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button className="connect-btn" onClick={() => {}}>
                Connect
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
