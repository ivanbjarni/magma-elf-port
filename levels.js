setLevel = function(x)
{
	//Level 1
	if(x==1)
	{
		heightmap.curve=function(x)
		{
			if(x<-800){return Math.sin(x/200)*40;}
			if(x<-700){return -230;}
			if(x<-600){return -180;}
			if(x<-500){return -130;}
			if(x<-400){return -80;}
			if(x<-300){return -30;}
			if(x<-50){return 30;}
			if(x<50){return 20;}
			if(x<100){return 0;}
			if(x<180){return -800;}
			if(x<290){return -800+x;}
			return -20;
		}

		for(var i=0;i<225;i++)
		{
		    if(i%6!=4&&i%31!=5)
		    entityManager.addObstacle({
		        cx : Math.floor(i/15)*80-600,
		        cy : (i%15)*80-1200,

		        halfHeight : 12,
		        halfWidth : 12
		    });
		}

		entityManager.addObstacle({
		        cx : -820,
		        cy : -120,

		        halfHeight : 12,
		        halfWidth : 12
		});

		entityManager.addObstacle({
		        cx : -850,
		        cy : -50,

		        halfHeight : 12,
		        halfWidth : 12
		});

	}//End of level 1
}