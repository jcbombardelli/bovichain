import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


import * as dotenv from 'dotenv'
dotenv.config({path: '../.env' });

if(!process.env.PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  networks: {
    hardhat: {},
    local: {
      url: 'http://127.0.0.1:8545',
      accounts: { mnemonic: process.env.MNEMONICS || "" },
      gasPrice: 0,
    },
    polygon_amoy: {
      url: process.env.POLYGON_RPC_TESTNET || "",
      accounts: [process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000"],
    },
    polygon_pos: {
      url: process.env.POLYGON_RPC || "",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  mocha: {
    timeout: 1000000
  }
};


export default config;
