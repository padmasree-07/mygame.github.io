let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadImage = (src,callback) =>{
    let img = document.createElement("img");
    img.onload = () => callback(img) ;
    img.src = src;
};


let imagePath =(frameNumber,animation) =>{
    return "image pics/"+ animation +"/"+ frameNumber+".png" ;
};

let frames = {
    idle : [1,2,3,4,5,6,7,8],
    kick : [1,2,3,4,5,6,7],
    punch : [1,2,3,4,5,6,7],
    block :[1,2,3,4,5,6,7,8,9],
    backward :[1,2,3,4,5,6],
    forward :[1,2,3,4,5,6]
};

let loadImages = (callback) =>{
    let images= { idle:[] , kick :[],  punch:[], block:[], backward:[] , forward:[] };
    let imagesToload = 0 ;

    ["idle" , "kick" , "punch","block", "backward","forward" ].forEach((animation) => {
        let animationFrames = frames[animation] ;
        imagesToload = imagesToload + animationFrames.length ;

        animationFrames.forEach( (frameNumber) => {
            
        let path = imagePath(frameNumber,animation);

        loadImage(path,  (image) =>{ 
            images[animation][frameNumber-1] = image ;
            imagesToload = imagesToload - 1 ;

        if(imagesToload == 0){
            callback(images);
        }
        });
            
        });
    
        }) ;

    };


let animate = (ctx , images , animation ,  callback) => {
    images[animation].forEach((image , index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image,0,0,500, 500) ;
        } , index * 100);
    });
    setTimeout(callback , images[animation].length * 100);
};
 

loadImages( (images) => {
    let queueAnimation = [];

    let  aux = () => {
       let selectedAnimation ;

       if(queueAnimation.length === 0){
           selectedAnimation ="idle" ;
       }else {
           selectedAnimation = queueAnimation.shift();
       }

       animate(ctx , images , selectedAnimation , aux)  
    };

    aux () ;
  

     document.getElementById('kick').onclick = () =>{
       queueAnimation.push('kick') ;
     };

     
     document.getElementById('punch').onclick = () =>{
        queueAnimation.push('punch') ;
      }; 

    document.getElementById('forward').onclick = () =>{
        queueAnimation.push('forward') ;
      };

      document.getElementById('backward').onclick = () =>{
        queueAnimation.push('backward') ;
      };  
      
      document.getElementById('block').onclick = () =>{
        queueAnimation.push('block') ;
      };

    
    document.addEventListener("keyup", (event) =>{
        const key = event.key;
        switch(key) {
            case 'ArrowLeft':  queueAnimation.push('kick');
                               break;
            case "ArrowRight":  queueAnimation.push('punch');
                               break ;
            case "ArrowUp":    queueAnimation.push("forward");
                                break ;
             case "ArrowDown":  queueAnimation.push("backward");
                                break ;                     
             default : queueAnimation.push("block");
        }
    });

});


