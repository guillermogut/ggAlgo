import { Queue } from "./queue"


export const AStar = (grid, startNode, endNode) => {

    const h = (node) = {
        
    }
    const calculateDistance = (node) => {
        // distance formula returning an integer
        return parseInt(Math.sqrt(Math.pow(Math.abs(node.row- endNode.row)) + Math.pow(Math.abs(node.column- endNode.column))), 10)
        
    }
    const getPathCost = (path) => {
        let pathLength = 0;
        path.forEach(node => {
            pathLength++;
        })
        return pathLength;
    }
    const makeNode = (row,column) =>{
    return {row,column,isWall: false,isStart:false,isEnd:false,cost:1, parentNode:null, visited:false,animate:false}

    }
    const setParent = (grid,parentNode,childNode) => {
        grid[childNode.row][childNode.column].parentNode = grid[parentNode.row][parentNode.column]
        return grid[childNode.row][childNode.column]
    }
    const initalizeGrid = () => {
        let grid = [];
        for (let i = 0; i < 4; i++){
        let row=[]
    
            for (let j = 0; j < 4; j++){
                row.push(makeNode(i, j));
            }
            grid.push(row);
        }

        return grid;
    }
    const isValidNode = (nodeIndeces, maxRow, maxCol) =>{

        if (nodeIndeces[0] < maxRow && nodeIndeces[0] > -1){

            if (nodeIndeces[1] < maxCol && nodeIndeces[1] > -1)
            {
                
                return true;
            }
        }
        return false;
    }
    const getNeighbors = (node) => {

        
        let rowCoord = node.row;
        let colCoord = node.column;
        let maxRow = grid.length;
        let maxCol = grid[0].length;
        
        let dirs = [[rowCoord-1,colCoord],[rowCoord+1,colCoord],[rowCoord,colCoord-1],[rowCoord,colCoord+1]]
        let neighbors = []
        
        
        dirs.forEach(dir => {
            if (isValidNode(dir,maxRow,maxCol)) {
                
                
                if (!grid[dir[0]][dir[1]].isWall) {
                    neighbors.push(grid[dir[0]][dir[1]])
                }
            }
        })


        return neighbors
    }
    const createPath = (node) => {
        
       
        let prePath = [];
        let path = [];
        let current = grid[node.row][node.column]
        let count = 1;
        while (true) {
            //log(current)
            //console.log({...current})
            path.push(current)
            if (current.parentNode === null) {
                break;
            }
            current = current.parentNode;
        }

        return path.reverse();
    }

    let queue = new Queue();
    let path = [];
    let visitedNodesOrdered = [];

    //add first node to queue
    queue.enqueue(grid[startNode.row][startNode.column])


    let current = null;
    console.log(grid)
    while (true)
    {   
        current = queue.dequeue();
        
        
        grid[current.row][current.column].visited = true;
        visitedNodesOrdered.push(grid[current.row][current.column]);
        
        if (current.row === grid[endNode.row][endNode.column].row && current.column ===grid[endNode.row][endNode.column].column) {
            console.log("found end node")
            //create path here
            path = createPath(current)
            break;
        }

        let neighbors = getNeighbors(current)

        neighbors.forEach(node => {
            //console.log(node.visited)
            
            if (!node.visited && !queue.includes(node,grid)) {
                
                setParent(grid,current,node)
                queue.enqueue(node)
            }

        })

    }



    return [path,visitedNodesOrdered]
}