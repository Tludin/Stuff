
public class AragornVOrcsTEST
{
    public static void main(String[] args){
        int totalOrcsKilled = 0;
        int n = 100000;
        int maxOrcs = 0;
        int minOrcs = 0;
        int nAragornDice = 3;
        int nOrcDice = 1;
        for(int i=0; i<n; i++){
            int orcCasualty = 0;
            int aragornWounds = 3;
            boolean aragornAlive = true;
            while (aragornAlive = true){
                int result = (int)(1728*Math.random()+1);
                if (result > 125){
                        int aragornHit = (int)(8*Math.random()+1);
                        if(aragornHit >= 2){
                            orcCasualty +=1;
                        }
                }
                if (result < 126){
                        int orcHit = (int)(6*Math.random()+1);
                        if (orcHit >= 5){
                            aragornWounds = aragornWounds - 1;
                        }
                }
                if(aragornWounds <= 0){
                    aragornAlive = false;
                    System.out.println("Orcs Killed: " + orcCasualty);
                    totalOrcsKilled = totalOrcsKilled + orcCasualty;
                    if(orcCasualty > maxOrcs){
                        maxOrcs = orcCasualty;
                    }
                    if(orcCasualty < minOrcs){
                        minOrcs = orcCasualty;
                    }
                    break;
                }
            }
        }
        int orcAverage = totalOrcsKilled/n;
        System.out.println("Average number of orcs killed: " + orcAverage);
        System.out.println("Maximum number of orcs killed: " + maxOrcs);
        System.out.println("Minimum number of orcs killed: " + minOrcs);
    }
}
