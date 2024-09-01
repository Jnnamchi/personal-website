import { useState } from 'react'
import {
  analyzeStock,
  VerticalAlignContainer,
  VerticalAlignContent
} from './stockAnalysisDashboard'
import { Oval } from 'react-loader-spinner'
import './stockAnalysisDashboard.css'
import DashboardGrid from './dashboardGrid'

function StockAnalysisDashboard() {

  const [stockData, setStockData] = useState()
  const [stockSymbol, setStockSymbol] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [gotData, setGotData] = useState(false)

  function goBack () {
    setGotData(false)
    setIsLoading(false)
  }

  async function runStockAnalysis () {
    setIsLoading(true)
    const gotStockData = await analyzeStock(stockSymbol)
    if (gotStockData) {
      setStockData(gotStockData)
      setGotData(true)
      setIsLoading(false)
    } else {
      goBack()
    }
  }

  if (gotData) {
    return (
      <VerticalAlignContainer>
        <VerticalAlignContent>
          <div onClick={() => goBack()}>Back</div>
          <div>
            <DashboardGrid
              stockData={stockData}
            ></DashboardGrid>
          </div>
        </VerticalAlignContent>
      </VerticalAlignContainer>
    )
  }

  return (
    <VerticalAlignContainer>
      <VerticalAlignContent>
        <div>
          <div id="stock-analysis-dashboard-title">STOCK ANALYSIS DASHBOARD</div>
          {isLoading ? (
            <div>
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div>
              <div id="stock-analysis-dashboard-subtitle">
                Put in a stock symbol you'd like to analyze (e.g. MSFT)
              </div>
              <input
                value={stockSymbol}
                onChange={e => setStockSymbol(e.target.value)}
              ></input>
              <button className="stock-analysis-dashboard-button" onClick={() => runStockAnalysis()}>Analyze</button>
            </div>
          )}
        </div>
      </VerticalAlignContent>
    </VerticalAlignContainer>
  )
}

export default StockAnalysisDashboard
