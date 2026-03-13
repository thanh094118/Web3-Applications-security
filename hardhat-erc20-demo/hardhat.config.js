require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SEPOLIA_URL = process.env.SEPOLIA_URL; // từ Alchemy hoặc Infura
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.20",
  gasReporter: {
    enabled: false, // 👈 TẮT gas reporter
  },
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
