/**
 * A graph data structure with additional capabilities
 */
export class Graph {

    private adj_matrix: Array<Array<number>>
    private vertices: { [ index: string ]: number}

    /**
     * Initialize a graph structure
     * @param adj_matrix 
     * @param vertices 
     */
    public constructor(adj_matrix: Array<Array<number>>,
                       vertices: { [ index: string ]: number} | Array<string>) {
        this.adj_matrix = adj_matrix
        if (vertices instanceof Array) {
            this.vertices = {}
            for (let name of vertices) {
                this.vertices[name] = 0 // if no weight specified, all vertices have weight 0
            }
        } else {
            this.vertices = vertices
        }
    }

    /**
     * Returns graph as adjacency matrix
     */
    public getAdjecencyMatrix(): Array<Array<number>> {
        return this.adj_matrix
    }

    /**
     * Returns map of vertex names and weights
     */
    public getVertices(): { [ index: string ]: number} {
        return this.vertices
    }

    /**
     * Returns number of vertices in graph
     */
    public getNumberOfVertices(): number {
        return Object.keys(this.vertices).length
    }

    /**
     * Returns total value of all vertices
     */
    public getTotalValue(): number {
        let sum = 0
        for (let name of Object.keys(this.vertices)) {
            sum += this.vertices[name]
        }
        return sum
    }    

    /**
     * Returns value of all vertices specified
     */
    public getVerticesValue(vertices: Array<string>): number {
        let sum = 0
        for (let name of vertices) {
            sum += this.vertices[name]
        }
        return sum
    }

    /**
     * Removes vertex with given name from graph
     * @param name name of vertex to remove
     */
    public removeVertex(name: string) {
        let idx = Object.keys(this.vertices).indexOf(name)
        if (idx < 0) {
            throw new Error("Vertex name invalid")
        }
        this.adj_matrix.splice(idx, 1)
        for (let i=0; i < this.adj_matrix.length; i++) {
            this.adj_matrix[i].splice(idx, 1)
        }
        delete this.vertices[name]
    }

    /**
     * Get neighbours of given vertex. Returns both inbound and
     * outbound neighbours
     * @param name name of vertex
     */
    public getNeighbours(name: string): Array<string> {
        let idx: number = Object.keys(this.vertices).indexOf(name)
        let neighbours: Array<string> = []
        
        let row: Array<number> = this.adj_matrix[idx]
        for (let i=0; i < row.length; i++) {
            if (row[i] > -1) {
                let neighbourName = Object.keys(this.vertices)[i]
                if (neighbours.indexOf(neighbourName) < 0) {
                    neighbours.push(neighbourName)
                }
            }
        }

        let col: Array<number> = []
        this.adj_matrix.forEach((row: Array<number>) => {col.push(row[idx])})
        for (let i=0; i < col.length; i++) {
            if (col[i] > -1) {
                let neighbourName = Object.keys(this.vertices)[i]
                if (neighbours.indexOf(neighbourName) < 0) {
                    neighbours.push(neighbourName)
                }
            }
        }

        return neighbours
    }

    /**
     * Return deep copy of graph
     */
    public clone(): Graph {
        let clone_adj_matrix: Array<Array<number>> = JSON.parse(JSON.stringify(this.adj_matrix))
        let clone_vertices: { [ index: string ]: number} = JSON.parse(JSON.stringify(this.vertices))
        return new Graph(clone_adj_matrix, clone_vertices)
    }

}
