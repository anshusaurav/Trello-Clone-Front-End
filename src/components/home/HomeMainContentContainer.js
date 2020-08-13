import React from 'react';
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class HomeMainContentContainer extends React.Component {
    render() {
        const recent = ["New SDEs", "Company Overview", "Balu"];
        const personal = ["Balu", "Company Overview"];
        const hiring = ["New Hiring"];
        const marketing = [];
        const src = 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/b636e51cb79969dcdba81217c5072172/photo-1596788571133-8d8b42ba200b.jpg';
        return (
            <div className="content-all-boards">

                <div className="boards-page-board-section">
                    <div className="boards-page-board-section-header">
                        <Icon name='clock outline' size='large'>

                        </Icon>
                        <h2>
                            Recenty Viewed
                            </h2>

                    </div>
                    <div>
                        <ul className="boards-page-board-section-list">
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>


                <div className="boards-page-board-section">
                    <div className="boards-page-board-section-header">
                        <Icon name='user outline' size='large'>

                        </Icon>
                        <h2>
                            Personal Boards
                            </h2>

                    </div>
                    <div>
                        <ul className="boards-page-board-section-list">
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>




                <div className="boards-page-board-section">
                    <div className="boards-page-board-section-header">
                        <Icon name='users' size='large'>

                        </Icon>
                        <h2>
                            Hiring
                            </h2>

                    </div>
                    <div>
                        <ul className="boards-page-board-section-list">
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>
                            <li className="boards-page-board-section-list-item">
                                <Link
                                    to='/b/slug'
                                    style={{
                                        background: `url(${src})`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    className='board-tile'>
                                    <span className='board-tile-fade'></span>
                                    <div className='board-tile-details'>
                                        <div title="New SDEs" dir="auto" className="board-tile-details-name">
                                            <p className='board-title-name' >
                                                New SDEs
                                                </p>

                                        </div>
                                        <div className="board-tile-details-sub-container">
                                            <span className="board-tile-options">
                                                <span
                                                    title="Click to star this board. It will show up at the top of your boards list."
                                                    className="board-tile-options-star-icon">
                                                    <Icon name="star outline" />
                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>


        )
    }
}
export default HomeMainContentContainer;