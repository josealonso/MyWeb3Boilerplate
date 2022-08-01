import { ethers } from "hardhat";

export let TEMPLATE_ADDRESS_AT_MUMBAI = "";
export let TEMPLATE_ADDRESS_AT_GOERLI = "";

async function main() {
  const NAME = "Petete";
  const SYMBOL = "PTT";
  const SUPPLY = 300000;

  const myTemplate = await ethers.getContractFactory("MyERC20Template2");
  const mytemplate = await myTemplate.deploy();

  await mytemplate.deployed();

  console.log("MyERC20Template deployed to:", mytemplate.address);
  // Deployed to 0x9a87b5775e951624242c9E6297b01A6B2c12Ffd6 on Mumbai
  // msg.sender version ---> Deployed to 0xDa74Ce5C10C9ac1FA16C70FbCE00403629B27D40
  TEMPLATE_ADDRESS_AT_MUMBAI = "0x9a87b5775e951624242c9E6297b01A6B2c12Ffd6";
  TEMPLATE_ADDRESS_AT_GOERLI = "0x678Dc6E32F1Ad5c7F72A3d4359D6f1FcE50e9c8d"
  // 0xbB86551a4f03472C50a8a8B618101aD93B8040fb at 22:00
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
