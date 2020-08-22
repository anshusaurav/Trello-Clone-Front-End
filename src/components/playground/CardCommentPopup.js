import React, { Component } from 'react'
class CardCommentPopup extends Component {
    render() {
        return (
            <div className="window-overlay">
                <div className="window">
                    <div className="window-wrapper">
                        <span className="dialog-close-button">X</span>
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
                                                    <textarea className="comment-box-input"></textarea>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="js-list-actions">
                                        <div className="mod-comment-type">
                                            <div className="phenom-creator">
                                                <div className="js-show-mem-menu">
                                                    <span className="member-initials">
                                                        AS
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="phenom-desc">
                                                <span className="inline-member">
                                                    <span className="u-font-weight-bold">
                                                        anshu saurabh
                                                    </span>
                                                </span>
                                                <span className="inline-spacer">
                                                </span>
                                                <span className="phenom-date">
                                                    yesterday at 11:16 PM
                                                </span>
                                                <div className="comment-container">

                                                    <div className="action-comment ">
                                                        <div className="current-comment">
                                                            <p>Great</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="phenom-reactions">
                                                <div className="phenom-meta">
                                                    <span className="js-actions-span">
                                                        <span>
                                                            Delete
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default CardCommentPopup