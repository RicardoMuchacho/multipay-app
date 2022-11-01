const hre = require('hardhat')

async function main() {
  const multipayTokenFactory = await hre.ethers.getContractFactory('Multipay')
  const multipayToken = await multipayTokenFactory.deploy()

  await multipayToken.deployed()

  console.log('Multipay Token deployed to:', multipayToken.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

//npx hardhat run --network goerli scripts/deploy.js

//verify contract script (with owners address):
//npx hardhat verify --network goerli 0xecB0Cc64e7D5Bd306E1C86E702ba41c4E5B8a161
