import { Button } from '@/components/ui/button'
import Header from '@/components/ui/custom/Header'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import GlobalApi from '../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() {

    const [resumeInfo,setResumeInfo]=useState();
    const {resumeId}=useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[])
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload=()=>{
        window.print();
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div id='no-print'>
        <Header />
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <h2 className='text-center text-2xl font-medium'>Congrats! Your Beutiful AI Generated Resume is Finished</h2>
            <p className='text-center text-gray-400'>Now You Are Ready to download your resume you can share it</p>
            <div className='flex justify-between px-44 my-10'>
                <Button onClick={HandleDownload} className={'cursor-pointer'}>Download</Button>
                <RWebShare
        data={{
          text: "Hello Everyone, This is my new resume open to see it ",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" Resume",
        }}
        onClick={() => console.log("shared successfully!")} >                
        <Button className={'cursor-pointer'}>Share</Button>
                </RWebShare>

            </div>
            </div>

        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area">
                <ResumePreview/>
            </div>
            </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume