import React from 'react'
import { Menu, Icon, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class HeaderNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null
        }
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
                console.log(data.user);
                this.setState({ profile: data.user })
            }
        } catch (error) {
            console.error('Error: ' + error)
        }
    }
    componentDidMount() {
        this.saveProfile()
    }


    render() {
        return <div>
            {this.state.profile && this.state.profile.image &&
                <Menu inverted style={{
                    padding: '0.5rem', backgroundColor: '#026AA7', display: 'flex',
                    overflow: 'hidden'
                }}>
                    <div className='top-nav-left'>
                        <Icon bordered size='large' name='th' inverted color='blue' style={{ borderRadius: 2, padding: 2, }} />
                        <Icon bordered size='large' name='home' inverted color='blue' style={{ borderRadius: 2, padding: 2 }} />
                        <Icon bordered size='large' name='trello' content='Boards' inverted color='blue' />
                        <Input inverted color='blue' size='large'
                            icon={{ name: 'search', circular: true, link: true, inverted: true, color: 'blue' }}
                        />
                    </div>
                    <Link to={''} className='home-link'>
                        <div className='home-link-div'>
                            <span className='home-link-gif'></span>
                            <span className='home-link-img'></span>
                        </div>
                    </Link>
                    <div className='top-nav-right'>
                        <Icon bordered size='large' name='plus' inverted color='blue' style={{ borderRadius: 2, padding: 2, }} />
                        <Icon bordered size='large' name='info' inverted color='blue' style={{ borderRadius: 2, padding: 2 }} />
                        <Icon bordered size='large' name='bell outline' content='Boards' inverted color='blue' />
                        <p style={{ borderRadius: '50%', height: 42, width: 42 }}>
                            {this.state.profile.fullname.split(' ').map(elem => elem[0]).join('').slice(0, 2)}
                        </p>
                    </div>
                </Menu>
            }
        </div>
    }
}
export default HeaderNav