const hre = require("hardhat");

async function main() {
    //ERC20 BOO TOKEN
    // const BooToken = await hre.ethers.getContractFactory("BooToken")
    // const booToken = await BooToken.deploy()
    // await booToken.deployed();
    // console.log(`BOO deployed to ${booToken.address}`);

    //ERC20 SPHERE TOKEN
    // const SphereToken = await hre.ethers.getContractFactory("SphereToken")
    // const sphereToken = await SphereToken.deploy()
    // await sphereToken.deployed();
    // console.log(`Sphere deployed to ${sphereToken.address}`);

    //SINGLE SWAP TOKEN
    const SingleSwapToken = await hre.ethers.getContractFactory("SingleSwapToken")
    const singleSwapToken = await SingleSwapToken.deploy()
    await singleSwapToken.deployed();
    console.log(`Single swap token deployed to ${singleSwapToken.address}`);

    //SWAP MULTI HOP
    // const SwapMultiHop = await hre.ethers.getContractFactory("SwapMultiHop")
    // const swapMultiHop = await SwapMultiHop.deploy()
    // await swapMultiHop.deployed();
    // console.log(`Swap multi hop deployed to ${swapMultiHop.address}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})