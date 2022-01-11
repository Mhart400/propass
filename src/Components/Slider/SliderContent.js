import React, { Children } from 'react'
import { Box} from '@mui/material'


function SliderContent({width, translate, children, transition}) {
    return (
        <Box sx={{
            transform: `translateX(-${translate}px)`,
            transition: `transform ease-out ${transition}s`,
            height: '100%',
            width: width,
            display: 'flex'
        }}>
            {children}
        </Box>
    )
}

export default SliderContent
