import { Queue } from "./queue"


var log = function (l) {
   //console.log(l);
}



export const breadth = (grid, startNode, endNode) => {
    
    
    const isSameNode = (nodeA, nodeB) =>
    {
        if (nodeA.row === nodeB.row) {
            if (nodeA.column === nodeB.column)
            {
                return true;
                }
        }
        return false;
    }
    const isValidNode = (nodeIndeces, maxRow, maxCol) =>{

        //console.log('in isValidNode')
        //console.log(nodeIndeces)
        if (nodeIndeces[0] < maxRow && nodeIndeces[0] > -1){

            if (nodeIndeces[1] < maxCol && nodeIndeces[1] > -1)
            {
                //console.log('is valid')
                return true;
            }
        }
        //console.log(nodeIndeces + " is false")
        //console.log(maxCol)
        //console.log(maxRow)
        return false;
    }
    const setParent = (grid,parentNode,childNode) => {
        grid[childNode.row][childNode.column].parentNode = grid[parentNode.row][parentNode.column]
        return grid[childNode.row][childNode.column]
    }
    const getNeighbors = (node) => {

        
        //console.log('get neighbors')
        //console.log(node)
        let rowCoord = node.row;
        let colCoord = node.column;
        let maxRow = grid.length;
        let maxCol = grid[0].length;
        //up,down,left,right
        let dirs = [[rowCoord-1,colCoord],[rowCoord+1,colCoord],[rowCoord,colCoord-1],[rowCoord,colCoord+1]]
        let neighbors = []
        
        
        dirs.forEach(dir => {
            
            //console.log(dir)
            if (isValidNode(dir,maxRow,maxCol)) {
                
                
                if (!grid[dir[0]][dir[1]].isWall) {
                    neighbors.push(grid[dir[0]][dir[1]])
                }
            }
        })


        //remove nodes that are walls
        //console.log(neighbors)
        // neighbors.forEach(node => {
            
        //     console.log('for each: '+ node.isWall)
        //     if (node.isWall) { neighbors.pop(node) }
        // })

        // neighbors.filter(node => node.isWall)
        return neighbors
    }

    const createPath = (node) => {
        
       
        let prePath = [];
        let path = [];
        let current = {...node}
        let count = 1;
        while (true) {
            //log(current)
            //console.log({...current})
            path.push({...current})
            if (current.parentNode === null) {
                break;
            }
            current = {...current.parentNode};
        }

        return path.reverse();
    }
    //create required data structures
    let visitedNodesOrdered = [];
    let queue = new Queue();
    let path = []
    
    const checkIfExists = (node) => {
        
        visitedNodesOrdered.forEach(vis => {
            if (isSameNode(node, vis))
            {
                return true;    
            }
        })
        return false;
    }
    //place starting node in queue

    queue.enqueue(startNode);

    //queue loop that pops next node from the front of queue
    let count = 0;
    while (true) {
        count++;
        //console.log('count: ' + count);
        
        //pop next node
        let current = queue.dequeue();
        //console.log({...grid[current.row][current.column]})
        //console.log({ current })
        if (current.parentNode !== null)
        {
            //console.log('coming from ' + current.parentNode.row+" "+current.parentNode.column)
            }
        
        grid[current.row][current.column].visited = true
        if (grid[current.row][current.column].visited)
        {
            //console.log("adding to visitedNodesOrdered")
            //console.log(current.row + " "+current.column)
            visitedNodesOrdered.push(grid[current.row][current.column]);
        }

        // let newNebs = [];
        // for (let i = 0; i < neighbors.length; i++)
        // {
        //     if (grid[neighbors[i].row][neighbors[i].column].visited) {
        //         newNebs.push(neighbors[i])
        //     }
        // }
        
        
        //if endNode found, exit loop and create path
        if (current.row === endNode.row && current.column === endNode.column) {
            
            path = createPath(current);
            //console.log(path)
            break;
            
        }
        //push visited node into visited Nodes list
        //marking as visited as a work around to a bug
        grid[current.row][current.column].visited = true;
        
        let neighbors = getNeighbors(current);
        //let isObject = (node) => (node.row === current.row && node.column === current.column);
        
        // console.log('measuring length of neighbors')
        // console.log(neighbors.length)
        neighbors.forEach((node) => {
            
            //add to queue if node has not been visited
            
            if (!grid[node.row][node.column].visited)
            {
                //console.log({...node})
                
                //console.log('--------')
                let newNode = setParent(grid, current, node)
                //console.log(newNode.row +" "+newNode.column)
                //console.log('adding node to queue '+ node.row +" "+ node.column)
                grid[newNode.row][newNode.column].parentNode = newNode.parentNode
                //console.log(grid[newNode.row][newNode.column])
                //console.log('--------')
                

                queue.enqueue(grid[newNode.row][newNode.column]);
                
                
            }
            
        })
        
        
        //console.log(count + "=====================================")
        
        
    }

    return [path,visitedNodesOrdered]
}