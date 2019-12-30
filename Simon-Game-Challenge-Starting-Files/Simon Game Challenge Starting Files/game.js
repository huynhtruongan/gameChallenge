const buttonColours = ['red','blue','green','yellow'];
let gamePattern = [];
let start = false;
let h1 = document.querySelector('h1');
let round = 0;
let btns = document.querySelectorAll('.btn');


function nextSequence(){
   
    
    let randomnumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomnumber];

    flashAnimation(randomChosenColour);
    gamePattern.push(randomChosenColour);
    
    console.log(randomChosenColour)
    // console.log('randomColor', randomChosenColour);
    
    
    let btnSound = new Audio(`sounds/${randomChosenColour}.mp3`);
    
    const playedPromise = btnSound.play();
    if (playedPromise) {
            playedPromise.catch((e) => {
                if (e.name === 'NotAllowedError' ||
                    e.name === 'NotSupportedError') {
                    //console.log(e.name);
                }
            });
        } 
  
         
}
function flashAnimation(randomColor){
    let flashBtn = document.querySelector(`#${randomColor}`);
    flashBtn.classList.add('flash');
    setTimeout(function(){
        flashBtn.classList.toggle("flash");
    },1000)
}
function animatePress(currentColour){
    let btn = document.querySelector(`#${currentColour}`);
    btn.classList.add('pressed');
    setTimeout(function(){
        btn.classList.toggle("pressed");
        console.log('toggle')
    },100)
}

document.onkeypress = function(){
    if(!start){
        h1.innerHTML = "Level "+round;
        setTimeout(function(){
            nextSequence();
            check();
        },500)
        start = true;
    }
}
function check(){
    let count = 0;
    btns.forEach(btn=>btn.addEventListener("click", function(){
     console.log(count);
     
     animatePress(btn.id)

     let btnSound = new Audio(`sounds/${btn.id}.mp3`);
    
    const playedPromise = btnSound.play();
    if (playedPromise) {
            playedPromise.catch((e) => {
                if (e.name === 'NotAllowedError' ||
                    e.name === 'NotSupportedError') {
                    //console.log(e.name);
                }
            });
        } 

     console.log(gamePattern);
     if(btn.id===gamePattern[count]){
        count++;
        if(count===gamePattern.length){
            setTimeout(function(){
                count = 0;
                round++;
                nextSequence()
                h1.innerHTML = 'Level '+ round;
            },1000)
        }
     }else {
        h1.innerHTML = 'wroong answer!!!';
        setTimeout(function(){
            location.reload();
        },1000)
     }
 
}))
}

