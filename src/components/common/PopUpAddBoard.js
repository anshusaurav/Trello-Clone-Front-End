import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
class PopUpAddBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgIndex: 0,
            name: '',
            team: 'No Team',
            isPrivate: true,
            isSubmitable: false,
            bgArr: ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
                'https://images.pexels.com/photos/870711/pexels-photo-870711.jpeg',
                'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg',
                'https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg',
                'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
                'https://images.unsplash.com/photo-1597226417297-6b99b273ded6?cs=tiny',
                'https://images.unsplash.com/photo-1597462263121-d141a6fa0ca4?cs=tiny',
                'https://images.unsplash.com/photo-1597441205491-f5c9bc18be6d?cs=tiny',
                'https://images.unsplash.com/photo-1597432845483-c6ae82d95ac6?cs=tiny',]

        }
        this.escFunction = this.escFunction.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeTeam = this.handleChangeTeam.bind(this);
        this.handleFormatButtons = this.handleFormatButtons.bind(this);
        this.handleBGClick = this.handleBGClick.bind(this);
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
    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    render() {
        const { bgIndex, name, team, isPrivate, isSubmitable, bgArr } = this.state;
        const teams = [
            {
                key: '0000',
                text: 'No Team',
                value: 'No Team',
            },
            {
                key: '3213123',
                text: 'Jenny Hess',
                value: 'Jenny Hess',
            },
            {
                key: '421312321',
                text: 'Anshu',
                value: 'Anshu',
            },
            {
                key: '32131231',
                text: 'Anshu',
                value: 'Anshu',
            },
            {
                key: '432432',
                text: 'Ashish',
                value: 'Ashish',
            },
            {
                key: '3123123',
                text: 'Elliot',
                value: 'Elliot',
            },
        ];
        console.log(bgArr[bgIndex])
        return (
            <div className="popup-add-board-form-card">
                <div className="popup-add-board-outer">
                    <div className="popup-add-board-inner">
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
                                            // selection
                                            // defaultValue={teams[0].value}
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
                                                    Private
                                                </button>
                                            ) : (
                                                    <button className='add-board-private-btn'
                                                        onClick={this.handleFormatButtons}>
                                                        <Icon
                                                            name="globe"
                                                            className="add-board-i-btn">
                                                        </Icon>
                                                        Public
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
                                                        onClick={this.handleBGClick}
                                                    >
                                                    </button>
                                                </li>)
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="action-items">
                                <button
                                    className='add-board-submit-btn'
                                    disabled={!isSubmitable}>
                                    Create Board
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div >
        )
    }
}
export default PopUpAddBoard