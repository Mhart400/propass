import React from 'react'
import { Box } from '@mui/material'

function Dot({active}) {
    return (
        <Box 
            component='span'
            sx={{
                padding: '5px',
                mx: 1,
                marginRight: '5px',
                cursor: 'pointer',
                borderRadius: '50%',
                background: active ? 'black' : 'white',
            }}
        />
    )
}

function Dots({slides, activeIndex}) {
    return (
        <Box
        sx={{
            position: 'absolute',
            bottom: '25px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {slides.map((slide, i) => (
                <Dot key={slide} active={activeIndex === i} />
            ))}
        </Box>
    )
}


export default Dots
