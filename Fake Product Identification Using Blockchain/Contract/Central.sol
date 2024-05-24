//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Company.sol";

contract Central {
    address[] walletAddresses;

    mapping(address => address) walletAddressToSmartContractAddress;

    function createSmartContract() public {
        Company companyContract = new Company(msg.sender);
        walletAddresses.push(address(companyContract));
        walletAddressToSmartContractAddress[msg.sender] = address(
            companyContract
        );
    }

    function getCompanySmartContractAddress(address _walletAddress)
        public
        view
        returns (address)
    {
        return walletAddressToSmartContractAddress[_walletAddress];
    }

    function addproduct(
        address _ownerAddress,
        address _contractAddress,
        uint256[] memory _products
    ) public returns (string memory) {
        return Company(_contractAddress).addProducts(_ownerAddress, _products);
    }

    

    function retrieve(address _val) public pure returns (address) {
        return _val;
    }
}
