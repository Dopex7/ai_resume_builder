import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModel'; // Import the function
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

  // Function to generate summary using AI
  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast.error("Please enter a job title first.");
      return;
    }
  
    setLoading(true);
  
    // Define the prompt for generating summaries
    const prompt = `Job Title: ${resumeInfo.jobTitle},Imagine ur creating urself a resume for a job title. Provide a list of summary descriptions for three experience levels: Fresher, Mid-Level, and Experienced, each in 6-7 lines. Format the response as a single valid JSON array with fields: experience_level and summary.`;  
    try {
      const response = await AIChatSession(prompt, 'json'); // Get the AI response
      console.log("Raw AI Response:", response); // Log the raw response for debugging
  
      // Check if the response is an error message
      if (typeof response === 'string' && response.startsWith("Failed to")) {
        toast.error("AI failed to generate a response. Please try again.");
        return;
      }
  
      // Validate the response
      if (Array.isArray(response)) {
        setAiGeneratedSummeryList(response); // Use the response directly
      } else {
        toast.error("Invalid AI response format.");
      }
    } catch (error) {
      console.error("Failed to generate summary:", error);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to save the summary
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data={
      data:{
        summery:summery
      }
    }
    GlobalApi.UpdateResumeData(params?.resumeId,data).then(resp=>{
      console.log(resp);
      enabledNext(true);
      setLoading(false);
      toast("Summary saved successfully!")
  },(error)=>{
      setLoading(false);
  })

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
              className='border-primary text-primary flex gap-2'
              disabled={loading} // Disable the button while loading
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
              onClick={() => setSummery(item.summary)} // Use item.summary directly
              className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'
            >
              <h2 className='font-bold my-1 text-primary'>
                Level: {item.experience_level} {/* Use item.experience_level directly */}
              </h2>
              <p className='text-gray-700'>{item.summary}</p> {/* Use item.summary directly */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;