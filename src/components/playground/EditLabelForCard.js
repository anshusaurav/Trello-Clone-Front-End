import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import stc from 'string-to-color'
class EditLabelForCard extends Component {
    render() {
        const labels = ['Website', 'Android', 'iOS', 'Protoype']
        return (
            <div class="pop-over-label">
                <div className="no-back">
                    <div className="pop-over-header">
                        <span className="pop-over-header-title">
                            Labels
                        </span>
                        <span className="pop-over-header-close">X
                        </span>
                    </div>
                    <div>
                        <div className="pop-over-content">

                            <div>
                                <div>
                                    <Form className="label-form">
                                        <Input placeholder='Add labels' />
                                        <Button icon="plus" />
                                    </Form>
                                    <div className="pop-over-section">
                                        <h4>Labels</h4>
                                        <ul className="edit-labels-pop-over">
                                            {
                                                labels.map((label, index) => {
                                                    return (
                                                        <li>
                                                            <span className="edit-label-pop-close">X</span>
                                                            <span className="card-label" key={index}
                                                                style={{ backgroundColor: stc(labels[index].toLowerCase()) }}>
                                                                {labels[index]}
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
}
export default EditLabelForCard;