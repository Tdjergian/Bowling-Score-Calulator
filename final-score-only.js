//takes in an array of scores corresponding to each throw in order. Assumes the correct 
//number of throws for a game and the correct plausible scores for each throw.

function bowlingScore (scores) {
    let frames = 1;
    let ballNumber = 1;
    let frameScore = 0;
    let total = 0;
    let multipliers = [];
    scores.forEach((attempt, index, array)=>{
        
        console.log('frame number: ', frames)
        console.log('ballNumber: ', ballNumber)
        console.log('frameScore: ', frameScore)
        console.log('multipliers: ', multipliers)
        
        //case for frame 10 rules 
        if (frames == 10){

            total += attempt*(multipliers.length + 1);
            multipliers = multipliers.map(mult => {return --mult});
            multipliers = multipliers.filter(mult=> mult !== 0);
            
            return
        }
        
        //strike
        if (ballNumber == 1 && attempt == 10){
            console.log('strike')
            
            //add to frame score
            frameScore += attempt*(multipliers.length + 1);
            
            //decrement multipliers
            multipliers = multipliers.map(mult => {return --mult});
            multipliers = multipliers.filter(mult=> mult !== 0)
            
            //frame done, add to total
            total += frameScore
            
            //add multiplier for strike
            multipliers.push(2)
            
            //reset frame
            frames++;
            frameScore = 0;
            ballNumber = 1;
            
            return
        }
        //spare
        if(ballNumber == 2 && array[index-1] + attempt == 10){
            console.log('spare')
            
            frameScore += attempt*(multipliers.length + 1);
            
            multipliers = multipliers.map(mult => {return --mult});
            multipliers = multipliers.filter(mult=> mult !== 0)
            
            total += frameScore
            
            multipliers.push(1)
            
            frames++;
            frameScore = 0;
            ballNumber = 1;

            return 
        }
        
        //open frame
        if(ballNumber == 2 && array[index-1] + attempt < 10){
            console.log('second ball, open frame')
            
            frameScore += attempt*(multipliers.length + 1) ;
            
            multipliers = multipliers.map(mult => {return --mult});
            multipliers = multipliers.filter(mult=> mult !== 0)
            
            total += frameScore;
            
            frames++;
            frameScore = 0;
            ballNumber = 1;
           
            return
        }
        
        //first ball not strike
        console.log('first ball, no strike')
        frameScore += attempt*(multipliers.length + 1)
        
        multipliers = multipliers.map(mult => {return --mult});
        multipliers = multipliers.filter(mult=> mult !== 0)
        
        ballNumber++; 
    });
    
    return total;
}

console.log(bowlingScore([4,5,1,9,7,2,9,1,10,5,4,3,3,4,6,4,3,4,6,2]))
