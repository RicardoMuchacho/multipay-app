import { useEffect, useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { formatNativeBalance } from '../utils/formatter'

export const useBalance = () => {
  const { account, Web3API } = useMoralisWeb3Api()
  const { user, isInitialized, account: walletAddress } = useMoralis()
  const [loading, setLoading] = useState(false)
  const [assets, setAssets] = useState()

  useEffect(async () => {
    getUserBalance()
  }, [isInitialized, walletAddress])

  const fetchNativeBalance = async () => {
    const balance = await Web3API.account.getNativeBalance({ chain: 'goerli' })
    return await formatNativeBalance(balance.balance)
  }

  const fetchBalance = async () => {
    return await account
      .getTokenBalances({
        address: walletAddress,
        chain: 'goerli',
      })
      .then((result) => result)
  }

  const getUserBalance = async () => {
    if (isInitialized && user) {
      setLoading(true)
      var assetsArray = await fetchBalance()
      await fetchNativeBalance().then((nativeBalance) =>
        assetsArray.unshift(nativeBalance)
      )
      setAssets(assetsArray)
      setLoading(false)
    }
  }

  // const fetchTokenMetadataBySymbol = async () => {
  //   //Get metadata for an array of tokens
  //   const options = { chain: 'eth', symbols: ['LINK', 'AAVE'] }
  //   const tokenArrayMetadata = await Web3API.token.getTokenMetadataBySymbol(
  //     options
  //   )
  //   console.log(tokenArrayMetadata)
  //   return tokenArrayMetadata
  // }

  // fetchTokenMetadataBySymbol()

  return { loading, getUserBalance, assets }
}
