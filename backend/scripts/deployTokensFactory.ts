import { ethers } from "hardhat";

export let TEMPLATE_ADDRESS = "";

async function main() {

  const Factory = await ethers.getContractFactory("TokensFactory");
  const factory = await Factory.deploy();

  await factory.deployed();

  console.log("TokensFactory deployed to:", factory.address);
  // Deployed to 0x57BDAc09E0f9Ad73F7ffF3288C4Cf5973CF8D19f on Mumbai
  // Deployed to 0x47227af59cdb02c41501966a8ed92f47d1fd2858 on Goerli
  ////////// msg.sender version ---> Deployed to 0x9035F371C68F66A711aaA5424c0aa621455D16a1
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
