import React, { Component, createRef } from 'react'
import { Icon, Button, Popup } from 'semantic-ui-react'
import EditLabelForCard from './EditLabelForCard'
import EditDueDateForCard from './EditDueDateForCard'
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import stc from 'string-to-color'
import { EditCardMainLoader } from './../loaders'
class IssueEditorPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            issue: null,
            isUpdated: false,
            errorMsgs: null,
            title: '',
            isSubmitable: true,
            isOpenLabel: false,
            isOpenDuedate: false
        }
        this.escFunction = this.escFunction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.handleArchive = this.handleArchive.bind(this);

        this.handleCloseDuedatePopup = this.handleCloseDuedatePopup.bind(this);
        this.handleOpenDuedatePopup = this.handleOpenDuedatePopup.bind(this);
        this.handleOpenLabelPopup = this.handleOpenLabelPopup.bind(this);
        this.handleCloseLabelPopup = this.handleCloseLabelPopup.bind(this);
        this.textAreaRef = createRef();
    }

    handleOpenLabelPopup() {
        this.setState({ isOpenLabel: true });
    }
    handleCloseLabelPopup() {
        this.setState({ isOpenLabel: false });
    }
    handleOpenDuedatePopup() {
        this.setState({ isOpenDuedate: true });
    }
    handleCloseDuedatePopup() {
        this.setState({ isOpenDuedate: false });
    }
    toggleUpdate() {
        this.setState({ isUpdated: !this.state.isUpdated });
        // this.props.toggleUpdate();
    }
    handleArchive(event) {
        event.preventDefault();
        this.deleteIssue();
    }
    handleSubmit(event) {
        event.preventDefault()
        this.updateIssue()
    }
    handleChange(event) {
        // this.setState({ [name]: value })
        if (event.target.name === 'title') {
            this.setState({ title: event.target.value }, () => {
                if (this.checkValidIssue().result) {
                    this.setState({ isSubmitable: true })
                } else {
                    this.setState({ isSubmitable: false })
                }
            })
        }

    }
    checkValidIssue() {
        const { title } = this.state
        let data = []
        let res = true
        if (title.trim().length === 0) {
            res = false
            data.push('Title')
        }
        if (res) return { result: true, data }

        return { result: false, data }
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
                this.setState({ issue: data.issue }, () => {
                    if (!this.state.isOpenDuedate && !this.state.isOpenLabel)
                        this.textAreaRef.current.select();
                    this.setState({ title: data.issue.title })
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
        const { title } = this.state;
        const url = `https://trello-clone-mern.herokuapp.com/api/issues/single/${issueId}`;
        const issue = { issue: { title } };
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
            // console.log(data);
            if (!data.errors) {
                this.props.toggleUpdate();
                this.props.handleClose();
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    async deleteIssue() {
        console.log("Deleting Issue")
        const { issueId } = this.props;
        const url = `https://trello-clone-mern.herokuapp.com/api/issues/single/${issueId}`;

        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                }
            });
            const data = await response.json();
            // console.log(data);
            if (!data.errors) {
                this.props.toggleUpdate();
                this.props.handleClose();
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    timeAgo(date) {
        TimeAgo.addLocale(en);
        const timeAgo = new TimeAgo("en-US");
        return timeAgo.format(date);
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
        const { issue, title, isSubmitable, isOpenDuedate, isOpenLabel } = this.state;
        return (
            <>
                {(
                    <div className="quick-card-editor-card">
                        <div className="list-card-quick-edit">
                            <div className='list-card-details'>
                                <span className='list-card-edit-close'
                                    onClick={this.props.handleClose}>
                                    X
                                </span>
                                {
                                    issue ? (
                                        <>
                                            <div className="list-card-labels">
                                                {
                                                    issue && issue.labels && issue.labels.map((label, index) => {
                                                        return (
                                                            <span className="mod-card-front" key={index}
                                                                style={{ backgroundColor: `${stc(label.toUpperCase())}` }}>
                                                                <span className="label-text">
                                                                    {label.charAt(0).toUpperCase() + label.slice(1)}
                                                                </span>
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <textarea className="list-card-edit-title"
                                                name="title"
                                                ref={this.textAreaRef}
                                                onChange={this.handleChange}
                                                value={title}
                                            >
                                            </textarea>
                                            <div className="badges">
                                                {
                                                    issue && issue.dueDate && (
                                                        <span className='js-badges'>

                                                            <div className='due-date-badge' style={{ backgroundColor: `${Date.now() > new Date(issue.dueDate) ? '#EC9488' : '#fff'}` }}>
                                                                <span className='badge-icon'>
                                                                    <Icon name="clock outline" />
                                                                </span>
                                                                <span className='badge-text'>
                                                                    {this.timeAgo(new Date(issue.dueDate))}
                                                                </span>
                                                            </div>
                                                        </span>
                                                    )
                                                }

                                            </div>
                                        </>
                                    ) : (EditCardMainLoader())
                                }
                            </div>
                        </div>
                        <Button className="js-save-edits-btn"
                            onClick={this.handleSubmit}
                            disabled={!isSubmitable}>
                            Save
                        </Button>
                        <div className="quick-card-editor-buttons">
                            <Popup
                                on="click"
                                open={isOpenLabel}
                                onOpen={this.handleOpenLabelPopup}
                                basic
                                trigger={

                                    <Button
                                        icon='tags'
                                        content="Edit Labels"
                                        className="edit-card-btn" />
                                }>
                                <EditLabelForCard
                                    issueId={this.props.issueId}
                                    handleClose={this.handleCloseLabelPopup}
                                    toggleUpdate={this.toggleUpdate}
                                />
                            </Popup>

                            <Popup
                                on="click"
                                open={isOpenDuedate}
                                onOpen={this.handleOpenDuedatePopup}
                                basic
                                trigger={
                                    <Button
                                        icon='clock'
                                        content="Change Due Date"
                                        className="edit-card-btn" />
                                }>
                                <EditDueDateForCard
                                    issueId={this.props.issueId}
                                    handleClose={this.handleCloseDuedatePopup}
                                    toggleUpdate={this.toggleUpdate}
                                />
                            </Popup>
                            <Button
                                icon='box'
                                content="Archive"
                                className="edit-card-btn"
                                onClick={this.handleArchive}
                            />

                        </div>
                    </div>)
                }
            </>
        )

    }
}
export default IssueEditorPopup;