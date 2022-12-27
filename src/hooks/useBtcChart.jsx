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
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_WEB3API_KEY,
      },
    }

    let dateBlock = await fetch(
      `https://deep-index.moralis.io/api/v2/dateToBlock?chain=eth&date=${moment().format(
        'YYYY-MM-DD'
      )}`,
      options
    )
    let dateBlockJson = await dateBlock.json()

    let blockPrice = await fetch(
      `https://deep-index.moralis.io/api/v2/erc20/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/price?chain=eth&to_block=${dateBlockJson.block}`,
      options
    )
    let blockPriceJson = await blockPrice.json()
    // console.log(blockPrice)

    pricesArray.push(blockPriceJson.usdPrice)

    let data = {
      labels: datesArray,
      datasets: [{ data: pricesArray }],
    }
    setBtcChartData(data)
    setIsLoadingBtcChart(false)
  }

  return { isLoadingBtcChart, btcChartData, getBtcChartData }
}
