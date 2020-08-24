import React, { Component } from 'react'
import { TextArea } from 'semantic-ui-react'

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
class CardCommentPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
            body: '',
            errorMsgs: null,
            isSubmitable: false,
            isUpdated: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.escFunction = this.escFunction.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);

        this.handlePopUpClick = this.handlePopUpClick.bind(this);
        this.handleOutsidePopUpClick = this.handleOutsidePopUpClick.bind(this);

    }
    toggleUpdate() {
        this.setState({ isUpdated: !this.state.isUpdated })
    }
    handlePopUpClick(event) {
        event.stopPropagation();
    }
    handleOutsidePopUpClick(event) {
        event.preventDefault();
        this.props.handleClose();
    }
    handleChange(event) {
        console.log(event.target);
        if (event.target.name === 'body') {
            this.setState({ body: event.target.value }, () => {
                if (this.checkValidComment().result) {
                    this.setState({ isSubmitable: true })
                } else {
                    this.setState({ isSubmitable: false })
                }
            })
        }
    }
    handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (this.state.isSubmitable) {
                this.addComment();
            }
        }
    }
    handleRemove(event) {
        event.preventDefault();
        if (event.target.dataset.commentId) {
            this.removeComment(event.target.dataset.commentId)
        }
    }
    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.handleClose();
        }
    }
    checkValidComment() {
        const { body } = this.state
        let data = []
        let res = true
        if (body.trim().length === 0) {
            res = false
            data.push('body')
        }
        if (res) return { result: true, data }

        return { result: false, data }
    }
    async saveComments() {
        console.log(this.props);
        console.log("fetching comments")
        const { issueId } = this.props;
        const url = `https://trello-clone-mern.herokuapp.com/api/comments/${issueId}`;
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
            console.log('Comment', data);
            if (!data.errors) {
                this.setState({ comments: data.comments });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    async addComment() {
        console.log(this.props);
        console.log("Updating Comments")
        const { issueId } = this.props;
        const { body } = this.state;
        const url = `https://trello-clone-mern.herokuapp.com/api/comments/${issueId}`;
        const comment = { comment: { body } };
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
                body: JSON.stringify(comment)
            });
            const data = await response.json();
            if (!data.errors) {
                this.setState({ body: '' }, () => {
                    this.toggleUpdate();
                })

            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    async removeComment(commentTobeRemoved) {
        console.log(this.props);
        console.log("Deleting Comments")
        const url = `https://trello-clone-mern.herokuapp.com/api/comments/single/${commentTobeRemoved}`;
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                }
            });
            const data = await response.json();
            if (!data.errors) {
                this.setState({ body: '' }, () => {
                    this.toggleUpdate();
                })

            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    timeAgo(date) {
        TimeAgo.addLocale(en);
        const timeAgo = new TimeAgo("en-US");
        return timeAgo.format(date);
    }
    componentDidMount() {
        this.saveComments();
        document.addEventListener("keydown", this.escFunction, false);

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isUpdated !== this.state.isUpdated) {
            this.saveComments();
        }
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }
    render() {
        const { comments, body } = this.state;
        let loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser)
            loggedInUser = JSON.parse(loggedInUser);
        return (
            <div className="window-overlay" onClick={this.handleOutsidePopUpClick}>
                <div className="window" onClick={this.handlePopUpClick}>
                    <div className="window-wrapper">
                        <span className="dialog-close-button" onClick={this.props.handleClose}>X</span>
                        <div className="card-detail-window">
                            <div className="window-main-col">
                                <div className="window-module">
                                    <div className="js-new-comment">
                                        <div className="member">
                                            <span className="member-initials">
                                                AS
                                            </span>
                                        </div>
                                        <form>
                                            <div className="comment-frame">
                                                <div className="comment-box">
                                                    <TextArea
                                                        className="comment-box-input"
                                                        name="body"
                                                        value={body}
                                                        onChange={this.handleChange}
                                                        onKeyDown={this.handleKeyDown}
                                                        placeholder="Add a comment..."
                                                        required>
                                                    </TextArea>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    {
                                        comments && comments.map((comment) => {
                                            return (
                                                <div className="js-list-actions" key={comment._id}>
                                                    <div className="mod-comment-type" >
                                                        <div className="phenom-creator">
                                                            <div className="js-show-mem-menu">
                                                                <span className="member-initials">
                                                                    {comment.author.fullname.toUpperCase().split(' ').map(elem => elem[0]).join('').slice(0, 2)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="phenom-desc">
                                                            <span className="inline-member">
                                                                <span className="u-font-weight-bold">
                                                                    {comment.author.fullname}
                                                                </span>
                                                            </span>
                                                            <span className="inline-spacer">
                                                            </span>
                                                            <span className="phenom-date">
                                                                {this.timeAgo(new Date(comment.createdAt))}
                                                            </span>
                                                            <div className="comment-container">

                                                                <div className="action-comment ">
                                                                    <div className="current-comment">
                                                                        <p>{comment.body}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="phenom-reactions">
                                                            <div className="phenom-meta">
                                                                <span className="js-actions-span">
                                                                    {
                                                                        loggedInUser.email === comment.author.email && (
                                                                            <span data-comment-id={comment._id} onClick={this.handleRemove}>
                                                                                Delete
                                                                            </span>
                                                                        )
                                                                    }

                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CardCommentPopup