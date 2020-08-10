import React from 'react'
import { Button, Form, Grid, Divider, Message, Segment } from 'semantic-ui-react'
import CustomFormHeader from './../components/common/CustomFormHeader'
class SignInForm extends React.Component {
    render() {
        return (
            <div className='form-container'>
                <Grid textAlign='center' style={{ height: '100vh' }
                } verticalAlign='middle' segment>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <CustomFormHeader />
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
                                <a href='#'>Can't log in?</a>
                                <a href='#'>Sign up for an account</a>
                            </div>
                        </Segment>
                    </Grid.Column>
                </Grid>
                <div className="background">

                </div>
            </div>
        )
    }
}
export default SignInForm;