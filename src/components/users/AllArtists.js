import React from "react";
import user1 from "../users/styles/user1.jpg";
import user2 from "../users/styles/user2.jpg";
import user3 from "../users/styles/user3.jpg";
import "../users/styles/allartists.scss";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

function AllArtists({ account, contract }) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = useState([]);
  const getProfileData = async (e) => {
    const all = await contract.getAllUsers();
    const num = all.length;
    for (let i = 0; i < num; i++) {
      const n = await contract.getCreator(all[i]);
      let number_stream = await contract.getTotal(account);
      number_stream = parseInt(number_stream._hex, 16);
      data.push([n.photo_cid, n.creatorName, n.tokens.length, number_stream]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfileData();
    // setLoading(false);
  }, [contract]);

  if (isLoading) {
    console.log("Loading");
  }

  return (
    <>
      <section className="au-main-container">
        <h1 className="au-heading">Artists</h1>
        <div className="au-grid-container">
          {/* ************************************************************* */}
          {data.map((inde) => {
            return (
              <div className="au-grid-div">
                <div className="au-user-image">
                  <img
                    src={inde[0]}
                    alt="video_cover"
                    height="100%"
                    width="100%"
                  />
                  <div className="au-middle-p">
                    <div class="au-middle">
                      <div className="au-middle-inside">
                        <h2 className="au-user-name">{inde[1]}</h2>
                        <h4 className="au-user-total-nfts">{inde[2]}</h4>
                        <h4 className="au-user-total-nfts">{inde[3]}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* ************************************************************* */}
        </div>
      </section>
    </>
  );
}

export default AllArtists;
