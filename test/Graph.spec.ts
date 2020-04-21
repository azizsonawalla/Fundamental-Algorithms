import {expect} from "chai";
import { Graph } from "../src/utils/Graph";

describe("Graph", function () {

    it("should return correct vertex value", function () {
        let vertices: { [ index: string ]: number} = {"a": 1, "b": 2, "c": 3, "d": 4}
        let matrix: Array<Array<number>> = [
            [-1,  0,  4,  5], 
            [ 6, -1,  0,  0], 
            [ 0,  7, -1,  0], 
            [ 0,  0,  3, -1]
        ]
        let graph: Graph = new Graph(matrix, vertices)
        expect(graph.getTotalValue()).to.equal(10)
    });

    it("should return correct neighbours", function () {
        let vertices: { [ index: string ]: number} = {"a": 1, "b": 2, "c": 3, "d": 4}
        let matrix: Array<Array<number>> = [
            [-1, -1,  4, -1], 
            [ 6, -1,  0,  0], 
            [-1,  7, -1,  0], 
            [-1,  0,  3, -1]
        ]
        let graph: Graph = new Graph(matrix, vertices)
        let expected_neighbours = ["b", "c"]
        expect(graph.getNeighbours("a")).to.have.members(expected_neighbours)
    });

    it("should remove specified vertex", function () {
        let vertices: { [ index: string ]: number} = {"a": 1, "b": 2, "c": 3, "d": 4}
        let matrix: Array<Array<number>> = [
            [-1, -1,  4, -1], 
            [ 6, -1,  0,  0], 
            [-1,  7, -1,  0], 
            [-1,  0,  3, -1]
        ]
        let graph: Graph = new Graph(matrix, vertices)
        let expected_vertices: { [ index: string ]: number} = {"a": 1, "c": 3, "d": 4}
        let expected_matrix: Array<Array<number>> = [
            [-1, 4, -1],
            [-1,-1,  0], 
            [-1, 3, -1]
        ]
        graph.removeVertex("b")
        expect(graph.getAdjecencyMatrix()).to.deep.equal(expected_matrix)
        expect(graph.getVertices()).to.deep.equal(expected_vertices)
    });

})