import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useParams } from 'react-router';
import GlobalApi from '../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetail({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const params=useParams();
    const [formData,setFormData]=useState();
    const [loading,setLoading]=useState(false);
    
    useEffect(()=>{
        console.log("---",resumeInfo)

    },[])
    const handleInputChange=(e)=>{
        enabledNext(false);
        const{name, value}=e.target;
        
        
        setFormData({
            ...formData,
            [name]:value
        })


        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true);
 
        const data ={
            data:formData
        }
        GlobalApi.UpdateResumeData(params?.resumeId,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details Updated");


        },(error)=>{
          setLoading(false);  
        });
    }

  return (
    <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10'>
        <h2 className='
        font-bold text-lg'>
            Personal Detail
        </h2>

        <p>
            Get Started with basic information
        </p>

        <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
            <div>
                <label htmlFor="" className='text-sm'>
                    First Name 
                    <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}/>
                </label>
            </div>
            <div>
                <label htmlFor="" className='text-sm'>
                    Last Name 
                    <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange}/>
                </label>
            </div>

            <div className='col-span-2'>
                <label htmlFor="" className='text-sm'>
                    Job Title 
                    <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange}/>
                </label>
            </div>
            <div className='col-span-2'>
                <label htmlFor="" className='text-sm'>
                    Address
                    <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange}/>
                </label>
            </div>
            <div>
                <label htmlFor="" className='text-sm'>
                    Phone Number
                    <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange}/>
                </label>
            </div>

            <div>
                <label htmlFor="" className='text-sm'>
                    Email
                    <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange}/>
                </label>
            </div>
            
        </div>
        <div className='mt-3 flex justify-end'>
                <Button type="submit"
                className='cursor-pointer'
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
        </div>
        </form>
    </div>
  )
}

export default PersonalDetail