import React from 'react'
import { Button, Form, Grid, Divider, Segment } from 'semantic-ui-react'
import CustomFormHeader from './../components/common/CustomFormHeader'
import leftBG from './../images/leftbg.svg'
import rightBG from './../images/rightbg.svg'
class SignInForm extends React.Component {
    render() {
        return (
            <div className='form-container'>
                <div className='form-container-outer-div'>
                    <CustomFormHeader />
                    <div className='form-container-inner-div' >
                        <h2>Log in to Trello</h2>

                        <Segment style={{ padding: '1rem' }}>
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
                                <a href='#' className='form-link'>Can't log in?</a>
                                <a href='#' className='form-link'>Sign up for an account</a>
                            </div>
                        </Segment>
                    </div>
                </div>
                <div className="background">
                    <div className="background-inner">
                        <div className='leftLarge'>
                            <img alt="TrelloBG" src="https://cdn4.buysellads.net/uu/1/41334/1550855391-cc_dark.png"></img>
                        </div>
                        <div className='rightLarge'>
                            <img alt="TrelloBG" src={rightBG}></img>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default SignInForm;