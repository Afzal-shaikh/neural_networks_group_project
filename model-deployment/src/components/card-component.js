import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function ModelCard({...props}) {
    const [active, setActive] = React.useState('1');

    const RenderModel=({name,color})=>{

        const onModelClick =()=>{
            setActive(name)
            props.handleModelClick(name)
        }

        return (
        <div className={`${active == name?'card-style active-card-style':'card-style'}`} style={{borderColor:color,color:color}} onClick={onModelClick}>
            <Typography sx={{ fontSize: 24 }}  gutterBottom>
                {name}
            </Typography>
        </div>)
    }

    const renderCard = (model) => {
        return(
            <RenderModel
                name ={model.name}
                color = {model.color}
                key={model.name}
                >
            </RenderModel>
        )
    }
  return (
        <React.Fragment>
            {props.title && <h1 style={{textAlign:'center'}}>Choose the model</h1>}
            <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
                {props.data && props.data.map(renderCard)}
            </div>
        </React.Fragment>
  );
}