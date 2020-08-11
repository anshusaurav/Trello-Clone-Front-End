import React from 'react'
import { Button, Form, Grid, Divider, Segment } from 'semantic-ui-react'
import CustomFormHeader from './../components/common/CustomFormHeader'
import leftBG from './../images/leftbg.svg'
import rightBG from './../images/rightbg.svg'
class SignUpForm extends React.Component {
    render() {
        return (
            <div className='form-container'>
                <div className='form-complete-div'>
                    <div className='form-container-outer-div'>
                        <CustomFormHeader />
                        <div className='form-container-inner-div' >
                            <h2>Sign up for you account</h2>


                            <Form size='large'>

                                <Form.Input fluid placeholder='Enter email' />
                                <Form.Input fluid placeholder='Enter name' />
                                <Form.Input fluid placeholder='Enter handle' />
                                <Form.Input
                                    fluid
                                    placeholder='Enter password'
                                    type='password'
                                />

                                <Button color='green' fluid size='large'>
                                    Login
                                </Button>

                            </Form>
                            <Divider inverted />
                            <div className='form-extra-links-single'>
                                <a href='#' className='form-link'>Already have an Atlassian account? Log in</a>

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
export default SignUpForm;