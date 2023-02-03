const { ethers } = require("hardhat")

async function main() {
    const whitelistContract = await ethers.getContractFactory("Whitelist");
    const deployedWhitelistContract = await whitelistContract.deploy(100);
    await deployedWhitelistContract.deployed();
    console.log("Whitelist Contract ADdress:", deployedWhitelistContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });