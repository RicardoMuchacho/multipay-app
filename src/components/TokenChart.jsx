import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import { useMoralisWeb3Api } from 'react-moralis'
import moment from 'moment/moment'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

export const TokenChart = () => {
  const Web3Api = useMoralisWeb3Api()
  let dates = []
  let blocks = []
  let prices = []

  const fetchTokenMetadata = async () => {
    for (let i = 0; i <= 7; i++) {
      let newDate = moment().subtract(i, 'days').format('YYYY-MM-DD')
      dates.push(newDate)

      let dateBlock = await Web3Api.native.getDateToBlock({
        chain: 'eth',
        date: newDate,
      })
      blocks.push(dateBlock)

      let blockPrice = await Web3Api.token.getTokenPrice({
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        to_block: dateBlock.block,
      })
      prices.push(blockPrice.usdPrice)
    }

    console.log(dates)
    console.log(blocks)
    console.log(prices)
  }

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'TEST',
        backgrounColor: 'rgb(255, 99, 132)',
        bordercolor: 'rgb(255, 99, 132)',
        data: prices,
      },
    ],
  }

  config = { type: 'line', data: chartData, options: {} }

  return (
    <>
      <div>
        <p>Token Chart</p>
        <button onClick={() => fetchTokenMetadata()}>&#128259;</button>
      </div>
    </>
  )
}
