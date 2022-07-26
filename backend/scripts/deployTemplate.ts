import { ethers } from "hardhat";

export let TEMPLATE_ADDRESS = "";

async function main() {
  const NAME = "Petete";
  const SYMBOL = "PTT";
  const SUPPLY = 300000;

  const myTemplate = await ethers.getContractFactory("MyERC20Template");
  const mytemplate = await myTemplate.deploy();  

  await mytemplate.deployed();

  console.log("MyERC20Template deployed to:", mytemplate.address);
  // Deployed to 0x9a87b5775e951624242c9E6297b01A6B2c12Ffd6 on Mumbai
  TEMPLATE_ADDRESS = "0x9a87b5775e951624242c9E6297b01A6B2c12Ffd6";
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
