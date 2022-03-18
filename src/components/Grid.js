import Node from './Node';
import { useState, useEffect, useReducer } from 'react';

const Grid = (grid) => {
    
    const [gridMap,setGridMap] = useState(grid.grid)
    
    
    return (<>
        {
            gridMap.map((row, i) => {
                
                return (<div className='gridRow' key = {i}>
                    {
                        
                        row.map((col, j) => {

                            let rowNum = i;
                            let colNum = j;
                            let props = {
                                rowNum,
                                colNum
                            }
                            //console.log(props)
                            return (
                                <Node key={j} {...props}></Node>
                            )

                        })
                    }
                    
                </div>
                )
                
            })
    }
    </>)
}

export default Grid;