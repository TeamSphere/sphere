// Token addresses
shoaibAddress= '0x47c05BCCA7d57c87083EB4e586007530eE4539e9'
rayyanAddress= '0x408F924BAEC71cC3968614Cb2c58E155A35e6890'
popUpAddress= '0x773330693cb7d5D233348E25809770A32483A940'

// Uniswap contract addresses
wethAddress= '0xD2D5e508C82EFc205cAFA4Ad969a4395Babce026'
factoryAddress= '0x2b639Cc84e1Ad3aA92D4Ee7d2755A6ABEf300D72'
swapRouterAddress= '0xF85895D097B2C25946BB95C4d11E2F3c035F8f0C'
nftDescriptorAddress= '0x0b27a79cb9C0B38eE06Ca3d94DAA68e0Ed17F953'
positionDescriptorAddress= '0x7bdd3b028C4796eF0EAf07d11394d0d9d8c24139'
positionManagerAddress= '0xB468647B04bF657C9ee2de65252037d781eABafD'

const artifacts = {
    UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
    NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  };

const { Contract, BigNumber } = require("ethers");
const bn = require("bignumber.js");
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

const MAINNET_URL = "http://127.0.0.1:8545/";

const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);

// const provider = waffle.provider;

function encodePriceSqrt(reserve1, reserve0) {
    return BigNumber.from(
        new bn(reserve1.toString())
            .div(reserve0.toString())
            .sqrt()
            .multipliedBy(new bn(2).pow(96))
            .integerValue(3)
            .toString()
    )
}

const nonfungiblePositionManager = new Contract(
    positionManagerAddress,
    artifacts.NonfungiblePositionManager.abi,
    provider
);

const factory = new Contract(
    factoryAddress,
    artifacts.UniswapV3Factory.abi,
    provider
);

async function deployPool(token0, token1, fee, price) {
    const [owner] = await ethers.getSigners();
    await nonfungiblePositionManager
        .connect(owner)
        .createAndInitializePoolIfNecessary(token0, token1, fee, price, {
            gasLimit: 5000000,
        });
    const poolAddress = await factory.connect(owner).getPool(token0, token1, fee)
    return poolAddress;
}

async function main() {
    const shoRay = await deployPool(
        shoaibAddress,
        rayyanAddress,
        500,
        encodePriceSqrt(1, 1)
    );

    console.log("SHO_RAY=", `'${shoRay}'`);
}

// npx hardhat run --network localhost scripts/deployPool.js

main()
    .then(()=> process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })