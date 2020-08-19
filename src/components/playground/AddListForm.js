import React, { Component } from 'react'
// import { Icon } from 'semantic-ui-react';
class AddListForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isSubmitable: false,
            errorMsgs: null
        }
        // this.escFunction = this.escFunction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(event) {
        if (event.target.name === 'name') {
            this.setState({ name: event.target.value }, function () {
                if (this.checkValidList().result) {
                    this.setState({ isSubmitable: true });
                } else {
                    this.setState({ isSubmitable: false });
                }
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        this.submitList()
    }
    async submitList() {
        const { name } = this.state;
        const { boardSlug } = this.props;
        const list = { list: { name } }
        const url = `http://localhost:4000/api/lists/${boardSlug}`
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${jwttoken}`
                },
                body: JSON.stringify(list)
            })
            let data = await response.json()
            if (!data.errors) {
                this.setState({ isSubmitable: false, name: '' })
                this.props.toggleUpdate();
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
    render() {
        const { name, isSubmitable } = this.state;
        return (
            <form className='list-composer' onSubmit={this.handleSubmit}>
                <div className='list-compose-area-div'>
                    <textarea className='list-compose-area-input'
                        placeholder='Enter a title for this List...'
                        name="name"
                        onChange={this.handleChange}
                        value={name}>

                    </textarea>
                </div>
                <div className='list-controllers'>
                    <div className='list-control-section'>
                        <input type='submit' className='list-add-input-btn' value='Add List' disabled={!isSubmitable} onClick={this.handleSubmit} />
                    </div>

                </div>
            </form>
        )
    }
}
export default AddListForm