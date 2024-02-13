import MyObject from "./MyObject.mjs";
class Player extends MyObject{
    constructor(name, coords = [0,0]){
        super(name,coords[0],coords[1]);
        this.sitPos = 3;
        this.otherSide = false;
    }                
    
    jump(){ 
        //jump function
        if(this.docObj.classList !== "jump"){
            this.docObj.classList.add("jump") ;
        }
        setTimeout(() => {
            this.docObj.classList.remove("jump");
        },400);
    }
    sit(animPack,a = 0){ 
        // sit function
        switch (a){
            case 0: 
                if(this.docObj.classList !== animPack[1]){
                    this.docObj.classList.remove(animPack[0]);
                    this.docObj.classList.add(animPack[1])   ;      
                    this.sitPos = 1;
                }  
                break;
            case 1: 
                this.docObj.classList.remove(animPack[1]);
                this.docObj.classList.add(animPack[0]);
                this.sitPos = 3;
                break;
        }   
    }
    up(koef){
        switch(koef){
            case 0:
                clearInterval(this.flyingMove);
                this.flyingMove = setInterval(() => {
                    if(this.changeXY()[1]+this.diffY >= -131 ){
                        this.posMyY-=5;
                        this.docObj.style.top=(this.posMyY+this.diffY).toString() + 'px';
                        this.changeXY();
                    }
                }, 25);
                
                break;
            case 1: 
                clearInterval(this.flyingMove);
                break;
        }  
    }
    down(koef){
        switch(koef){
            case 0:
                clearInterval(this.flyingMove);
                this.flyingMove = setInterval(()=>{
                    if(this.changeXY()[1]+this.diffY <= this.posY){
                    this.posMyY+=5;
                    this.docObj.style.top=(this.posMyY+this.diffY).toString() + 'px';
                    this.changeXY();
                }},25);
                break;
            case 1: 
                clearInterval(this.flyingMove);
                break;
        
        }
        
    }
    shoot(){
        this.changeXY();
        const bullet = document.createElement("div");
        document.getElementById('game').appendChild(bullet);
        bullet.style.position = 'relative';
        bullet.style.left ='550px';
        bullet.style.top = ((Math.abs(this.posMyY + this.diffY) + 145)*(-1)).toString() + 'px'; // -145 - bullet base, 13 -dino ?
        bullet.style.backgroundColor = 'red';
        bullet.id = 'bullet';
        bullet.style.width = '45px';
        bullet.style.height = '10px';
        bullet.classList.add('bulletAnim');
        const bulletObject = new MyObject('bullet', 0,0);
        return bulletObject;      
    }   
    setSideInfo(side){
        this.otherSide = side;
    }
    getSideInfo(){
        return this.otherSide;
    }
    //TODO: Update MoveToSecondStage idea.
    MoveToSecondStage(animPack, objectsToStop){
        this.docObj.style.transition = 'none';
        objectsToStop.bird.classList.remove('birdAnim');
        objectsToStop.bird.style.visibility = 'hidden';
        const move = setInterval(() => {
            if(this.posMyX >= 520){
                this.docObj.style.transition = '.3s';
                setTimeout(()=>{this.docObj.style.transition = 'none'}, 300);
                clearInterval(move); 
                this.docObj.style.transform = "scaleX(-1)"; 
                objectsToStop.cloud.classList.remove('cloudMov');
                objectsToStop.road.classList.remove('roadMov');
                objectsToStop.dino.classList.remove(animPack[0]);
                objectsToStop.dino.style.backgroundImg = 'url(img/mDino/flyingDino)';
                objectsToStop.dino.classList.add(animPack[2]);
                this.docObj.style.width = '70px';
                this.docObj.style.backgroundSize = '70px 50px';
                this.otherSide = true;
            }
            this.posMyX+=3; //15
            this.docObj.style.left = (this.diffX+this.posMyX).toString() + "px";
            this.changeXY();
            
        },25); // 50
    }
} 
export default Player;