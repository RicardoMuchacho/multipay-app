import { useState, useEffect, useContext } from 'react'
import { AiOutlineBoxPlot } from 'react-icons/ai'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { AppContext } from '../AppContext'

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const Web3Api = useMoralisWeb3Api()
  const BaseUrl = 'https://goerli.etherscan.io/tx/'
  const { user, userAddress, apiKey } = useContext(AppContext)

  const fetchTransactions = async () => {
    if (!userAddress) return setTransactions([])
    setLoading(true)
    // const data = await Web3Api.account.getTransactions({
    //   chain: 0x5,
    //   address: userAddress,
    //   limit: 20,
    // })
    console.log(process.env.MORALIS_WEB3API_KEY)
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'X-API-Key': apiKey },
    }

    const data = await fetch(
      `https://deep-index.moralis.io/api/v2/${userAddress}/erc20/transfers?chain=goerli&limit=20`,
      options
    )
    const dataJson = await data.json()
    console.log(dataJson)
    setLoading(false)
    if (data) {
      setTransactions(dataJson.result)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  // useEffect(() => {
  //   fetchTransactions()
  // }, [user])

  return { transactions, loading, fetchTransactions }
}
