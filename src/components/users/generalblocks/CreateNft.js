import React from "react";
import "./profilecreatenft.scss";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import "../generalblocks/createnft.scss";

const ffmpeg = createFFmpeg({ log: true });

class CreateNft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      video:
        "https://livepeercdn.com/recordings/9b8b1920-bfb1-4063-a4b3-c3e39aaa9896/source.mp4",
      gif: null,
      start: 0,
      length: 3,
    };
  }

  componentDidMount() {
    this.loadFFmpeg();
  }

  async loadFFmpeg() {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    this.setState({ ready: true });
  }

  async convertVideoToGif() {
    //write video to memory
    ffmpeg.FS("writeFile", "vid.mp4", await fetchFile(this.state.video));

    //run ffmpeg command
    await ffmpeg.run(
      "-i",
      "vid.mp4",
      "-s",
      "480x320",
      "-r",
      "3",
      "-t",
      String(this.state.length),
      "-ss",
      String(this.state.start),
      "-vf",
      "scale=1920:1080",
      "out.mp4"
    );

    //convert to data to url
    const data = ffmpeg.FS("readFile", "out.mp4");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    this.setState({ gif: url });
  }

  render() {
    return this.state.ready ? (
      <>
        <div className="cn-main-container">
          <div className="cn-left-container">
            <h1>Your Stream</h1>
            {this.state.video && (
              <video
                controls
                width={500}
                src={this.state.video}
                crossOrigin="anonymous"
              />
            )}
            {/* <input
          type={"file"}
          onChange={(e) => {
            this.setState({ video: e.target.files?.item(0) });
          }}
        /> */}
            <div className="cn-left-label">
              <div>
                <label htmlFor={"start-input"}>
                  NFT Video Starting Time (in Sec){" "}
                </label>
              </div>
              <div>
                <input
                  id={"start-input"}
                  type={"number"}
                  value={this.state.start}
                  onChange={(e) => {
                    this.setState({ start: e.target.value });
                  }}
                />
              </div>
              <div>
                <label htmlFor={"length-input"}>
                  Length of the Video (in Sec){" "}
                </label>
              </div>
              <div>
                <input
                  id={"length-input"}
                  type={"number"}
                  value={this.state.length}
                  onChange={(e) => {
                    this.setState({ length: e.target.value });
                  }}
                />
              </div>
            </div>
            <button
              className="cn-convert-button"
              onClick={() => {
                this.convertVideoToGif();
              }}
            >
              Create NFT
            </button>
          </div>
          <div className="cn-right-container">
            <h1>Your NFT Preview</h1>

            {this.state.gif && (
              <>
                <video controls width={500} src={this.state.gif} alt={"gif"} />

                <div className="cn-left-label">
                  <div>
                    <label>Enter Title of the NFT</label>
                  </div>
                  <div>
                    <input type="text" />
                  </div>

                  <div>
                    <label>NFT Description </label>
                  </div>
                  <div>
                    <textarea rows="7" cols="30" />
                  </div>
                </div>
                <button
                  className="cn-convert-button"
                  onClick={() => {
                    this.convertVideoToGif();
                  }}
                >
                  Mint NFT
                </button>
              </>
            )}
          </div>
        </div>
      </>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default CreateNft;
