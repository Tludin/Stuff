/**
 * http://usejsdoc.org/
 */

var http = require('https');
var url = require('url');
var fs = require('fs');

const options = {
    key: fs.readFileSync( "/home/ubuntu/src/nginx-proxy/certs/www.scrapbot.org.key" ),
    cert: fs.readFileSync( "/home/ubuntu/src/nginx-proxy/certs/www.scrapbot.org.crt" )
};



http.createServer( options, function (req, res) {
    var fullUrl = req.url;
    console.log(fullUrl);

    var q = url.parse(fullUrl, true);

    if( q.pathname === "/map" )
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var continent = buildMap( q.query.height, q.query.width );
        res.write(continent);
        res.end();
    }
    else if ( q.pathname === "/map.html" )
    {
        fs.readFile( "map.html", 'utf8', function( err, contents ) {
            if ( ! err )
            {
                res.write( contents );
                res.end();
            }
            else
            {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write( "<p>File not found</p>\n" );
                res.end();
            }
        } );
    }
    else
    {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write("<h1> Endpoint not found you big dum </h1>");
        res.end();
    }
}).listen(8080);


function buildMap( mapHeight, mapWidth )
{
    console.log( "height = " + mapHeight + ", width = " + mapWidth + "\n" );

    var map = new Map( mapHeight, mapWidth );
    map.init();

    map.buildContinent();
    map.raiseMountains( 250 );
    map.plantForests( 250 );
    map.buildCities( 25 );
    
    var mapString = map.toString();
    var mapBody = "<pre>\n" + mapString + "</pre>\n";
    return mapBody;
}


