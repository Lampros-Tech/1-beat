import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

/********************* COMPONENTS ********************/
import Navbar from "./components/Navbar";
import Home from "./components/homepage/Home";
import LiveStreams from "./components/stream/LiveStreams";
import CreateStream from "./components/stream/CreateStream";
import ScheduledStreams from "./components/schedulestreams/ScheduledStreams";
import AllStreams from "./components/stream/AllStreams";
import AllArtists from "./components/users/AllArtists";
import AllNfts from "./components/nft/AllNfts";
import MakeSchedule from "./components/schedulestreams/MakeSchedule";
import SingleUser from "./components/users/SingleUser";
import Profile from "./components/users/Profile";

/********************* CSS CLASS ********************/
import "./index.css";
import "./App.css";

import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import onebeat from "./artifacts/contracts/OneBeat.sol/OneBeat.json";

import metamask from "./components/mm.png";
import coinbase from "./components/wc.png";

const contractAddress = "0xfeA7ee9ABf1E6892441Fbd679E17511110dB944F";

function App() {
  const { activate, deactivate } = useWeb3React();
  const [openWalletOption, setOpenWalletOption] = useState(false);
  // const [address, setAddress] = useState("");
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  //
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState({});
  let [error, setErr] = useState(null);

  const web3Handler = async () => {
    let accounts = await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .catch((err) => {
        error = err.code;
        setErr(error);
      });
    setAccount(connected);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let networkName = await provider.getNetwork();
    let chainId = networkName.chainId;
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    if (chainId !== 4) {
      alert("Please connect to rinkeby network");
    }
    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(connected);
      await web3Handler();
    });
    loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    const c = new ethers.Contract(contractAddress, onebeat.abi, signer);
    setContract(c);
    setLoading(false);
    // console.log("token")
    // console.log(tokenContract)
    // console.log("contract")
    // console.log(maincontract)
  };

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const cookie = new Cookies();

  const connected = cookie.get("account");

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42, 137],
  });

  // const WalletConnect = new WalletConnectConnector({
  //   rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  //   bridge: "https://bridge.walletconnect.org",
  //   qrcode: true,
  // });

  // const Injected = new InjectedConnector({
  //   supportedChainIds: [1, 3, 4, 5, 42, 137]
  // });

  const wrapperRef = useRef(null);

  window.ethereum.on("accountsChanged", function (accounts) {
    let acc = accounts[0];
    if (!acc) {
      setIsConnected(false);
      cookie.remove("account");
      window.location.reload();
    }
  });

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
    if (setIsConnected(true)) {
      console.log("yes");
    }
  }, [ethereum]);

  useEffect(() => {
    if (connected) {
      web3Handler();
    }
  }, [connected]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      cookie.set("account", accounts[0], { path: "/", maxAge: 3600 });
      setAccountBalance(bal);
      setIsConnected(true);
      setOpenWalletOption(false);
    } catch (error) {
      setIsConnected(false);
    }
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /*
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenWalletOption(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);
  return (
    <div className="App">
      <Router>
        <Navbar setOpenWalletOption={setOpenWalletOption} />
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/" element={<Stream />} /> */}
            <Route
              exact
              path="/live-stream"
              element={<LiveStreams contract={contract} account={account} />}
            />
            <Route
              exact
              path="/create-stream"
              element={<CreateStream contract={contract} account={account} />}
            />
            <Route
              exact
              path="/schedule-stream"
              element={
                <ScheduledStreams contract={contract} account={account} />
              }
            />
            <Route
              exact
              path="/streams"
              element={<AllStreams contract={contract} account={account} />}
            />
            <Route
              exact
              path="/all-artists"
              element={<AllArtists contract={contract} account={account} />}
            />
            <Route
              exact
              path="/all-nfts"
              element={<AllNfts contract={contract} account={account} />}
            />
            <Route
              exact
              path="/make-schedule"
              element={<MakeSchedule contract={contract} account={account} />}
            />
            <Route
              exact
              path="/user/"
              element={<SingleUser contract={contract} account={account} />}
            />
            <Route
              exact
              path="/profile"
              element={<Profile contract={contract} account={account} />}
            />
          </Routes>
        </div>
      </Router>
      {openWalletOption ? (
        <div className="alert-main">
          <div className="alert-box" ref={wrapperRef}>
            <div className="alert-header">
              <div className="title">CONNECT</div>
            </div>
            <div className="alert-container">
              <div className="alert-holder">
                <div className="image">
                  <img
                    src={metamask}
                    onClick={() => {
                      connectWallet();
                    }}
                    title="metamask"
                    className="mm"
                    alt="metamask"
                  />
                </div>
                <div className="image">
                  <img
                    src={coinbase}
                    onClick={() => {
                      activate(CoinbaseWallet);
                    }}
                    title="coinbase"
                    className="mm"
                    alt="coinbase"
                  />
                </div>
                {/* <div className='image'>
                      <img src={walletconnect} onClick={() => { activate(WalletConnect) }} className="mm" alt="wallet connect image" />
                    </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
