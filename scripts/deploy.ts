import { ethers } from "hardhat";

async function main() {


const Gigza = await ethers.getContractFactory("Gigza");
const gigza = await Gigza.deploy("0xA4d4dBd2Da4fBd7DAafD8DD66ba102025d38AE7F");

await gigza.deployed();

console.log(
  `Successfully deployed to ${gigza.address}`
);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
