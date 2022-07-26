import { ethers } from "hardhat";

async function main() {
  const NAME = "Petete";
  const SYMBOL = "PTT";
  const SUPPLY = 300000;

  const myToken = await ethers.getContractFactory("JR_ERC20FixedSupply");
  const mytoken = await myToken.deploy(NAME, SYMBOL, SUPPLY);

  await mytoken.deployed();

  console.log("MyTokenTemplate deployed to:", mytoken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
