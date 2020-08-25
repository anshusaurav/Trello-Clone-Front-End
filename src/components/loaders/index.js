import React from 'react'
import { Placeholder } from 'semantic-ui-react'

export const PlaceholderImageRectangular = (num) => (
    <>
        {
            Array(num).fill(null).map((row, index, arr) => {
                return (
                    <div style={{ display: 'grid', maxHeight: 96, gridTemplateColumns: 'repeat(3, 1fr)', gridGap: 16, marginBottom: 48 }}>
                        <Placeholder style={{ maxHeight: 96, marginTop: 0 }}>
                            <Placeholder.Image />
                        </Placeholder>
                        <Placeholder style={{ maxHeight: 96, marginTop: 0 }}>
                            <Placeholder.Image />
                        </Placeholder>
                        <Placeholder style={{ maxHeight: 96, marginTop: 0 }}>
                            <Placeholder.Image />
                        </Placeholder>
                    </div>

                )
            })
        }



    </>
)
