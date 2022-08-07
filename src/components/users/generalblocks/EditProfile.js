import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { create, CID } from "ipfs-http-client";
import Upload from "../styles/man.png";

export default function EditProfile({ account, contract, closeModal }) {
  const [name, setName] = useState("Unknown");
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  //useref for profile picture.
  const profile_picture = useRef(null);
  const [profile_image, setProfile_image] = useState();
  const [profile_image_url, setProfile_image_url] = useState();
  //reseting url of image
  function reset(e) {
    setProfile_image(null);
    // console.log(profile_image);
  }

  //upload image function
  async function UploadImage(e) {
    const file = e.target.files[0];
    // console.log(file);
    setProfile_image(file);
    try {
      const client = create("https://ipfs.infura.io:5001/api/v0");
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setProfile_image_url(url);
      console.log(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const getUserDetails = async (e) => {
    const tx = await contract.createProfile(account, name, profile_image_url);
    tx.wait();
    console.log(name);
    console.log(profile_image_url);
  };
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">
            <h1>Edit Your Profile</h1>
            <svg
              className="svg-close"
              onClick={() => closeModal(false)}
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.095 47.095"
            >
              <g>
                <path
                  d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21
		              L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831
		              c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0
                  C47.673,42.282,47.672,38.54,45.363,36.234z"
                />
              </g>
            </svg>
          </div>
          <div className="body">
            <h3>Profile Image</h3>
            {profile_image ? (
              <>
                <img
                  src={profile_image_url}
                  className="uploaded_image-editprofile"
                  alt="user_avatar"
                  crossOrigin="anonymous"
                />
                <button
                  className="reset-btn"
                  onClick={(e) => {
                    reset(e);
                  }}
                >
                  reset
                </button>
              </>
            ) : (
              <div
                className="upload-profile-picture"
                onClick={(e) => {
                  profile_picture.current.click();
                }}
              >
                <img src={Upload} className="upload-image" alt="user_avatar" />
              </div>
            )}
            <input
              className="input-edit-profile"
              type="file"
              hidden
              // defaultValue={nameOfUser}
              ref={profile_picture}
              onChange={(e) => {
                UploadImage(e);
              }}
            />
            <h3>Profile Name</h3>
            <input
              className="input-edit-profile"
              type="text"
              placeholder="Enter your good name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="footer">
            <button
              className="save"
              onClick={() => {
                closeModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button className="save" onClick={(e) => getUserDetails()}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
