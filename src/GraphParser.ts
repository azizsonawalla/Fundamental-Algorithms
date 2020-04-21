import fs from 'fs'

export interface Graph {
    adjacency_matrix: Array<Array<number>>
    vertices: Array<string>
}

/**
 * Reads a graph input from a text file and returns an adjacency matrix
 * @param path path to the text file
 */
export function readGraph(path: string): Graph {
    let file: string = fs.readFileSync(path, 'utf-8')
    let fileLines: Array<string> = file.split("\n")

    // First line is vertex names
    let vertexNames: Array<string> = fileLines[0].split(",")
    let vertexNamesCleaned: Array<string> = []
    for (let name of vertexNames){
        let cleanedName = name.trim().replace("\\.", "")
        if (cleanedName.length > 0) {
            vertexNamesCleaned.push(cleanedName)
        }
    }

    let adjacency_matrix: Array<Array<number>> = []
    for (let i = 1; i < fileLines.length; i++) {
        let adj_matrix_row: Array<number> = []
        let line: string = fileLines[i]
        let chars: Array<string> = line.split(",")
        // First char is vertex name
        for (let j = 1; j < chars.length; j++) {
            let cleanedChar = chars[j].trim().replace("\\.", "")
            let parsedNum = Number(cleanedChar)
            adj_matrix_row.push(parsedNum)
        }
        adjacency_matrix.push(adj_matrix_row)
    }

    return {
        adjacency_matrix: adjacency_matrix, 
        vertices: vertexNamesCleaned
    }
}