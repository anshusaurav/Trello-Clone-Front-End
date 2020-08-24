import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
class TeamSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team: null,
            name: '',
            description: '',
            isSubmitable: false,
            isUpdated: false,
            errorMsgs: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);

    }
    handleChange(event) {
        if (event.target.name === 'name') {
            this.setState({ name: event.target.value }, function () {
                if (this.checkValidName().result) {
                    this.setState({ isSubmitable: true });
                } else {
                    this.setState({ isSubmitable: false });
                }
            });
        }
        else if (event.target.name === 'description') {
            this.setState({ description: event.target.value });
        }

    }
    handleSubmit(event) {
        event.preventDefault();
        this.updateTeam();
    }

    handleClear(event) {
        event.preventDefault();
        this.saveTeam();
    }
    checkValidName() {
        const { name } = this.state;
        let res = true,
            data = [];
        if (name.trim().length === 0) {
            res = false;
            data.push("Name");
        }
        if (res) return { result: true, data };

        return { result: false, data };
    }
    async saveTeam() {
        console.log("fetching team")
        const { teamSlug } = this.props;
        // const teamSlug = this.props.match.params.slug;
        const url = `https://trello-clone-mern.herokuapp.com/api/teams/${teamSlug}`;
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
                this.setState({
                    team: data.team,
                    name: data.team.name,
                    description: data.team.description
                });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    async updateTeam() {
        const { teamSlug } = this.props;
        const { name, description } = this.state;
        // const teamSlug = this.props.match.params.slug;
        const url = `https://trello-clone-mern.herokuapp.com/api/teams/${teamSlug}`;
        const team = { team: { name, description } }
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
                body: JSON.stringify(team)
            });
            const data = await response.json();
            if (!data.errors) {
                this.setState({
                    team: data.team,
                    name: data.team.name,
                    description: data.team.description
                });
                this.props.toggleUpdate();
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }

    componentDidMount() {
        this.saveTeam();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isUpdated !== this.state.isUpdated)
            this.saveTeam();
    }
    render() {
        const { name, description, isSubmitable } = this.state;
        return (
            <>
                <div className="team-settings-wrapper">
                    <div className="team-settings-outer">
                        <div className="team-settings-content">
                            <div className="team-settings-details">
                                <Form>
                                    <Form.Field>
                                        <label>Name</label>
                                        <input placeholder='Team Name'
                                            name='name'
                                            value={name}
                                            onChange={this.handleChange}
                                            required

                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Description (optional)</label>
                                        <input placeholder='Team Description'
                                            name='description'
                                            value={description}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>

                                    <Button type='submit'
                                        color='linkedin'
                                        onClick={this.handleSubmit}
                                        disabled={!isSubmitable}>
                                        Submit
                                    </Button>
                                    <Button type='submit'
                                        onClick={this.handleClear}>
                                        Cancel
                                    </Button>
                                </Form>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }

}
export default TeamSettings;