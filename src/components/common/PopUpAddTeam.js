import React from 'react'
import { Message } from 'semantic-ui-react'
import imgSrc from './../../images/add-team-one.svg'
class PopUpAddTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            isSubmitable: false,
            errorMsgs: null
        }
        this.escFunction = this.escFunction.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
    handleChange(event) {
        console.log(event.target.name)
        if (event.target.name === 'name') {
            this.setState({ name: event.target.value }, function () {
                if (this.checkValidTeam().result) {
                    this.setState({ isSubmitable: true });
                } else {
                    this.setState({ isSubmitable: false });
                }
            });
        }
        else if (event.target.name === 'description') {
            this.setState({ description: event.target.value })
        }


    }
    handleSubmit(event) {
        event.preventDefault()
        this.submitTeam()
    }
    async submitTeam() {
        const { name, description } = this.state;
        const team = { team: { name, description } }
        const url = 'http://localhost:4000/api/teams/'
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${jwttoken}`
                },
                body: JSON.stringify(team)
            })
            let data = await response.json()
            if (!data.errors) {
                this.props.toggleUpdate();
                this.props.handleClose();
            } else {
                const errors = []
                for (const [key, value] of Object.entries(data.errors)) {
                    errors.push(`${key} ${value}`)
                }
                this.setState({ errorMsgs: errors })
            }
        } catch (error) {
            const errors = []
            errors.push(error.toString())
            this.setState({ errorMsgs: errors })
        }
    }
    checkValidTeam() {
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
    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.handleClose();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }
    render() {
        const { name, description, isSubmitable, errorMsgs } = this.state;
        return (
            <div className="popup-add-team-form-card" onClick={this.handleOutsidePopUpClick}>

                <div className="popup-add-team-form-container">
                    <div className='popup-add-team-form-outer'>
                        <div className='popup-add-team-form-inner' onClick={this.handlePopUpClick}>
                            <div className='popup-add-team-form-div'>
                                <div className='popup-add-team-form-final'>
                                    <form className='popup-add-team-form'>
                                        <span className='form-add-team-header'>
                                            Let's Build a Team
                                        </span>
                                        <label className='form-add-team-label'>Team Name</label>
                                        <input type="text"
                                            name="name"
                                            value={name}
                                            onChange={this.handleChange}
                                            className='form-add-team-input'
                                        >

                                        </input>
                                        <span className='form-add-team-input-help'>This is the name of your company, team or organization.</span>
                                        <label className='form-add-team-label'>Team Description<span className="form-add-team-span">Optional</span></label>
                                        <textarea className='form-add-team-area'
                                            name="description"
                                            onChange={this.handleChange}
                                            value={description}
                                        ></textarea>
                                        <span className='form-add-team-input-help'>Get your members on board with a few words about your team.</span>
                                        <div className='form-add-team-btn-div'>
                                            <button
                                                className='form-add-team-btn'
                                                onClick={this.handleSubmit}
                                                disabled={!isSubmitable}>
                                                Continue
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className='popup-team-dec-outer'>
                                    <div className='popup-team-dec-inner'>
                                        <img
                                            className='popup-team-dec-img'
                                            src={imgSrc}
                                            alt="decoration-img"></img>
                                    </div>
                                </div>
                                <button className='popup-add-team-close-btn'
                                    onClick={this.props.handleClose}>
                                    X
                                </button>
                            </div>
                        </div>
                        <div className='error-msgs'>
                            {errorMsgs &&
                                errorMsgs.map((msg, index) => (
                                    <Message attached='bottom' key={index} color='black'>
                                        {msg}
                                    </Message>
                                ))}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default PopUpAddTeam