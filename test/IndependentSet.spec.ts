import {expect} from "chai";
import { Graph } from "../src/utils/Graph";
import { IndependentSet } from "../src/algorithms/IndependentSet";

describe("Graph", function () {

    it("should return correct vertex value", function () {
        let vertices: { [ index: string ]: number} = {"a": 1, "b": 2, "c": 3, "d": 4}
        let matrix: Array<Array<number>> = [
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
            [-1, -1, -1, -1]
        ]
        let graph: Graph = new Graph(matrix, vertices)
        // todo: check returned value
        throw new Error("Not implemented")
    });

})