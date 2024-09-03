import {
  VerticalAlignContainer,
  VerticalAlignContent,
  PrimaryColor
} from './stockAnalysisDashboard'
import styled from 'styled-components'
import numabbr from 'numabbr'

const NumberDisplay = styled.div`
  color: ${PrimaryColor};
  font-size: 20px;
`

const LabelDisplay = styled.div`
  font-weight: bold;
  font-size: 12px;
`

function NumberStat({value, label, center}:{value: number, label: string, center?: boolean}) {
  return (
    <VerticalAlignContainer style={{textAlign: center ? 'center' : 'left'}}>
      <VerticalAlignContent>
        <NumberDisplay>{numabbr(value)}</NumberDisplay>
        <LabelDisplay>{label}</LabelDisplay>
      </VerticalAlignContent>
    </VerticalAlignContainer>
  )
}

export default NumberStat
