import { ethers } from "hardhat";

async function main() {
  const NAME = "Petete";
  const SYMBOL = "PTT";
  const SUPPLY = 12500;

  const myToken = await ethers.getContractFactory("MyToken");
  const mytoken = await myToken.deploy(NAME, SYMBOL, SUPPLY);

  await mytoken.deployed();

  console.log("MyToken deployed to:", mytoken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
