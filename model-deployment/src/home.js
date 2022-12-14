import * as React from 'react';
import FormComponent from './components/form-component';
import fields from './utils/formFields';
import Progress from './components/progress';
import {predict} from './api'
import './App.css';

const initialValues = {
  First_Term_Gpa : "",
  Second_Term_Gpa : "", 
  First_Language : "",
  Funding : "",
  School : "",
  FastTrack : "",
  Coop : "",
  Residency : "",
  Gender : "",
  Previous_Education : "",
  Age_Group : "",
  High_School_Average_Mark : "",
  Math_Score : "",
  English_Grade : ""
}

export default function Home() {
  const [loading,setLoader] = React.useState(false);
  const [predictedOutput,setOutput] = React.useState('');

  const submitData = async(values)=>{
    setLoader(true)
    let predictedTarget = await predict(values)
    if(predictedTarget && predictedTarget.prediction){
      let output = parseInt(predictedTarget.prediction[0])
      setOutput(output.toString())
    }  
    setLoader(false)
  }


  return (
          <div className='root-container'>
            <FormComponent 
              initialValues={initialValues} 
              fields={fields} 
              onSubmit={submitData} 
              btnText='Check Persistence'
            /> 
            {!predictedOutput == ''?
              <h2 className='predicted'>Predicted Output: {predictedOutput}{predictedOutput === '1'?'(Student Persisted)':'(Student Did Not Persist)'}</h2>
             :
            null} 
            {loading &&<div className='loader'>
              <Progress/>
            </div>}
          </div>
  );
}