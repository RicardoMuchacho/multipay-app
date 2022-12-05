const hre = require('hardhat')

async function main() {
  // const multipayTokenFactory = await hre.ethers.getContractFactory('Multipay')
  // const multipayToken = await multipayTokenFactory.deploy()

  // await multipayToken.deployed()

  // console.log('Multipay Token deployed to:', multipayToken.address)

  const multipaymentContract = await hre.ethers.getContractFactory(
    'Multipayment'
  )
  const multipayment = await multipaymentContract.deploy()

  await multipayment.deployed()

  console.log('Multipayment contract deployed to:', multipayment.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

//npx hardhat run --network goerli scripts/deploy.js

//verify contract script:
//npx hardhat verify --network goerli 0x7958Fdc6c2c958146fA1BB91Ae359403eC1e7B06
