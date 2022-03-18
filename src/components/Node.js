
import { useState, useEffect, useReducer } from 'react';
import { reducer } from '../reducer'

const Node = (props) => {

    
    //console.log(props)
    const [color, setColor] = useState('#949599')//start white
    const [i, setI] = useState(props.rowNum);
    const [j, setJ] = useState(props.colNum);
    const [state, dispatch] = useReducer(reducer);
    //console.log(state.grid)
    //blueish #4f5157

    const handleMouseEnter = () => {
        
        if (color == '#949599')
        {
            setColor('#4f5157')
        }
        else {
            setColor('#949599')
        }
    }

    const handleMouseLeave = () => {
        
    }
    return (<>
        <div onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className='node'
            style={ {backgroundColor: color}}>
            {
               
            }
        </div>
    
    </>)
}


export default Node;