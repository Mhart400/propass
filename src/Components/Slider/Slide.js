import React from 'react'
import { Box } from '@mui/material'

function Slide({content}) {
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            backgroundImage: `url('${content}')`,
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left-middle',
        }}>
            
        </Box>
    )
}

export default Slide
