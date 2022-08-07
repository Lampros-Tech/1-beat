import React from "react";
import "../stream/AllStream.scss";
import img from "../stream/man.png";
import { useEffect, useState } from "react";

function AllStreams({ account, contract }) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = useState([]);

  const getProfileData = async (e) => {
    let number = await contract.getTotalStreamNumber();
    number = parseInt(number._hex, 16);
    for (let i = 1; i <= number; i++) {
      const stream = await contract.getAllStream(i);
      const cover = stream.img_cid;
      const title = stream.title;
      const user = stream.stream_creator;
      const creator = await contract.getCreator(account);
      const name = creator.creatorName;
      const cid = creator.photo_cid;
      data.push([cover, title, name, cid]);
    }
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getProfileData();
    // setLoading(false);
  }, [contract]);

  if (isLoading) {
    return "Loading";
  }
<<<<<<< HEAD

  return (
    <>
      <div className="stream-main-container">
        <div className="stream-header">
          <h1 className="t-header">AllStream</h1>
          <p className="p-header">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            temporibus sed voluptatem dicta quas vitae quibusdam omnis similique
            optio sint esse quisquam
          </p>
        </div>
        <div className="stream-main-content">
          {data.map((inde) => {
            return (
              <div className="stream-content">
                <div className="stream-img">
                  <div className="stream-img-main">
                    <a>
                      <img src={inde[0]} alt="" crossOrigin="anonymous" />
                    </a>
=======
  if (data.length > 0) {
    return (
      <>
        <div className="stream-main-container">
          <div className="stream-header">
            <h1 className="t-header">AllStream</h1>
            <p className="p-header">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              temporibus sed voluptatem dicta quas vitae quibusdam omnis
              similique optio sint esse quisquam
            </p>
          </div>
          <div className="stream-main-content">
            {data.map((inde) => {
              return (
                <div className="stream-content">
                  <div className="stream-img">
                    <div className="stream-img-main">
                      <a>
                        <img src={inde[0]} alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="stream-user">
                    <div className="stream-img-name">
                      <img src={inde[3]} alt="" />
                      <span>{inde[2]}</span>
                    </div>
                  </div>
                  <div className="stream-title">
                    <h4>{inde[1]}</h4>
                  </div>
                  <div className="stream-date">
                    <span>Date:22/8/2022</span>
>>>>>>> f36d4335718eb23371fb6d60e89d2d6fa07ec49d
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    {
      console.log("no");
    }
  }
}

export default AllStreams;
