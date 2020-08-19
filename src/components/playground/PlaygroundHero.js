import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
class PlayGroundHero extends Component {

    render() {
        const arr = ['Anshu Saurabh', 'Tera Patrick', 'Jesse Jane', 'Stoya'];

        return (
            <div className='playground-header'>
                <div className='header-board-name-div'>
                    <h1 className='header-board-name-h'>Balu</h1>

                </div>
                <span className="playground-header-star-ic-div">
                    <Icon name='star outline' size='large' className="playground-header-star-icon" />
                </span>
                <div className="board-header-btn-org-wrapper">
                    <span className="board-header-btn-divider"></span>
                    <span className="board-private-marker-div">
                        <span className="board-private-marker-text">
                            Personal
                                            </span>
                    </span>
                    <span className="board-header-btn-divider"></span>
                    <div className="board-member-outer-div">
                        <div className="board-member-inner-div">
                            {
                                arr.map((name, index) => {
                                    return (
                                        <span
                                            className="board-member-elem"
                                            style={{ zIndex: '' + arr.length - index }} >
                                            <span className="board-member-name">
                                                {name.split(' ').map(elem => elem[0]).join('').slice(0, 2)}
                                            </span>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="board-header-right-grp">
                    <span className="board-right-settings">
                        <Icon
                            name='settings'
                            className="board-right-icon">
                        </Icon>
                        <span className="board-right-btn">Settings</span>
                    </span>

                </div>
            </div>
        )
    }
}

export default PlayGroundHero