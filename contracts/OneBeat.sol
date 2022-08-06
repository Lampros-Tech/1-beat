//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract OneBeat{
    address[] public users;
    mapping(address => bool) isAdded;
    
    struct Stream{
        uint stream_id;
        address stream_creator;
        address[] stream_rights;
        string img_cid;
        string video_id;
    }
    mapping(uint=>Stream) public idToStream;
    mapping(address=>uint[]) public userToStream;
    mapping(address=>mapping(uint=>bool)) public isAllowedForStreamedNfts;

    struct StreamScheduled{
        uint schedule_id;
        address schedule_creator;
        string cover_cid;
        string title;
        string description;
        string time;
        address[] rights;        
        uint price;
        string s_video_id;
        bool isOver;
    }
    mapping(uint=>StreamScheduled) public idToScheduledStream;
    mapping(address=>uint[]) public userToScheduledStream;
    mapping(address=>mapping(uint=>bool)) public isAllowedForScheduledNfts;

    mapping(address=>string) public creatorName;
    mapping(address=>string) public creatorPhoto;
    mapping(address=>uint[]) public creatorTokens;

    mapping(uint=>address[]) public allowedWatchers;
    
    uint scheduleStreamId;
    uint streamId;

    function createProfile(string memory name,string memory photo) public{
        if (!isAdded[msg.sender]) {
            users.push(msg.sender);
            isAdded[msg.sender] = true;
        }
        creatorName[msg.sender]=name;
        creatorName[msg.sender]=photo;
    }

    function createStream(address creator, address[] memory rights, string memory cid,
    string memory v_cid) public{
        streamId += 1;
        idToStream[streamId]=Stream(streamId,creator,rights,cid,v_cid);
        userToStream[creator].push(streamId);  
        for(uint i=0;i<rights.length;i++){
            isAllowedForStreamedNfts[rights[i]][streamId]=true;
        }    
    }    

    function scheduleStream(address creator,string memory cid, string memory title, 
    string memory des,string memory time,address[] memory rights,uint price) public{
        scheduleStreamId += 1;
        idToScheduledStream[scheduleStreamId]=StreamScheduled(scheduleStreamId,creator,cid,
        title,des,time,rights,price,"",false);
        userToScheduledStream[creator].push(scheduleStreamId);
        for(uint i=0;i<rights.length;i++){
            isAllowedForScheduledNfts[rights[i]][streamId]=true;
        }         
    }    

    function startStream(uint id,string memory v_id) public{
        idToScheduledStream[id].s_video_id=v_id;
        idToScheduledStream[id].isOver=true;
    }

    function bookSchdeuledStream(uint id,address watcher) public payable{
        uint p=idToScheduledStream[id].price;
        require(msg.value == p,"not enough value");
        allowedWatchers[id].push(watcher);
    }

    function createNFT(uint tid) public{
        creatorTokens[msg.sender].push(tid);
    }

    function buyNFT(uint tid) public{
        creatorTokens[msg.sender].push(tid);
    }

    function getAllStream(uint id) public view returns(Stream memory){
        return idToStream[id];
    }
    
    function getAllScheduledStreams(uint id) public view returns(StreamScheduled memory){
        return idToScheduledStream[id];
    }
    
    function getAllUsers() public view returns(address[] memory){
        return users;
    }

    function getAllowedWatcher(uint id) view public returns(address[] memory){
        return(allowedWatchers[id]);
    }

    function getName() public view returns(string memory){
        return(creatorName[msg.sender]);
    }

    function getTokens() public view returns(uint[] memory){
        return(creatorTokens[msg.sender]);
    }

    function getScheduledRights(address righter,uint id) view public returns(bool){
        return(isAllowedForScheduledNfts[righter][id]);
    }

     function getStreamRights(address righter,uint id) view public returns(bool){
        return(isAllowedForStreamedNfts[righter][id]);
    }
}