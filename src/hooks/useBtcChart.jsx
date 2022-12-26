import React from 'react'
import { useState } from 'react'
import moment from 'moment/moment'
import { useMoralisWeb3Api } from 'react-moralis'

export const useBtcChart = () => {
  const { Web3API } = useMoralisWeb3Api()

  const [isLoadingBtcChart, setIsLoadingBtcChart] = useState(false)
  const [btcChartData, setBtcChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  })

  const getBtcChartData = async () => {
    let datesArray = [2018, 2019, 2020, 2021, 2022, 'Now']
    let pricesArray = [15193, 3776, 8724, 36787, 42777]
    setIsLoadingBtcChart(true)

    let dateBlock = await Web3API.native.getDateToBlock({
      chain: 0x1,
      date: moment().format('YYYY-MM-DD'),
    })
    console.log(dateBlock)
    let blockPrice = await Web3API.token.getTokenPrice({
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      to_block: dateBlock.block,
    })
    pricesArray.push(blockPrice.usdPrice)

    let data = {
      labels: datesArray,
      datasets: [{ data: pricesArray }],
    }
    setBtcChartData(data)
    setIsLoadingBtcChart(false)
  }

  return { isLoadingBtcChart, btcChartData, getBtcChartData }
}
