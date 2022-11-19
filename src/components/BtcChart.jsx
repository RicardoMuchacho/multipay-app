import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { FadeLoader } from 'react-spinners'
import moment from 'moment/moment'
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
export const BtcChart = () => {
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
    let datesArray = [2018, 2019, 2020, 2021, 2022, 'Now']
    let pricesArray = [15193, 3776, 8724, 36787, 42777]
    setIsLoadingChart(true)

    let dateBlock = await Web3Api.native.getDateToBlock({
      chain: 'eth',
      date: moment().format('YYYY-MM-DD'),
    })

    let blockPrice = await Web3Api.token.getTokenPrice({
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      to_block: dateBlock.block,
    })
    pricesArray.push(blockPrice.usdPrice)

    let data = {
      labels: datesArray,
      datasets: [{ data: pricesArray }],
    }
    console.log(data)
    setChartData(data)
    setIsLoadingChart(false)
  }

  const options = { responsive: true, maintainAspectRatio: false }
  return (
    <>
      <p className="flex place-content-center gap-2 text-center">
        <Image
          className="object-contain"
          width={20}
          height={20}
          src={'/assets/tokens/BTC.png'}
        ></Image>
        BTC Chart
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
