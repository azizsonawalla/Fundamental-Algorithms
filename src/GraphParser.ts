export interface Graph {
    adjacency_matrix: Array<Array<number>>
    vertices: Array<string>
}

/**
 * Reads a graph input from a text file and returns an adjacency matrix
 * @param path path to the text file
 */
export function read(path: string): Graph {
    throw new Error("Not Implemented")
}