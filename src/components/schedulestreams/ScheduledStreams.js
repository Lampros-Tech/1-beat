import React from "react";
import "./ScheduledStreams.scss";

function ScheduledStreams() {
  return (
    <div className="main">
      <div className="stream-title">
        <h1>Scheduled Streams</h1>
      </div>
      <div className="card-container">
        <div className="main-card">
          <div className="card-image">
            <img src="https://picsum.photos/200" alt="" className="cover-img" />
          </div>
          <div className="card-title">
            <h1>Title</h1>
            <span className="card-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              fuga!
            </span>
            <div className="date-time">
              <p>17-09-2022</p>
              <p>11:50AM</p>
            </div>
            <button className="book-button">BOOK NOW</button>
          </div>
        </div>
        <div className="card-container">
          <div className="main-card">
            <div className="card-image">
              <img
                src="https://picsum.photos/200"
                alt=""
                className="cover-img"
              />
            </div>
            <div className="card-title">
              <h1>Title</h1>
              <span className="card-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, fuga!
              </span>
              <div className="date-time">
                <p>17-09-2022</p>
                <p>11:50AM</p>
              </div>
              <button className="book-button">BOOK NOW</button>
            </div>
          </div>
        </div>
        <div className="card-container">
          <div className="main-card">
            <div className="card-image">
              <img
                src="https://picsum.photos/200"
                alt=""
                className="cover-img"
              />
            </div>
            <div className="card-title">
              <h1>Title</h1>
              <span className="card-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus, fuga!
              </span>
              <div className="date-time">
                <p>17-09-2022</p>
                <p>11:50AM</p>
              </div>
              <button className="book-button">BOOK NOW</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduledStreams;
