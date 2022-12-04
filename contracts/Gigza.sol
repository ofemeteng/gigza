// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import {
    Job,
    Bid,
    Profile,
    Review,
    JobState,
    BidState
} from "./CoreStructs.sol";

contract Gigza is Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;
    IERC20 public USDC;

    //The fee charged by the marketplace to be allowed to post a job
    uint256 listPrice = 0.01 ether;

    Counters.Counter private _jobIds;
    mapping(address => Review[]) public reviews;
    mapping(address => Profile) public profile;
    Profile[] public profiles;
    Job[] public jobs;
    uint256 public balance;
    uint256 public commission;
  
    constructor(address _currency) {
        USDC = IERC20(_currency);
    }

    function updateListPrice(uint256 _listPrice) public onlyOwner {
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function createJobPost(
        string memory title,
        string memory description,
        string[] memory skills,
        uint256 timeline,
        uint256 amount
    ) public payable returns (uint256) {
        //Make sure the sender sent enough ETH to pay for listing
        require(
            msg.value >= listPrice,
            "Hopefully sending the correct price"
        );
        //Just sanity check
        require(USDC.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(timeline > block.timestamp, "FORBIDDEN");
        uint256 newJobId = _jobIds.current();
        Job storage job = jobs.push();
        job.jobId = newJobId;
        job.title = title;
        job.description = description;
        job.amount = amount;
        job.client = payable(msg.sender);
        job.skills = skills;
        job.timeline = timeline;
        job.freelancer = address(0);
        job.timestamp = block.timestamp;
        job.state = JobState.POSTED;
        _jobIds.increment();
        balance += amount;
        USDC.safeTransferFrom(msg.sender, address(this), amount);
        emit JobPosted (newJobId, job.title, job.amount, job.description,job.timeline, job.client);
        return newJobId;
    }     

    function submitProposal(
        uint256 jobId,
        string memory description,
        uint256 timeline
    ) external  {
       Job storage job = jobs[jobId];
       Bid[] storage proposals = job.userBids;
       for (uint256 i = 0; i < proposals.length; i++ ){
            if(msg.sender == proposals[i].freelancer){
                require(msg.sender != proposals[i].freelancer, "FORBIDDEN");
            }
       }
        Bid memory bid =  Bid(jobId, description, timeline, msg.sender, BidState.SENT);
        job.userBids.push(bid);
        emit ProposalSubmitted(jobId, description, bid.freelancer);
    } 
    
    function sendContract(uint256 jobId, address user) external  returns (Bid[] memory) {
       Job storage job = jobs[jobId];
       require(job.client == msg.sender, "FORBIDDEN");
       require(job.state == JobState.POSTED, "FORBIDDEN");
       Bid[] storage proposals = job.userBids;
       for (uint256 i = 0; i < proposals.length; i++ ){
            if(user == proposals[i].freelancer){
                require(user == proposals[i].freelancer, "User mismatch");
                proposals[i].bidState = BidState.AWARDED;
                job.state = JobState.OFFERED;
                job.freelancer = user;
            }
       }
       emit ContractSent(jobId, job.freelancer);
       return proposals;
    }

    function acceptContract(uint256 jobId) external  returns (Bid memory) {
       Job storage job = jobs[jobId];
       require(job.freelancer == msg.sender, "FORBIDDEN");
       Bid[] storage proposals = job.userBids;
       for (uint256 i = 0; i < proposals.length; i++ ){
            if(msg.sender == proposals[i].freelancer){
                require(msg.sender == proposals[i].freelancer, "User mismatch");
                require(job.state == JobState.OFFERED, "FORBIDDEN");
                proposals[i].bidState = BidState.ACCEPTED;
                job.state = JobState.ACCEPTED;
                emit ContractAccepted(jobId, job.freelancer);
                return proposals[i];
            }
       }
       revert();  
    }

    function submitJob(uint256 jobId, string memory message, string memory url) external  returns (Job memory) {
        
       Job storage job = jobs[jobId];
       require(job.state == JobState.ACCEPTED, "FORBIDDEN");
       require(job.freelancer == msg.sender, "FORBIDDEN");
       Bid[] storage proposals = job.userBids;
       for (uint256 i = 0; i < proposals.length; i++ ){
            if(msg.sender == proposals[i].freelancer){
                require(msg.sender == proposals[i].freelancer, "User mismatch");
                job.message = message;
                job.url = url;
                proposals[i].bidState = BidState.EXECUTED;
                job.state = JobState.EXECUTED;
            }
       }
       emit JobCompleted(jobId, job.message, job.freelancer);
       return job;
    }   

    function releasePayment(uint256 jobId) external  returns (Job memory) {
       Job storage job = jobs[jobId];
       require(job.state == JobState.EXECUTED, "FORBIDDEN");
       require(job.client == msg.sender, "FORBIDDEN");
       Bid[] storage proposals = job.userBids;
       for (uint256 i = 0; i < proposals.length; i++ ){
            if(job.freelancer == proposals[i].freelancer){
                proposals[i].bidState = BidState.FUFILLED;
                job.state = JobState.FUFILLED;
                uint256 amount = (job.amount - commissionFee(job.amount));
                USDC.transfer(job.freelancer, amount);
                commission += commissionFee(job.amount);
                balance -= job.amount;  
                emit PayementReleased (jobId, amount, job.freelancer);
            }
       }
       
       return job;
    }   

     function withdrawOffer(uint256 jobId) external  returns (Bid[] memory) {
       Job storage job = jobs[jobId];
       require(job.state == JobState.OFFERED, "FORBIDDEN");
       require(job.client == msg.sender, "FORBIDDEN");
       Bid[] storage proposals = job.userBids;
       for (uint256 i = 0; i < proposals.length; i++ ){
            if(job.freelancer == proposals[i].freelancer){
                proposals[i].bidState = BidState.SENT;
                job.state = JobState.POSTED;
                job.freelancer = address(0);
            }
       }
       emit OfferWithDrawn(jobId, job.amount);
       return proposals;
    }  

    function cancelJob(uint256 jobId) external  returns (Job[] memory) {
       Job storage job = jobs[jobId];
       require(job.state ==  JobState.POSTED || job.state == JobState.OFFERED, "FORBIDDEN");
       require(job.client == msg.sender, "FORBIDDEN");
       job.state = JobState.CANCELLED;
       Bid[] storage proposals = job.userBids;
       for (uint256 i = 0; i < proposals.length; i++ ){
                proposals[i].bidState = BidState.CANCELLED;
       }
       USDC.transfer(job.client, job.amount);
       balance -= job.amount;  
       emit JobCancelled(jobId, job.amount, job.title); 
       return jobs;
    } 

    function declineOffer(uint256 jobId) external  returns (Job memory) {
       Job storage job = jobs[jobId];
       require(job.freelancer == msg.sender, "FORBIDDEN");
       require(job.state ==  JobState.OFFERED || job.state == JobState.ACCEPTED, "FORBIDDEN");   
       Bid[] storage proposals = job.userBids;
       for (uint256 i = 0; i < proposals.length; i++ ){
            if(job.freelancer == proposals[i].freelancer){
                proposals[i].bidState = BidState.CANCELLED;
                job.state = JobState.POSTED;
            }
       }
       emit OfferDeclined(jobId, job.amount, job.title); 
       return job;
    }

    function openDispute(uint256 jobId) external  returns (Job memory) {
       Job storage job = jobs[jobId];
       require(job.freelancer == msg.sender || job.client == msg.sender, "FORBIDDEN");
       require(job.state ==  JobState.EXECUTED, "FORBIDDEN");   
       job.state = JobState.INDISPUTE; 
       emit DisputeOpened(jobId, job.amount, job.title);
       return job;
    } 

    function creditUser(uint256 jobId, address user) external onlyOwner returns (Job memory) {
       Job storage job = jobs[jobId];
       require(job.state ==  JobState.INDISPUTE, "FORBIDDEN");   
       job.state = JobState.RESOLVED;
       USDC.transfer(user, job.amount);
       return job;
    }    

    function createProfile (
        string memory name,
        string memory bio,
        string memory mainSkill,
        string[] memory skills,
        string memory profileUrl

    ) external {
        Profile storage user = profiles.push();
        user.bio = bio;
        user.name = name;
        user.mainSkill = mainSkill;
        user.profileUrl = profileUrl;
        for (uint256 i=0; i < skills.length; i++) {
           user.skills.push(skills[i]);
        }
        profile[msg.sender] = user;
        emit ProfileCreated(msg.sender, user.name, user.mainSkill);
    }

    function createReview(
        uint256 jobId, 
        string memory review, 
        uint256 rating
    ) external {
        Job memory job = jobs[jobId];
        require(msg.sender == job.client, "FORBIDDEN");
        require(rating > 0 && rating <= 5, "FORBIDDEN");
        Review memory r = Review (jobId, job.freelancer, review, rating, msg.sender);
        reviews[job.freelancer].push(r);
        emit ReviewCreated(msg.sender, review, rating);
    } 

    function getTotalJobs() external view returns (Job[] memory){
        return jobs; 
    }

     function getUserProfiles() external view returns (Profile[] memory){
        return profiles; 
    }
    function getUser(address user) external view returns (Profile memory){
       return profile[user];
    }

    function getReviews(address user) external view returns (Review[] memory){
        return reviews[user];
    }

    function getJobBids(uint256 jobId) external view returns (Bid[] memory){
        Job memory job = jobs[jobId];
        return job.userBids;
    }

      /**
    * @notice Calculates the protocol fee for each transaction 
    * @param amount The fee is calaculated from the amount
    **/
    function commissionFee(uint256 amount) internal pure returns (uint256){
        return (uint256(1) / uint256(500)) *  amount;
    }

     function withdraw() public onlyOwner  {
        uint256 value = address(this).balance;
        payable(msg.sender).transfer(value);
    }

    function withdrawTokens(IERC20 token) 
    public onlyOwner
    {
        uint256 value = token.balanceOf(address(this));
        token.transfer(msg.sender, value);
    }

    //EVENTS
    event JobPosted(uint256 jobId, string title, uint256 amount, string description, uint256 timeline, address indexed client);
    event ProposalSubmitted(uint256 jobId, string description, address indexed client);
    event ContractSent(uint256 jobId, address indexed freelancer);
    event ContractAccepted(uint256 jobId, address indexed freelancer);
    event JobCompleted(uint256 jobId, string message, address indexed freelancer);
    event PayementReleased(uint256 jobId, uint256 amount, address indexed freelancer);
    event OfferWithDrawn(uint256 jobId, uint256 amount);
    event JobCancelled(uint256 jobId, uint256 amount, string title);
    event OfferDeclined(uint256 jobId, uint256 amount, string title);
    event DisputeOpened(uint256 jobId, uint256 amount, string title);
    event ProfileCreated(address indexed user, string name, string skill);
    event ReviewCreated(address indexed client, string meassge, uint256 rating);

}