import React, { Component } from 'react'
import { Icon, Button, Popup } from 'semantic-ui-react'
import EditLabelForCard from './EditLabelForCard'
import EditMemberForCard from './EditMemberForCard'
import EditDueDateForCard from './EditDueDateForCard'
import stc from 'string-to-color'
class IssueEditPopup extends Component {
    constructor(props) {
        super(props);
        this.state = { issue: null, isUpdated: false, errorMsgs: null }
        this.escFunction = this.escFunction.bind(this);
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
                this.setState({ issue: data.issue });
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
        const { issue, errorMsgs } = this.state;
        return (
            <>
                {issue && (
                    <div className="quick-card-editor-card">
                        <div className="list-card-quick-edit">
                            <div className='list-card-details'>
                                <span className='list-card-edit-close'
                                    onClick={this.props.handleClose}>
                                    X
                                </span>
                                <div className="list-card-labels">
                                    <span className="mod-card-front" style={{ backgroundColor: `${stc('Website'.toUpperCase())}` }}>
                                        <span className="label-text">
                                            Website
                                </span>
                                    </span>
                                    <span className="mod-card-front" style={{ backgroundColor: `${stc('Android'.toUpperCase())}` }}>
                                        <span className="label-text">
                                            Android
                                </span>
                                    </span>
                                    <span className="mod-card-front" style={{ backgroundColor: `${stc('iOS'.toUpperCase())}` }}>
                                        <span className="label-text">
                                            iOS
                                </span>
                                    </span>
                                    <span className="mod-card-front" style={{ backgroundColor: `${stc('Prototype'.toUpperCase())}` }}>
                                        <span className="label-text">
                                            Prototype
                                </span>
                                    </span>
                                </div>
                                <textarea className="list-card-edit-title">
                                    {issue.title}
                                </textarea>
                                <div className="badges">
                                    <span className='js-badges'>
                                        <div className='due-date-badge'>
                                            <span className='badge-icon'>
                                                <Icon name="clock" />
                                            </span>
                                            <span className='badge-text'>
                                                Aug 29
                                    </span>
                                        </div>
                                        {/* <div className='due-date-badge'>
                                    <span className='badge-icon'>
                                        <Icon name="winner" />
                                    </span>
                                    <span className='badge-text'>
                                        Complee
                                    </span>
                                </div>
                                <div className='due-date-badge'>
                                    <span className='badge-icon'>
                                        <Icon name="bug" />
                                    </span>
                                    <span className='badge-text'>
                                        Overde
                                    </span>
                                </div> */}

                                    </span>
                                </div>
                            </div>
                        </div>
                        <Button className="js-save-edits-btn">Save</Button>
                        <div className="quick-card-editor-buttons">
                            <Popup
                                on="click"
                                basic
                                trigger={

                                    <Button
                                        icon='tags'
                                        content="Edit Labels"
                                        className="edit-card-btn" />
                                }>
                                <EditLabelForCard />
                            </Popup>
                            <Popup
                                on="click"
                                basic
                                trigger={
                                    <Button
                                        icon='user'
                                        content="Change Members"
                                        className="edit-card-btn" />
                                }>
                                <EditMemberForCard />
                            </Popup>
                            <Popup
                                on="click"
                                basic
                                trigger={
                                    <Button
                                        icon='clock'
                                        content="Change Due Date"
                                        className="edit-card-btn" />
                                }>
                                <EditDueDateForCard />
                            </Popup>
                        </div>
                    </div>)
                }
            </>
        )

    }
}
export default IssueEditPopup;