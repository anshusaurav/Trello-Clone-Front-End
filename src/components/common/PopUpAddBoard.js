import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
class PopUpAddBoard extends React.Component {
    constructor(props) {
        super(props);
        this.bgArr = ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/870711/pexels-photo-870711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?cs=srgb&dl=pexels-tahir-shaw-186980.jpg&fm=jpg',
            'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?cs=srgb&dl=pexels-julius-silver-753626.jpg&fm=jpg',
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/870711/pexels-photo-870711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?cs=srgb&dl=pexels-tahir-shaw-186980.jpg&fm=jpg',]
        this.state = {
            bgIndex: 0,
            name: '',
            team: 'No Team',
            isPrivate: true,
            isSubmitable: false,

        }
        this.escFunction = this.escFunction.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeTeam = this.handleChangeTeam.bind(this);
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.handleClose();
        }
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
        const { bgIndex, name, team, isPrivate, isSubmitable } = this.state;
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
        ]
        return (
            <div className="popup-add-board-form-card">
                <div className="popup-add-board-outer">
                    <div className="popup-add-board-inner">
                        <form className="create-board-form">
                            <div className="create-board-form-container">
                                <div className="create-board-tile">
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
                                                <button className='add-board-private-btn'>
                                                    <Icon
                                                        name="lock"
                                                        className="add-board-i-btn">

                                                    </Icon>
                                                    Private
                                                </button>
                                            ) : (
                                                    <button className='add-board-private-btn'>
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
                                        this.bgArr.map((elem, index) => {
                                            return (
                                                <li key={index} className="create-board-background-item">
                                                    <button
                                                        className='create-board-bg-item-btn'
                                                        style={{
                                                            backgroundImage: `url(${elem})`
                                                        }}>
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


            </div>
        )
    }
}
export default PopUpAddBoard