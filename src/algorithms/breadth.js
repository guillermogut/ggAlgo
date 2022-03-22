import { Queue } from "./queue"






export const breadth = (grid, startNode, endNode) => {
    
    
    const getNeighbors = (node) => {
        let rowCoord = node.row;
        let colCoord = node.column;
        
        let neighbors = []
        try {
            let up = grid[rowCoord-1][colCoord];
            neighbors.push(up)
        }
        catch (error) {
            //for debugging
            //console.log(error)
            //console.log(up)
        }

        try {
            let down = grid[rowCoord+1][colCoord];
            neighbors.push(down)
        }
        catch (error) {
            //for debugging
            //console.log(error)
            //console.log(down)
        }
        try {
            let left = grid[rowCoord][colCoord-1];
            neighbors.push(left)
        }
        catch (error) {
            //for debugging
            //console.log(error)
            //console.log(left)
        }

        try {
            let right = grid[rowCoord][colCoord+1];
            neighbors.push(right)
        }
        catch (error) {
            //for debugging
            //console.log(error)
            //console.log(right)
        }
        //remove nodes that are walls
        neighbors.forEach((node) =>{ if(node.isWall ){neighbors.pop(node)}})
        return neighbors
    }

    const createPath = (node) => {
        let prePath = [];
        let path = [];
        let current = node
        while (true) {
            prePath.push(current)
            if (current.parentNode === null) {
                break;
            }
            current = node.parentNode;
        }

        path = prePath.reverse();
        return path;
    }
    //create required data structures
    let visitedNodesOrdered = []
    let queue = new Queue;
    let path = []
    
    //place starting node in queue

    queue.enqueue(startNode);

    //queue loop that pops next node from the front of queue

    while (true) {
        //pop next node
        let current = queue.dequeue();
        //if endNode found, exit loop and create path
        if (current === endNode) {
            path = createPath(current);
            break;
            
        }
        //push visited node into visited Nodes list
        visitedNodesOrdered.push(current);
        //get neighbors
        let neighbors = getNeighbors(current);

        neighbors.map((node) => {

            //add node to queue and set parentNode if not in visitedNodesOrdered
            if (!visitedNodesOrdered.includes(node))
            {
                node.parentNode = current;
                queue.enqueue(node);
            }
            
        })

    }
}