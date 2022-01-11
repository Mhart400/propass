import React from 'react'
import { Box } from '@mui/material'

function Slide({content}) {
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            backgroundImage: `url('${content}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}>
            
        </Box>
    )
}

export default Slide
