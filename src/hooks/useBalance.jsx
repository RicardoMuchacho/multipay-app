import { useEffect, useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { formatNativeBalance } from '../utils/formatter'

export const useBalance = () => {
  const { account, Web3API } = useMoralisWeb3Api()
  const { user, isInitialized, account: walletAddress } = useMoralis()
  const [loading, setLoading] = useState(false)
  const [assets, setAssets] = useState()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_WEB3API_KEY,
    },
  }

  useEffect(async () => {
    console.log(user, walletAddress)
    getUserBalance()
    console.log(assets)
  }, [])

  const fetchNativeBalance = async () => {
    const nativeBalance = await fetch(
      `https://deep-index.moralis.io/api/v2/${walletAddress}/balance?chain=goerli`,
      options
    )
    const nativeBalanceJson = await nativeBalance.json()
    return await formatNativeBalance(nativeBalanceJson.balance)
  }

  const fetchBalance = async () => {
    const balance = await fetch(
      `https://deep-index.moralis.io/api/v2/${walletAddress}/erc20?chain=goerli`,
      options
    )
    const balanceJson = await balance.json()
    console.log(balanceJson)

    return balanceJson
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

  return { loading, getUserBalance, assets }
}
