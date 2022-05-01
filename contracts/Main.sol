// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

struct Location {
    uint32 long;
    uint32 lat;
}

struct Driver {
    address payable walletAddress;
    uint256 bidAmount;
}

enum RideStatus {
    REQUESTED,
    ACCEPTED,
    REJECTED,
    COMPLETED
}

contract DTaxi {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    mapping(address => Ride) public rides;

    event RideRequested(address _rider, uint32 _source_long, uint32 _source_lat, uint32 _dest_long, uint32 _dest_lat);

    function requestRide(uint32 _source_long, uint32 _source_lat, uint32 _dest_long, uint32 _dest_lat) public {
        require(_source_long != _dest_long || _source_lat != _dest_lat, "Source and destination cannot be the same");

        Ride ride = new Ride(msg.sender, _source_long, _source_lat, _dest_long, _dest_lat);
        rides[address(ride)] = ride;

        emit RideRequested(address(ride), _source_long, _source_lat, _dest_long, _dest_lat);
    }
}

contract Ride {
    address rider;
    Location public source;
    Location public dest;
    RideStatus status;
    Driver driver;

    mapping(address => Driver) drivers;
    address[] driverAddresses;

    event BidReceived(address _driver, uint256 _amount);
    event BidAccepted(address _driver);

    constructor(address _rider, uint32 _source_long, uint32 _source_lat, uint32 _dest_long, uint32 _dest_lat) {
        rider = _rider;

        source = Location(_source_long, _source_lat);
        dest = Location(_dest_long, _dest_lat);

        status = RideStatus.REQUESTED;
    }

    function makeBid(uint256 _amount) public {
        require(msg.sender != rider, "Rider can't be driver");

        Driver storage d = drivers[msg.sender];
        d.walletAddress = payable(msg.sender);
        d.bidAmount = _amount;
        driverAddresses.push(msg.sender);

        emit BidReceived(msg.sender, _amount);
    }

    function acceptBid(address _driver) public {
        require(msg.sender == rider);
        require(drivers[_driver].walletAddress == _driver, "Wrong Driver!");

        driver = drivers[_driver];
        status = RideStatus.ACCEPTED;

        emit BidAccepted(_driver);
    }

    function startRide() public {}

    function endRide() public {}
}