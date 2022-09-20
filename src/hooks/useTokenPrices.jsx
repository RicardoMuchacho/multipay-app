import { useEffect, useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { formatNativeBalance } from '../utils/formatter'
import { useBalance } from './useBalance'

const { assets, fetchBalance } = useBalance()

export const useTokenPrices = () => {
  const { account, Web3API } = useMoralisWeb3Api()

  const [tokenData, setTokenData] = useState()
  const [logos, setLogos] = useState()

  useEffect(async () => {
    if (assets) {
      console.log(assets)
    }
  }, [assets])

  return { assets }
}
