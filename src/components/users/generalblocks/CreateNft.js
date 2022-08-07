import React from "react";
import "./profilecreatenft.scss";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

class CreateNft extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ready: false, video: null, gif: null, start: 0, length: 3 };
  }

  componentDidMount() {
    this.loadFFmpeg();
  }

  async loadFFmpeg() {
    await ffmpeg.load();
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
      <div>
        {this.state.video && (
          <video
            controls
            width={250}
            src={URL.createObjectURL(this.state.video)}
          />
        )}
        <input
          type={"file"}
          onChange={(e) => {
            this.setState({ video: e.target.files?.item(0) });
          }}
        />
        <label htmlFor={"start-input"}>Start Time</label>
        <input
          id={"start-input"}
          type={"number"}
          value={this.state.start}
          onChange={(e) => {
            this.setState({ start: e.target.value });
          }}
        />
        <label htmlFor={"length-input"}>Length</label>
        <input
          id={"length-input"}
          type={"number"}
          value={this.state.length}
          onChange={(e) => {
            this.setState({ length: e.target.value });
          }}
        />
        <button
          onClick={() => {
            this.convertVideoToGif();
          }}
        >
          Convert
        </button>
        {this.state.gif && (
          <video controls width={250} src={this.state.gif} alt={"gif"} />
        )}
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default CreateNft;
