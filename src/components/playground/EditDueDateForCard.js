import React, { Component } from 'react'
// import DatePicker from "react-datepicker";
import { Button } from 'semantic-ui-react'
import Calendar from 'react-calendar'
// import 'react-datepicker/dist/react-datepicker.css'
import 'react-calendar/dist/Calendar.css';
class EditDueDateForCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dueDate: new Date(),
            issue: null
        };
        this.escFunction = this.escFunction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.updateIssue();
    }
    handleRemove(event) {
        event.preventDefault();
        this.removeDueDate();
    }
    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.handleClose();
        }
    }
    handleChange = date => {
        this.setState({
            dueDate: date
        });
    };
    async saveIssue() {
        console.log(this.props);
        console.log("fetching Issue")
        const { issueId } = this.props;
        const url = `http://localhost:4000/api/issues/single/${issueId}`;
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
                this.setState({ issue: data.issue }, () => {
                    if (data.issue.dueDate) {
                        this.setState({ dueDate: new Date(data.issue.dueDate) })
                    }
                });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    async updateIssue() {
        console.log(this.props);
        console.log("Updating Issue")
        const { issueId } = this.props;
        const { dueDate } = this.state;
        const url = `http://localhost:4000/api/issues/single/${issueId}`;
        const issue = { issue: { dueDate: dueDate } };
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
                body: JSON.stringify(issue)
            });
            const data = await response.json();
            if (!data.errors) {
                this.props.handleClose();
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    async removeDueDate() {
        console.log(this.props);
        console.log("Updating Issue")
        const { issueId } = this.props;
        const dueDate = null;
        const url = `http://localhost:4000/api/issues/single/${issueId}`;
        const issue = { issue: { dueDate: dueDate } };
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
                body: JSON.stringify(issue)
            });
            const data = await response.json();
            if (!data.errors) {
                this.props.handleClose();
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    componentDidMount() {
        this.saveIssue();
        document.addEventListener("keydown", this.escFunction, false);

    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }
    render() {
        const { dueDate, issue } = this.state;
        return (
            <>
                {
                    issue && (
                        <div className="pop-over-label">
                            <div className="no-back">
                                <div className="pop-over-header">
                                    <span className="pop-over-header-title">
                                        Change Due Date
                                    </span>
                                    <span
                                        className="pop-over-header-close"
                                        onClick={this.props.handleClose}>X
                                    </span>
                                </div>
                                <div>
                                    <div className="pop-over-content">

                                        <div>
                                            <form className="due-date-form" onSubmit={this.handleSubmit}>

                                                <div>
                                                    <Calendar
                                                        onChange={this.handleChange}
                                                        value={dueDate}
                                                    />
                                                </div>
                                                <div className="due-date-input-controls">
                                                    <Button
                                                        positive
                                                        className='submit-btn'
                                                        onClick={this.handleSubmit}>
                                                        Save
                                                    </Button>
                                                    <Button
                                                        negative
                                                        className='remove-btn'
                                                        onClick={this.handleRemove}>
                                                        Remove
                                                    </Button>
                                                </div>
                                            </form>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </>

        )
    }

}
export default EditDueDateForCard;