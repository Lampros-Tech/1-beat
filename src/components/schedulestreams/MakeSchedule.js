import React from "react";
import "./MakeSchedule.scss";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
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
            <div {...getRootProps()}>
              <input className="ms-input" {...getInputProps()} />
              {isDragActive ? (
                <p>Drag 'n' drop some files here,</p>
              ) : (
                <p> click here to upload cover Photo</p>
              )}
            </div>
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
