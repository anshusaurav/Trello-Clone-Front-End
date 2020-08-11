import React from 'react'
import { Button, Form, Divider } from 'semantic-ui-react'
import CustomFormHeader from './common/CustomFormHeader'
import leftBG from './../images/leftbg.svg'
import rightBG from './../images/rightbg.svg'
class ForgotPasswordForm extends React.Component {
    render() {
        return (
            <div className='form-container'>
                <div className='form-complete-div'>
                    <div className='form-container-outer-div'>
                        <CustomFormHeader />
                        <div className='form-container-inner-div' >
                            <h2>Can't log in?</h2>


                            <Form size='large'>
                                <Form.Field>
                                    <label>We'll send a recovery link to</label>
                                    <input placeholder='Enter email'></input>
                                </Form.Field>



                                <Button color='green' fluid size='large'>
                                    Send recovery link
                            </Button>

                            </Form>
                            <Divider inverted />
                            <div className='form-extra-links-single'>
                                <a href='#' className='form-link'>Return to log in</a>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="background">
                    <div className='leftLarge'>
                        <img alt="TrelloBG" src={leftBG}></img>
                    </div>
                    <div className='rightLarge'>
                        <img alt="TrelloBG" src={rightBG}></img>
                    </div>

                </div>
            </div>
        )
    }
}
export default ForgotPasswordForm;