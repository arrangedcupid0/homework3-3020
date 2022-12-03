
//Michael Stoll, W09860657 - Code is below
//Beckham Carver, W09874167 - Code after

// Beckham Sources:
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
//  https://www.youtube.com/watch?v=-JjA4BLQyqE&t=987s (Traveling Salesman Problem Dynamic Programming Held-Karp    )
//  https://stackoverflow.com/questions/56190776/node-js-stream-with-array

function tsp_ls(distance_matrix)
{
	//code that chooses a random route and sets it equal to incumbent
	var incumbent = [];
	for(var b = 0; b < distance_matrix.length; b++) //sets incumbent equal to a list from 0 to distance_matrix.length - 1
	{
		incumbent.push(b);
	}
	
	for(var a = 0; a < (incumbent.length / 2); a++)
	{
		var first = Math.floor(Math.random() * (incumbent.length - 1));
		var second = Math.floor(Math.random() * (incumbent.length - 1));
		while(first == second)
		{
			var second = Math.floor(Math.random() * incumbent.length);
		}
		var tmp = incumbent[first];
		incumbent[first] = incumbent[second];
		incumbent[second] = tmp;
	}

	var visited = [];
	visited.push(incumbent[0]);
	var keepGoin = true;
	var dist = getDist(distance_matrix, incumbent);
	while(keepGoin)
	{
		keepGoin = false;
		var i;
		var k;
		for(var j = 0; j < incumbent.length - 1; j++) //iterates through incumbent, except for the last element
		{
			var currentWeight = distance_matrix[incumbent[j]][incumbent[j + 1]];
			var length = distance_matrix[j].length;
			for(var l = 0; l < length; l++) //iterates through all of the nodes adjacent to the current node of incumbent
			{
				var beenThere = false;
				for(var m = 0; m < visited.length; m++)
				{
					if(incumbent[l] == visited[m])
					{
						beenThere = true;
					}
				}
				if(!beenThere)
				{
					var newWeight = distance_matrix[incumbent[j]][incumbent[l]];
					if(newWeight < currentWeight)
					{
						visited.push(incumbent[l]);
						i = j + 1;
						k = i
						for(var n = j + 1; n < incumbent.length; n++)
						{
							if(incumbent[l] == incumbent[n])
							{
								k = n;
							}
						}
						l = distance_matrix[j].length;
						j = incumbent.length;
						keepGoin = true;
						var newNew = swap(incumbent, i, k);
						var newDist = getDist(distance_matrix, newNew);
						if(newDist < dist)
						{
							incumbent = newNew;
							dist = newDist;
						}

					}
				}
			}
		}
	}
//console.log(incumbent);
	return dist;
}

function rand(size)
{
	var count = 0;
	var all = [];
	while(size > 0)
	{
		var arr = [0];
		for(var j = 0; j < count; j++)
		{
			arr.push(0);
		}
		count++;
		for(var i = 1; i < size; i++)
		{
			arr.push(Math.floor(Math.random() * (5 * size) + 10));
		}
		all.push(arr);
		size--;
	}

	for(var i = 0; i < all.length; i++)
	{
		for(var j = 0; j < all[i].length; j++)
		{
			if(all[i][j] === 0)
			{
				all[i][j] = all[j][i];
			}
		}
	}
	return all;
}

function getDist(graph, route)
{
	var sum = 0;
	for(var i = 0; i < route.length - 1; i++)
	{
		sum = sum + graph[route[i]][route[i+1]];
	}
	return sum;
}
function swap(route, i, k)
{
	var finished = [];

	for(var count = 0; count < i; count++)
	{
		finished.push(route[count]);
	}
	var tmp = [];

	for(var count = k; count >= i; count--)
	{
		tmp.push(route[count]);
	}

	finished = finished.concat(tmp);

	for(var count = k + 1; count < route.length; count++)
	{
		finished.push(route[count]);
	}

	return finished;
}

// Beckham Carver code below
// Prog03 part 1

// calculates the best trip using the Held-Karp algorithim
function tsp_hk(distance_matrix) {
    // initializes map for memoization
    const adjLen = distance_matrix.length;

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
        for(var currentVertex = 1; currentVertex < adjLen; currentVertex++) {
            if (!set.includes(currentVertex)) {
                ind = [currentVertex.toString()].concat(set);
                var minCost = 999;
                var minPrev = 0;
                for(let prevVertex of set) {
                    let tmp = getCost(set, prevVertex, minCostIndex);
                    let cost = distance_matrix[prevVertex][currentVertex] + tmp;
                    if (cost < minCost) {
                        minCost = cost;
                        minPrev = prevVertex
                    }
                }
                if (set.length <= 0) {
                    minCost = distance_matrix[0][currentVertex];
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
    return combi
}

function getCost(set, prevVertex, minCostIndex) {
    let set_ = set.filter(vert => vert != prevVertex);
    let ind = [prevVertex.toString()].concat(set_);
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

function test(n)
{
    let graph = rand(n);
    let tag = n.toString();
    console.time("Time " + tag);
    console.log("SLS answer " , tsp_ls(graph));
    console.timeEnd("Time " + tag);

    if (n < 17) {
        console.time("___Times " + tag);
        console.log("___Held-Karp answer " , tsp_hk(graph));
        console.timeEnd("___Times " + tag);
    }
}
for (let i = 3; i < 17; i++) {
    test(i);
}
for (let i = 500; i < 10000; i+= 500) {
    test(i);
}


