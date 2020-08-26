import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Popup } from 'semantic-ui-react'
import PopUpAddBoard from './../common/PopUpAddBoard'
import { PlaceholderImageRectangularTeamBoards } from './../loaders'
class TeamBoards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team: null,
            isUpdated: false,
            isOpen: false
        }
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    toggleUpdate() {
        this.setState({ isUpdated: !this.state.isUpdated })
    }
    handleOpen() {
        this.setState({ isOpen: true });
    }
    handleClose() {
        this.setState({ isOpen: false });
    }
    async saveTeam() {
        console.log("fetching team")
        const { teamSlug } = this.props;
        // const teamSlug = this.props.match.params.slug;
        const url = `https://trello-clone-mern.herokuapp.com/api/teams/${teamSlug}`;
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
            if (!data.errors) {
                this.setState({ team: data.team });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    componentDidMount() {
        this.saveTeam();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isUpdated !== this.state.isUpdated)
            this.saveTeam();
    }
    render() {
        const { team, isOpen } = this.state;
        return (
            <>
                {

                    <div className="org-member-wrapper">
                        <div className="org-members-page-layout">

                            <div className="team-page-board-layout-list">
                                {team ? (
                                    <ul className="boards-page-board-section-list">
                                        {team.boards && team.boards.map(board => {
                                            return (
                                                <li className="boards-page-board-section-list-item" key={board.slug}>
                                                    <Link
                                                        to={'/b/' + board.slug}
                                                        style={{
                                                            background: `url(${board.image})`,
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}
                                                        className='board-tile'>
                                                        <span className='board-tile-fade'></span>
                                                        <div className='board-tile-details'>
                                                            <div title="New SDEs" dir="auto"
                                                                className="board-tile-details-name">
                                                                <p className='board-title-name' >
                                                                    {board.name}
                                                                </p>

                                                            </div>
                                                            <div className="board-tile-details-sub-container">
                                                                <span className="board-tile-options">
                                                                    <span
                                                                        title="Click to star this board. It will show up at the top of your boards list."
                                                                        className="board-tile-options-star-icon">
                                                                        <Icon name="star outline" />
                                                                    </span>

                                                                </span>

                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                        {
                                            <li className="boards-page-board-section-list-item">
                                                <div
                                                    style={{
                                                        backgroundColor: '#F0F2F4',

                                                    }}
                                                    className='board-tile'>
                                                    <div className='board-tile-details'>

                                                        <Popup
                                                            basic
                                                            on="click"
                                                            open={isOpen}
                                                            onOpen={this.handleOpen}
                                                            style={{
                                                                position: "fixed",
                                                                minWidth: "100vw",
                                                                minHeight: "100vh",
                                                                top: -2,
                                                                left: -2,
                                                                bottom: -2,
                                                                right: -2,
                                                                transform: "none",
                                                                marginTop: 0,
                                                                backgroundColor: "rgba(0,0,0,0.5)",
                                                            }}
                                                            trigger={
                                                                <div title="Create new team board"
                                                                    className="board-new-tile-div" data-team-id={team._id}>
                                                                    <p className='board-new-tile' >
                                                                        Create New Board
                                                                </p>

                                                                </div>
                                                            }>
                                                            <PopUpAddBoard

                                                                handleClose={this.handleClose}
                                                                toggleUpdate={this.toggleUpdate}
                                                                teamId={team._id}
                                                            />
                                                        </Popup>
                                                    </div>

                                                </div>
                                            </li>

                                        }
                                    </ul>) : (PlaceholderImageRectangularTeamBoards(2))
                                }
                            </div>

                        </div>
                    </div>
                }
            </>
        )
    }

}
export default TeamBoards;