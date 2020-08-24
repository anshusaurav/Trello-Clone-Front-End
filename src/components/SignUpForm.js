import React, { createRef } from 'react'
import { Button, Form, Divider, Input, Message } from 'semantic-ui-react'
import CustomFormHeader from './../components/common/CustomFormHeader'
import leftBG from './../images/leftbg.svg'
import rightBG from './../images/rightbg.svg'
import { withRouter, Link } from 'react-router-dom'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            fullname: '',
            password: '',
            isSubmitable: false,
            isBtnLoading: false,
            errorMsgs: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.usernameRef = createRef()
    }
    handleChange(event, { name, value }) {
        this.setState({ [name]: value })
        if (this.checkValidUser().result) {
            this.setState({ isSubmitable: true })
        } else {
            this.setState({ isSubmitable: false })
        }
    }
    handleSubmit(event) {
        event.preventDefault()
        this.setState({ isBtnLoading: true })
        this.submitUser()
    }

    async submitUser() {
        // console.log(this.contextRef.current);
        const { email, password, username, fullname } = this.state
        const user = { user: { email, password, username, fullname } }
        const url = 'https://trello-clone-mern.herokuapp.com/api/user/'

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            let data = await response.json();
            if (!data.errors) {
                this.props.history.push('/signin');
            }
            else {
                const errors = []
                for (const [key, value] of Object.entries(data.errors)) {
                    errors.push(`${key} ${value}`)
                }
                this.setState({ errorMsgs: errors })
            }
        } catch (error) {
            console.error('Error:', error);
            const errors = []
            errors.push(error.toString());
            this.setState({ errorMsgs: errors })
        } finally {
            this.setState({ isBtnLoading: false })
        }
    }
    checkValidUser() {
        const { email, fullname, username } = this.state
        let data = [];
        let res = true;
        if (email.length < 5 || email.indexOf('@') <= 0) {
            res = false
            data.push('email')
        }
        if (fullname.length === 0) {
            res = false
            data.push('fullname')
        }
        if (username.length === 0) {
            res = false
            data.push('username')
        }
        if (res) return { result: true, data }

        return { result: false, data }
    }
    componentDidMount() {
        this.usernameRef.current.focus();
    }
    render() {
        const { email, fullname, username, password, errorMsgs } = this.state;
        return (
            <div className='form-container'>
                <div className='form-complete-div'>
                    <div className='form-container-outer-div'>
                        <CustomFormHeader />
                        <div className='form-container-inner-div' >
                            <h2>Sign up for you account</h2>


                            <Form size='large' onSubmit={this.handleSubmit}>

                                <Input
                                    fluid
                                    name='email'
                                    value={email}
                                    onChange={this.handleChange}
                                    ref={this.usernameRef}
                                    required
                                    placeholder='Enter email'
                                />
                                <Input
                                    fluid
                                    placeholder='Enter name'
                                    name='fullname'
                                    value={fullname}
                                    onChange={this.handleChange}
                                    required
                                />
                                <Input
                                    fluid
                                    placeholder='Enter handle'
                                    name='username'
                                    value={username}
                                    onChange={this.handleChange}
                                    required
                                />
                                <Input
                                    fluid
                                    placeholder='Enter password'
                                    type='password'
                                    name='password'
                                    minLength='4'
                                    defaultValue={password}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Button
                                    color='green'
                                    fluid
                                    size='large'
                                    onClick={this.handleSubmit}
                                    loading={this.state.isBtnLoading}
                                    disabled={!this.state.isSubmitable}>
                                    Sign up
                                </Button>

                            </Form>
                            <Divider inverted />
                            <div className='form-extra-links-single'>
                                <Link to='signin'>

                                    <Button className='remove-design-btn'>Already have an Atlassian account? Log in</Button>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <div className='error-msgs'>
                        {errorMsgs &&
                            errorMsgs.map((msg, index) => (
                                <Message attached='bottom' key={index} color='black'>
                                    {msg}
                                </Message>
                            ))}
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
            </div >
        )
    }
}
export default withRouter(SignUpForm);