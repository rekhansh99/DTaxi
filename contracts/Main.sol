// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

struct Location {
    string name;
    uint32 long;
    uint32 lat;
}

struct Driver {
    address walletAddress;
    uint256 bidAmount;
}

enum RideStatus {
    REQUESTED,
    ACCEPTED,
    REJECTED,
    ONGOING,
    COMPLETED
}

contract DTaxi {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event RideRequested(
        address _rider,
        string _source_name,
        uint32 _source_long,
        uint32 _source_lat,
        string _dest_name,
        uint32 _dest_long,
        uint32 _dest_lat
    );

    function requestRide(
        string calldata _source_name,
        uint32 _source_long,
        uint32 _source_lat,
        string calldata _dest_name,
        uint32 _dest_long,
        uint32 _dest_lat
    ) public {
        require(
            _source_long != _dest_long || _source_lat != _dest_lat,
            "Source and destination cannot be the same"
        );

        Ride ride = new Ride(
            msg.sender,
            _source_name,
            _source_long,
            _source_lat,
            _dest_name,
            _dest_long,
            _dest_lat
        );

        emit RideRequested(
            address(ride),
            _source_name,
            _source_long,
            _source_lat,
            _dest_name,
            _dest_long,
            _dest_lat
        );
    }
}

contract Ride {
    address public rider;
    Location public source;
    Location public dest;
    RideStatus public status;
    Driver public driver;

    mapping(address => Driver) drivers;

    event BidReceived(address _driver, uint256 _amount);
    event BidAccepted(address _driver);
    event RideStarted();
    event RideCompleted();
    event RideCancelled();

    constructor(
        address _rider,
        string memory _source_name,
        uint32 _source_long,
        uint32 _source_lat,
        string memory _dest_name,
        uint32 _dest_long,
        uint32 _dest_lat
    ) {
        rider = _rider;

        source = Location(_source_name, _source_long, _source_lat);
        dest = Location(_dest_name, _dest_long, _dest_lat);

        status = RideStatus.REQUESTED;
    }

    function makeBid(uint256 _amount) public {
        require(msg.sender != rider, "Rider can't be driver");
        require(_amount > 0, "Bid amount must be greater than zero");
        require(
            status == RideStatus.REQUESTED,
            "Ride is not in requested state"
        );
        require(
            drivers[msg.sender].walletAddress == address(0),
            "Driver already has a bid"
        );

        Driver storage d = drivers[msg.sender];
        d.walletAddress = msg.sender;
        d.bidAmount = _amount;

        emit BidReceived(msg.sender, _amount);
    }

    function acceptBid(address _driver) public {
        require(msg.sender == rider);
        require(status == RideStatus.REQUESTED);
        require(drivers[_driver].walletAddress == _driver, "Wrong Driver!");

        driver = drivers[_driver];
        status = RideStatus.ACCEPTED;

        emit BidAccepted(_driver);
    }

    function startRide() public payable {
        require(msg.sender == rider);
        require(
            status == RideStatus.ACCEPTED,
            "Ride must be accepted before starting"
        );
        require(
            msg.value == driver.bidAmount,
            "Ride amount must match bid amount"
        );

        status = RideStatus.ONGOING;
        emit RideStarted();
    }

    function endRide() public {
        require(msg.sender == rider);
        require(
            status == RideStatus.ONGOING,
            "Ride must be ongoing before ending"
        );

        status = RideStatus.COMPLETED;
        emit RideCompleted();
    }

    function withdraw() public {
        require(msg.sender == driver.walletAddress, "Driver needs to withdraw");
        require(
            status == RideStatus.COMPLETED,
            "Ride must be completed before withdrawing"
        );

        payable(msg.sender).transfer(driver.bidAmount);
    }

    function cancelRide() public {
        require(msg.sender == rider);
        require(
            status == RideStatus.ACCEPTED,
            "Ride must be in accepted state"
        );

        status = RideStatus.REJECTED;
        emit RideCancelled();
        selfdestruct(payable(rider));
    }
}
