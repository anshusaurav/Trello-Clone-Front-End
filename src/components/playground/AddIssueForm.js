import React, { Component } from 'react'

// import { Icon } from 'semantic-ui-react';
class AddIssueForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isSubmitable: false,
            errorMsgs: null
        }
        // this.escFunction = this.escFunction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseThis = this.handleCloseThis.bind(this);
    }
    handleChange(event) {
        if (event.target.name === 'title') {
            this.setState({ title: event.target.value }, function () {
                if (this.checkValidList().result) {
                    this.setState({ isSubmitable: true });
                } else {
                    this.setState({ isSubmitable: false });
                }
            });
        }
    }

    handleCloseThis(event) {
        event.preventDefault();
        this.props.handleClose();
    }
    handleSubmit(event) {
        event.preventDefault()
        this.submitIssue()
    }
    async submitIssue() {
        const { title } = this.state;
        const { listId } = this.props;
        const issue = { issue: { title } }
        const url = `http://localhost:4000/api/issues/${listId}`
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${jwttoken}`
                },
                body: JSON.stringify(issue)
            })
            let data = await response.json()
            if (!data.errors) {

                this.setState({ isSubmitable: false }, () => {
                    this.setState({ title: '' })
                })
                this.props.toggleUpdate();
                this.props.handleClose();
            } else {
                const errors = []
                for (const [key, value] of Object.entries(data.errors)) {
                    errors.push(`${key} ${value}`)
                }
                this.setState({ errorMsgs: errors })
            }
        } catch (error) {
            const errors = []
            errors.push(error.toString())
            this.setState({ errorMsgs: errors })
        }
    }
    checkValidList() {
        const { title } = this.state;
        let res = true,
            data = [];
        if (title.trim().length === 0) {
            res = false;
            data.push("Name");
        }
        if (res) return { result: true, data };

        return { result: false, data };
    }
    render() {
        const { title, isSubmitable } = this.state;
        return (
            <form className='card-composer' onSubmit={this.handleSubmit} >
                <div className='card-compose-area-div'>
                    <textarea className='card-compose-area-input'
                        placeholder='Enter a title for this card...'
                        name="title"
                        onChange={this.handleChange}
                        value={title}>

                    </textarea>
                </div>
                <div className='card-controllers'>
                    <div className='card-control-section'>
                        <input type='submit' className='card-add-input-btn' value='Add Card' disabled={!isSubmitable} onClick={this.handleSubmit} />
                    </div>

                    <span className='card-control-close-btn' onClick={this.handleCloseThis}>X</span>
                </div>
            </form>
        )
    }
}
export default AddIssueForm