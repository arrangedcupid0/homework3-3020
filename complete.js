//Michael Stoll, W09860657
//Beckham Carver, W09874167
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

function bestTrip(distM) {
    const adjLen = distM.length;
  
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
       // console.log("set used " , set);

        for(var currentVertex = 1; currentVertex < adjLen; currentVertex++) {
            if (!set.includes(currentVertex)) {
                ind = [currentVertex.toString()].concat(set);
               // console.log("--index stored ", ind);
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
    //console.log(finalArr);
    //console.log(min);
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
//    console.table(combi);
    return combi
}

function getCost(set, prevVertex, minCostIndex) {
    let set_ = set.filter(vert => vert != prevVertex);
    let ind = [prevVertex.toString()].concat(set_);
//    console.log("---- index searched ", ind)
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

function test()
{
	var graph = [[0, 2, 2],
			[2, 0, 1],
			[2, 1, 0]];
	console.time("SLS graph of size 3");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 3");
	console.time("HK graph of size 3");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 3");
	graph = [[0, 1, 2, 3, 4],
		[1, 0, 5, 2, 4],
		[2, 5, 0, 1, 2],
		[3, 2, 1, 0, 3],
		[4, 4, 2, 3, 0]];
	console.time("SLS graph of size 5");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 5");
	console.time("HK graph of size 5");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 5");
	graph = [[0, 1, 2, 3, 4, 5, 6],
		[1, 0, 7, 12, 5, 9, 21],
		[2, 7, 0, 14, 8, 3, 1],
		[3, 12, 14, 0, 17, 6, 12],
		[4, 5, 8, 17, 0, 13, 3],
		[5, 9, 3, 6, 13, 0, 7],
		[6, 21, 1, 12, 3, 7, 0]];
	console.time("SLS graph of size 7");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 7");
	console.time("HK graph of size 7");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 7");
	graph = [[ 0, 60, 16, 48, 49, 58, 51, 34, 60, 26, 64, 20 ],
		[ 60, 0, 23, 63, 13, 59, 16, 53, 40, 22, 47, 13 ],
		[ 16, 23, 0, 15, 42, 10, 48, 35, 52, 16, 47, 15 ],
		[ 48, 63, 15, 0, 14, 47, 12, 29, 15, 41, 17, 14 ],
		[ 49, 13, 42, 14, 0, 15, 42, 19, 30, 47, 27, 24 ],
		[ 58, 59, 10, 47, 15, 0, 15, 23, 11, 31, 35, 14 ],
		[ 51, 16, 48, 12, 42, 15, 0, 14, 21, 12, 15, 27 ],
		[ 34, 53, 35, 29, 19, 23, 14, 0, 11, 11, 11, 29 ],
		[ 60, 40, 52, 15, 30, 11, 21, 11, 0, 10, 27, 24 ],
		[ 26, 22, 16, 41, 47, 31, 12, 11, 10, 0, 13, 20 ],
		[ 64, 47, 47, 17, 27, 35, 15, 11, 27, 13, 0, 16 ],
		[ 20, 13, 15, 14, 24, 14, 27, 29, 24, 20, 16, 0 ]];
	console.time("SLS graph of size 12");
	console.log("SLS answer " + tsp_ls(graph));
	console.timeEnd("SLS graph of size 12");
	console.time("HK graph of size 12");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 12");
	graph =[[ 0, 80, 62, 76, 77, 73, 85, 45, 33, 67, 91, 35, 76, 75, 28, 88, 84, 95 ],
		[ 80, 0, 94, 18, 36, 68, 51, 42, 73, 30, 72, 26, 27, 77, 55, 28, 55, 15 ],
		[ 62, 94, 0, 41, 20, 64, 65, 48, 35, 25, 55, 72, 35, 22, 86, 12, 55, 15 ],
		[ 76, 18, 41, 0, 79, 82, 46, 15, 34, 27, 70, 33, 67, 38, 22, 57, 60, 44 ],
		[ 77, 36, 20, 79, 0, 35, 47, 58, 52, 56, 44, 41, 61, 67, 62, 75, 37, 42 ],
		[ 73, 68, 64, 82, 35, 0, 21, 52, 15, 71, 43, 52, 68, 40, 38, 41, 70, 54 ],
		[ 85, 51, 65, 46, 47, 21, 0, 43, 50, 36, 62, 32, 66, 12, 55, 54, 55, 58 ],
		[ 45, 42, 48, 15, 58, 52, 43, 0, 10, 59, 42, 51, 15, 50, 31, 41, 32, 30 ],
		[ 33, 73, 35, 34, 52, 15, 50, 10, 0, 43, 16, 18, 24, 15, 32, 45, 25, 20 ],
		[ 67, 30, 25, 27, 56, 71, 36, 59, 43, 0, 15, 32, 13, 10, 15, 11, 52, 40 ],
		[ 91, 72, 55, 70, 44, 43, 62, 42, 16, 15, 0, 16, 14, 12, 40, 19, 21, 28 ],
		[ 35, 26, 72, 33, 41, 52, 32, 51, 18, 32, 16, 0, 17, 21, 29, 13, 43, 25 ],
		[ 76, 27, 35, 67, 61, 68, 66, 15, 24, 13, 14, 17, 0, 11, 30, 38, 22, 31 ],
		[ 75, 77, 22, 38, 67, 40, 12, 50, 15, 10, 12, 21, 11, 0, 22, 31, 18, 29 ],
		[ 28, 55, 86, 22, 62, 38, 55, 31, 32, 15, 40, 29, 30, 22, 0, 19, 27, 17 ],
		[ 88, 28, 12, 57, 75, 41, 54, 41, 45, 11, 19, 13, 38, 31, 19, 0, 22, 17 ],
		[ 84, 55, 55, 60, 37, 70, 55, 32, 25, 52, 21, 43, 22, 18, 27, 22, 0, 17 ],
		[ 95, 15, 15, 44, 42, 54, 58, 30, 20, 40, 28, 25, 31, 29, 17, 17, 17, 0 ]];
	console.time("SLS graph of size 18");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 18");
	console.time("HK graph of size 18");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 18");
	//it was at this point that I realized it would be impossible to manually make an array big enough,
	//so I wrote a function to do it for me. but, stubbornly, i'm keeping these small ones because they 
	//were a pain to make.
	graph = rand(120);
	console.time("SLS graph of size 120");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 120");
	console.time("HK graph of size 120");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 120");
	graph = rand(260);
	console.time("SLS graph of size 260");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 260");
	console.time("HK graph of size 260");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 260");
	graph = rand(600);
	console.time("SLS graph of size 600");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 600");
	console.time("HK graph of size 600");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 600");
	graph = rand(1000);
	console.time("SLS graph of size 1000");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 1000");
	console.time("HK graph of size 1000");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 1000");
	graph = rand(2000);
	console.time("SLS graph of size 2000");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 2000");
	console.time("HK graph of size 2000");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 2000");
	graph = rand(3000);
	console.time("SLS graph of size 3000");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 3000");
	console.time("HK graph of size 3000");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 3000");
	graph = rand(3800);
	console.time("SLS graph of size 3800");
	console.log("SLS answer " + tsp_ls(graph)); 
	console.timeEnd("SLS graph of size 3600");
	console.time("HK graph of size 3800");
	console.log("HK answer " + bestTrip(graph)); 
	console.timeEnd("HK graph of size 3800");
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

test();
