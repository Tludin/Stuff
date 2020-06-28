/**
 * http://usejsdoc.org/
 */


var http = require('http');
var url = require('url');

console.log(url.URL);
var mapWidth = 200;
var mapHeight = 100;
var map = [mapHeight];

http.createServer(function (req, res) {
	if(url === "localhost:8080/map")
	{
		res.writeHead(200, {'Content-Type': 'text/html'});
		var continent = generateMap();
		res.write(continent);
		res.end();
	}
	else
	{
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.write("<h1> Endpoint not found you big dum </h1>");
		res.end();
	}
}).listen(8080);

function generateMap()
{

	var i = 0;
	var j = 0;
	var lowI = -1;
	var lowJ = 0;
	var highI = mapHeight;
	var highJ = mapWidth;
	var prob = 55;
	var numCheck = 99;
	var param = 0;
	var check = 0;
	var result = 0;
	for(i = 0; i < mapHeight; i++)
	{
		map[i] = [mapWidth];
		for(j = 0; j < mapWidth; j++)
		{
			map[i][j] = "X";
		}
	}
	j = 0;
	//console.log("Check");
	for(i = 0; i < highI; i++)
	{
		 result = Math.floor((Math.random()*100+1));
         check = nextTo(j,i,"=");
         if(result > (numCheck - check*prob))
         {
             map[i][j] = "=";
             //console.log("Check");
         }
         else
         {
             map[i][j] = " ";
             //console.log("Check");
         }
         param++;
	}
	
	i--;
    highI = i;
    
    
	while(param < mapWidth*mapHeight)
	{
		for(j = lowJ + 1; j < highJ; j++)
		{
			 result = Math.floor((Math.random()*100+1));
	         check = nextTo(j,i,"=");
	         if(result > (numCheck - check*prob))
	         {
	             map[i][j] = "=";
	             //console.log("Check");
	         }
	         else
	         {
	             map[i][j] = " ";
	             //console.log("Check");
	         }
	         param++;
		}
		
		j--;
	    highJ = j;
	    
	    
	    for(i = highI - 1; i > lowI; i--)
		{
	    	 result = Math.floor((Math.random()*100+1));
	         check = nextTo(j,i,"=");
	         if(result > (numCheck - check*prob))
	         {
	             map[i][j] = "=";
	             //console.log("Check");
	         }
	         else
	         {
	             map[i][j] = " ";
	             //console.log("Check");
	         }
	         param++;
		}
	    
	    i++;
	    lowI = i;
	    
	    
	    for(j = highJ - 1; j > lowJ; j--)
		{
	    	 result = Math.floor((Math.random()*100+1));
	         check = nextTo(j,i,"=");
	         if(result > (numCheck - check*prob))
	         {
	             map[i][j] = "=";
	             //console.log("Check");
	         }
	         else
	         {
	             map[i][j] = " ";
	             //console.log("Check");
	         }
	         param++;
		}
	    
	    j++;
	    lowJ = j;
	    
	    
	    for(i = lowI + 1; i < highI; i++)
		{
	    	 result = Math.floor((Math.random()*100+1));
	         check = nextTo(j,i,"=");
	         if(result > (numCheck - check*prob))
	         {
	             map[i][j] = "=";
	             //console.log("Check");
	         }
	         else
	         {
	             map[i][j] = " ";
	             //console.log("Check");
	         }
	         param++;
		}
		i--;
	    highI = i;
	}
	
	
	
	
	
	
	
	
	var mapString = "";
	for(i = 0; i < mapHeight; i++){
		for(j = 0; j < mapWidth; j++){
			mapString += map[i][j];
		}
		mapString += "\n";
	}
	var mapBody = "<pre>\n" + mapString + "</pre>\n";
	return mapBody;
	
}

function nextTo(y, x, c){
	var count = 0;
	if(x < mapHeight - 1){
		if((map[x+1][y]) === c){
			count++;
		}
	}
	if(x > 0){
		if((map[x-1][y]) === c){
			count++;
		}
	}
	if(y < mapWidth - 1){
		if((map[x][y+1]) === c){
			count++;
		}
	}
	if(y > 0){
		if((map[x][y-1]) === c){
			count++;
		}
	}
	return count;
}

function test()
{
	return "works";
}
