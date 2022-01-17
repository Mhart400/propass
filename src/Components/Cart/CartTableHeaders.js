import React from 'react'
import { Box, Divider, Grid, Typography} from '@mui/material'

function CartTableHeaders() {
    return (
        <Box sx={{visibility: {sm: 'visible', xs: 'hidden'}}}>
        <Grid container columns={20} sx={{px: 1}}>
            <Grid sm={6} xs={9}>
                <Typography variant='subtitle2' sx={{color: 'text.disabled'}} >Studio</Typography>
            </Grid>
            <Grid sm={12} xs={11}>
                <Typography variant='subtitle2' sx={{color: 'text.disabled'}} >Session Details</Typography>
            </Grid>
            <Grid xs={20} sm={2} sx={{display: 'flex', justifyContent: 'flex-end'}} >
                <Typography variant='subtitle2' sx={{color: 'text.disabled'}} >Price</Typography>
            </Grid>
        </Grid>
            <Divider variant='fullWidth' />
        </Box>
    )
}

export default CartTableHeaders
