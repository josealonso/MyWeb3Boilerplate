import { ethers } from "hardhat";
import { MyToken, MyToken__factory } from "../typechain-types";

const ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint256", "name": "supply_", "type": "uint256" }], "name": "createToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "transferToUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const CONTRACT_ADDRESS = "0x7EbF7C10dBF69CC1d82ed0EA0B499456f2746C73";

async function main() {
  const NAME = "Pessate";
  const SYMBOL = "PSST";
  const SUPPLY = 230000;
  let myToken: MyToken;
  // const myToken = await ethers.getContractFactory("MyToken");
  // const mytoken = await myToken.deploy();
  // await mytoken.deployed();
  const { ethereum } = window as any;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  // contract.attach(CONTRACT_ADDRESS);
  await contract.createToken(NAME, SYMBOL, SUPPLY);

  // myToken.createToken(NAME, SYMBOL, SUPPLY);
  // console.log("MyToken deployed to:", mytoken.address);
  // Deployed to 0x900F5FeC2DeC20d9597d20bC8A825F38d51e577e on Mumbai
  // msg.sender version ---> Deployed to 0x9035F371C68F66A711aaA5424c0aa621455D16a1
  // 0xFb53Ef478Afd65cBCDeF4f82ee85a285bF796B0f at 22:00
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
