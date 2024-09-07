import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import styled from 'styled-components'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import NumberStat from './numberStat'
import { VerticalAlignContainer, VerticalAlignContent } from './stockAnalysisDashboard'
import { ThemeGreen, ThemeYellow, ThemeRed } from './stockAnalysisDashboard'
ChartJS.register(ArcElement, Tooltip, Legend)

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ChartContainer = styled.div`
  width: 45%;
  display: flex;
  justify-content: left;
  align-items: left;
`;

interface NewsSentimentAnalysisProps {
  newsTextAnalysis: any;
}

const NewsSentimentAnalysis: React.FC<NewsSentimentAnalysisProps> = ({ newsTextAnalysis }) => {

  const sentiment = newsTextAnalysis.data.sentiment

  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Sentiment',
        data: [sentiment.pos, sentiment.neg, sentiment.neu],
        backgroundColor: [ThemeGreen, ThemeRed, ThemeYellow],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 10,
          },
          boxWidth: 10,
          padding: 10,
        },
      },
    },
  };

  return (
    <FlexContainer>
      {/* Chart section */}
      <ChartContainer>
        <Doughnut data={data} options={options} />
      </ChartContainer>
      {/* Text section */}
      <VerticalAlignContainer>
        <VerticalAlignContent>
          <div>News Text Analysis</div>
          <div style={{height: '40px'}}>
            <NumberStat
              value={newsTextAnalysis.metadata.sentencesAnalyzed}
              label='Sentences Analyzed'
            ></NumberStat>
          </div>
          <div style={{height: '40px'}}>
            <NumberStat
              value={newsTextAnalysis.metadata.wordsAnalyzed}
              label='Words Analyzed'
            ></NumberStat>
          </div>
        </VerticalAlignContent>
      </VerticalAlignContainer>
    </FlexContainer>
  );
};

export default NewsSentimentAnalysis;
