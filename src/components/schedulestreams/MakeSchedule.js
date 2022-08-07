import React from "react";
import "./MakeSchedule.scss";
import { create, CID } from "ipfs-http-client";
import { useDropzone } from "react-dropzone";
import { useState, useRef } from "react";
import Upload from "./Wavy_Bus-15_Single-02_prev_ui.png";
// import Upload from "../styles/man.png";
import pic from "./loginbg1.png";
function MakeSchedule() {
  const [yourImage, setImage] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });
  const profile_picture = useRef(null);
  const [profile_image, setProfile_image] = useState();
  const [profile_image_url, setProfile_image_url] = useState();

  function reset(e) {
    setProfile_image(null);
    // console.log(profile_image);
  }

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
  return (
    <div className="App">
      <div className="image-hero">
        <img src={pic} alt="" />
      </div>
      <div class="container">
        <h1>FORM</h1>

        <form className="ms-form">
          <div class="column">
            {/* <label for="myfile">Cover Image:</label>
            <input type="file" id="myfile" name="myfile"></input> */}
          </div>
          <div className="fileupload">
            {profile_image ? (
              <>
                <img
                  src={profile_image_url}
                  className="uploaded_image-editprofile"
                  alt="user_avatar"
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
            <div>
              {yourImage.map((upFile) => {
                return (
                  <div>
                    <img
                      src="{upFile.preview}"
                      style={{ width: "100px", height: "100px" }}
                      alt="preview"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div class="column">
            {/* <label for="name">Title</label> */}
            <input
              className="ms-input"
              type="text"
              id="name"
              placeholder="Your Title here"
            />

            <div class="column">
              {/* <label for="start">Start date:</label> */}
              <input
                className="ms-input"
                type="date"
                id="start"
                name="trip-start"
              />
            </div>
          </div>

          <div class="column">
            {/* <label for="subject">Discription</label> */}
            <input
              className="ms-input"
              type="text"
              id="subject"
              placeholder="Your Discription here"
            />

            <div class="column">
              {/* <label for="contact">Price</label> */}
              <input
                className="ms-input"
                type="number"
                id="price"
                placeholder="Price here"
              />
              <div class="column">
                {/* <label for="name">Input</label> */}
                <input
                  className="ms-input"
                  type="text"
                  id="name"
                  placeholder="Your Title here"
                />
              </div>
            </div>
          </div>

          <button className="action-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default MakeSchedule;
