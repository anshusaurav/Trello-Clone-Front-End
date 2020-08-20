import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
class PopUpAddBoard extends React.Component {
    constructor(props) {
        super(props);
        console.log('Constructor: ', this.props.teamId);
        this.state = {
            bgIndex: 0,
            name: '',
            team: this.props.teamId ? `${this.props.teamId}` : 'No Team',
            isPrivate: this.props.teamId ? false : true,
            isSubmitable: false,
            bgArr: ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
                'https://images.pexels.com/photos/870711/pexels-photo-870711.jpeg',
                'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg',
                'https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg',
                'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
                'https://images.unsplash.com/photo-1597226417297-6b99b273ded6?cs=tiny',
                'https://images.unsplash.com/photo-1597462263121-d141a6fa0ca4?cs=tiny',
                'https://images.unsplash.com/photo-1597441205491-f5c9bc18be6d?cs=tiny',
                'https://images.unsplash.com/photo-1597432845483-c6ae82d95ac6?cs=tiny',],
            teams: null
        }
        this.escFunction = this.escFunction.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeTeam = this.handleChangeTeam.bind(this);
        this.handleFormatButtons = this.handleFormatButtons.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePopUpClick = this.handlePopUpClick.bind(this);
        this.handleOutsidePopUpClick = this.handleOutsidePopUpClick.bind(this);
    }
    handlePopUpClick(event) {
        event.stopPropagation();
    }
    handleOutsidePopUpClick(event) {
        event.preventDefault();
        this.props.handleClose();
    }
    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.handleClose();
        }
    }

    handleBGClick(event) {
        event.preventDefault();
        const bgIndex = event.target.dataset.index;
        this.setState({ bgIndex });
    }
    handleChangeName(event) {
        if (event.target.name === 'name') {
            this.setState({ name: event.target.value }, function () {
                if (this.checkValidBoard().result) {
                    this.setState({ isSubmitable: true });
                } else {
                    this.setState({ isSubmitable: false });
                }
            });
        }
    }

    handleChangeTeam(e, { value }) {

        this.setState({ team: value }, function () {
            if (this.state.team === 'No Team')
                this.setState({ isPrivate: true })
            else
                this.setState({ isPrivate: false })
        })
    }
    handleFormatButtons(e) {
        e.preventDefault();
    }
    checkValidBoard() {
        const { name } = this.state;
        let res = true,
            data = [];
        if (name.trim().length === 0) {
            res = false;
            data.push("Name");
        }
        if (res) return { result: true, data };

        return { result: false, data };
    }
    async saveTeams() {
        const url = 'http://localhost:4000/api/teams'
        const { jwttoken } = localStorage
        console.log(jwttoken)
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/JSON',
                    Authorization: `Token ${jwttoken}`
                }
            })
            const data = await response.json();
            console.log(data.teams);
            if (!data.errors) {
                let teams = [{ key: "No Team", text: "No Team", value: "No Team" }]

                teams = teams.concat(data.teams.map((team, index) => {
                    return { key: index, text: team.name, value: team._id };
                }))
                this.setState({ teams })
            }
        } catch (error) {
            console.error('Error: ' + error)
        }
    }

    async submitBoard() {
        const { name, isPrivate, team, bgIndex, bgArr } = this.state
        const board = { board: { name, isPrivate, team, image: bgArr[bgIndex] } };
        const url = 'http://localhost:4000/api/boards/'
        const { jwttoken } = localStorage
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${jwttoken}`
                },
                body: JSON.stringify(board)
            })
            let data = await response.json();
            if (!data.errors) {
                console.log(data.board);
                this.props.toggleUpdate();
                this.props.handleClose();
            }
            else {
                const errors = []
                for (const [key, value] of Object.entries(data.errors)) {
                    errors.push(`${key} ${value}`)
                }
                this.setState({ errorMsgs: errors })
            }
        } catch (error) {
            console.error('Error:', error);
            const errors = []
            errors.push(error.toString());
            this.setState({ errorMsgs: errors })
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        this.submitBoard();
    }
    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
        this.saveTeams();
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    render() {
        const { bgIndex, name, team, isPrivate, isSubmitable, bgArr, teams } = this.state;
        return (
            <div className="popup-add-board-form-card" onClick={this.handleOutsidePopUpClick}>
                <div className="popup-add-board-outer">
                    <div className="popup-add-board-inner" onClick={this.handlePopUpClick}>
                        <form className="create-board-form">
                            <div className="create-board-form-container">
                                <div className="create-board-tile" style={{
                                    backgroundImage: `url(${bgArr[bgIndex]})`
                                }}>
                                    <button
                                        className="create-board-popup-close-btn"
                                        onClick={this.props.handleClose}>
                                        X
                                    </button>
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Add board title"
                                            value={name}
                                            onChange={this.handleChangeName}
                                            className="board-pop-up-input">
                                        </input>
                                    </div>
                                    <div>
                                        <Dropdown
                                            inline
                                            options={teams}
                                            placeholder='No Team'
                                            onChange={this.handleChangeTeam}
                                            value={team}
                                        />
                                    </div>
                                    <div>
                                        {
                                            isPrivate ? (
                                                <button className='add-board-private-btn'
                                                    onClick={this.handleFormatButtons}>
                                                    <Icon
                                                        name="lock"
                                                        className="add-board-i-btn">

                                                    </Icon>
                                                    Personal
                                                </button>
                                            ) : (
                                                    <button className='add-board-private-btn'
                                                        onClick={this.handleFormatButtons}>
                                                        <Icon
                                                            name="globe"
                                                            className="add-board-i-btn">
                                                        </Icon>
                                                        Team
                                                    </button>
                                                )
                                        }
                                    </div>
                                </div>
                                <ul className="create-board-background">
                                    {
                                        bgArr.map((elem, index) => {
                                            return (
                                                <li key={index} className="create-board-background-item">
                                                    <button
                                                        data-index={index}
                                                        className={(index === bgIndex) ? 'create-board-bg-item-btn selected-bg-btn' : 'create-board-bg-item-btn'}
                                                        style={{
                                                            backgroundImage: `url(${elem})`
                                                        }}
                                                        onClick={this.handleBGClick}>
                                                    </button>
                                                </li>)
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="action-items">
                                <button
                                    className='add-board-submit-btn'
                                    disabled={!isSubmitable}
                                    onClick={this.handleSubmit}>
                                    Create Board
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default PopUpAddBoard