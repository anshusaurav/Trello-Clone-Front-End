import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import stc from 'string-to-color'
class EditLabelForCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issue: null,
            label: '',
            errorMsgs: null,
            isSubmitable: false,
            isUpdated: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.escFunction = this.escFunction.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
    }
    toggleUpdate() {
        this.setState({ isUpdated: !this.state.isUpdated })
    }
    handleChange(event) {
        if (event.target.name === 'label') {
            this.setState({ label: event.target.value }, () => {
                if (this.checkValidLabel().result) {
                    this.setState({ isSubmitable: true })
                } else {
                    this.setState({ isSubmitable: false })
                }
            })
        }
    }
    checkValidLabel() {
        const { label } = this.state
        let data = []
        let res = true
        if (label.trim().length === 0) {
            res = false
            data.push('Label')
        }
        if (res) return { result: true, data }

        return { result: false, data }
    }
    handleSubmit(event) {
        event.preventDefault();
        this.updateIssue();
    }
    handleRemove(event) {
        event.preventDefault();
        if (event.target.dataset.label) {
            this.removeLabel(event.target.dataset.label);
        }
    }
    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.handleClose();
        }
    }
    async saveIssue() {
        console.log(this.props);
        console.log("fetching Issue")
        const { issueId } = this.props;
        const url = `https://trello-clone-mern.herokuapp.com/api/issues/single/${issueId}`;
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
                this.setState({ issue: data.issue });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    async updateIssue() {
        console.log(this.props);
        console.log("Updating Issue")
        const { issueId } = this.props;
        const { label } = this.state;
        const url = `https://trello-clone-mern.herokuapp.com/api/issues/labels/${issueId}`;
        const issue = { issue: { label } };
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
                body: JSON.stringify(issue)
            });
            const data = await response.json();
            if (!data.errors) {
                this.setState({ label: '' })
                this.toggleUpdate();
                this.props.toggleUpdate();
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    async removeLabel(labelTobeRemoved) {
        console.log(labelTobeRemoved)
        console.log(this.props);
        console.log("Updating Issue")
        const { issueId } = this.props;
        const url = `https://trello-clone-mern.herokuapp.com/api/issues/labels/${issueId}`;
        const issue = { issue: { label: labelTobeRemoved } };
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
                body: JSON.stringify(issue)
            });
            const data = await response.json();
            if (!data.errors) {
                this.toggleUpdate();
                this.props.toggleUpdate();
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    componentDidMount() {
        this.saveIssue();
        document.addEventListener("keydown", this.escFunction, false);

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isUpdated !== this.state.isUpdated) {
            this.saveIssue();
        }
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }
    render() {
        const { issue, label, isSubmitable } = this.state;

        return (
            <>
                {
                    (
                        <div className="pop-over-label" >
                            <div className="no-back">
                                <div className="pop-over-header">
                                    <span className="pop-over-header-title">
                                        Labels
                                    </span>
                                    <span className="pop-over-header-close"
                                        onClick={this.props.handleClose}>
                                        X
                                    </span>
                                </div>
                                <div>
                                    <div className="pop-over-content">
                                        <div>
                                            <div>
                                                <Form className="label-form" onSubmit={this.handleSubmit}>
                                                    <Input placeholder='Add labels'
                                                        name='label'
                                                        value={label}
                                                        onChange={this.handleChange}

                                                    />
                                                    <Button icon="plus"
                                                        onClick={this.handleSubmit}
                                                        disabled={!isSubmitable} />
                                                </Form>
                                                <div className="pop-over-section">
                                                    <h4>Labels</h4>
                                                    <ul className="edit-labels-pop-over">

                                                        {
                                                            issue && issue.labels && issue.labels.map((label, index) => {
                                                                return (
                                                                    <li key={index}>
                                                                        <span
                                                                            className="edit-label-pop-close"
                                                                            data-label={label}
                                                                            onClick={this.handleRemove}>
                                                                            X
                                                                        </span>
                                                                        <span
                                                                            className="card-label"
                                                                            key={index}
                                                                            style={{ backgroundColor: stc(label.toUpperCase()) }}>
                                                                            {label.charAt(0).toUpperCase() + label.slice(1)}
                                                                        </span>
                                                                    </li>
                                                                )
                                                            })
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
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
export default EditLabelForCard;