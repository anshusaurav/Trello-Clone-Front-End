import React from 'react'
import { Button, Form, Divider } from 'semantic-ui-react'
import CustomFormHeader from './../components/common/CustomFormHeader'
import leftBG from './../images/leftbg.svg'
import rightBG from './../images/rightbg.svg'
import { withRouter, Link } from 'react-router-dom'
class SignInForm extends React.Component {
    render() {
        return (
            <div className='form-container'>
                <div className='form-complete-div'>
                    <div className='form-container-outer-div'>
                        <CustomFormHeader />
                        <div className='form-container-inner-div' >
                            <h2>Log in to Trello</h2>


                            <Form size='large'>

                                <Form.Input fluid placeholder='Enter email' />
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
                            <div className='form-extra-links'>
                                <Link to='forgot'>

                                    <Button className='remove-design-btn'>Can't log in</Button>
                                </Link>
                                <Link to='signup'>

                                    <Button className='remove-design-btn'>Sign up for an account</Button>
                                </Link>

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
export default withRouter(SignInForm);