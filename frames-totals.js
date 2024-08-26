//returns an array of the total scores at the end of each frame

function bowlingScore (scores) {
    let frames = 1;
    let ballNumber = 1;
    let frameScore = 0;
    let total = 0;
    let allFrames = [];
    let multipliers = [];
    scores.forEach((attempt, index, array)=>{
        
        // console.log('frame number: ', frames)
        // console.log('ballNumber: ', ballNumber)
        // console.log('frameScore: ', frameScore)
        // console.log('multipliers: ', multipliers)
        
        
        //frame 10 rules 
        if (frames == 10){
             
            frameScore += attempt 
            
            //add attempt to previous frames
            multipliers.forEach((mult, multIndex)=>{
                allFrames[frames-multIndex-2]+=attempt
            });
            
            // decrement multipliers
            multipliers = multipliers.map(mult => {return --mult});
            multipliers = multipliers.filter(mult=> mult !== 0);
            
            return
        }
        
        //strike
        if (ballNumber == 1 && attempt == 10){
            console.log('strike!')
            
            //add to list of all Frames
            allFrames.push(10);
            
            //add attempt score to previous frames
            multipliers.forEach((mult, multIndex)=>{
                allFrames[frames-multIndex-2]+=attempt
            });
            
            //decrement multipliers
            multipliers = multipliers.map(mult => {return --mult});
            multipliers = multipliers.filter(mult=> mult !== 0)
            
            
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
            console.log('spare!')
            
            //add frame to list of frames
            allFrames.push(10);
            
            //add attempt score to previous frames
            multipliers.forEach((mult, multIndex)=>{
                allFrames[frames-multIndex-2]+=attempt
            });
            
            //decrement multipliers
            multipliers = multipliers.map(mult => {return --mult});
            multipliers = multipliers.filter(mult=> mult !== 0)
            
            
            //add multiplier for spare
            multipliers.push(1)
            
            //reset frame
            frames++;
            frameScore = 0;
            ballNumber = 1;

            return 
        }
        
        //open frame
        if(ballNumber == 2 && array[index-1] + attempt < 10){
            console.log('second ball, open frame')
            
            frameScore += attempt;
            
             multipliers.forEach((mult, multIndex)=>{
                allFrames[frames-multIndex-2] += attempt
            });
            
            multipliers = multipliers.map(mult => {return --mult});
            multipliers = multipliers.filter(mult=> mult !== 0)
            
            allFrames.push(frameScore)
        
            frames++;
            frameScore = 0;
            ballNumber = 1;
           
            return
        }
        
        //first ball not strike
        console.log('first ball, no strike')
        frameScore += attempt
        
        multipliers.forEach((mult, multIndex)=>{
            allFrames[frames-multIndex-2]+=attempt
        });
        
        multipliers = multipliers.map(mult => {return --mult});
        multipliers = multipliers.filter(mult=> mult !== 0)
        
        ballNumber++; 
    });
    
    // add the tenth frame to list of frames
    allFrames.push(frameScore)
    
    //create final list for total at end of each frame with final frame being the total
    let finalFrames = [];
    
    allFrames.forEach(frame=>{
        total += frame;
        finalFrames.push(total)
    });
    
    console.log('Game over: ', finalFrames)
    
    
    return finalFrames
}

console.log(bowlingScore([10,10,10,10,10,10,10,10,10,10,10,10]))
