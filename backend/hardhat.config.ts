import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        /**
         * Optimize for how many times you intend to run the code.
         * Lower values will optimize more for initial deployment cost, higher
         * values will optimize more for high-frequency usage.
         * @see https://docs.soliditylang.org/en/v0.8.6/internals/optimizer.html#opcode-based-optimizer-module
         */
        runs: 1000,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.MUMBAI_API_KEY_URL || "",
      },
      chainId: 1337   // We set 1337 to make interacting with MetaMask simpler
    },
    mumbai: {
      url: process.env.ALCHEMY_ID || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 35000000000,
      // saveDeployments: true,
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY !== undefined ? process.env.POLYGONSCAN_API_KEY : "",
    },
  }
};

export default config;
