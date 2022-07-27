import { ethers } from "hardhat";

export let TEMPLATE_ADDRESS = "";

async function main() {

  const NAME = "Petete";
  const SYMBOL = "PTT";
  const SUPPLY = 325000;

  const myToken = await ethers.getContractFactory("MyToken");
  const mytoken = await myToken.deploy();

  await mytoken.deployed();

  console.log("MyToken deployed to:", mytoken.address);
  // Deployed to 0x900F5FeC2DeC20d9597d20bC8A825F38d51e577e on Mumbai
  // msg.sender version ---> Deployed to 0x9035F371C68F66A711aaA5424c0aa621455D16a1
  // 0xFb53Ef478Afd65cBCDeF4f82ee85a285bF796B0f at 22:00
  // 0x7EbF7C10dBF69CC1d82ed0EA0B499456f2746C73 at 2:00
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
