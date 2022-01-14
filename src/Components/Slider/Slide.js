import React from 'react'
import { Box } from '@mui/material'

function Slide({content}) {
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            backgroundImage: `url('${content}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'lelt',
        }}>
            
        </Box>
    )
}

export default Slide
