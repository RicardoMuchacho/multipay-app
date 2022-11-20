import { useState, useEffect, useContext } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { AppContext } from '../AppContext'

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const Web3Api = useMoralisWeb3Api()
  const BaseUrl = 'https://goerli.etherscan.io/tx/'
  const { user, userAddress } = useContext(AppContext)

  const fetchTransactions = async () => {
    if (!user) return setTransactions([])
    setLoading(true)
    const data = await Web3Api.account.getTransactions({
      chain: 'goerli',
      address: userAddress,
      limit: 20,
    })
    setLoading(false)
    if (data) {
      setTransactions(data.result)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [user])

  return { transactions, loading, fetchTransactions }
}
