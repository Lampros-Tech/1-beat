import React from "react";
import "./streamplay.scss";
function StreamPlay() {
  return (
    <>
      <section className="sp-main-container">
        <div className="sp-video-div">
          <h1 className="sp-title-stream">Stream Title</h1>
          {/* <h4 className="sp-user-name">user name</h4> */}
          <video width="100%" height="100%" controls>
            <source src="#" type="video/mp4" />
          </video>
        </div>
      </section>
    </>
  );
}

export default StreamPlay;
