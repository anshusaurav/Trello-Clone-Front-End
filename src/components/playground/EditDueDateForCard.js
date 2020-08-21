import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
class EditDueDateForCard extends Component {
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
                                <div>
                                    <Form className="label-form">
                                        <Input placeholder='Add labels' />
                                        <Button icon="plus" />
                                    </Form>
                                    <div className="pop-over-section">


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
export default EditDueDateForCard;