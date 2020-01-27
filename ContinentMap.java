
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
        int prob = 45;
        for(i = 0; i < highI; i++){
                int result = (int)(Math.random()*100+1);
                int check = nextTo(i,j,"#");
                map[i][j] = "A";
                if(result > (90 - check*prob)){
                    map[i][j] = "#";
                    //System.out.println("check");
                }else{
                    map[i][j] = "_";
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
                int check = nextTo(i,j,"#");
                if(result > (90 - check*prob)){
                    map[i][j] = "#";
                    //System.out.println("check");
                }else{
                    map[i][j] = "_";
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
                int check = nextTo(i,j,"#");
                if(result > (90 - check*prob)){
                    map[i][j] = "#";
                    //System.out.println("check");
                }else{
                    map[i][j] = "_";
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
                int check = nextTo(i,j,"#");
                if(result > (90 - check*prob)){
                    map[i][j] = "#";
                    //System.out.println("check");
                }else{
                    map[i][j] = "_";
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
                int check = nextTo(i,j,"#");
                map[i][j] = "A";
                if(result > (90 - check*prob)){
                    map[i][j] = "#";
                    //System.out.println("check");
                }else{
                    map[i][j] = "_";
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
        if((x < (mapWidth - 1))){
            if(map[x+1][y].equals(c)){
                count++;
            }
        }
        if((x > 0)&&(map[x-1][y].equals(c))){
            count++;
        }
        if((y < (mapHeight-1))){
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
