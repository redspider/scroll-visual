import React, { Component } from 'react'

/**
 * Watches the current vertical scroll position, hands it to children once per frame
 */

class ScrollZone extends Component {

    state = {
        scrollPosition: 0
    }

    updateQueued = false

    constructor(props) {
        super(props)
        this.scrollEventHandler = this.scrollEventHandler.bind(this)
        this.animationFrameHandler = this.animationFrameHandler.bind(this)
    }

    scrollEventHandler(_e) {
        if (this.updateQueued) {
            return
        }

        window.requestAnimationFrame(this.animationFrameHandler)
        this.updateQueued = true
    }

    animationFrameHandler(_e) {
        this.setState({scrollPosition: window.scrollY})
        this.updateQueued = false
    }

    componentWillMount() {
        window.addEventListener('scroll', this.scrollEventHandler)
    }

    render() {
        const children = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                scrollPosition: this.state.scrollPosition
            })
        )
        return <div className="scroll-zone-component">
            {children}
        </div>
    }
}

export default ScrollZone;
