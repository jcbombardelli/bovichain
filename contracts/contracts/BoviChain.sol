// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract BoviChain is Ownable {
    using Strings for uint256;

    struct AssetData {
        uint256 id;
        string name;
        string data;
    }

    mapping(uint256 => AssetData) private assetDataById;

    event AssetMinted(uint256 indexed id, string name, string data);

    constructor() Ownable(msg.sender) {}

    function mint(
        uint256 id,
        string memory name,
        string memory data
    ) public onlyOwner {
        assetDataById[id] = AssetData(id, name, data);
        emit AssetMinted(id, name, data);
    }

    function tokenURI(uint256 id) public view returns (string memory) {
        AssetData memory assetdata = assetDataById[id];
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name":"',
                        assetdata.name,
                        '", "data":"',
                        assetdata.data,
                        '"}'
                    )
                )
            )
        );

        return json;
    }
}
