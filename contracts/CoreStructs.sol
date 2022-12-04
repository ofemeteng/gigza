// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


enum JobState {POSTED, OFFERED, ACCEPTED, EXECUTED, FUFILLED, CANCELLED, INDISPUTE, RESOLVED}
enum BidState {SENT, AWARDED, ACCEPTED, EXECUTED, FUFILLED, CANCELLED}

struct Job {
        uint256 jobId;
        string title;
        string description;
        uint256 amount;
        address client;
        string[] skills;
        uint256 timeline;
        address freelancer;
        Bid[] userBids;
        uint256 timestamp;
        JobState state;
        string message;
        string url;
    }
struct Bid {
        uint256 jobId;
        string description;
        uint256 timeline;
        address freelancer;
        BidState bidState;
    }

struct Profile {
        string name;
        string bio;
        string mainSkill;
        string[] skills;
        string profileUrl;
        address user;   
    }

struct Review {
        uint256 jobId;
        address freelancer; 
        string review;
        uint256 rating;
        address client;
    }

