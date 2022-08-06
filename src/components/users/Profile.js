import React, { useState } from "react";
import logo from "../users/styles/man.png";
import "./styles/profile.scss";

function Profile() {
  const [imgSrc, setImgSrc] = useState(logo);
  return (
    <>
      <section className="profile-main-container">
        <section className="profile-first-section">
          <div className="profile-image">
            <img
              id="profile-image-id"
              src={imgSrc}
              alt="user-profile"
              width="128px"
              height="128px"
            ></img>
          </div>
          <div className="profile-info">
            <div className="profile-name">
              <h1>User Name</h1>
            </div>
            <div className="profile-details">
              <p className="profile-details-p">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur est vero fugit, nisi aliquam obcaecati pariatur
                delectus dolorem vitae, unde reiciendis praesentium. Optio
                tempora fugit, sapiente eum suscipit error obcaecati aperiam,
                alias, doloribus fuga harum ipsam consequatur eaque magnam
                dignissimos quam! Porro quia cumque explicabo molestias
                repudiandae sit optio labore itaque laborum dignissimos rerum
                odio numquam nulla unde fugiat, dolores accusantium assumenda
                laudantium molestiae ea praesentium! Non rerum eius excepturi
                est illo neque iusto voluptate. Architecto magnam similique
                blanditiis voluptatum aspernatur, alias labore dolore deleniti,
                impedit at dolores ducimus ea sit debitis, numquam dignissimos
                doloremque. Deserunt omnis temporibus iusto error.
              </p>
            </div>
            <div className="profile-nft-info">
              {" "}
              Total <span className="nft-span">NFTs</span>
            </div>
            <div className="profile-info-button">
              <button className="profile-btn">Schedule Event</button>
            </div>
          </div>
        </section>
        <section className="profile-second-section">
          <div className="profile-button-grp">
            <button className="profile-second-btns active">Streamings</button>
            <button className="profile-second-btns">NFTs</button>
            <button className="profile-second-btns">Create NFT</button>
          </div>
        </section>
      </section>
    </>
  );
}

export default Profile;
