import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import JustGage from 'justgage'
import useUniqueId from '../hooks/use-unique-id'

interface Props {
	value: number
	min: number
	max: number
	label: string
	symbol?: string
	style?: {
		labelsTextColor?: string
		labelTextSize?: number
		valueTextColor?: string
		valueTextSize?: number
		decimals?: number
		donut?: boolean
		showDecimal?: boolean
		colorSchema?: 'sector' | 'gradiant'
		sectors?: {
			percents: boolean
			ranges: Array<{
				color: string
				lo: number
				hi: number
			}>
		}
	}
}

const Gauge: FunctionComponent<Props> = ({
	value,
	min,
	max,
	label,
	style,
	symbol,
}) => {
	const node = useRef()
	const elementId = useUniqueId('gauge')
	const [guage, setGuage] = useState(null)
	const [oldValue, setOldValue] = useState(value)
	const [oldMax, setOldMax] = useState(max)

	useEffect(() => {
		setGuage(new JustGage({
			value,
			min,
			max,
			label,
			symbol: symbol || '',
			valueFontColor: style?.valueTextColor || '#010101',
			labelFontColor: style?.labelsTextColor || '#B3B3B3',
			labelMinFontSize: style?.labelTextSize || 10,
			minLabelMinFontSize: style?.valueTextSize || 10,
			maxLabelMinFontSize: style?.valueTextSize || 10,
			decimals: style?.decimals || 2,
			donut: style?.donut || false,
			noGradient: (style?.colorSchema === 'sector' ? true : false),
			customSectors: style?.sectors || {},
			formatNumber: style?.showDecimal,
			id: elementId,
		}))

		return () => ReactDOM.unmountComponentAtNode(node.current)
	}, [setGuage])

	useEffect(() => {
		const refresh = () => {
			if (oldValue !== value) {
				guage.refresh(value)
				setOldValue(value)
			}

			if (oldMax !== max) {
				guage.refresh(value, max)
				setOldMax(max)
			}
		}

		if (guage === null) {
			return
		}

		refresh()
	}, [value, max])

	return (
		<div id={elementId} ref={node} />
	)
}

export default Gauge
