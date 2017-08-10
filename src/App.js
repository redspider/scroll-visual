import React, { Component } from 'react'
import './App.css';
import ScrollZone from './ScrollZone'
import {Transformer, translate, translateX, translateY} from './Transform'

const ShowPosition = (props) => <div {...props}>Y: {props.scrollPosition}</div>

/*
TODO: Need to wrap this in something that picks up the window width/height and resize events so
we can rescale the translations in case we need middle etc.

TODO: Use d3-transform? it wouldn't change a lot really
 */

class App extends Component {
  render() {
    const circles = []
    const labels = []

    for (let n = 0; n < 16; n++) {
        const lineX = 100 + n * 40
        const boxX = 400 + (n - n % 4) / 4* 40
        const boxY = (n % 4) * 40

        circles.push(
            <Transformer
                fns={[
                    translate('opacity', 10 * n, 100 + 10 * n, 0, 1),
                    translateX(0, 1000, lineX, lineX),
                    translateX(500, 1000, 0, boxX - lineX),
                    translateY(500, 1000, 100, 100 + boxY),
                    translate('scale', 500, 1000, 1, 1 - (n / 32)),
                    translate('opacity', 1000 + 10 * n, 1200 + 10 * n, 1, 0),
                ]}
                className="mini-circle"
                key={n}
            >
                <svg viewBox="0 0 100 100" style={{width: '100%', height: '100%'}}>
                    <circle cx="50" cy="50" r="50" fill="#ff8888" />
                </svg>
            </Transformer>
        )

        labels.push(
            <Transformer
                fns={[
                    translate('opacity', 300, 400, 0, 1),
                    translateX(0, 1000, lineX, lineX),
                    translateX(500, 1000, 0, boxX - lineX),
                    translateY(500, 1000, 100, 100 + boxY),
                    translateX(800, 900, 0, 200),
                    translate('opacity', 1000 + 10 * n, 1100 + 10 * n, 1, 0),
                ]}
                className="mini-circle-label"
                key={n}
            >
                <div>{n}</div>
            </Transformer>
        )
    }

    return <div className="overlay">
        <ScrollZone>
            <ShowPosition className="scroll-position-debug"/>
            {circles}
            {labels}
        </ScrollZone>
    </div>
  }
}

export default App;
