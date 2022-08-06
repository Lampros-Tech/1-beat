//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract OneBeat {
    address[] public users;
    mapping(address => bool) isAdded;

    struct Stream {
        uint256 stream_id;
        address stream_creator;
        string title;
        string description;
        string[] stream_rights;
        string img_cid;
        string video_id;
        bool wantToRecord;
    }
    mapping(uint256 => Stream) public idToStream;
    mapping(address => uint256[]) public userToStream;
    mapping(string => mapping(uint256 => bool)) public isAllowedForStreamedNfts;

    struct StreamScheduled {
        uint256 schedule_id;
        address schedule_creator;
        string cover_cid;
        string s_title;
        string s_description;
        string time;
        address[] rights;
        uint256 price;
        string s_video_id;
        bool isOver;
    }
    mapping(uint256 => StreamScheduled) public idToScheduledStream;
    mapping(address => uint256[]) public userToScheduledStream;
    mapping(address => mapping(uint256 => bool))
        public isAllowedForScheduledNfts;

    mapping(address => string) public creatorName;
    mapping(address => string) public creatorPhoto;
    mapping(address => uint256[]) public creatorTokens;

    mapping(uint256 => address[]) public allowedWatchers;

    uint256 scheduleStreamId;
    uint256 streamId;

    function createProfile(string memory name, string memory photo) public {
        if (!isAdded[msg.sender]) {
            users.push(msg.sender);
            isAdded[msg.sender] = true;
        }
        creatorName[msg.sender] = name;
        creatorName[msg.sender] = photo;
    }

    function createStream(
        address creator,
        string memory t,
        string memory d,
        string[] memory rights,
        string memory cid,
        string memory v_cid,
        bool isRecord
    ) public {
        streamId += 1;
        idToStream[streamId] = Stream(
            streamId,
            creator,
            t,
            d,
            rights,
            cid,
            v_cid,
            isRecord
        );
        userToStream[creator].push(streamId);
        for (uint256 i = 0; i < rights.length; i++) {
            isAllowedForStreamedNfts[rights[i]][streamId] = true;
        }
    }

    function scheduleStream(
        address creator,
        string memory cid,
        string memory title,
        string memory des,
        string memory time,
        address[] memory rights,
        uint256 price
    ) public {
        scheduleStreamId += 1;
        idToScheduledStream[scheduleStreamId] = StreamScheduled(
            scheduleStreamId,
            creator,
            cid,
            title,
            des,
            time,
            rights,
            price,
            "",
            false
        );
        userToScheduledStream[creator].push(scheduleStreamId);
        for (uint256 i = 0; i < rights.length; i++) {
            isAllowedForScheduledNfts[rights[i]][streamId] = true;
        }
    }

    function startStream(uint256 id, string memory v_id) public {
        idToScheduledStream[id].s_video_id = v_id;
        idToScheduledStream[id].isOver = true;
    }

    function bookSchdeuledStream(uint256 id, address watcher) public payable {
        uint256 p = idToScheduledStream[id].price;
        require(msg.value == p, "not enough value");
        allowedWatchers[id].push(watcher);
    }

    function createNFT(uint256 tid) public {
        creatorTokens[msg.sender].push(tid);
    }

    function buyNFT(uint256 tid) public {
        creatorTokens[msg.sender].push(tid);
    }

    function getAllStream(uint256 id) public view returns (Stream memory) {
        return idToStream[id];
    }

    function getAllScheduledStreams(uint256 id)
        public
        view
        returns (StreamScheduled memory)
    {
        return idToScheduledStream[id];
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }

    function getAllowedWatcher(uint256 id)
        public
        view
        returns (address[] memory)
    {
        return (allowedWatchers[id]);
    }

    function getName() public view returns (string memory) {
        return (creatorName[msg.sender]);
    }

    function getTokens() public view returns (uint256[] memory) {
        return (creatorTokens[msg.sender]);
    }

    function getScheduledRights(address righter, uint256 id)
        public
        view
        returns (bool)
    {
        return (isAllowedForScheduledNfts[righter][id]);
    }

    function getStreamRights(string memory righter, uint256 id)
        public
        view
        returns (bool)
    {
        return (isAllowedForStreamedNfts[righter][id]);
    }
}
