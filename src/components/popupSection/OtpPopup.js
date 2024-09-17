import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import { Button, Container, FormLabel, Stack, TextField } from '@mui/material';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
const  MuiOtpInput = dynamic(() => import('mui-one-time-password-input'), { ssr: false });

const OtpPopup = (props) => {
    const {handleClose,handleMain}=props;
    const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
 

  const handleSendOtp = (e) => {
    setOtpSent(true);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
  

    const result = await signIn("otpLogin", {
      redirect: false,
      phoneNumber,
      otp,
    });
    toast.success("mobile login success")
    handleClose();
    handleMain();
    if (!result.ok) {
        console.log('error')
        toast.error("mobile login failed")
      }
  
}
const handleChange = (newValue) => {
    setOtp(newValue)
  }

  return (
    <Container>
      {!otpSent ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack direction={'column'}>
            <FormLabel sx={{mb:1}}> Enter Phone Number:</FormLabel>
            <TextField
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              size='small'
              fullWidth
            />
          </Stack>
          <Button style={{marginBlock:'10px'}}
           onClick={handleSendOtp}
           disabled={!phoneNumber.trim()}
           >
            Send OTP
          </Button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <Stack direction={'column'}>
            <FormLabel sx={{mb:1}}>Enter OTP:</FormLabel>
            <MuiOtpInput
              value={otp}
              onChange={handleChange}
              length={4}
              TextFieldsProps={{ placeholder: '_' }}
              sx={{'& .MuiOtpInput-TextField':{
                width:'50px',
                height:'50px'
              }}}
            />
          </Stack>
        
          <Button type="submit" style={{marginBlock:'10px'}}   disabled={otp.length < 4}>Verify OTP</Button>
        </form>
      )}
      </Container>
   

  )
}

export default OtpPopup
