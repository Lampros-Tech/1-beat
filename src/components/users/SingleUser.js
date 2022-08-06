import React from "react";
import ReactPlayer from "react-player";

function SingleUser() {
  return (
    <>
      <ReactPlayer
        controls
        url="https://livepeercdn.com/hls/4a43nepkkyb24025/index.m3u8"
      />
    </>
  );
}

export default SingleUser;
