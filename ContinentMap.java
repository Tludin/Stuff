
/**
 * Write a description of class ContinentMap here.
 *
 * @author (your name)
 * @version (a version number or a date)
 */
public class ContinentMap
{
    private String[][] map;
    private int mapWidth;
    private int mapHeight;
    public ContinentMap(int width, int height){
        mapWidth = width;
        mapHeight = height;
        map = new String[height][width];
        for(int i = 0; i < height; i++){
            for(int j = 0; j < width; j++){
                map[i][j] = ("X");
            }
        }
        int param = 0;
        int i = 0;
        int j = 0;
        int lowI = -1;
        int lowJ = 0;
        int highI = width;
        int highJ = height;
        int prob = 55;
        int numCheck = 99;
        for(i = 0; i < highI; i++){
                int result = (int)(Math.random()*100+1);
                int check = nextTo(j,i,"=");
                if(result > (numCheck - check*prob)){
                    map[j][i] = "=";
                    //System.out.println("check");
                }else{
                    map[j][i] = " ";
                    //System.out.println("check");
                }
                param++;
                //System.out.println("i; " + i + " j: " + j);
        }
        i--;
        j++;
        highI = i;
        while(param < (width*height)){
            for(j = lowJ+1; j < highJ; j++){
                int result = (int)(Math.random()*100+1);
                int check = nextTo(j,i,"=");
                if(result > (numCheck - check*prob)){
                    map[j][i] = "=";
                    //System.out.println("check");
                }else{
                    map[j][i] = " ";
                    //System.out.println("check");
                }
                param++;
                //System.out.println("i; " + i + " j: " + j);
            }
            j--;
            i--;
            highJ = j;
            for(i = highI-1; i > lowI; i--){
                int result = (int)(Math.random()*100+1);
                int check = nextTo(j,i,"=");
                if(result > (numCheck - check*prob)){
                    map[j][i] = "=";
                    //System.out.println("check");
                }else{
                    map[j][i] = " ";
                    //System.out.println("check");
                }
                param++;
                //System.out.println("i; " + i + " j: " + j);
            }
            i++;
            j--;
            lowI = i;
            for(j = highJ-1; j > lowJ; j--){
                int result = (int)(Math.random()*100+1);
                int check = nextTo(j,i,"=");
                if(result > (numCheck - check*prob)){
                    map[j][i] = "=";
                    //System.out.println("check");
                }else{
                    map[j][i] = " ";
                    //System.out.println("check");
                }
                param++;
                //System.out.println("i; " + i + " j: " + j);
            }
            j++;
            i++;
            lowJ = j;
            for(i = lowI+1; i < highI; i++){
                int result = (int)(Math.random()*100+1);
                int check = nextTo(j,i,"=");
                if(result > (numCheck - check*prob)){
                    map[j][i] = "=";
                    //System.out.println("check");
                }else{
                    map[j][i] = " ";
                    //System.out.println("check");
                }
                param++;
                //System.out.println("i; " + i + " j: " + j);
            }
            i--;
            j++;
            highI = i;
        }   
    }
    private int nextTo(int x, int y, String c){
        int count = 0;
        if((x < (mapHeight - 1))){
            if(map[x+1][y].equals(c)){
                count++;
            }
        }
        if((x > 0)&&(map[x-1][y].equals(c))){
            count++;
        }
        if((y < (mapWidth-1))){
            if(map[x][y+1].equals(c)){
                count++;
            }
        }
        if((y > 0)&&(map[x][y-1].equals(c))){
            count++;
        }
        return count;
    }
    public void printMap(){
        for(int i = 0; i < map.length; i++){
            for(int j = 0; j < map[0].length; j++){
                System.out.print(map[i][j]);
            }
            System.out.println();
        }
    }
    public void placeCitiesRandom(int n){
        int randVal;
        int check;
        for(int i = 0; i < mapHeight; i++){
            for(int j = 0; j < mapWidth; j++){
                if(map[i][j].equals("=")){
                    randVal = (int)(Math.random()*(amountLand()));
                    check = nextTo(i,j," ");
                    if(randVal < n + check*20){
                        map[i][j] = "Q";
                    }
                }
            }
        }
    }
    private int amountLand(){
        int count = 0;
        for(int i = 0; i < mapHeight; i++){
            for(int j = 0; j < mapWidth; j++){
                if(map[i][j].equals("=")){
                    count ++;
                }
            }
        }
        return count;
    }
    public void addMountains(int n){
        int width = mapWidth;
        int height = mapHeight;
        int param = 0;
        int i = 0;
        int j = 0;
        int lowI = -1;
        int lowJ = 0;
        int highI = width;
        int highJ = height;
        int prob = ((width*height)/21)*10;
        int numCheck = 99;
        for(i = 0; i < highI; i++){
                int result = (int)(Math.random()*(width*height));
                int check = nextTo(j,i,"∆");
                if(map[j][i].equals("=")){
                    if(result < n+check*prob){
                        map[j][i] = "∆";
                    }
                }
                param++;
        }
        i--;
        j++;
        highI = i;
        while(param < (width*height)){
            for(j = lowJ+1; j < highJ; j++){
                int result = (int)(Math.random()*(width*height));
                int check = nextTo(j,i,"∆");
                if(map[j][i].equals("=")){
                    if(result < n+check*prob){
                        map[j][i] = "∆";
                    }
                }
                param++;
            }
            j--;
            i--;
            highJ = j;
            for(i = highI-1; i > lowI; i--){
                int result = (int)(Math.random()*(width*height));
                int check = nextTo(j,i,"∆");
                if(map[j][i].equals("=")){
                    if(result < n+check*prob){
                        map[j][i] = "∆";
                    }
                }
                param++;
            }
            i++;
            j--;
            lowI = i;
            for(j = highJ-1; j > lowJ; j--){
                int result = (int)(Math.random()*(width*height));
                int check = nextTo(j,i,"∆");
                if(map[j][i].equals("=")){
                    if(result < n+check*prob){
                        map[j][i] = "∆";
                    }
                }
                param++;
            }
            j++;
            i++;
            lowJ = j;
            for(i = lowI+1; i < highI; i++){
                int result = (int)(Math.random()*(width*height));
                int check = nextTo(j,i,"∆");
                if(map[j][i].equals("=")){
                    if(result < n+check*prob){
                        map[j][i] = "∆";
                    }
                }
                param++;
            }
            i--;
            j++;
            highI = i;
        }   
    }
    public void addForests(int n){
        int width = mapWidth;
        int height = mapHeight;
        int param = 0;
        int i = 0;
        int j = 0;
        int lowI = -1;
        int lowJ = 0;
        int highI = width;
        int highJ = height;
        int prob = ((width*height)/18)*10;
        int numCheck = 99;
        for(i = 0; i < highI; i++){
                int result = (int)(Math.random()*(width*height));
                int check = nextTo(j,i,"l");
                if(map[j][i].equals("=")){
                    if(result < n+check*prob){
                        map[j][i] = "l";
                    }
                }
                param++;
        }
        i--;
        j++;
        highI = i;
        while(param < (width*height)){
            for(j = lowJ+1; j < highJ; j++){
                int result = (int)(Math.random()*(width*height));
                int check = nextTo(j,i,"l");
                if(map[j][i].equals("=")){
                    if(result < n+check*prob){
                        map[j][i] = "l";
                    }
                }
                param++;
            }
            j--;
            i--;
            highJ = j;
            for(i = highI-1; i > lowI; i--){
                int result = (int)(Math.random()*(width*height));
                int check = nextTo(j,i,"l");
                if(map[j][i].equals("=")){
                    if(result < n+check*prob){
                        map[j][i] = "l";
                    }
                }
                param++;
            }
            i++;
            j--;
            lowI = i;
            for(j = highJ-1; j > lowJ; j--){
                int result = (int)(Math.random()*(width*height));
                int check = nextTo(j,i,"l");
                if(map[j][i].equals("=")){
                    if(result < n+check*prob){
                        map[j][i] = "l";
                    }
                }
                param++;
            }
            j++;
            i++;
            lowJ = j;
            for(i = lowI+1; i < highI; i++){
                int result = (int)(Math.random()*(width*height));
                int check = nextTo(j,i,"l");
                if(map[j][i].equals("=")){
                    if(result < n+check*prob){
                        map[j][i] = "l";
                    }
                }
                param++;
            }
            i--;
            j++;
            highI = i;
        }   
    }
    /*private void test(){
        int i = 0;
        int j = 0;
        int lowI = 0;
        int lowJ = 0;
        int highI = map.length;
        int highJ = map[0].length;
        while(true){
            for(i = lowI; i < highI; i++){
                map[i][j] = "yo";
            }
            highI = i;
            for(j = lowJ; j < highJ; j++){
                map[i][j] = "yo";
            }
            highJ = j;
            for(i = highI; i > lowI; i--){
                map[i][j] = "yo";
            }
            lowI = i;
            for(j = highJ; j > lowJ; j--){
                map[i][j] = "yo";
            }
            lowJ = j;
        }
    }
    */
}
