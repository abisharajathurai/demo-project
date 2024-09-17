
import { Button, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '@/redux/services/formServices';
import Link from 'next/link';
import { toast } from 'sonner';

export default function HomeProduct({products}) {
  const router = useRouter();
  const dispatch = useDispatch()
  // edit
  const handleClick = (id) => {
    router.push(`/post?id=${id}`);
  };
  // Delete
  const handleDelete=async(id)=>{
    try{
      const res= await dispatch(deleteProduct(id)).unwrap();
      console.log(res,"DeleteProduct")
      toast.success("Successfully Deleted")
    }catch(err){
      console.log(err)
    }
  }
  const handleCreate=()=>{
    router.push('/post');
  }
  return (
    <>
      <h4 style={{marginTop:'10px',color:'blue'}}>Get Method using Server Side</h4>
    {
products?.posts?.map((item)=>(
  <Grid container key={item.id}>
    <Grid item md={6}>
  <h6   style={{marginTop:'8px',color:'blue'}} >{item.title}</h6>
  </Grid>
  <Grid item md={6}>
  <Stack  direction={'row'} justifyContent={'end'}>
  <Button sx={{cursor:'pointer'}} onClick={()=>handleDelete(item.id)}><DeleteIcon/></Button>
  <Button sx={{cursor:'pointer'}} onClick={() => handleClick(item.id)}>< ModeEditIcon/></Button>
  <Button sx={{cursor:'pointer'}} onClick={handleCreate}>< CreateNewFolderIcon/></Button>
  </Stack>
  </Grid>
  </Grid>
))

    }
    </>
  )
}

