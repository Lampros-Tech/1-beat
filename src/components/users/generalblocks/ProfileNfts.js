import React from "react";
import img from "../styles/Gaming4-5.jpg";
import { ethers } from "ethers";
import mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet
import { useState } from "react";

function ProfileNfts() {
  let [error, setErr] = useState(null);
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(true);

  const zora_v3_contract_address = "0xCe6cEf2A9028e1C3B21647ae3B4251038109f42a";
  const _abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_erc20TransferHelper",
          type: "address",
        },
        {
          internalType: "address",
          name: "_erc721TransferHelper",
          type: "address",
        },
        {
          internalType: "address",
          name: "_royaltyEngine",
          type: "address",
        },
        {
          internalType: "address",
          name: "_protocolFeeSettings",
          type: "address",
        },
        {
          internalType: "address",
          name: "_wethAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenContract",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "address",
              name: "seller",
              type: "address",
            },
            {
              internalType: "address",
              name: "sellerFundsRecipient",
              type: "address",
            },
            {
              internalType: "address",
              name: "askCurrency",
              type: "address",
            },
            {
              internalType: "uint16",
              name: "findersFeeBps",
              type: "uint16",
            },
            {
              internalType: "uint256",
              name: "askPrice",
              type: "uint256",
            },
          ],
          indexed: false,
          internalType: "struct AsksV1_1.Ask",
          name: "ask",
          type: "tuple",
        },
      ],
      name: "AskCanceled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenContract",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "address",
              name: "seller",
              type: "address",
            },
            {
              internalType: "address",
              name: "sellerFundsRecipient",
              type: "address",
            },
            {
              internalType: "address",
              name: "askCurrency",
              type: "address",
            },
            {
              internalType: "uint16",
              name: "findersFeeBps",
              type: "uint16",
            },
            {
              internalType: "uint256",
              name: "askPrice",
              type: "uint256",
            },
          ],
          indexed: false,
          internalType: "struct AsksV1_1.Ask",
          name: "ask",
          type: "tuple",
        },
      ],
      name: "AskCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenContract",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "finder",
          type: "address",
        },
        {
          components: [
            {
              internalType: "address",
              name: "seller",
              type: "address",
            },
            {
              internalType: "address",
              name: "sellerFundsRecipient",
              type: "address",
            },
            {
              internalType: "address",
              name: "askCurrency",
              type: "address",
            },
            {
              internalType: "uint16",
              name: "findersFeeBps",
              type: "uint16",
            },
            {
              internalType: "uint256",
              name: "askPrice",
              type: "uint256",
            },
          ],
          indexed: false,
          internalType: "struct AsksV1_1.Ask",
          name: "ask",
          type: "tuple",
        },
      ],
      name: "AskFilled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenContract",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "address",
              name: "seller",
              type: "address",
            },
            {
              internalType: "address",
              name: "sellerFundsRecipient",
              type: "address",
            },
            {
              internalType: "address",
              name: "askCurrency",
              type: "address",
            },
            {
              internalType: "uint16",
              name: "findersFeeBps",
              type: "uint16",
            },
            {
              internalType: "uint256",
              name: "askPrice",
              type: "uint256",
            },
          ],
          indexed: false,
          internalType: "struct AsksV1_1.Ask",
          name: "ask",
          type: "tuple",
        },
      ],
      name: "AskPriceUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "userA",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "userB",
          type: "address",
        },
        {
          components: [
            {
              internalType: "address",
              name: "tokenContract",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          indexed: false,
          internalType: "struct UniversalExchangeEventV1.ExchangeDetails",
          name: "a",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "address",
              name: "tokenContract",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          indexed: false,
          internalType: "struct UniversalExchangeEventV1.ExchangeDetails",
          name: "b",
          type: "tuple",
        },
      ],
      name: "ExchangeExecuted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenContract",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "RoyaltyPayout",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenContract",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_payoutCurrency",
          type: "address",
        },
      ],
      name: "_handleRoyaltyEnginePayout",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "askForNFT",
      outputs: [
        {
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          internalType: "address",
          name: "sellerFundsRecipient",
          type: "address",
        },
        {
          internalType: "address",
          name: "askCurrency",
          type: "address",
        },
        {
          internalType: "uint16",
          name: "findersFeeBps",
          type: "uint16",
        },
        {
          internalType: "uint256",
          name: "askPrice",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenContract",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "cancelAsk",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenContract",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_askPrice",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_askCurrency",
          type: "address",
        },
        {
          internalType: "address",
          name: "_sellerFundsRecipient",
          type: "address",
        },
        {
          internalType: "uint16",
          name: "_findersFeeBps",
          type: "uint16",
        },
      ],
      name: "createAsk",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "erc20TransferHelper",
      outputs: [
        {
          internalType: "contract ERC20TransferHelper",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "erc721TransferHelper",
      outputs: [
        {
          internalType: "contract ERC721TransferHelper",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenContract",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_fillCurrency",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_fillAmount",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_finder",
          type: "address",
        },
      ],
      name: "fillAsk",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "registrar",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenContract",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_askPrice",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_askCurrency",
          type: "address",
        },
      ],
      name: "setAskPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_royaltyEngine",
          type: "address",
        },
      ],
      name: "setRoyaltyEngineAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const web3Handler = async () => {
    let accounts = await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .catch((err) => {
        error = err.code;
        setErr(error);
      });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let networkName = await provider.getNetwork();
    let chainId = networkName.chainId;
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    if (chainId !== 80001) {
      alert("Please connect to polygon network");
    }
    window.ethereum.on("accountsChanged", async function (accounts) {
      await web3Handler();
    });
    loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    const c = new ethers.Contract(zora_v3_contract_address, _abi, signer);
    console.log(c);
    setContract(c);
    setLoading(false);
    // console.log("token")
    // console.log(tokenContract)
    // console.log("contract")
    // console.log(maincontract)
  };
  return (
    <>
      <section className="ps-main-container">
        <section className="ps-grid-container">
          {/* **************************** */}
          {/* ********************************* */}
          <div className="ps-grid-div">
            <div className="ps-video-image">
              <img src={img} alt="video_cover" height="100%" width="100%" />
            </div>
            <div className="ps-grid-title">
              <h3 className="ps-title">Where we starting that and didn’t</h3>
            </div>
            <div className="ps-nft-div">
              <div className="ps-nft-div-inside-one">
                <div className="ps-user-name">
                  <p>User Name</p>
                </div>
                <div className="ps-stream-time">
                  <h6>1 year ago</h6>
                </div>
              </div>
              <div className="ps-nfts-buy-btn">
                <button className="ps-nfts-buy-button">Create Ask</button>
              </div>
            </div>
          </div>
          {/* **************************** */}
          {/* ********************************* */}
          <div className="ps-grid-div">
            <div className="ps-video-image">
              <img src={img} alt="video_cover" height="100%" width="100%" />
            </div>
            <div className="ps-grid-title">
              <h3 className="ps-title">Where we starting that and didn’t</h3>
            </div>
            <div className="ps-nft-div">
              <div className="ps-nft-div-inside-one">
                <div className="ps-user-name">
                  <p>User Name</p>
                </div>
                <div className="ps-stream-time">
                  <h6>1 year ago</h6>
                </div>
              </div>
              <div className="ps-nfts-buy-btn">
                <button className="ps-nfts-buy-button">Create Ask</button>
              </div>
            </div>
          </div>
          {/* **************************** */}
          {/* ********************************* */}
          <div className="ps-grid-div">
            <div className="ps-video-image">
              <img src={img} alt="video_cover" height="100%" width="100%" />
            </div>
            <div className="ps-grid-title">
              <h3 className="ps-title">Where we starting that and didn’t</h3>
            </div>
            <div className="ps-nft-div">
              <div className="ps-nft-div-inside-one">
                <div className="ps-user-name">
                  <p>User Name</p>
                </div>
                <div className="ps-stream-time">
                  <h6>1 year ago</h6>
                </div>
              </div>
              <div className="ps-nfts-buy-btn">
                <button className="ps-nfts-buy-button">Create Ask</button>
              </div>
            </div>
          </div>
          {/* **************************** */}
        </section>
      </section>
    </>
  );
}

export default ProfileNfts;
