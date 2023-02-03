// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const SphereToken = await hre.ethers.getContractFactory("SphereToken");
  const sphereToken = await SphereToken.deploy(100000000, 50);

  await sphereToken.deployed();

  console.log("Sphere Token deployed: ", sphereToken.address);
  
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
