import React from 'react'
import { Placeholder } from 'semantic-ui-react'

export const PlaceholderImageRectangular = (num) => (
    <>
        {
            Array(num).fill(null).map(() => {
                return (
                    <div style={{ display: 'flex', flexWrap: 'wrap', maxHeight: 96, marginBottom: 48 }}>
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