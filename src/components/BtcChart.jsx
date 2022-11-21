import React from 'react'
import { useContext } from 'react'
import { Line } from 'react-chartjs-2'
import { AppContext } from '../AppContext'
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
export const BtcChart = () => {
  const { btcChartData, isLoadingBtcChart } = useContext(AppContext)

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
        {isLoadingBtcChart ? (
          <div className="flex h-full place-items-center justify-center">
            <FadeLoader
              className="text-center"
              color="gray"
              loading={isLoadingBtcChart}
            ></FadeLoader>
          </div>
        ) : (
          <div>
            <Line
              height="160"
              width="80"
              data={btcChartData}
              options={options}
            />
          </div>
        )}
      </div>
    </>
  )
}
