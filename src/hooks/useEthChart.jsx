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
    for (let i = 0; i <= 5; i++) {
      let newDate = moment()
        .subtract(5 - i, 'days')
        .format('YYYY-MM-DD')

      let dateBlock = await Web3API.native.getDateToBlock({
        chain: 'eth',
        date: newDate,
      })
      blocksArray.push(dateBlock)
      let formatedDate = moment(newDate).format('MMM. DD')
      datesArray.push(formatedDate)
      let blockPrice = await Web3API.token.getTokenPrice({
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        to_block: dateBlock.block,
      })
      pricesArray.push(blockPrice.usdPrice)
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
