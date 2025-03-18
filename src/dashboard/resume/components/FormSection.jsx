import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

function FormSection() {
    const [activeFormIndex,setActiveFormIndex]=useState(1);
    const [enableNext, setEnableNext] = useState(true);
    const {resumeId}=useParams();

  return (
    <div>

        <div className='flex justify-between items-center'>
          <div className='flex gap-2'>
            <Link to={"/dashboard"}>
          <Button className={"cursor-pointer"}><Home/></Button>
          </Link>
              <ThemeColor/>
            </div>
            <div className='flex gap-2'>
                {activeFormIndex>1&&<Button size="sm" className="cursor-pointer"
                onClick={() => setActiveFormIndex(activeFormIndex - 1)}

                > <ArrowLeft/> </Button>}
                <Button 
                disabled={!enableNext}
                className="flex gap-2 cursor-pointer" size="sm" 
                onClick={() => setActiveFormIndex(activeFormIndex + 1)}

                >
                    Next <ArrowRight/></Button>
            </div>
        </div>
        {/*Personal detail*/}
        {activeFormIndex == 1 ? 
        <PersonalDetail enabledNext={(v)=>setEnableNext(v)} /> :
         activeFormIndex==2?
          <Summery enabledNext={(v)=>setEnableNext(v)} /> 
          :activeFormIndex==3? 
            <Experience/>
          :activeFormIndex==4?
          <Education/>
          :activeFormIndex==5?
          <Skills/>
          :activeFormIndex==6?
          <Navigate to={'/my-resume/'+resumeId+"/view"}/>
          : null}

                    
        {  /*Resume Experience */} 
            
        {  /*Resume Education */}

        {  /*Resume Skills */}

    </div>
  )
}

export default FormSection