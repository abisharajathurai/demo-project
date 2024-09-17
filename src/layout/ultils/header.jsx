import LoginPopup from '@/components/popupSection/LoginPopup';
import { Box, Button, Container, Dialog, DialogTitle, Slide, Stack, Typography } from '@mui/material'
import { useSession, signOut } from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useState } from 'react'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const HeaderSection = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { data: session } = useSession();
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout=()=>{
    signOut({ redirect: false });
  }
  return (
    <div style={{backgroundColor:'#CCCCFF'}}>
      <Container sx={{background:'#CCCCFF',py:1}}>
      <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <Typography sx={{color:'blue'}}>
      HeaderSection
      </Typography>
      {
        session?.user?.id ?
         <Stack direction={'row'}>
           <Typography sx={{display:'flex',alignItems:'center'}}>Welcome { session?.user?.username || session?.user?.name}</Typography>
          <Button  onClick={handleLogout}><LogoutIcon /></Button>
           </Stack>
          :  <Button variant='outlined' sx={{border:'1px solid #B6D0E2'}} onClick={handleClickOpen}>Login</Button>
      }
     
     
      {
        open && (
          <Dialog   open={open}  onClose={handleClose} maxWidth={"sm"}
					fullWidth TransitionComponent={Transition} >
           <DialogTitle>Login</DialogTitle>
           <LoginPopup handleClose={handleClose}/>
          </Dialog>
        )
      }
      </Box>
       </Container>
       </div>
  )
}

export default HeaderSection
