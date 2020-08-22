import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import { Button } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css'
class EditDueDateForCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };

    }


    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    render() {
        return (
            <div class="pop-over-label">
                <div className="no-back">
                    <div className="pop-over-header">
                        <span className="pop-over-header-title">
                            Change Due Date
                            </span>
                        <span className="pop-over-header-close">X
                            </span>
                    </div>
                    <div>
                        <div className="pop-over-content">

                            <div>
                                <form className="due-date-form">
                                    <div className="due-date-input-div">
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                            autoFocus

                                        />

                                    </div>
                                    <div className="due-date-input-controls">
                                        <Button positive className='submit-btn'>Save</Button>
                                        <Button negative className='remove-btn'>Remove</Button>
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default EditDueDateForCard;