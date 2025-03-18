import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';
function ResumePreview() {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
        borderColor:resumeInfo?.themeColor
    }}
    >
        {  /*Resume Personal Detail*/} 
            <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {  /*Resume  Summery*/} 
            <SummeryPreview  resumeInfo={resumeInfo}/>
        {  /*Resume Experience */} 
        {resumeInfo?.Experience?.length>0&& <ExperiencePreview resumeInfo={resumeInfo} />}
        {  /*Resume Education */} 
        {resumeInfo?.education?.length>0&&   <EducationalPreview resumeInfo={resumeInfo} />}
        {  /*Resume Skills */} 
        {resumeInfo?.skills?.length>0&&    <SkillsPreview resumeInfo={resumeInfo}/>}




    </div>
  )
}

export default ResumePreview