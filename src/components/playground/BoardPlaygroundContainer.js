import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
class BoardPlaygroundContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [3, 4, 6, 7, 9, 8, 1, 5, 7]
        }

    }
    render() {
        const { list } = this.state;
        return (
            <>
                <div className='playground-boundary'>
                    <div className='playground-content'>
                        <div className='playground-wrapper'>
                            <div className='playground-main-content'>
                                <div className='playground-header'>
                                    <div className='header-board-name-div'>
                                        <h1 className='header-board-name-h'>Balu</h1>


                                    </div>
                                </div>
                                <div className='playground-board-canvas'>
                                    <div className='playground-board-wrapper'>
                                        {
                                            list.map(elem => (
                                                <div className='playground-board-list-wrapper'>
                                                    <div className='playground-board-list-content'>
                                                        <div className='playground-board-list-header'>
                                                            <h2 className='playground-board-list-name'>Ideas</h2>
                                                            <span className='playground-board-list-header-extra'> ...</span>
                                                        </div>
                                                        <div className='playground-list-cards'>

                                                            {Array(elem).fill(null).map(elem => (
                                                                <div className='list-card'>
                                                                    <div className='list-card-cover'>

                                                                    </div>
                                                                    <span className='list-card-edit-icon'>E</span>
                                                                    <div className='list-card-details'>
                                                                        <div className='list-card-labels'>
                                                                            <span className='card-label'>Android</span>
                                                                            <span className='card-label'>Website</span>
                                                                        </div>
                                                                        <span className='list-card-title'>
                                                                            Progressive web app development
                                                                        </span>
                                                                        <div className='badges'>
                                                                            <span className='js-badges'>
                                                                                <div className='due-date-badge'>
                                                                                    <span className='badge-icon'>^</span>
                                                                                    <span className='badge-text'>Aug 28</span>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))

                                                            }
                                                        </div>
                                                        <div className='card-compose-wrapper'>
                                                            <Button icon='plus' content='Add Card' />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default BoardPlaygroundContainer