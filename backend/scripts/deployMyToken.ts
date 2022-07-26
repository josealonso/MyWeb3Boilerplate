import { ethers } from "hardhat";

export let TEMPLATE_ADDRESS = "";

async function main() {
  const NAME = "Petete";
  const SYMBOL = "PTT";
  const SUPPLY = 300000;

  const myToken = await ethers.getContractFactory("MyToken");
  const mytoken = await myToken.deploy();

  await mytoken.deployed();

  console.log("MyToken deployed to:", mytoken.address);
  // Deployed to 0x900F5FeC2DeC20d9597d20bC8A825F38d51e577e on Mumbai
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
