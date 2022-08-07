import React from "react";
import "./ScheduledStreams.scss";
import { useEffect, useState } from "react";
import LoadingAnimation from "../users/generalblocks/LoadingAnimation";

function ScheduledStreams({ account, contract }) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const getScheduledData = async (e) => {
    let number = await contract.getTotalScheduledNumber();
    number = parseInt(number._hex, 16);
    for (let i = 1; i <= number; i++) {
      const stream = await contract.getAllScheduledStreams(i);
      const cover = stream.cover_cid;
      const title = stream.s_title;
      const des = stream.s_description;
      const time1 = stream.starttime;
      const time2 = stream.endtime;
      data.push([cover, title, des, time1, time2, i]);
    }
    setData(data);
    setLoading(false);
  };

  const onButtonClick = async () => {
    const tx = await contract.bookSchdeuledStream(id, account);
    tx.wait();
    console.log(id);
  };

  useEffect(() => {
    getScheduledData();
    // setLoading(false);
  }, [contract]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (data.length > 0) {
    return (
      <div className="main">
        <div className="stream-title">
          <h1>Scheduled Streams</h1>
        </div>
        {data.map((inde) => {
          return (
            <div className="card-container">
              <div className="main-card">
                <div className="stream-image">
                  <img
                    src={inde[0]}
                    alt=""
                    className="cover-img"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="card-title">
                  <h2>{inde[1]}</h2>
                  <span className="card-description">{inde[2]}</span>
                  <div className="date-time">
                    <p>Start Time : {inde[3]}</p>
                  </div>
                  <div className="date-time">
                    <p>End Time : {inde[4]}</p>
                  </div>
                </div>
                <button
                  className="book-button"
                  onClick={() => onButtonClick(setId(inde[5]))}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    console.log("no");
  }
}

export default ScheduledStreams;
