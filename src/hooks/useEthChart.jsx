import React from 'react'
import { useState } from 'react'
import moment from 'moment/moment'
import { useMoralisWeb3Api } from 'react-moralis'

export const useEthChart = () => {
  const { Web3API } = useMoralisWeb3Api()

  const [isLoadingEthChart, setIsLoadingEthChart] = useState(false)
  const [ethChartData, setEthChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  })

  const getEthChartData = async () => {
    let datesArray = []
    let blocksArray = []
    let pricesArray = []
    setIsLoadingEthChart(true)
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_WEB3API_KEY,
      },
    }

    for (let i = 0; i <= 5; i++) {
      let newDate = moment()
        .subtract(5 - i, 'days')
        .format('YYYY-MM-DD')

      let dateBlock = await fetch(
        `https://deep-index.moralis.io/api/v2/dateToBlock?chain=eth&date=${newDate}`,
        options
      )
      let dateBlockJson = await dateBlock.json()

      blocksArray.push(dateBlockJson)
      let formatedDate = moment(newDate).format('MMM. DD')
      datesArray.push(formatedDate)

      let blockPrice = await fetch(
        `https://deep-index.moralis.io/api/v2/erc20/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/price?chain=eth&to_block=${dateBlockJson.block}`,
        options
      )
      let blockPriceJson = await blockPrice.json()
      pricesArray.push(blockPriceJson.usdPrice)
    }
    let data = {
      labels: datesArray,
      datasets: [{ data: pricesArray }],
    }
    setEthChartData(data)
    setIsLoadingEthChart(false)
  }

  return { isLoadingEthChart, ethChartData, getEthChartData }
}
