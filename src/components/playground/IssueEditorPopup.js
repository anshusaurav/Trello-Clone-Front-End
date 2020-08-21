import React, { Component } from 'react'
import { Icon, Button, Popup } from 'semantic-ui-react'
import EditLabelForCard from './EditLabelForCard'
import EditMemberForCard from './EditMemberForCard'
import EditDueDateForCard from './EditDueDateForCard'
class IssueEditPopup extends Component {
    render() {
        return (
            <div className="quick-card-editor-card">
                <div className="list-card-quick-edit">
                    <div className='list-card-details'>
                        <span className='list-card-edit-close'>X</span>
                        <div className="list-card-labels">
                            <span className="mod-card-front">
                                <span className="label-text">
                                    Product
                                </span>
                            </span>
                            <span className="mod-card-front">
                                <span className="label-text">
                                    Design
                                </span>
                            </span>
                        </div>
                        <textarea className="list-card-edit-title">

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
                                <div className='due-date-badge'>
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
                                </div>

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
            </div>
        )
    }
}
export default IssueEditPopup;