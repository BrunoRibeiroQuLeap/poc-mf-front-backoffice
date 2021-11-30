import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Wavify from 'react-wavify'

const styles = {
  rootWidth: 150,
  rootHeight: 150,
  borderWidth: 4,
}

const useStyles = makeStyles({
  root: {
    width: `${styles.rootWidth}px`,
    height: `${styles.rootHeight}px`,
    borderRadius: '50%',
    border: 'solid #ACA9A9',
    borderWidth: `${styles.borderWidth}px`,
    overflow: 'hidden',
  },

  inactive: {
    opacity: 0.6,
  },

  displayValue: {
    display: 'grid',
    height: `${styles.rootHeight - (styles.borderWidth * 2)}px`,
    width: `${styles.rootWidth - (styles.borderWidth * 2)}px`,
    alignContent: 'center',
    verticalAlign: 'middle',
    fontSize: '30px',
    textAlign: 'center',
    marginTop: `-${styles.rootHeight}px`,
  },
})

const emptyDeposit = 165

interface Props {
  active: boolean
  volume: number
  capacity: number
  symbol?: string
}

const LiquidChart: FunctionComponent<Props> = ({ active, volume, capacity, symbol }) => {
  const classes = useStyles({})

  const percentValue = volume / capacity
  const actualValueForWave = 165 - emptyDeposit * percentValue

  const activityClass = (
    active ? '' : classes.inactive
  )

  const defaultWaveOptions = {
    height: actualValueForWave,
    speed: 0.45,
    points: 4,
  }
  const activityProps = (
    active
      ? { paused: false, options: { amplitude: 3, ...defaultWaveOptions } }
      : { paused: true, options: { amplitude: 0, ...defaultWaveOptions } }
  )

  return(
    <div className={`${classes.root} ${activityClass}`}>
      <Wavify
        fill='#F4D442'
        {...activityProps}
      />

      <div className={classes.displayValue}>
        {volume.toFixed(2)}{symbol}
      </div>
    </div>
  )
}

export default LiquidChart
