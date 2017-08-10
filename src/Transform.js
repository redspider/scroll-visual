import React, { PureComponent } from 'react'
import * as d3scale from 'd3-scale'

export class Transformer extends PureComponent {
    render() {
        const {fns, scrollPosition, children, ...rest} = this.props
        let data = {x: 0, y:0, opacity: 1, scale: 1}
        fns.forEach((f) => {
            data = f(data, scrollPosition)
        })

        const style = {
            opacity: data.opacity,
            transform: `translate(${data.x}px, ${data.y}px) scale(${data.scale})`
        }

        return <div style={style} {...rest}>
            {children}
        </div>
    }
}

export const translate = (parameter, pageStart, pageEnd, start, end) => {
    const scale = d3scale.scaleLinear().domain([pageStart, pageEnd]).range([start, end]).clamp(true)
    return (data, y) => {
        let d = {...data}

        if (parameter === 'x' || parameter === 'y') {
            d[parameter] += scale(y)
        } else {
            d[parameter] *= scale(y)
        }

        return d
    }
}

export const translateX = (pageStart, pageEnd, xStart, xEnd) => {
    return translate('x', pageStart, pageEnd, xStart, xEnd)
}

export const translateY = (pageStart, pageEnd, yStart, yEnd) => {
    return translate('y', pageStart, pageEnd, yStart, yEnd)
}
