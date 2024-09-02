import React, { useEffect } from 'react'
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'
import { DashboardGridContent } from './stockAnalysisDashboard'

function DashboardGrid({stockData}:{stockData: any}) {

  useEffect(() => {
    GridStack.init()
  });

  return (
    <div>
      <div className="grid-stack">
        {/* First Row */}
        <div className="grid-stack-item" gs-w="3">
          <DashboardGridContent className="grid-stack-item-content">
            <div>{stockData.basicInfo.marketCap}</div>
            <div>Market Cap</div>
          </DashboardGridContent>
        </div>
        <div className="grid-stack-item" gs-w="3">
          <DashboardGridContent className="grid-stack-item-content">
            <div>{stockData.basicInfo.fullTimeEmployees}</div>
            <div>Employees</div>
          </DashboardGridContent>
        </div>
        <div className="grid-stack-item" gs-w="3">
          <DashboardGridContent className="grid-stack-item-content">
            <div>{stockData.basicInfo.totalRevenue}</div>
            <div>Total Revenue</div>
          </DashboardGridContent>
        </div>
        <div className="grid-stack-item" gs-w="3">
          <DashboardGridContent className="grid-stack-item-content">
            <div>{stockData.basicInfo.trailingEps}</div>
            <div>Earnings Per Share</div>
          </DashboardGridContent>
        </div>
      </div>
    </div>
  )
}

export default DashboardGrid
