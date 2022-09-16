import { useEffect, useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { useNativeBalance } from 'react-moralis'
import { formatNativeBalance } from '../utils/formatter'
import { NativeBalance } from 'web3uikit'

export const useBalance = (props) => {
  const { account, Web3API } = useMoralisWeb3Api()
  const { user, isInitialized, account: walletAddress } = useMoralis()

  const [assets, setAssets] = useState()
  const [nativeBalance, setNativeBalance] = useState()

  useEffect(async () => {
    if (isInitialized && user) {
      var assetsArray = await fetchBalance()
      await fetchNativeBalance().then((nativeBalance) =>
        assetsArray.unshift(nativeBalance)
      )
      setAssets(assetsArray)
    }
  }, [isInitialized, walletAddress])

  const fetchNativeBalance = async () => {
    const balance = await Web3API.account.getNativeBalance({ chain: 'rinkeby' })
    return await formatNativeBalance(balance.balance)
  }

  const fetchBalance = async () => {
    return await account
      .getTokenBalances({
        address: walletAddress,
        chain: props?.chain || 'rinkeby',
      })
      .then((result) => result)
  }

  return { fetchBalance, assets }
}
