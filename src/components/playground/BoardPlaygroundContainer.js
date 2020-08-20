import React, { Component } from 'react'
import PlayGroundHero from './PlaygroundHero'
import PlayGroundMain from './PlaygroundMain'
import { withRouter } from 'react-router-dom'
class BoardPlaygroundContainer extends Component {

    render() {
        const boardSlug = this.props.match.params.slug;
        return (
            <>
                <div className='playground-boundary'>
                    <div className='playground-content'>
                        <div className='playground-wrapper'>
                            <div className='playground-main-content'>
                                <PlayGroundHero boardSlug={boardSlug} />
                                <PlayGroundMain boardSlug={boardSlug} />

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(BoardPlaygroundContainer)