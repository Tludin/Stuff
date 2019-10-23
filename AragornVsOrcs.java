
/**
 * Aragorn is fighting Morannon orcs at the Black Gate.
 * He can fight any number of orcs at a time, just cahnge the numbers, right now he will fight one at a time.
 * aragorn will fight untill he dies.
 * @Tomas L., Owen B., Rohan S., Christian S.
 * 10/28/2019
 */
public class AragornVsOrcs
{
	public static void main(String[] args)
	{
		int totalOrcsKilled = 0;
		int n = 10000;
		int maxOrcs = 0;
		int minOrcs = 0;

		for(int i=0; i<n; i++)
		{
			int orcCasualty = 0;
			int aragornWounds = 3;
			boolean aragornAlive = true;

			while (aragornAlive == true)
			{
				int numAragornDice = 3;
				int aragornDice[] = new int[numAragornDice];

				for ( int j = 0; j < numAragornDice; j++ )
				{
					aragornDice[j] = (int)(6*Math.random()+1);
				}


				int nOrcs = 1;
				int orcDice[] = new int[nOrcs];

				for ( int j = 0; j < nOrcs; j++ )
				{
					orcDice[j] = (int)(6*Math.random()+1);
				}


				
				int aragornHighest = getMax(aragornDice);
				int orcHighest = getMax(orcDice);

				if (aragornHighest >= orcHighest){
					for (int j=1; j<=aragornDice.length; j++){
						int aragornHit = (int)(6*Math.random()+1);

						if(aragornHit >= 4) {
							orcCasualty++;
						}
					}
				}
				
				if (orcHighest > aragornHighest){
					for (int j=1; j<=orcDice.length; j++){
						int orcHit = (int)(6*Math.random()+1);

						if (orcHit >= 5) {
							aragornWounds--;
						}
					}
				}
				
				if(aragornWounds <= 0){
					aragornAlive = false;
					// System.out.println("Total Orcs Killed: " + orcCasualty);
					totalOrcsKilled = totalOrcsKilled + orcCasualty;
					if(orcCasualty > maxOrcs){
						maxOrcs = orcCasualty;
					}

					if(orcCasualty < minOrcs){
						minOrcs = orcCasualty;
					}
				}
			}
		}
		
		int orcAverage = totalOrcsKilled / n;

		System.out.println("Average number of orcs killed: " + orcAverage);
		System.out.println("Maximum number of orcs killed: " + maxOrcs);
		System.out.println("Minimum number of orcs killed: " + minOrcs);
	}


	public static int getMax(int[] dieArray){
		int maxValue = dieArray[0];

		for(int val : dieArray )
		{
			maxValue = (val > maxValue ? val : maxValue);
		}

		return maxValue;
	}
}
