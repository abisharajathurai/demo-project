import { Box, Button, Container, Dialog, DialogTitle, Slide, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextFormField from '../reusableFields/TextFormField'
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signIn } from "next-auth/react";
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
const  OtpPopup = dynamic(() => import('./OtpPopup'));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const LoginPopup = (props) => {
const {handleClose}=props;
const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloses = () => {
    setOpen(false);
  };

    const form = useForm();
    const dispatch=useDispatch()
      const {
          handleSubmit,
          
      } = form;
      const handleData =async (value)=>{
try{
const res= await signIn("authCredentials",{
    redirect: false,
    ...value,
});
toast.success("Successfully Login")
handleClose();
console.log(res,"loging")
}catch(err){
    console.log(err)
    toast.error('something went wrong')
}
      }
  return (
   
     <Container>
        <FormProvider {...form}>
            <Box  component={'form'} onSubmit={handleSubmit(handleData)}>
        <TextFormField name="username" label="Username" placeholder="Enter username" />
        <Box>
        <TextFormField name="password" label="Password" placeholder="Enter password" type='password'/>
        </Box>
        <Box sx={{alignItems:'center',display:'flex',justifyContent:'center',flexDirection:'column',mb:2}}>
        <Button type='submit' variant='outlined' sx={{my:1}} >sign In</Button>
        <Typography>or</Typography>
        <Stack direction={'row'} gap={1} my={2}>
        <Button type='submit' variant='outlined'  onClick={() => {
                signIn('google', {
                  redirect: false,
                });
              }} >Login with Google
              </Button>
              <Button variant='outlined' onClick={handleClickOpen }>Mobile Login</Button>
        </Stack>
        </Box>
        </Box>
        </FormProvider>
        {
          open && (
            <Dialog open={open}  onClose={handleCloses} maxWidth={"sm"} TransitionComponent={Transition}>
             <DialogTitle>Otp Login</DialogTitle>
             <OtpPopup handleClose={handleCloses} handleMain={handleClose}/>
            </Dialog>
          )

        }
     </Container>
 
  )
}

export default LoginPopup

