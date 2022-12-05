// const goerliEthAddress = '0x7af963cF6D228E564e2A0aA0DdBF06210B38615D'

export const formatNativeBalance = (balance) => {
  const item = {
    token_address: 'goerli eth',
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
