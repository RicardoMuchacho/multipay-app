import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import { useState, useEffect } from 'react'
import moment from 'moment/moment'
import { Line } from 'react-chartjs-2'
import { FadeLoader } from 'react-spinners'
import Image from 'next/image'

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

//0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2 - ethAddress
// 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599 - wrapped BTC
export const EthChart = () => {
  const [isLoadingChart, setIsLoadingChart] = useState(false)

  const Web3Api = useMoralisWeb3Api()
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  })

  useEffect(async () => {
    await getChartData()
  }, [])

  const getChartData = async () => {
    let datesArray = []
    let blocksArray = []
    let pricesArray = []
    setIsLoadingChart(true)
    for (let i = 0; i <= 5; i++) {
      let newDate = moment()
        .subtract(5 - i, 'days')
        .format('YYYY-MM-DD')

      let dateBlock = await Web3Api.native.getDateToBlock({
        chain: 'eth',
        date: newDate,
      })
      blocksArray.push(dateBlock)
      let formatedDate = moment(newDate).format('MMM. DD')
      datesArray.push(formatedDate)

      let blockPrice = await Web3Api.token.getTokenPrice({
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        to_block: dateBlock.block,
      })
      pricesArray.push(blockPrice.usdPrice)
    }
    let data = {
      labels: datesArray,
      datasets: [{ data: pricesArray }],
    }
    console.log(chartData)
    setChartData(data)
    setIsLoadingChart(false)
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  }
  return (
    <>
      <p className="flex place-content-center gap-2 text-center">
        <Image
          className="object-contain"
          width={20}
          height={20}
          src={'/assets/tokens/ETH.png'}
        ></Image>
        ETH Chart
      </p>
      <div className="h-full w-full">
        {isLoadingChart ? (
          <div className="flex h-full place-items-center justify-center">
            <FadeLoader
              className="text-center"
              color="gray"
              loading={isLoadingChart}
            ></FadeLoader>
          </div>
        ) : (
          <div>
            <Line height="160" width="80" data={chartData} options={options} />
          </div>
        )}
      </div>
    </>
  )
}

// const getChartData = async () => {
//     let dates = []
//     let blocks = []
//     let prices = []

//     for (let i = 0; i <= 5; i++) {
//       let newDate = moment().subtract(i, 'days').format('YYYY-MM-DD')
//       dates.push(newDate)

//       let dateBlock = await Web3Api.native.getDateToBlock({
//         chain: 'eth',
//         date: newDate,
//       })
//       blocks.push(dateBlock)

//       let blockPrice = await Web3Api.token.getTokenPrice({
//         address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
//         to_block: dateBlock.block,
//       })
//       prices.push(blockPrice.usdPrice)
//     }
//   }
