

import { createProduct, singleProduct, updateProduct } from '@/redux/services/formServices';
import { wrapper } from '@/redux/store';
import { Box, Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
const TextFormField = dynamic(() => import('@/components/reusableFields/TextFormField'));

export default function PostMethod({singleProducts}) {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const dispatch=useDispatch()
    const router = useRouter();
    const form = useForm({
      defaultValues: {
        title: singleProducts?.title || '',
        userId: singleProducts?.userId || '',
      },
    });
    const {
		handleSubmit,
    reset
	} = form;
 

  const handleData = async (values) => {
    try {
      if (!id) {
        const res = await dispatch(createProduct(values)).unwrap();
        console.log(res, 'CreateProduct');
        toast.success("successfully Created")
        reset();
        router.push('/')
      } else {
        const parameters = {
          formData:values,
          id: id,
      };
        const response = await dispatch(updateProduct(parameters)).unwrap(); 
        console.log(response, 'EditProduct');
        toast.success("Successfully Edited")
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  };
  return (
    <>
    <h3 style={{marginTop:'10px'}}>Post method</h3>
    <div style={{marginTop:'10px',marginBottom:'15px'}}>
    <FormProvider {...form}>
    <Box component={'form'} onSubmit={handleSubmit(handleData)} width={'40%'}>
        <Box>
      <TextFormField name="title" label='Title' placeholder="Enter title"/>
      </Box>
      <Box my={1}>
      <TextFormField name="userId" label="userId" placeholder="Enter userId"/>
      </Box>
    
      <Button  type='submit' variant='contained'>{id ? 'Edit' :'Create'}</Button>
    </Box>
    </FormProvider>
    </div>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const {id}= ctx.query;
    let singleProducts = [];
if(id){
  try {
    const response = await store.dispatch(singleProduct(id)).unwrap();
    singleProducts = response;
  } catch (error) {
    console.error(error);
  }
}
    return {
      props: { singleProducts }||[],
    };
  }
);