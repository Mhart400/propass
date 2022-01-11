import React from 'react'
import { Box} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Arrow({direction, handleClick}) {
    
    const align = direction === 'left' ? 'left: 25px' : 'right: 25px'


    return (
        <Box
            onClick={handleClick}
            sx={{
                display: 'flex',
                position: 'absolute',
                top: '50%',
                left: direction === 'left' ? '25px' : '',
                right: direction === 'right' ? '25px' : '',
                height: '50px',
                width: '50px',
                justifyContent: 'center',
                background: 'white',
                opacity: '50%',
                borderRadius: '50%',
                cursor: 'pointer',
                alignItems: 'center',
                transition: 'transform ease-in 0.1s',
                '&:hover': { transform: 'scale(1.1)'},
                img: { transform: `translateX(${direction === 'left' ? '-2px' : '2px'})`,
                  '&:focus': {outline: 0}},
                }}
        >
            {direction === 'right' ? <ArrowForwardIosIcon size='large' /> : <ArrowBackIosIcon size='large' />}
            
        </Box>
    )
}

export default Arrow
