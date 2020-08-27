import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { PlaygroundHeaderLoader } from './../loaders'
class PlayGroundHero extends Component {
    constructor(props) {
        super(props);
        this.state = { board: null, isUpdated: null };
        this.deleteBoard = this.deleteBoard.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    async saveBoard() {
        console.log("fetching board")
        const { boardSlug } = this.props;
        const url = `https://trello-clone-mern.herokuapp.com/api/boards/${boardSlug}`;
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
            });
            const data = await response.json();
            // console.log(data);
            if (!data.errors) {
                this.setState({ board: data.board });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    async deleteBoard() {
        const { boardSlug } = this.props;
        const url = `https://trello-clone-mern.herokuapp.com/api/boards/${boardSlug}`;
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
            });
            const data = await response.json();
            // console.log(data);
            if (!data.errors) {
                this.props.history.push('/boards');
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    componentDidMount() {
        this.saveBoard();
    }
    render() {
        const { board } = this.state;
        return (
            <div className='playground-header'>
                {
                    board ? (
                        <>
                            <div className='header-board-name-div'>
                                <h1 className='header-board-name-h'>{board && board.name}</h1>

                            </div>
                            <span className="playground-header-star-ic-div">
                                <Icon name='star outline' size='large' className="playground-header-star-icon" />
                            </span>
                            <div className="board-header-btn-org-wrapper">
                                <span className="board-header-btn-divider"></span>
                                <span className="board-private-marker-div">
                                    <span className="board-private-marker-text">
                                        {
                                            board && board.isPrivate ? 'Personal' : 'Team'
                                        }
                                    </span>
                                </span>
                                <span className="board-header-btn-divider"></span>
                                <div className="board-member-outer-div">
                                    <div className="board-member-inner-div">
                                        {

                                            board && board.team &&
                                            board.team.owner &&
                                            board.team.members &&
                                            <span
                                                key={board.team.owner.email}
                                                className="board-member-elem"
                                                style={{ zIndex: '' + board.team.members.length }}>
                                                <span className="board-member-name">
                                                    {board.team.owner.fullname.split(' ').map(elem => elem[0]).join('').slice(0, 2)}
                                                </span>
                                            </span>
                                        }
                                        {
                                            board && board.team &&
                                            board.team.members &&
                                            board.team.members.map((member, index) => {
                                                return (
                                                    <span
                                                        key={member.email}
                                                        className="board-member-elem"
                                                        style={{ zIndex: '' + board.team.members.length - index }} >
                                                        <span className="board-member-name">
                                                            {member.fullname.split(' ').map(elem => elem[0]).join('').slice(0, 2)}
                                                        </span>
                                                    </span>
                                                )
                                            })

                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="board-header-right-grp">
                                <span className="board-right-settings" onClick={this.deleteBoard}>
                                    <Icon
                                        name='trash'
                                        className="board-right-icon">
                                    </Icon>
                                    <span className="board-right-btn">Archive Board</span>
                                </span>


                            </div>
                        </>
                    ) : (PlaygroundHeaderLoader())
                }

            </div>
        )
    }
}

export default withRouter(PlayGroundHero)