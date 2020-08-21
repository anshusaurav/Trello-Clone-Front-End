import React from 'react'
import { Menu, Icon, Input, Dropdown } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

class HeaderNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null,
            default: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async saveProfile() {
        const url = 'http://localhost:4000/api/user'
        const { jwttoken } = localStorage
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/JSON',
                    Authorization: `Token ${jwttoken}`
                }
            })
            const data = await response.json()
            if (!data.errors) {
                this.setState({ profile: data.user })
            }
        } catch (error) {
            console.error('Error: ' + error)
        }
    }
    componentDidMount() {
        this.saveProfile()
    }

    handleChange(e, { value }) {
        this.setState({ default: value }, () => {
            if (this.state.default === 'sign-out') {
                this.props.toggleLoggedIn();
                localStorage.removeItem('jwttoken');
                localStorage.removeItem('loggedInUser');
                this.props.history.push('/');
            }
        })
    }
    render() {
        const options = [
            { key: 'user', text: 'Account', icon: 'user', value: 'user' },
            { key: 'settings', text: 'Settings', icon: 'settings', value: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out', value: 'sign-out' },
        ]
        return <div>
            {this.state.profile && this.state.profile.image &&
                <Menu inverted style={{
                    padding: '0.5rem', backgroundColor: '#026AA7', display: 'flex',
                    height: 54,
                    zIndex: 1000
                }}>
                    <div className='top-nav-left'>
                        <Link to='/'>
                            <Icon bordered size='large' name='th' inverted color='blue' style={{ borderRadius: 2, padding: 2, }} />
                        </Link>
                        <Link to='/'>
                            <Icon bordered size='large' name='home' inverted color='blue' style={{ borderRadius: 2, padding: 2 }} />
                        </Link>
                        <Link to='/boards'>
                            <Icon bordered size='large' name='trello' content='Boards' inverted color='blue' />
                        </Link>
                        <Input inverted color='blue' size='large'
                            icon={{ name: 'search', circular: true, link: true, inverted: true, color: 'blue' }}
                        />
                    </div>
                    <Link to={'/'} className='home-link'>
                        <div className='home-link-div'>
                            <span className='home-link-gif'></span>
                            <span className='home-link-img'></span>
                        </div>
                    </Link>
                    <div className='top-nav-right'>
                        <Icon bordered size='large' name='plus' inverted color='blue' style={{ borderRadius: 2, padding: 2, }} />
                        <Icon bordered size='large' name='info' inverted color='blue' style={{ borderRadius: 2, padding: 2 }} />
                        <Icon bordered size='large' name='bell outline' content='Boards' inverted color='blue' />
                        <Dropdown trigger=
                            {
                                <p style={{
                                    borderRadius: '50%',
                                    height: 42,
                                    width: 42,
                                    userSelect: 'none'
                                }}>
                                    {this.state.profile.fullname.split(' ').map(elem => elem[0]).join('').slice(0, 2)}
                                </p>

                            }
                            onChange={this.handleChange}
                            options={options}
                            pointing='top right'
                            icon={null}
                        >

                        </Dropdown>
                    </div>
                </Menu>
            }
        </div>
    }
}
export default withRouter(HeaderNav)