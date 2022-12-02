function rand()
{
	var size = 30;
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
//console.table(all);
for(var done = 0; done < all.length; done++)
{
	console.log(all[done]);
}
/*const fs = require('fs');

let data = all;
fs.writeFile('output.txt', data, (err) => {
 if (err) throw err;
});*/
return;
}

rand();
