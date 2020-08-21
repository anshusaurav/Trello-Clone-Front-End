import React, { Component } from 'react'
import { Button, Form, Message, Transition } from 'semantic-ui-react'
class TeamMembers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team: null,
            email: '', errorMsgs: null,
            isSubmitable: false,
            isUpdated: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    toggleUpdate() {
        this.setState({ isUpdated: !this.state.isUpdated })
    }
    handleChange(event) {
        if (event.target.name === 'email') {
            this.setState({ email: event.target.value }, function () {
                if (this.checkValidEmail().result) {
                    this.setState({ isSubmitable: true });
                } else {
                    this.setState({ isSubmitable: false });
                }
            });
        }

    }
    handleSubmit(event) {
        event.preventDefault()
        this.addMember();
    }
    handleDelete(event) {
        // event.preventDefault();
        const email = event.target.getAttribute('data-email');
        if (email) {
            this.removeMember(email);
        }

    }
    async saveTeam() {
        console.log("fetching team")
        const { teamSlug } = this.props;
        // const teamSlug = this.props.match.params.slug;
        const url = `http://localhost:4000/api/teams/${teamSlug}`;
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
            });
            const data = await response.json();
            if (!data.errors) {
                this.setState({ team: data.team });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }

    async addMember() {
        const { email } = this.state;
        const { teamSlug } = this.props;
        const user = { user: { email } }
        const url = `http://localhost:4000/api/teams/${teamSlug}/add`
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${jwttoken}`
                },
                body: JSON.stringify(user)
            })

            let data = await response.json();
            console.log('ADD', data);
            if (!data.errors) {
                this.setState({ email: '' }, () => {
                    this.toggleUpdate();
                })

            } else {
                const errors = []
                for (const value of Object.values(data.errors)) {
                    errors.push(`${value}`)
                }
                this.setState({ errorMsgs: errors })
            }
        } catch (error) {
            const errors = []
            errors.push(error.toString())
            this.setState({ errorMsgs: errors })
        }

    }
    async removeMember(email) {
        const { teamSlug } = this.props;
        const user = { user: { email: email } }
        const url = `http://localhost:4000/api/teams/${teamSlug}/add`
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${jwttoken}`
                },
                body: JSON.stringify(user)
            })

            let data = await response.json();
            if (!data.errors) {
                this.toggleUpdate();
            } else {
                const errors = []
                for (const value of Object.values(data.errors)) {
                    errors.push(`${value}`)
                }
                this.setState({ errorMsgs: errors })
            }
        } catch (error) {
            const errors = []
            errors.push(error.toString())
            this.setState({ errorMsgs: errors })
        }

    }
    checkValidEmail() {
        const { email } = this.state;
        let res = true,
            data = [];
        if (!this.validateEmail(email)) {
            res = false;
            data.push("Email");
        }
        if (res) return { result: true, data };

        return { result: false, data };
    }
    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    componentDidMount() {
        this.saveTeam();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isUpdated !== this.state.isUpdated)
            this.saveTeam();
    }
    render() {
        const { team, errorMsgs, isSubmitable, email } = this.state;
        return (
            <>
                {
                    team && team.owner && <div className="org-member-wrapper">
                        <div className="org-members-page-layout">
                            <div className="org-members-page-layout-list">

                                <div className="org-members-section">
                                    <div className="org-members-actions-header">
                                        <h1 className="org-members-header">
                                            <span>
                                                Team Members
                                            </span>
                                            <span>
                                                &nbsp;
                                            </span>
                                            <span>
                                                ({team.members.length + 1})
                                            </span>
                                        </h1>
                                        <p className="org-members-description">
                                            <span>
                                                Team members can view and join all Team Visible boards
                                                and create new boards in the team.
                                            </span>
                                        </p>
                                    </div>
                                    <div className="org-members-actions">
                                        <div className="org-members-actions-search">
                                            <Form>
                                                <Form.Input
                                                    label='Email'
                                                    placeholder='joe@schmoe.com'
                                                    name='email'
                                                    value={email}
                                                    onChange={this.handleChange}
                                                />
                                                <Button
                                                    icon='add user'
                                                    content='Invite Team Members'
                                                    color='linkedin'
                                                    onClick={this.handleSubmit}
                                                    disabled={!isSubmitable}
                                                />
                                            </Form>

                                        </div>
                                    </div>

                                </div>
                                <div className="org-members-list">
                                    <Transition.Group
                                        duration={200}
                                    >
                                        <div className="member-list-item-detail" key={team.owner._id}>
                                            <div className="member-no-menu">
                                                <span className="member-initials">{team.owner.fullname.split(' ').map(elem => elem[0]).join('').slice(0, 2)}</span>
                                            </div>
                                            <div className="details">
                                                <p className="name-line"><span>{team.owner.fullname}</span></p>
                                                <p className="user-line"><span>{team.owner.username}</span></p>
                                            </div>
                                            <div className="options">
                                                <Button icon='chess king' content='Admin' color="facebook" disabled />
                                            </div>
                                        </div>
                                        {
                                            team.members && team.members.map(member => {
                                                return (
                                                    <div className="member-list-item-detail" key={member._id}>
                                                        <div className="member-no-menu">
                                                            <span className="member-initials">{member.fullname.split(' ').map(elem => elem[0]).join('').slice(0, 2)}</span>
                                                        </div>
                                                        <div className="details">
                                                            <p className="name-line"><span>{member.fullname}</span></p>
                                                            <p className="user-line"><span>{member.username}</span></p>
                                                        </div>
                                                        <div className="options">
                                                            <Button icon='remove user'
                                                                content='Remove'
                                                                data-email={member.email + ''}
                                                                onClick={this.handleDelete} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Transition.Group>
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
                    </div>
                }

            </>


        )
    }

}
export default TeamMembers;