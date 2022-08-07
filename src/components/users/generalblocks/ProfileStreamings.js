import { Routes, Link, useNavigate } from "react-router-dom";
import React from "react";
import "../generalblocks/profilestreamings.scss";
import img from "../styles/Gaming4-5.jpg";
import logo from "../styles/man.png";
import { useEffect, useState } from "react";
import CreateNft from "./CreateNft";

function ProfileStreamings({ account, contract }) {
  const [isLoading, setLoading] = React.useState(true);
  const [name, setName] = useState("Unknown");
  const [no_nft, setNoNft] = useState();
  const [no_stream, setNoStream] = useState();
  const [data, setData] = useState([]);
  const [id, setId] = useState();

  const getProfileData = async (e) => {
    const n = await contract.getCreator(account);
    if (n.creatorName) {
      setName(n.creatorName);
    }
    let streams = await contract.getStreamId(account);
    for (let i = 0; i < streams.length; i++) {
      let id = parseInt(streams[i]._hex, 16);
      const streamStruct = await contract.getAllStream(id);
      const t = streamStruct.title;
      const cid = streamStruct.img_cid;
      const v_id = streamStruct.video_id;
      console.log("vid" + v_id);
      data.push([t, cid, v_id]);
    }
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getProfileData();
    // setLoading(false);
  }, []);

  if (isLoading) {
    console.log("Loading");
  }
  // ************************************

  const navigate = useNavigate();
  const navigateToCreateNft = (id) => {
    // navigate("/create-nft", { state: { id: id } });
  };
  const navigateToStreamPlay = (id) => {
    console.log(id);

    navigate("/stream-play", { state: { id: id } });
  };
  return (
    <>
      <section className="ps-main-container">
        <section className="ps-grid-container">
          {/* **************************** */}
          {/* ************************************ */}
          {data.map((inde) => {
            return (
              <div className="ps-grid-div">
                <div
                  className="ps-video-image"
                  onClick={() => navigateToStreamPlay(inde[2])}
                >
                  <img
                    src={inde[1]}
                    alt="video_cover"
                    height="100%"
                    width="100%"
                    crossOrigin="anonymous"
                  />
                  <div class="middle">
                    <div class="text">
                      <svg
                        className="ps-video-play-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30px"
                        height="30px"
                        viewBox="0 0 55.127 61.182"
                      >
                        <g
                          id="Group_38215"
                          data-name="Group 38215"
                          transform="translate(30 35)"
                        >
                          <g
                            id="play-button-arrowhead_1_"
                            data-name="play-button-arrowhead (1)"
                            transform="translate(-30 -35)"
                          >
                            <path
                              id="Path_18"
                              data-name="Path 18"
                              d="M18.095,1.349C12.579-1.815,8.107.777,8.107,7.134v46.91c0,6.363,4.472,8.952,9.988,5.791l41-23.514c5.518-3.165,5.518-8.293,0-11.457Z"
                              transform="translate(-8.107 0)"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="ps-grid-title">
                  <h3 className="ps-title">{inde[0]}</h3>
                </div>
                <div className="ps-user-name">
                  <h6>{name}</h6>
                </div>
                <div className="ps-stream-time">
                  <h6>1 year ago</h6>
                </div>
                <div className="ps-grid-title">
                  <Link
                    to="/create-nft"
                    state={{ id: 1, name: "sabaoon", shirt: "green" }}
                  >
                    <button>Create NFT</button>
                  </Link>
                </div>
              </div>
            );
          })}
          {/* **************************** */}
        </section>
      </section>
    </>
  );
}

export default ProfileStreamings;
