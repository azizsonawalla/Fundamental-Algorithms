import {expect} from "chai";
import { readGraph } from "../src/GraphParser";

describe("Graph Parser", function () {

    // before(function () {
    // });

    // after(function () {
    // });

    // beforeEach(function () {
    //     // might want to add some process logging here to keep track of what"s going on
    // });

    // afterEach(function () {
    //     // might want to add some process logging here to keep track of what"s going on
    // });

    it("should read empty graph", function () {
        let path = "test/test_graphs/emptyGraph.txt"
        let graph = readGraph(path)
        let expected_vertices: Array<string> = []
        let expected_matrix: Array<Array<number>> = []
        expect(graph.adjacency_matrix).to.deep.equal(expected_matrix)
        expect(graph.vertices).to.deep.equal(expected_vertices)
    });

    it("should read disconnected graph", function () {
        let path = "test/test_graphs/disconnected.txt"
        let graph = readGraph(path)
        let expected_vertices: Array<string> = ["a", "b"]
        let expected_matrix: Array<Array<number>> = [[-1, -1], [-1, -1]]
        expect(graph.adjacency_matrix).to.deep.equal(expected_matrix)
        expect(graph.vertices).to.deep.equal(expected_vertices)
    });

    it("should read connected graph", function () {
        let path = "test/test_graphs/connectedNoWeight.txt"
        let graph = readGraph(path)
        let expected_vertices: Array<string> = ["a", "b", "c", "d"]
        let expected_matrix: Array<Array<number>> = [
            [-1, 0, 0, 0], 
            [0, -1, 0, 0], 
            [0, 0, -1, 0], 
            [0, 0, 0, -1]
        ]
        expect(graph.adjacency_matrix).to.deep.equal(expected_matrix)
        expect(graph.vertices).to.deep.equal(expected_vertices)
    });

    it("should read connected graph", function () {
        let path = "test/test_graphs/connectedWeighted.txt"
        let graph = readGraph(path)
        let expected_vertices: Array<string> = ["a", "b", "c", "d"]
        let expected_matrix: Array<Array<number>> = [
            [-1,  0,  4,  5], 
            [ 6, -1,  0,  0], 
            [ 0,  7, -1,  0], 
            [ 0,  0,  3, -1]
        ]
        expect(graph.adjacency_matrix).to.deep.equal(expected_matrix)
        expect(graph.vertices).to.deep.equal(expected_vertices)
    });

})