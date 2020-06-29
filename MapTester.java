
/**
 * Write a description of class MapTester here.
 *
 * @author (your name)
 * @version (a version number or a date)
 */
public class MapTester
{
   public static void main(String[] args){
       ContinentMap tamriel = new ContinentMap(200,100);
       tamriel.addMountains(250);
       tamriel.addForests(250);
       tamriel.placeCitiesRandom(25);
       tamriel.printMap();
   }
}
