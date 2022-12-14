import React from 'react';
import { useFormik } from 'formik';
import {TextField,Grid,InputLabel,Button,MenuItem} from '@mui/material';

const CustomYearInput = ({ inputRef, ...rest }) => (
  <input  ref={inputRef} {...rest} min="1900" max="2050" step="1" />
);

 export default function FormComponent({...props}){
   const {onSubmit,initialValues,fields} = props

   const formik = useFormik({
     initialValues: initialValues,
     onSubmit: values => {
      onSubmit(values);
     },
   });

   const renderSelect = (option,index) => (
    <MenuItem key={index} value={option}>
      {option}
    </MenuItem>
  )

   const renderField = (field,index) => (
    <Grid key={index} item xs={12} sm={field.gridItem} md={field.gridItem}>
        <InputLabel>
            {field.label}
        </InputLabel>
        {field.type === 'year'?
          <TextField 
            type="number" 
            name={field.name}         
            placeholder={field.placeholder}
            fullWidth       
            onChange={formik.handleChange}
            InputProps={{
              inputComponent: CustomYearInput
            }}     
          />:
          <TextField 
              name={field.name}
              type= {field.type}
              onChange={formik.handleChange}
              fullWidth
              select={field.type ==='select'? true:false}
              required
              >
              {field.type ==='select' && field.options.map(renderSelect)}
          </TextField>}
    </Grid>
  )

   return (
     <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {fields && fields.length && fields.map(renderField)} 
        </Grid>
        <div className='btn-container'>
          <Button variant="contained" type="submit">{props.btnText}</Button>
          {props.cancelText &&<Button variant="contained" onClick={props.onCancel}>{props.cancelText}</Button>}
        </div>
     </form>
   );
 };