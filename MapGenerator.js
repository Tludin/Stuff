/**
 * http://usejsdoc.org/
 */


var http = require('http');
var url = require('url');

var mapWidth = 200;
var mapHeight = 100;
var map = [mapHeight];

http.createServer(function (req, res) {
	var fullUrl = req.url;
	console.log(fullUrl);
	var q = url.parse(fullUrl, true);
	if(q.pathname === "/map")
	{
		var qData = q.query;
		mapWidth = qData.width;
		mapHeight =  qData.height;
		res.writeHead(200, {'Content-Type': 'text/html'});
		var continent = buildMap();
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


function buildMap()
{
	var i = 0;
	var j = 0;
	for(i = 0; i < mapHeight; i++)
	{
		map[i] = [mapWidth];
		for(j = 0; j < mapWidth; j++)
		{
			map[i][j] = "X";
		}
	}
	
	buildContinent();
	raiseMountains(250);
	plantForests(250);
	buildCities(25);
	
	var mapString = "";
	for(i = 0; i < mapHeight; i++)
	{
		for(j = 0; j < mapWidth; j++)
		{
			mapString += map[i][j];
		}
		mapString += "\n";
	}
	var mapBody = "<pre>\n" + mapString + "</pre>\n";
	return mapBody;
	
}


function buildContinent()
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
		
}


function countLand()
{
	var count = 0;
    for(var i = 0; i < mapHeight; i++)
    {
        for(var j = 0; j < mapWidth; j++)
        {
            if(map[i][j] === ("=")){
                count ++;
            }
        }
    }
    return count;
}

function buildCities(n)
{
	console.log("The Cities Have Been Built");
	var randVal;
    var check;
    for(var i = 0; i < mapHeight; i++)
    {
        for(var j = 0; j < mapWidth; j++)
        {
            if(map[i][j] === ("="))
            {
                randVal = Math.floor((Math.random()*(countLand())));
                check = nextTo(j,i," ");
                if(randVal < n + check*20)
                {
                    map[i][j] = "Q";
                }
            }
        }
    }
    
}

function raiseMountains(n)
{
	console.log('The Mountains Have Been Raised');
	var i = 0;
	var j = 0;
	var lowI = -1;
	var lowJ = 0;
	var highI = mapHeight;
	var highJ = mapWidth;
	var prob = ((mapWidth*mapHeight)/21)*10;
	var param = 0;
	var check = 0;
	var result = 0;
	//console.log("Check");
	for(i = 0; i < highI; i++)
	{
		 result = Math.floor((Math.random()*(mapWidth*mapHeight)));
		 check = nextTo(j,i,"M");
         if(map[i][j] === ("=")){
             if(result < n+check*prob){
                 map[i][j] = "M";
             }
         }
         param++;
	}
	
	i--;
    highI = i;
    
    
	while(param < mapWidth*mapHeight)
	{
		for(j = lowJ + 1; j < highJ; j++)
		{
			 result = Math.floor((Math.random()*(mapWidth*mapHeight)));
			 check = nextTo(j,i,"M");
	         if(map[i][j] === ("=")){
	             if(result < n+check*prob){
	                 map[i][j] = "M";
	             }
	         }
	         param++;
		}
		
		j--;
	    highJ = j;
	    
	    
	    for(i = highI - 1; i > lowI; i--)
		{
	    	 result = Math.floor((Math.random()*(mapWidth*mapHeight)));
	    	 check = nextTo(j,i,"M");
	         if(map[i][j] === ("=")){
	             if(result < n+check*prob){
	                 map[i][j] = "M";
	             }
	         }
	         param++;
		}
	    
	    i++;
	    lowI = i;
	    
	    
	    for(j = highJ - 1; j > lowJ; j--)
		{
	    	 result = Math.floor((Math.random()*(mapWidth*mapHeight)));
	    	 check = nextTo(j,i,"M");
	         if(map[i][j] === ("=")){
	             if(result < n+check*prob){
	                 map[i][j] = "M";
	             }
	         }
	         param++;
		}
	    
	    j++;
	    lowJ = j;
	    
	    
	    for(i = lowI + 1; i < highI; i++)
		{
	    	 result = Math.floor((Math.random()*(mapWidth*mapHeight)));
	    	 check = nextTo(j,i,"M");
	         if(map[i][j] === ("=")){
	             if(result < n+check*prob){
	                 map[i][j] = "M";
	             }
	         }
	         param++;
		}
		i--;
	    highI = i;
	}
	
}



function plantForests(n)
{
	
	console.log('The Forests Have Been Planted');
	var i = 0;
	var j = 0;
	var lowI = -1;
	var lowJ = 0;
	var highI = mapHeight;
	var highJ = mapWidth;
	var prob = ((mapWidth*mapHeight)/18)*10;
	var param = 0;
	var check = 0;
	var result = 0;
	for(i = 0; i < highI; i++)
	{
		 result = Math.floor((Math.random()*(mapWidth*mapHeight)));
		 check = nextTo(j,i,"l");
         if(map[i][j] === ("=")){
             if(result < n+check*prob){
                 map[i][j] = "l";
             }
         }
         param++;
	}
	
	i--;
    highI = i;
    
    
	while(param < mapWidth*mapHeight)
	{
		for(j = lowJ + 1; j < highJ; j++)
		{
			 result = Math.floor((Math.random()*(mapWidth*mapHeight)));
			 check = nextTo(j,i,"l");
	         if(map[i][j] === ("=")){
	             if(result < n+check*prob){
	                 map[i][j] = "l";
	             }
	         }
	         param++;
		}
		
		j--;
	    highJ = j;
	    
	    
	    for(i = highI - 1; i > lowI; i--)
		{
	    	 result = Math.floor((Math.random()*(mapWidth*mapHeight)));
	    	 check = nextTo(j,i,"l");
	         if(map[i][j] === ("=")){
	             if(result < n+check*prob){
	                 map[i][j] = "l";
	             }
	         }
	         param++;
		}
	    
	    i++;
	    lowI = i;
	    
	    
	    for(j = highJ - 1; j > lowJ; j--)
		{
	    	 result = Math.floor((Math.random()*(mapWidth*mapHeight)));
	    	 check = nextTo(j,i,"l");
	         if(map[i][j] === ("=")){
	             if(result < n+check*prob){
	                 map[i][j] = "l";
	             }
	         }
	         param++;
		}
	    
	    j++;
	    lowJ = j;
	    
	    
	    for(i = lowI + 1; i < highI; i++)
		{
	    	 result = Math.floor((Math.random()*(mapWidth*mapHeight)));
	    	 check = nextTo(j,i,"l");
	         if(map[i][j] === ("=")){
	             if(result < n+check*prob){
	                 map[i][j] = "l";
	             }
	         }
	         param++;
		}
		i--;
	    highI = i;
	}
	
}


function nextTo(y, x, c)
{
	var count = 0;
	if(x < mapHeight - 1)
	{
		if((map[x+1][y]) === c)
		{
			count++;
		}
	}
	if(x > 0)
	{
		if((map[x-1][y]) === c)
		{
			count++;
		}
	}
	if(y < mapWidth - 1)
	{
		if((map[x][y+1]) === c)
		{
			count++;
		}
	}
	if(y > 0)
	{
		if((map[x][y-1]) === c)
		{
			count++;
		}
	}
	return count;
}





function test()
{
	return "works";
}
