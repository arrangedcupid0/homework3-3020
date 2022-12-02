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

/*	for(var c = distance_matrix.length - 1; c >= 0; c--)
	{
		incumbent.push(c);
	}
*/console.log(incumbent);
	var visited = [];
	visited.push(incumbent[0]);
//console.log(visited);
	var keepGoin = true;
	var dist = getDist(distance_matrix, incumbent);
//console.log(dist);
	while(keepGoin)
	{
console.log("------------------new while loop");
		keepGoin = false;
		var i;
		var k;
//console.log("top of j");
		for(var j = 0; j < incumbent.length - 1; j++) //iterates through incumbent, except for the last element
		{
console.log("new j = " + j);
console.log(incumbent);
			var currentWeight = distance_matrix[incumbent[j]][incumbent[j + 1]];
//console.log("curWeight = " + currentWeight);
			var length = distance_matrix[j].length;
//console.log("length = " + length);
			for(var l = 0; l < length; l++) //iterates through all of the nodes adjacent to the current node of incumbent
			{
//console.log("new l loop");
//console.log("l = " + l);
//console.log("vis = " + visited);
				var beenThere = false;
//console.log("incumbent[l] = " + incumbent[l]);
				for(var m = 0; m < visited.length; m++)
				{
//console.log("visited[m] = " + visited[m]);
					if(incumbent[l] == visited[m])
					{
//console.log("this has been there");
						beenThere = true;
					}
				}
//console.log(beenThere);
				if(!beenThere)
				{
//console.log("should be false above");
					var newWeight = distance_matrix[incumbent[j]][incumbent[l]];
//console.log("newWeight from j to l = " + newWeight);
//console.log("currentWeight = " + currentWeight);
					if(newWeight < currentWeight)
					{
//console.log("pushing " + incumbent[l]);
//console.log("visited = " + visited);
						visited.push(incumbent[l]);
						i = j + 1;
//console.log("i = " + i);
						k = i
						for(var n = j + 1; n < incumbent.length; n++)
						{
//console.log("n = " + n);
//console.log("incumbent[l] = " + incumbent[l]);
//console.log("l = " + l);
//console.log("incumbent[n]" + incumbent[n]);
//console.log("n = " + n);
							if(incumbent[l] == incumbent[n])
							{
//console.log("found a k");
								k = n;
//console.log("k = " + k);
							}
						}
						l = distance_matrix[j].length;
						j = incumbent.length;
//console.log("l and j should stop now");
						keepGoin = true;
//console.log(keepGoin);
//console.log("i = " + i);
						var newNew = swap(incumbent, i, k);
//console.log("newNew = " + newNew);
						var newDist = getDist(distance_matrix, newNew);
/*console.log("newDist = " + newDist);
console.log("dist = " + dist);
console.log("incumbent = " + incumbent);
*/						if(newDist < dist)
						{
//console.log("should only fire if newDist < dist");
							incumbent = newNew;
							dist = newDist;
//console.log("incumbent = " + incumbent);
//console.log("dist = " + dist);
						}

					}
				}
			}
		}
	}
console.log(incumbent);
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
/*console.log("start");
console.log(route);
console.log(i);
console.log(k);
*/	var finished = [];

	for(var count = 0; count < i; count++)
	{
		finished.push(route[count]);
	}
//console.log(finished);
	var tmp = [];

	for(var count = k; count >= i; count--)
	{
		tmp.push(route[count]);
	}
//console.log(tmp);

	finished = finished.concat(tmp);
//console.log(finished);

	for(var count = k + 1; count < route.length; count++)
	{
		finished.push(route[count]);
	}
//console.log(finished);

	return finished;
}

function test()
{
	var graph = [[0, 2, 2],
			[2, 0, 1],
			[2, 1, 0]];
	console.log("final answer " + tsp_ls(graph)); 
	graph = [[0, 1, 2, 3, 4],
		[1, 0, 5, 2, 4],
		[2, 5, 0, 1, 2],
		[3, 2, 1, 0, 3],
		[4, 4, 2, 3, 0]];
	console.log("final answer " + tsp_ls(graph)); 
}

test();

//console.log(swap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 3, 8));
//console.log(swap([2,1,0], 1, 2));
