// Beckham Carver
// Prog03 part 1

// Sources:
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
//  https://www.youtube.com/watch?v=-JjA4BLQyqE&t=987s (Traveling Salesman Problem Dynamic Programming Held-Karp    )
//  https://stackoverflow.com/questions/56190776/node-js-stream-with-array

const adjMatrix = [[0, 1, 15, 6],
                   [2, 0, 7,  3],
                   [9, 6, 0, 12],
                   [10, 4, 8, 0]];

const adjLen = adjMatrix.length;

// calculates the best trip using the Held-Karp algorithim
function bestTrip(distM) {
    // initializes map for memoization
    let minCostIndex = new Map();

    // prepares combinations for algo
    let destRange = [];
    for (let i=0; i < adjLen; i++) destRange.push(i);
    let allSets = getCombinations(destRange);

    let asLen = allSets.length;
    let set = []
    let ind = [];
    
    for (let i = 0; i < asLen; i++) {
        set = allSets[i];
        console.log("set used " , set);

        for(var currentVertex = 1; currentVertex < adjLen; currentVertex++) {
            if (!set.includes(currentVertex)) {
                ind = [currentVertex.toString()].concat(set);
                console.log("--index stored ", ind);
                var minCost = 999;
                var minPrev = 0;
                for(let prevVertex of set) {
                    let tmp = getCost(set, prevVertex, minCostIndex);
                    let cost = adjMatrix[prevVertex][currentVertex] + tmp;
                    if (cost < minCost) {
                        minCost = cost;
                        minPrev = prevVertex
                    }
                }
                if (set.length <= 0) {
                    minCost = distM[0][currentVertex];
                }
            }
            minCostIndex.set(ind, minCost);
        }

    }
    let min = 999;
    
    // grabs the last three elements of the array because JS did not
    // like working with minCostIndex.get()
    // and map does not allow you to access the end of it otherwise
    let JSmapGetFunctionSucks = minCostIndex.values();
    let arr = [];
    for (val of JSmapGetFunctionSucks) {arr.push(val);};
    finalArr = arr.splice(arr.length - adjLen + 1);
    finalArr.sort();
    min = finalArr[0];

    //console.table(minCostIndex);
    console.log(finalArr);
    console.log(min);
    return min;
}

function getCombinations(valuesArray) {
    // ref https://stackoverflow.com/questions/43241174/javascript-generating-all-combinations-of-elements-in-a-single-array-in-pairs
    let combi = [[]];
    let temp = [];
    let temp2 = [];
    let len = Math.pow(2, valuesArray.length);


    for (var i = 1; i < len; i++) {
        for (var j = 1; j < valuesArray.length; j++) {
            if ((i & Math.pow(2, j))) {
                temp.push(valuesArray[j]);
            }
        }
    
        if (temp.toString().localeCompare(temp2.toString())) {
            combi.push(temp);
            temp2 = temp;
        }
        temp = [];
    }
    combi.sort(function(a, b){
        return a.length - b.length;
      });
    console.table(combi);
    return combi
}

function getCost(set, prevVertex, minCostIndex) {
    let set_ = set.filter(vert => vert != prevVertex);
    let ind = [prevVertex.toString()].concat(set_);
    console.log("---- index searched ", ind)
    let JSmapGetFunctionSucks = minCostIndex.entries();
    for (pair of JSmapGetFunctionSucks) {
        let testBool = true;
        if (pair[0].length == ind.length) {
            for (let i = 0; i < ind.length && testBool; i++) {
                if (pair[0][i] != ind[i]) testBool = false;
            }
            //console.log("found?? " , pair[1]);
            if (testBool) return pair[1];
        }
    }
    return 998
}

bestTrip(adjMatrix);




