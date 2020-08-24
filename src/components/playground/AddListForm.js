import React, { Component, createRef } from 'react'
import { Button } from 'semantic-ui-react';
class AddListForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isSubmitable: false,
            isBtnLoading: false,
            errorMsgs: null
        }
        // this.escFunction = this.escFunction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseThis = this.handleCloseThis.bind(this);
        this.escFunction = this.escFunction.bind(this);
        this.listNameRef = createRef();
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
    handleCloseThis(event) {
        event.preventDefault();
        this.props.handleClose();
    }
    handleSubmit(event) {
        this.setState({ isBtnLoading: true })
        event.preventDefault()
        this.submitList()
    }
    async submitList() {
        const { name } = this.state;
        const { boardSlug } = this.props;
        const list = { list: { name } }
        const url = `https://trello-clone-mern.herokuapp.com/api/lists/${boardSlug}`
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
        } finally {
            this.setState({ isBtnLoading: false })
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
    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.handleClose();
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
        this.listNameRef.current.focus();
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }
    render() {
        const { name, isSubmitable } = this.state;
        return (
            <form className='list-composer' onSubmit={this.handleSubmit}>
                <div className='list-compose-area-div'>
                    <textarea className='list-compose-area-input'
                        placeholder='Enter a name for this List...'
                        name="name"
                        onChange={this.handleChange}
                        value={name}
                        ref={this.listNameRef}>

                    </textarea>
                </div>
                <div className='list-controllers'>
                    <div className='list-control-section'>
                        <Button
                            className='list-add-input-btn'

                            disabled={!isSubmitable}
                            onClick={this.handleSubmit}
                            loading={this.state.isBtnLoading}

                        >Add List</Button>

                    </div>
                    <span
                        className='list-control-close-btn'
                        onClick={this.handleCloseThis}>X</span>
                </div>
            </form>
        )
    }
}
export default AddListForm