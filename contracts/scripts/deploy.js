const { ethers } = require("hardhat");

(async function main() {
  try {

    const BovinoChain = await ethers.getContractFactory("BovinoChain");
    const beefChain = await BovinoChain.deploy();
    console.log(beefChain)
    await beefChain.waitForDeployment();
    console.log("BovinoChain deployed to:", beefChain.address);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})()