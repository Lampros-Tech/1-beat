import React from "react";
import { useEffect, useRef, useState } from "react";
import { Client } from "@livepeer/webrtmp-sdk";
import Livepeer from "livepeer-nodejs";

import "./createstream.scss";

function CreateStream() {
  const videoEl = useRef(null);
  const stream = useRef(null);
  const [session, setSession] = useState("");
  const [url, setUrl] = useState("");
  const livepeerObject = new Livepeer("d72d5808-9b46-4bdf-9cb6-d703ca3e0acc");

  const getStreams = async () => {
    const streams = await livepeerObject.Stream.get(
      "00bf97a4-5264-4505-9fe5-469ca7686e53"
    );
    console.log(streams);
  };

  useEffect(() => {
    (async () => {
      videoEl.current.volume = 0;

      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    })();
  });

  const onButtonClick = async () => {
    const stream_ = await livepeerObject.Stream.create({
      name: "test_stream",
      profiles: [
        {
          name: "720p",
          bitrate: 2000000,
          fps: 30,
          width: 1280,
          height: 720,
        },
        {
          name: "480p",
          bitrate: 1000000,
          fps: 30,
          width: 854,
          height: 480,
        },
        {
          name: "360p",
          bitrate: 500000,
          fps: 30,
          width: 640,
          height: 360,
        },
      ],
    });
    console.log(stream_);
    console.log(stream_.streamKey);
    stream_.setRecord(true);
    const current_stream = await livepeerObject.Stream.get(stream_.id);
    const result = await current_stream.setRecord(true);
    console.log(result);
    const url =
      "https://livepeercdn.com/hls/" + stream_.playbackId + "index.m3u8";
    setUrl(url);
    const streamKey = stream_.streamKey;

    if (!stream.current) {
      alert("Video stream was not started.");
    }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();

    const session = client.cast(stream.current, streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
    });
  };

  const closeStream = async () => {
    session.close();
  };

  return (
    <>
      <section className="cs">
        {/* <input
          className="cs-input"
          ref={inputEl}
          type="text"
          placeholder="streamKey"
        /> */}
        <div className="cs-left-container">
          <video className="cs-video" ref={videoEl} controls />
        </div>
        <div className="cs-right-container">
          <form>
            <formfield>
              <input type="text" placeholder="Stream Title" />
            </formfield>
            <formfield>
              <textarea type="text" placeholder="Stream Description" />
            </formfield>
            <formfield>
              <input type="text" placeholder="Wallet Address" />
            </formfield>

            <formfield>
              <label>
                {" "}
                Cover Image for stream
                <input type="file" />
              </label>
            </formfield>
            <formfield>
              <label>Do you want to save this Stream?</label>
              <label>
                <input type="radio" name="radiobutton"></input>
                Yes
              </label>
              <label>
                <input type="radio" name="radiobutton"></input>
                No
              </label>
            </formfield>
          </form>
          <button className="cs-button" onClick={onButtonClick}>
            Start
          </button>
          <button className="cs-button" onClick={closeStream}>
            Stop
          </button>
        </div>
      </section>
    </>
  );
}

export default CreateStream;
