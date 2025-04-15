import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModel'; 
import GlobalApi from '../../../../../service/GlobalApi';

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || '');
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (summery) {
      setResumeInfo({ ...resumeInfo, summery });
    }
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast.error("Please enter a job title first.");
      return;
    }

    setLoading(true);

    const prompt = `Job Title: ${resumeInfo.jobTitle},Imagine ur creating urself a resume for that job. Provide a list of summary descriptions for three experience levels: Fresher, Mid-Level, and Experienced, each in 6-7 lines, format the response as a single valid JSON array with fields: experience_level and summary.`;  

    try {
      const response = await AIChatSession(prompt, 'json'); 
      console.log("Raw AI Response:", response);

      if (Array.isArray(response)) {
        setAiGeneratedSummeryList(response);
      } else {
        toast.error("Invalid AI response format. Expected an array.");
        console.error("Unexpected AI response:", response);
      }
      
    } catch (error) {
      console.error("Failed to generate summary:", error);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summery: summery
      }
    };

    GlobalApi.UpdateResumeData(params?.resumeId, data).then(resp => {
      console.log(resp);
      enabledNext(true);
      setLoading(false);
      toast("Summary saved successfully!");
    }, (error) => {
      setLoading(false);
      toast.error("Error saving summary.");
    });

    if (!summery) {
      toast.error("Summary cannot be empty.");
      return;
    }
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add a summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label htmlFor='summary'>Add Summary</label>
            <Button
              variant='outline'
              onClick={GenerateSummeryFromAI}
              type='button'
              size='sm'
              className='border-primary text-primary flex gap-2 cursor-pointer'
              disabled={loading} 
            >
              {loading ? (
                <LoaderCircle className='h-4 w-4 animate-spin' />
              ) : (
                <>
                  <Brain className='h-4 w-4' /> Generate from AI
                </>
              )}
            </Button>
          </div>
          <Textarea
            id='summary'
            className='mt-5'
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className='mt-2 flex justify-end'>
            <Button type='submit' disabled={loading} className='cursor-pointer'>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList.length > 0 && (
        <div className='my-5'>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item.summary)}
              className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'
            >
              <h2 className='font-bold my-1 text-primary'>
                Level: {item.experience_level} 
              </h2>
              <p className='text-gray-700'>{item.summary}</p> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
