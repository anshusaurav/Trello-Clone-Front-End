import React, { Component } from 'react'
import PlayGroundHero from './PlaygroundHero'
import PlayGroundMain from './PlaygroundMain'
class BoardPlaygroundContainer extends Component {

    render() {

        return (
            <>
                <div className='playground-boundary'>
                    <div className='playground-content'>
                        <div className='playground-wrapper'>
                            <div className='playground-main-content'>
                                <PlayGroundHero />
                                <PlayGroundMain />

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default BoardPlaygroundContainer