import React from 'react'
import { Placeholder } from 'semantic-ui-react'

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
                    <div>
                        <div style={{ maxWidth: 1400, display: 'flex', flexWrap: 'wrap', height: 144, justifyContent: 'spaceBetween', margin: '0 auto', marginBottom: 48 }}>
                            <Placeholder style={{ height: 144, marginTop: 0, width: '28%', marginRight: 16 }}>
                                <Placeholder.Image />
                            </Placeholder>
                            <Placeholder style={{ height: 144, marginTop: 0, width: '28%', marginRight: 16 }}>
                                <Placeholder.Image />
                            </Placeholder>
                            <Placeholder style={{ height: 144, marginTop: 0, width: '28%' }}>
                                <Placeholder.Image />
                            </Placeholder>
                        </div>

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
                            <Placeholder.Line />
                        </Placeholder>
                    </div>

                )
            })
        }



    </>
)