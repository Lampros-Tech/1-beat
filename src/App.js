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

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/" element={<Stream />} /> */}
            <Route exact path="/live-stream" element={<LiveStreams />} />
            <Route exact path="/create-stream" element={<CreateStream />} />
            <Route
              exact
              path="/schedule-stream"
              element={<ScheduledStreams />}
            />
            <Route exact path="/streams" element={<AllStreams />} />
            <Route exact path="/all-artists" element={<AllArtists />} />
            <Route exact path="/all-nfts" element={<AllNfts />} />
            <Route exact path="/make-schedule" element={<MakeSchedule />} />
            <Route exact path="/user/" element={<SingleUser />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
