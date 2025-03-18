import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnUnderline,
    Editor,
    EditorProvider,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../service/AIModel'; // Import the AI function
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [value, setValue] = useState(defaultValue);
    const [loading, setLoading] = useState(false);

    const GenerateFromAI = async () => {
        if (!resumeInfo.experience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }
    
        // Define the prompt for generating bullet points in HTML format
        const prompt = `position titile: ${resumeInfo.experience[index].title}. Depends on position title give me 3-4 bullet points for my experience in resume (Please do not add experince level and make it just normal text), give me result in normal text.`;
    
        try {
            setLoading(true); // Show loading state
            const response = await AIChatSession(prompt, 'html'); // Request HTML format
            console.log('Raw AI Response:', response); // Log the raw response
    
            // Remove the prompt and any additional text from the response
            const cleanResponse = response
            .replace(new RegExp(prompt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '') // Escape special characters in the prompt
            .replace(/As брvozamn/, '') // Remove unwanted text
            .trim(); // Keep bullet points
        
        
    
            console.log('Cleaned AI Response:', cleanResponse); // Log the cleaned response
    
            // Update the editor value with the cleaned HTML response
            setValue(cleanResponse);
    
            // Notify parent component
            if (onRichTextEditorChange) {
                onRichTextEditorChange({ target: { value: cleanResponse } });
            }
        } catch (error) {
            console.error('Failed to generate bullet points:', error);
            toast.error('Failed to generate bullet points. Please try again.');
        } finally {
            setLoading(false); // Hide loading state
        }
    };
    return (
        <div>
            <div>
                <div className='flex justify-between my-2'>
                    <label className='text-xs'>Summary</label>
                    <Button
                        variant='outline'
                        disabled={loading}
                        size='sm'
                        className='flex gap-2 border-primary text-primary'
                        onClick={GenerateFromAI} // Trigger the AI function
                    >
                         {loading?
                      <LoaderCircle className='animate-spin'/>:  
                     <>
                <Brain className='h-4 w-4'/> Generate from AI 
                     </>
                     }
                    </Button>
                </div>
            </div>
            <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />

                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;