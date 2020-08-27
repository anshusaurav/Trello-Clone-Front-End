import React from 'react'
import { Placeholder } from 'semantic-ui-react'
import LoaderFull from './../../images/loader-full.gif'
import LoaderFullPage from './../../images/loader-full-page.gif'

export const PlaceholderImageRectangular = (num) => (
    <>
        {
            Array(num).fill(null).map(() => {
                return (
                    <div style={{ display: 'flex', flexWrap: 'wrap', maxHeight: 96, marginBottom: 48, }}>
                        <Placeholder style={{ maxHeight: 96, marginTop: 0, width: '28%', marginRight: 16 }}>
                            <Placeholder.Image />
                        </Placeholder>
                        <Placeholder style={{ maxHeight: 96, marginTop: 0, width: '28%', marginRight: 16 }}>
                            <Placeholder.Image />
                        </Placeholder>
                        <Placeholder style={{ maxHeight: 96, marginTop: 0, width: '28%' }}>
                            <Placeholder.Image />
                        </Placeholder>
                    </div>

                )
            })
        }



    </>
)


export const PlaceholderImageRectangularTeamBoards = (num) => (
    <>
        {
            Array(num).fill(null).map(() => {
                return (
                    <div style={{
                        maxWidth: 1400,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        height: 144,
                        justifyContent: 'spaceBetween',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: 48
                    }}>
                        <Placeholder style={{ height: 144, marginTop: 0, }}>
                            <Placeholder.Image />
                        </Placeholder>
                        <Placeholder style={{ height: 144, marginTop: 0 }}>
                            <Placeholder.Image />
                        </Placeholder>
                        <Placeholder style={{ height: 144, marginTop: 0 }}>
                            <Placeholder.Image />
                        </Placeholder>
                    </div>

                )
            })
        }



    </>
)


export const PlaceholderSingleSmallRectangular = (num) => (
    <>
        {
            Array(num).fill(null).map(() => {
                return (
                    <div style={{ display: 'flex', jutifyContent: 'center', maxHeight: 30, marginBottom: 12 }}>
                        <Placeholder style={{ maxHeight: 30, marginTop: 0, width: '90%' }}>
                            <Placeholder.Image style={{ height: 30 }} />
                        </Placeholder>
                    </div>

                )
            })
        }



    </>
)

export const FullPageImageLoader = () => {
    return <div style={{ display: 'flex', height: 'calc(100vh - 54px)', justifyContent: 'center', alignItems: 'center', opacity: '0.125' }}>
        <img src={LoaderFull} alt="logo-loader"></img>
    </div>
}

export const TeamMembersLoader = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '0.125' }}>
        <img src={LoaderFullPage} alt="logo-loader"></img>
    </div>
}