function Map( height, width )
{
    this.height = height;
    this.width = width;
    this.map = [this.height];

    this.symbols = {
        default:  "X",
        land:     "=",
        city:     "Q",
        mountain: "&Delta;",
        forrest:  "l",
        water:    " "
    };
        
    this.init = function()
    {
        var i = 0;
        var j = 0;

        for( i = 0; i < this.height; i++ )
        {
            this.map[i] = [this.width];
            for(j = 0; j < this.width; j++)
            {
                this.map[i][j] = this.symbols.default;
            }
        }
    };

    this.buildContinent = function()
    {
        var i = 0;
        var j = 0;
        var lowI = -1;
        var lowJ = 0;
        var highI = this.height;
        var highJ = this.width;
        var prob = 55;
        var numCheck = 99;
        var param = 0;
        var check = 0;
        var result = 0;

        //console.log("Check");
        for(i = 0; i < highI; i++)
        {
            result = Math.floor((Math.random()*100+1));
            check = this.nextTo( j, i, this.symbols.land );
            if(result > (numCheck - check*prob))
            {
                this.map[i][j] = this.symbols.land;
                //console.log("Check");
            }
            else
            {
                this.map[i][j] = this.symbols.water;
                //console.log("Check");
            }
            param++;
        }
        
        i--;
        highI = i;
        
        
        while(param < this.width*this.height)
        {
            for(j = lowJ + 1; j < highJ; j++)
            {
                result = Math.floor((Math.random()*100+1));
                check = this.nextTo( j, i, this.symbols.land );
                if(result > (numCheck - check*prob))
                {
                    this.map[i][j] = this.symbols.land;
                    //console.log("Check");
                }
                else
                {
                    this.map[i][j] = this.symbols.water;
                    //console.log("Check");
                }
                param++;
            }
            
            j--;
            highJ = j;
            
            
            for(i = highI - 1; i > lowI; i--)
            {
                result = Math.floor((Math.random()*100+1));
                check = this.nextTo( j, i, this.symbols.land );
                if(result > (numCheck - check*prob))
                {
                    this.map[i][j] = this.symbols.land;
                    //console.log("Check");
                }
                else
                {
                    this.map[i][j] = this.symbols.water;
                    //console.log("Check");
                }
                param++;
            }
            
            i++;
            lowI = i;
            
            
            for(j = highJ - 1; j > lowJ; j--)
            {
                result = Math.floor((Math.random()*100+1));
                check = this.nextTo( j, i, this.symbols.land );
                if(result > (numCheck - check*prob))
                {
                    this.map[i][j] = this.symbols.land;
                    //console.log("Check");
                }
                else
                {
                    this.map[i][j] = this.symbols.water;
                    //console.log("Check");
                }
                param++;
            }
            
            j++;
            lowJ = j;
            
            
            for(i = lowI + 1; i < highI; i++)
            {
                result = Math.floor((Math.random()*100+1));
                check = this.nextTo( j, i, this.symbols.land );
                if(result > (numCheck - check*prob))
                {
                    this.map[i][j] = this.symbols.land;
                    //console.log("Check");
                }
                else
                {
                    this.map[i][j] = this.symbols.water;
                    //console.log("Check");
                }
                param++;
            }
            i--;
            highI = i;
        }
    };
    
    this.countLand = function()
    {
        var count = 0;
        for(var i = 0; i < this.height; i++)
        {
            for(var j = 0; j < this.width; j++)
            {
                if(this.map[i][j] === (this.symbols.land)){
                    count ++;
                }
            }
        }
        return count;
    };

    this.buildCities = function( n )
    {
        console.log("The Cities Have Been Built");
        var randVal;
        var check;
        for(var i = 0; i < this.height; i++)
        {
            for(var j = 0; j < this.width; j++)
            {
                if(this.map[i][j] === (this.symbols.land))
                {
                    randVal = Math.floor((Math.random()*(this.countLand(this.map, this.height, this.width))));
                    check = this.nextTo( j, i, this.symbols.water );
                    if(randVal < n + check*20)
                    {
                        this.map[i][j] = this.symbols.city;
                    }
                }
            }
        }
    };

    this.raiseMountains = function( n )
    {
        console.log('The Mountains Have Been Raised');
        var i = 0;
        var j = 0;
        var lowI = -1;
        var lowJ = 0;
        var highI = this.height;
        var highJ = this.width;
        var prob = ((this.width*this.height)/21)*10;
        var param = 0;
        var check = 0;
        var result = 0;
        //console.log("Check");
        for(i = 0; i < highI; i++)
        {
            result = Math.floor((Math.random()*(this.width*this.height)));
            check = this.nextTo( j, i, this.symbols.mountain );
            if(this.map[i][j] === (this.symbols.land)){
                if(result < n+check*prob){
                    this.map[i][j] = this.symbols.mountain;
                }
            }
            param++;
        }
        
        i--;
        highI = i;
        
        
        while(param < this.width*this.height)
        {
            for(j = lowJ + 1; j < highJ; j++)
            {
                result = Math.floor((Math.random()*(this.width*this.height)));
                check = this.nextTo( j, i, this.symbols.mountain );
                if(this.map[i][j] === (this.symbols.land)){
                    if(result < n+check*prob){
                        this.map[i][j] = this.symbols.mountain;
                    }
                }
                param++;
            }
            
            j--;
            highJ = j;
            
            
            for(i = highI - 1; i > lowI; i--)
            {
                result = Math.floor((Math.random()*(this.width*this.height)));
                check = this.nextTo( j, i, this.symbols.mountain );
                if(this.map[i][j] === (this.symbols.land)){
                    if(result < n+check*prob){
                        this.map[i][j] = this.symbols.mountain;
                    }
                }
                param++;
            }
            
            i++;
            lowI = i;
            
            
            for(j = highJ - 1; j > lowJ; j--)
            {
                result = Math.floor((Math.random()*(this.width*this.height)));
                check = this.nextTo( j, i, this.symbols.mountain );
                if(this.map[i][j] === (this.symbols.land)){
                    if(result < n+check*prob){
                        this.map[i][j] = this.symbols.mountain;
                    }
                }
                param++;
            }
            
            j++;
            lowJ = j;
            
            
            for(i = lowI + 1; i < highI; i++)
            {
                result = Math.floor((Math.random()*(this.width*this.height)));
                check = this.nextTo( j, i, this.symbols.mountain );
                if(this.map[i][j] === (this.symbols.land)){
                    if(result < n+check*prob){
                        this.map[i][j] = this.symbols.mountain;
                    }
                }
                param++;
            }
            i--;
            highI = i;
        }
    };

    this.plantForests = function( n )
    {
        
        console.log('The Forests Have Been Planted');
        var i = 0;
        var j = 0;
        var lowI = -1;
        var lowJ = 0;
        var highI = this.height;
        var highJ = this.width;
        var prob = ((this.width*this.height)/18)*10;
        var param = 0;
        var check = 0;
        var result = 0;
        for(i = 0; i < highI; i++)
        {
            result = Math.floor((Math.random()*(this.width*this.height)));
            check = this.nextTo( j, i, this.symbols.forrest );
            if(this.map[i][j] === (this.symbols.land)){
                if(result < n+check*prob){
                    this.map[i][j] = this.symbols.forrest;
                }
            }
            param++;
        }
        
        i--;
        highI = i;
        
        
        while(param < this.width*this.height)
        {
            for(j = lowJ + 1; j < highJ; j++)
            {
                result = Math.floor((Math.random()*(this.width*this.height)));
                check = this.nextTo( j, i, this.symbols.forrest );
                if(this.map[i][j] === (this.symbols.land)){
                    if(result < n+check*prob){
                        this.map[i][j] = this.symbols.forrest;
                    }
                }
                param++;
            }
            
            j--;
            highJ = j;
            
            
            for(i = highI - 1; i > lowI; i--)
            {
                result = Math.floor((Math.random()*(this.width*this.height)));
                check = this.nextTo( j, i, this.symbols.forrest );
                if(this.map[i][j] === (this.symbols.land)){
                    if(result < n+check*prob){
                        this.map[i][j] = this.symbols.forrest;
                    }
                }
                param++;
            }
            
            i++;
            lowI = i;
            
            
            for(j = highJ - 1; j > lowJ; j--)
            {
                result = Math.floor((Math.random()*(this.width*this.height)));
                check = this.nextTo( j, i, this.symbols.forrest );
                if(this.map[i][j] === (this.symbols.land)){
                    if(result < n+check*prob){
                        this.map[i][j] = this.symbols.forrest;
                    }
                }
                param++;
            }
            
            j++;
            lowJ = j;
            
            
            for(i = lowI + 1; i < highI; i++)
            {
                result = Math.floor((Math.random()*(this.width*this.height)));
                check = this.nextTo( j, i, this.symbols.forrest );
                if(this.map[i][j] === (this.symbols.land)){
                    if(result < n+check*prob){
                        this.map[i][j] = this.symbols.forrest;
                    }
                }
                param++;
            }
            i--;
            highI = i;
        }
    };

    this.nextTo = function( y, x, c )
    {
        var count = 0;
        if(x < this.height - 1)
        {
            if((this.map[x+1][y]) === c)
            {
                count++;
            }
        }
        if(x > 0)
        {
            if((this.map[x-1][y]) === c)
            {
                count++;
            }
        }
        if(y < this.width - 1)
        {
            if((this.map[x][y+1]) === c)
            {
                count++;
            }
        }
        if(y > 0)
        {
            if((this.map[x][y-1]) === c)
            {
                count++;
            }
        }
        return count;
    };

    this.toString = function()
    {
        var mapString = "";
        var i = 0;
        var j = 0;
        
        for( i = 0; i < this.height; i++)
        {
            for(j = 0; j < this.width; j++)
            {
                mapString += this.map[i][j];
            }
            mapString += "\n";
        }

        return mapString;
    };
}









function test()
{
    return "works";
}
