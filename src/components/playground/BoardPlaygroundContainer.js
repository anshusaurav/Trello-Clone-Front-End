import React, { Component } from 'react'
import PlayGroundHero from './PlaygroundHero'
import PlayGroundMain from './PlaygroundMain'
import { withRouter } from 'react-router-dom'
class BoardPlaygroundContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { isUpdate: false }
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleUpdate() {
        this.state({ isUpdate: !this.state.isUpdate })
    }
    render() {
        const boardSlug = this.props.match.params.slug;
        console.log(boardSlug)
        return (
            <>
                <div className='playground-boundary'>
                    <div className='playground-content'>
                        <div className='playground-wrapper'>
                            <div className='playground-main-content'>
                                <PlayGroundHero boardSlug={boardSlug} />
                                <PlayGroundMain />

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(BoardPlaygroundContainer)