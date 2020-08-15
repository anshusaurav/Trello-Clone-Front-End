import React from 'react'
// import { Card } from 'semantic-ui-react'
import imgSrc from './../../images/add-team-one.svg'
class PopUpAddTeam extends React.Component {
    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this);

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

        return (
            <div className="popup-add-team-form-card" >

                <div className="popup-add-team-form-container">
                    <div className='popup-add-team-form-outer'>
                        <div className='popup-add-team-form-inner'>
                            <div className='popup-add-team-form-div'>
                                <div className='popup-add-team-form-final'>
                                    <form className='popup-add-team-form'>
                                        <span className='form-add-team-header'>
                                            Let's Build a Team
                                        </span>
                                        <label className='form-add-team-label'>Team Name</label>
                                        <input type="text" className='form-add-team-input'></input>
                                        <span className='form-add-team-input-help'>This is the name of your company, team or organization.</span>
                                        <label className='form-add-team-label'>Team Description<span className="form-add-team-span">Optional</span></label>
                                        <textarea className='form-add-team-area'></textarea>
                                        <span className='form-add-team-input-help'>Get your members on board with a few words about your team.</span>
                                        <div className='form-add-team-btn-div'>
                                            <button className='form-add-team-btn'>Continue</button>
                                        </div>
                                    </form>
                                </div>
                                <div className='popup-team-dec-outer'>
                                    <div className='popup-team-dec-inner'>
                                        <img className='popup-team-dec-img' src={imgSrc} alt="decoration-img"></img>
                                    </div>
                                </div>
                                <button className='popup-add-team-close-btn'
                                    onClick={this.props.handleClose}>
                                    X
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default PopUpAddTeam