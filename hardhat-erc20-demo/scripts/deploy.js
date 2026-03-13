const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy("MyToken", "MTK", 1000000);

  await token.waitForDeployment();
  console.log("Token deployed at:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
