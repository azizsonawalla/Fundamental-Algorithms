import fs from 'fs'
import { Graph } from './Graph'

/**
 * Reads a graph input from a text file and returns an adjacency matrix
 * @param path path to the text file
 */
export function readGraph(path: string): Graph {
    let file: string = fs.readFileSync(path, 'utf-8')
    let fileLines: Array<string> = file.split("\n")

    // First line is vertex names and weights
    let verticesLine = fileLines[0]
    let vertexNameValues: Array<string> = verticesLine.split(",")
    let vertices: { [ index: string ]: number} | Array<string>
    if (verticesLine.indexOf("=") > -1) { // vertex weights specified
        vertices = {}
        for (let nameValuePair of vertexNameValues){
            let cleanedString = cleanString(nameValuePair)
            if (cleanedString.length > 0) {
                let vertexName = cleanString(nameValuePair.split("=")[0])
                let vertexWeight = Number(nameValuePair.split("=")[1])
                vertices[vertexName] = vertexWeight
            }
        }
    } else { // only names specified
        vertices = []
        for (let name of vertexNameValues){
            let cleanedName = cleanString(name)
            if (cleanedName.length > 0) {
                vertices.push(cleanedName)
            }
        }
    }

    let adjacency_matrix: Array<Array<number>> = []
    for (let i = 1; i < fileLines.length; i++) {
        let adj_matrix_row: Array<number> = []
        let line: string = fileLines[i]
        let chars: Array<string> = line.split(",")
        // First char is vertex name
        for (let j = 1; j < chars.length; j++) {
            let cleanedChar = cleanString(chars[j])
            let parsedNum = Number(cleanedChar)
            adj_matrix_row.push(parsedNum)
        }
        adjacency_matrix.push(adj_matrix_row)
    }

    return new Graph(adjacency_matrix, vertices)
}

function cleanString(str: string): string {
    return str.trim().replace("\\.", "")
}