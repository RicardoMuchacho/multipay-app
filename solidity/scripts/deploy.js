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
