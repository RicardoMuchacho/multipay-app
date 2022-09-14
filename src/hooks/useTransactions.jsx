import { useState, useEffect } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const Web3Api = useMoralisWeb3Api()
  const BaseUrl = 'https://rinkeby.etherscan.io/tx/'
  const { user } = useMoralis()

  const fetchTransactions = async () => {
    if (!user) return setTransactions([])
    setLoading(true)
    const data = await Web3Api.account.getTransactions({
      chain: 'rinkeby',
      address: user.get('ethAddress'),
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
