const goerliEthAddress = '0xecB0Cc64e7D5Bd306E1C86E702ba41c4E5B8a161'

export const formatNativeBalance = (balance) => {
  const item = {
    token_address: goerliEthAddress,
    balance: balance,
    decimals: 18,
    logo: null,
    name: 'Goerli Ethereum',
    symbol: 'ETH',
  }
  return item
}

export const truncateAddress = (str) => {
  let str1 = str.slice(0, 4)
  let str2 = str.slice(-4)
  let truncatedAddress = str1 + '...' + str2
  return truncatedAddress
}

export function roundDown(number, decimals) {
  decimals = decimals || 0
  return Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
}
