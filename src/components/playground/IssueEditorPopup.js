import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
class IssueEditPopup extends Component {
    render() {
        return (
            <div className="quick-card-editor-card">
                <div className="list-card-quick-edit">
                    <div className='list-card-details'>
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
                                </div>

                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default IssueEditPopup;