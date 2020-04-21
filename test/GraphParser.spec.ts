import {expect} from "chai";
import { readGraph } from "../src/utils/GraphParser";

describe("Graph Parser", function () {

    it("should read empty graph", function () {
        let path = "test/test_graphs/emptyGraph.txt"
        let graph = readGraph(path)
        let expected_vertices: { [ index: string ]: number} = {}
        let expected_matrix: Array<Array<number>> = []
        expect(graph.getAdjecencyMatrix()).to.deep.equal(expected_matrix)
        expect(graph.getVertices()).to.deep.equal(expected_vertices)
    });

    it("should read disconnected graph", function () {
        let path = "test/test_graphs/disconnected.txt"
        let graph = readGraph(path)
        let expected_vertices: { [ index: string ]: number} = {"a": 0, "b": 0}
        let expected_matrix: Array<Array<number>> = [[-1, -1], [-1, -1]]
        expect(graph.getAdjecencyMatrix()).to.deep.equal(expected_matrix)
        expect(graph.getVertices()).to.deep.equal(expected_vertices)
    });

    it("should read connected graph", function () {
        let path = "test/test_graphs/connectedNoWeight.txt"
        let graph = readGraph(path)
        let expected_vertices: { [ index: string ]: number} = {"a": 0, "b": 0, "c": 0, "d": 0}
        let expected_matrix: Array<Array<number>> = [
            [-1, 0, 0, 0], 
            [0, -1, 0, 0], 
            [0, 0, -1, 0], 
            [0, 0, 0, -1]
        ]
        expect(graph.getAdjecencyMatrix()).to.deep.equal(expected_matrix)
        expect(graph.getVertices()).to.deep.equal(expected_vertices)
    });

    it("should read connected graph with weighted edges", function () {
        let path = "test/test_graphs/connectedWeighted.txt"
        let graph = readGraph(path)
        let expected_vertices: { [ index: string ]: number} = {"a": 0, "b": 0, "c": 0, "d": 0}
        let expected_matrix: Array<Array<number>> = [
            [-1,  0,  4,  5], 
            [ 6, -1,  0,  0], 
            [ 0,  7, -1,  0], 
            [ 0,  0,  3, -1]
        ]
        expect(graph.getAdjecencyMatrix()).to.deep.equal(expected_matrix)
        expect(graph.getVertices()).to.deep.equal(expected_vertices)
    });

    it("should read connected graph with weighted edges and vertices", function () {
        let path = "test/test_graphs/connectedWeightedVertices.txt"
        let graph = readGraph(path)
        let expected_vertices: { [ index: string ]: number} = {"a": 1, "b": 2, "c": 3, "d": 4}
        let expected_matrix: Array<Array<number>> = [
            [-1,  0,  4,  5], 
            [ 6, -1,  0,  0], 
            [ 0,  7, -1,  0], 
            [ 0,  0,  3, -1]
        ]
        expect(graph.getAdjecencyMatrix()).to.deep.equal(expected_matrix)
        expect(graph.getVertices()).to.deep.equal(expected_vertices)
    });

})