import { Graph } from "../utils/Graph";

export interface Solution {
    vertices: Array<String>,
    value: number
}

/**
 * The Independent Set problem is defined as finding sets of vertices
 * in a graph G such that no two vertices in the independent set are 
 * connected by an edge.
 */
export class IndependentSet {

    /**
     * Find all independent sets in graph G
     * @param G the graph
     * @returns the list of independent sets (each set is set of names of vertices)
     */
    public solve(G: Graph): Array<Solution> {
        interface SolutionBranch {
            independentSet: Array<string>,
            remainingGraph: Graph,
        }
        let branches: Array<SolutionBranch> = []
        branches.push({ independentSet: [], remainingGraph: G })

        let solutions: Array<Solution> = []
        while(branches.length > 0) {
            let branch = branches.pop()
            if (branch == null) break

            let indepSet = branch.independentSet
            let graph = branch.remainingGraph
            solutions.push({
                vertices: indepSet,
                value: G.getVerticesValue(indepSet)
            })

            // Check if solution found
            if (graph.getNumberOfVertices() === 0) {
                solutions.push({
                    vertices: indepSet,
                    value: G.getVerticesValue(indepSet)
                })
            }

            let verticesRemaining: Array<string> = Object.keys(graph.getVertices())
            for (let vertex of verticesRemaining) {
                let cloneGraph: Graph = graph.clone()
                let cloneIndepSet: Array<string> = JSON.parse(JSON.stringify(indepSet))
                cloneIndepSet.push(vertex)
                let neighbours = cloneGraph.getNeighbours(vertex)
                for (let neighbour of neighbours) {
                    cloneGraph.removeVertex(neighbour)
                }
                cloneGraph.removeVertex(vertex)
                branches.push({ independentSet: cloneIndepSet, remainingGraph: cloneGraph })
            }
        }

        // Remove duplicate solutions
        let solutions_filtered: {[index: string]: Solution} = {}        
        for (let sol of solutions) {
            let key: string = sol.vertices.sort().join()
            solutions_filtered[key] = sol
        }
        solutions = []
        Object.keys(solutions_filtered).forEach((key) => solutions.push(solutions_filtered[key]))

        solutions = solutions.sort((a, b) => a.value - b.value)
        return solutions
    }
}