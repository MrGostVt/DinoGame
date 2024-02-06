
import Player from "./player.mjs"
import Enemy from "./Enemies.mjs"
import MyObject from "./MyObject.mjs"

class game{
    constructor(){
        
        
        this.kd = false
        // 0 -standart, 1 - colored, 2-gop
        this.skinPack = {0:['dinoMov','dinoDMov', 'dinoFlying','cloud','url(img/mDino/myDino.png)'], 
        1:['coloredDinoMov','coloredDinoDMov','coloredDinoFlying', 'cloudColored','url(img/mDino/dinoColored.png)'],
        2:['gopDinoMov', 'gopDinoDMov','gopDinoFlying', 'cloudColored', 'url(img/mDino/gopDino.png'],
        }
        this.skinPackType = 0
        this.birdStatus = 0
        this.points = {
            hiPoints: [0,0,0,0],
            points:[0,0,0,0],
            point: document.getElementById("points"),
        }
        //функція руху хмар.
        function cloudFunction(settings){
            const backgroundPosX = parseInt(window.getComputedStyle(this.docObj).getPropertyValue('background-position-x'));
            // console.log('CLOUDS POSITIONS' + backgroundPosX)
            if(backgroundPosX >= 440 && backgroundPosX <= 560){this.changedPosition = 0}
            if(backgroundPosX >= -150 && backgroundPosX<=-140 && this.changedPosition == 0 ){ //захист від багатої кількості змін текстур на одному місці.
                this.changedPosition = 1
                console.log('cloudChanged')
                const rnd = Math.floor(0 + Math.random() * (3 + 1 - 0))
                
                this.docObj.style.backgroundImage = settings.cloudUrls[rnd]
                // this.docObj.style.width = smth.cloudWdths[rnd].toString()+"px" 
            }
        }
        //функція руху нло
        function ufoFunc(){
            
            this.changeXY()
            if(this.smth.firstStart){ //підготовка до старту анімації, та старт
                this.docObj.classList.add('ufoAnim'); 
                console.log('ufoStartedAttack'); 
                this.docObj.style.visibility = "visible"; 
                this.smth.firstStart = false;
            }
            if(this.posMyX >= 560 && this.posMyX <= 570 ){
                
                
                // alert(this.smth.startBirdPoints)
                console.log("flyEnd")
                this.docObj.style.left = '45px' // на початок
                const rnd = Math.floor(0 + Math.random() * (150 + 1 - 0))- 75 //рандомна висота
                
                console.log(rnd)
                this.docObj.style.top = ((this.posY + rnd)).toString()+"px"
                return 0
                
            }
            else{
                //movement
                this.docObj.style.left = ((this.posMyX+5)+this.diffX).toString()+"px"
                return 1
            }
        }
        function birdAnimat(positions){   // bird animation
            if(this.smth.firstStart){console.log(12); this.docObj.classList.add('birdAnim'); this.docObj.style.visibility = "visible"; this.smth.firstStart = false;}
            if(positions[0] >= -5 && positions[0] <= 2 ){
                
                
                this.docObj.classList.remove("birdAnim")
                this.smth.firstStart = true
                this.smth.startBirdPoints +=75//75
                // alert(this.smth.startBirdPoints)
                this.docObj.style.visibility = "hidden"  //disable bird on next 75 points
                console.log("flyEnd")
                this.docObj.style.left = "610px"
                const rnd = Math.floor(0 + Math.random() * (34 + 1 - 0))- 17
                
                // console.log(rnd)
                this.docObj.style.top = ((this.posY - rnd)+this.diffY).toString()+"px"
                return 0
                
            }
            else{
                this.docObj.style.left = ((positions[0]-4)+this.diffX).toString()+"px"
                return 1
            }
        }
        this.cheat = 0
        this.player = new Player('dino',[15,3])
        this.cactus = new Enemy('cactus',[560, 0], 0)                       //65
        this.bird = new Enemy('bird', [560, 10], 1, birdAnimat, {startBirdPoints:65, firstStart : true})
        this.road = new MyObject('road',0,0)
        this.clouds = new MyObject('clouds',560,25, cloudFunction, )
        this.ufo = new Enemy('ufo', [0, 10],2, ufoFunc, {firstStart : true, kd:0})
        this.startStop = false // для меню паузи, старт-стоп
        this.firstStart = true // для кей евентів
    }
    //функція лічільника з прискоренням
    pointsFunc(){
        this.pointsCycle = setInterval(() => {
            
            
            let i = 3
            this.points.points[i]+=1
            if(this.points.points[i] == 9){
                
                this.points.points[i] = 0
                this.points.points[i-1]+=1
                
                if(this.points.points[i-1] == 9 && this.points.points[i] == 0){                    
                    this.points.points[i-1] = 0        
                    this.points.points[i-2] += 1                
                   
                    if(this.points.points[i-2] == 9 && this.points.points[i-1]  == 0 && this.points.points[i] == 0){   
                        this.points.points[i-2] = 0
                        this.points.points[i-3]+=1
                        
                    }
                }
            }
            
            this.points.point.textContent ="HI "+ this.points.hiPoints.join('') + " " + this.points.points.join('') 
            if(this.speedN>=65 && this.points.points[i] == 0 && parseInt(this.points.points.join('')) >= this.points.pSpeedUpdate ){ //пришвидшення
                this.speedN-=35;  // прискорення на 35 мс
                clearInterval(this.pointsCycle); //вимкнення інтервалу для перезапуску
                this.points.pSpeedUpdate = parseInt(this.points.pSpeedUpdate * 0.7 + this.points.pSpeedUpdate);//розрахування коли буде наступне прискорення
                // alert(this.points.pSpeedUpdate +'  ' + this.speedN)
                this.pointsFunc();//запуск функції з оновленими параметрами
            }
        }, this.speedN)
        
    }
    //зміна скінпаку
    setSkinPack(skinpack){
    
        switch (skinpack){
            case 1: 
                document.getElementById('game').style.backgroundColor = 'rgb(231 213 125)';
                this.player.docObj.style.backgroundImage = 'url(img/mDino/dinoColored.png)';
                this.cactus.docObj.style.backgroundImage = 'url(img/cactusColored.png)';
                this.clouds.docObj.style.backgroundImage = 'url(img/cloudColored.png)'
                this.skinPackType = skinpack
                console.log('texturesChanged')
                break;
            case 0:
                document.getElementById('game').style.backgroundColor = '#e6e4e4';
                this.player.docObj.style.backgroundImage = 'url(/img/mDino/myDino)';
                break;
            case 2:
                // document.getElementById('game').style.backgroundColor = 'rgb(121, 121, 126)'; //rgb(129, 129, 185)
                this.player.docObj.style.backgroundImage = 'url(img/mDino/gopDino.png)';
                this.cactus.docObj.style.backgroundImage = 'url(img/gopCactus.png)';
                this.clouds.docObj.style.backgroundImage = 'url(img/cloudColored.png)'
                this.skinPackType = skinpack
        }
    }
    // закінчення гри
    endGame(koef = 0) {
        
        if(parseInt(this.points.points.join('')) > parseInt(this.points.hiPoints.join(''))){this.points.hiPoints = this.points.points.slice(0)}
        
        this.points.points = [0,0,0,0]
        this.points.point.textContent ="HI "+ this.points.hiPoints.join('') + " " + this.points.points.join('')
        // speedUpN = 250
        
        if(koef == 1){
            myBird.bird.classList.remove("birdAnim")
            myBird.bird.style.visibility = "hidden"
            k = 0 
        }
        if(!this.secondStageStart){
            this.player.up(1)
            this.player.down(1)
            this.secondStageStart = true
            this.player.docObj.classList.remove(this.skinPack[this.skinPackType][2])
            this.player.docObj.style.backgroundImage = this.skinPack[this.skinPackType][4]
            this.player.docObj.style.width = '50px'
            this.player.docObj.style.transform = "scaleX(1)";
            this.player.docObj.style.backgroundSize = '50px 50px'
            console.log(this.skinPack[this.skinPackType][4])
            this.player.docObj.style.left = '65px'
            this.player.docObj.style.top = '3px'
            this.cactus.docObj.style.visibility = 'visible'
            this.player.setSideInfo(false)
            this.ufo.smth.firstStart = true
            this.ufo.docObj.classList.remove('ufoAnim')
            this.ufo.docObj.style.left = '65px'
            this.ufo.docObj.style.top = '-215px'
            this.ufo.docObj.style.visibility = 'hidden'
            this.road.docObj.classList.remove('roadReverseMov')
            this.clouds.docObj.classList.remove('cloudReverseMov')
        }
        this.stop()
    }

    checkCollision(enemyPositions, playerPositions = [0,0], birdStatus = 0, ufoStatus = 0, bullet = 0){  //if you have 2 enemies, upload their positions to list; enemyTypes 0-cactus, 1-bird,2-asteroid
        const cactusPosX = enemyPositions.cactus[0]
        // console.log('cactusPosX: ' + cactusPosX + ' playerX: '+ playerPositions[0])
        
        if ((cactusPosX < playerPositions[0]+25 && cactusPosX > playerPositions[0] && playerPositions[1] >=3) && ufoStatus == 0){
            
            return 1
            
        }
        if (birdStatus == 1 && ufoStatus == 0 ){
            
            const birdX = enemyPositions.bird[0]
            const birdY = enemyPositions.bird[1] //max 55
            // console.log('BIRD POSITIONY = ' + birdY + ' PLAYER Y POS = ' + playerPositions[1])
            if(((birdY<=25 && birdY>8)&& birdX <= playerPositions[0]+25 && birdX > playerPositions[0] && this.player.sitPos >= 3) ||
             ((birdY>=25) && birdX <= playerPositions[0]+25 && birdX > playerPositions[0] && playerPositions[1]*-1<=birdY)){
                console.log("BIRD FINNALY ATTACKED ME")
                return 1
                
            }            
        }
        // Перевірка на зіткнення з нло. 
        if(ufoStatus !=0){  //70 - ширина
            
            if(((enemyPositions.ufo[0]+70 + this.ufo.diffX) >= parseInt(window.getComputedStyle(this.player.docObj).getPropertyValue("left"))) 
            && parseInt(window.getComputedStyle(this.player.docObj).getPropertyValue("top")) - 110 > enemyPositions.ufo[1]+this.ufo.diffY 
            && parseInt(window.getComputedStyle(this.player.docObj).getPropertyValue("top")) - 110  < enemyPositions.ufo[1]+this.ufo.diffY+70 ){
                console.log('UFO FINALLY ATTACKED ME')
                return 1
            }
        }
        if(ufoStatus != 0 && bullet != 0){
            // console.log( parseInt(window.getComputedStyle(bullet).getPropertyValue("top")) + 50 > enemyPositions.ufo[1]+this.ufo.diffY 
            // && parseInt(window.getComputedStyle(bullet).getPropertyValue("top")) + 50  < enemyPositions.ufo[1]+this.ufo.diffY+70 )
            if(((enemyPositions.ufo[0]+70 + this.ufo.diffX) >= parseInt(window.getComputedStyle(bullet).getPropertyValue("left"))) 
            && parseInt(window.getComputedStyle(bullet).getPropertyValue("top")) + 50 > enemyPositions.ufo[1]+this.ufo.diffY 
            && parseInt(window.getComputedStyle(bullet).getPropertyValue("top")) + 50  < enemyPositions.ufo[1]+this.ufo.diffY+70 ){
                    console.log('awesomeShoot')
                    this.ufo.docObj.style.visibility = 'hidden'
                    this.ufo.smth.firstStart = true
                    this.ufo.docObj.style.left = '45px'
                    this.kd = true
                    bullet.remove()
                    setTimeout(()=>{this.kd = false}, 5000)
                }
        }
        return 0
    }
    stop(){
        //зупинка гри
        //HiPointsCHanger
        
        if(parseInt(this.points.points.join('')) > parseInt(this.points.hiPoints.join(''))){this.points.hiPoints = this.points.points.slice(0)}
        //birdBlock
        this.bird.docObj.style.top = "35px"
        this.bird.docObj.classList.remove('birdAnim')
        this.bird.smth.firstStart = true
        this.bird.smth.startBirdPoints = 65
        this.bird.docObj.style.left = "610px"
        this.birdStatus = 0
        this.bird.docObj.style.visibility = 'hidden'
        //otherObject Block
        this.points.points = [0,0,0,0]
        this.startStop = false
        this.cactus.docObj.classList.remove('cactusMov')
        this.player.docObj.classList.remove(this.skinPack[this.skinPackType][0])
        this.road.docObj.classList.remove('roadMov')
        this.clouds.docObj.classList.remove('cloudMov')
        this.points.point.textContent ="HI "+ this.points.hiPoints.join('') + " " + this.points.points.join('')
        this.cheat = 0
        // this.player.style.backgroundImage=
        document.getElementById('modalMenu').style.display = 'block'       
    }
    pauseToSecStage(koef){
        //пауза для переходу
        if(koef == 1)
        {
            this.cactus.docObj.classList.remove('cactusMov')
            this.cactus.docObj.style.visibility = 'hidden'
            this.pause = true
            // this.road.docObj.classList.remove('roadMov')
            // this.clouds.docObj.classList.remove('cloudMov')
            clearInterval(this.pointsCycle)
            return true
        }
        if(koef == 0){
            this.pause = false
            this.road.docObj.classList.add('roadReverseMov')
            this.clouds.docObj.classList.add('cloudReverseMov')
            this.pointsFunc()
            return false
        }
    }
    start(){
        //запуск
        let ufoStatus = 0

        this.secondStageStart = true
        let activeShoot = false
        this.points.pSpeedUpdate = 25
        this.speedN = 250
        this.startStop = true
        this.road.docObj.classList.add('roadMov')
        this.clouds.docObj.classList.add('cloudMov')
        this.cactus.docObj.classList.add('cactusMov')
        console.log(this.skinPack[this.skinPackType][0])
        this.player.docObj.classList.add(this.skinPack[this.skinPackType][0])
        if (this.firstStart){
            document.addEventListener("keydown", (event) => {
                if(this.startStop && !this.pause){
                    if ((event.code == 'ArrowUp'  || event.code == 'KeyW')) {
                        switch (this.cheat){
                            case 0: this.cheat+=1; break;
                            case 1: this.cheat+=1; break;
                            case 2: this.cheat=0; break;
                            case 3: this.cheat+=1; break;
                            case 4: this.cheat=0; break;
                            case 5: this.cheat=0; break;
                        }
                        console.log(this.cheat)
                        // console.log(this.secondStageStart + ' secondStageStart(keydown)')
                        if(this.secondStageStart){this.player.jump();}
                            

                    } //keyboard events listener
                    if((event.code == 'Space' || event.code == 'KeyF') && !this.secondStageStart && !activeShoot){
                        this.bulletAction = this.player.shoot()
                        activeShoot = true
                        setTimeout(()=>activeShoot = false, 2000)
                    }
                }
                // if((event.code == 'ArrowDown' || event.code == 'KeyS') && this.startStop && !this.pause){
                      
                // }
            });
            
            document.addEventListener("keyup", (event) => {
                if(this.startStop && !this.pause){
                    if((event.code == 'ArrowDown' || event.code == 'KeyS') ){
                        if(this.secondStageStart){this.player.sit(this.skinPack[this.skinPackType],1)}
                        if(!this.secondStageStart){this.player.down(1)}      
                    }
                    if ((event.code == 'ArrowUp' || event.code == 'KeyW') ){
                        if(!this.secondStageStart){this.player.up(1)}  
                    }
                }
                
            })
            document.addEventListener("keypress", (event) => {
                if(this.startStop && !this.pause){
                    console.log(this.startStop + ' -StartStop, pause - ' + this.pause)
                    if((event.code == 'ArrowDown' || event.code == 'KeyS')){
                        switch (this.cheat){
                            case 0: this.cheat=0; break;
                            case 1: this.cheat=0; break;
                            case 2: this.cheat+=1; break;
                            case 3: this.cheat=0; break;
                            case 4: this.cheat+=1; break;
                            case 5: this.cheat+=1; console.log('youREallyDidIT');  break;
                        }
                        
        
                        console.log(this.cheat)
                        if(this.secondStageStart){this.player.sit(this.skinPack[this.skinPackType])}   
                        if(!this.secondStageStart){this.player.down(0)}       
                    }
                    if ((event.code == 'ArrowUp'  || event.code == 'KeyW') && !this.secondStageStart){
                        console.log('trueUP') 
                        if(!this.secondStageStart){this.player.up(0)}  
                    }
                }
                
                
            })
            this.firstStart = false
        }
        this.pointsFunc()
        const gameCycle = setInterval(()=>{
            const enemyPositions = {cactus:[0,0], bird:[0,0], ufo:[0,0]}
            this.clouds.startObjectFunc({cloudUrls:[`url(img/${this.skinPack[this.skinPackType][3]}.png)`,`url(img/${this.skinPack[this.skinPackType ][3]}1.png)`,
            `url(img/${this.skinPack[this.skinPackType ][3]}2.png)`,`url(img/${this.skinPack[this.skinPackType][3]}3.png)`],})
            if(this.secondStageStart){
                
                enemyPositions.cactus = this.cactus.changeXY()
                

                if((parseInt(this.points.points.join(''))>= this.bird.smth.startBirdPoints) && this.secondStageStart){
                    this.birdStatus = this.bird.startObjectFunc(this.bird.changeXY())
                    enemyPositions.bird = this.bird.changeXY()
                    
                }
            }
            const playerPositions = this.player.changeXY()
            
            
            
            
            if(parseInt(this.points.points.join(''))>=15){ //1000
                let otherSide = this.player.getSideInfo()
                if(this.secondStageStart)
                {
                    
                    this.secondStageStart = false
                    this.pauseToSecStage(1);
                    console.log(this.skinPackType)
                    this.player.MoveToSecondStage(this.skinPack[this.skinPackType], {
                    road:this.road.docObj, 
                    cloud: this.clouds.docObj,
                    dino: this.player.docObj,
                    bird: this.bird.docObj,
                    }); 
                    console.log(this.secondStageStart + ' SecondStageStart')
                    
                    
                }
                if(otherSide){
                    if(this.pause){this.pauseToSecStage(0)}
                    // console.log(secondStageStart + ' SecondStageStart(otherSide)')
                    if(!this.kd){this.ufo.objFunc()} //кд пять секунд
                    
                    enemyPositions.ufo = this.ufo.changeXY()
                    ufoStatus = 1
                    if(this.bulletAction){
                        // console.log(parseInt(window.getComputedStyle(this.bulletAction).getPropertyValue("left")))
                        if(parseInt(window.getComputedStyle(this.bulletAction).getPropertyValue("left")) <= 50){
                            this.bulletAction.remove()
                            this.bulletAction = false
                        }
                    }
                }  
            }
            const end = this.checkCollision(enemyPositions,playerPositions, this.birdStatus, ufoStatus, this.bulletAction) // изменить
            if(end == 1 && this.cheat != 6){this.endGame()}
            if(!this.startStop){clearInterval(gameCycle); clearInterval(this.pointsCycle)}
        }, 10)
    }
}
const startButton = document.getElementById("StartButton")
const shopButton = document.getElementById("ShopButton")
const modalMenu = document.getElementById('modalMenu')
const skinShop = {InDevelopment:{}}
let firstOpen = true
const gameStart = new game()
function startStopGame () {
    modalMenu.style.display = 'none'
    if(!gameStart.startStop){gameStart.start()}
    else{gameStart.stop()}
}
let buttonPositionX = 15
let buttonPositionY = 0
function createButton( func, backgroundImage, backgroundColor){
    const button = {}
    button.buttonObj = document.createElement("div")
    button.buttonObj.style.position = 'relative'
    button.buttonObj.style.width = '80px'
    button.buttonObj.style.height = '80px'
    button.buttonObj.style.backgroundImage = backgroundImage
    // skinShop.InDevelopment.buttonObj.style.textContent = 'Re-Textured Pack'
    button.buttonObj.style.backgroundSize = '80px 80px'
    button.buttonObj.style.backgroundColor = backgroundColor//'#bfc072'
    button.buttonObj.style.borderRadius = '12px'
    button.buttonObj.style.left = buttonPositionX.toString() + 'px'
    buttonPositionX+=90
    button.buttonObj.style.top = buttonPositionY.toString() + 'px'
    buttonPositionY-=80
    button.buttonObj.style.cursor = 'pointer'
    button.buttonObj.addEventListener('mouseenter', (elem) => {
        
        button.buttonObj.style.transform = 'scale(1.05)'

    });
    button.buttonObj.addEventListener('mouseleave', (elem) => {
        
        button.buttonObj.style.transform = 'scale(1.0)'

    });
    button.buttonObj.addEventListener('click', () => {
        
        func()
    })
    return button
    // skinShop.InDevelopment.buttonObj.style.zIndex = '0'
}
function openShop(){
    if(firstOpen){
        modalMenu.style.width = '500px'
        modalMenu.style.height = '220px'
        modalMenu.style.top = '-350px'
        modalMenu.style.left = '100px'
        startButton.style.visibility = 'hidden'
        firstOpen = false
        skinShop.coloredSkinBut = createButton(()=>{gameStart.setSkinPack(1)}, 'url(/img/mDino/dinoColored.png', '#bfc072')
        skinShop.gopSkinBut = createButton(()=>{gameStart.setSkinPack(2)},'url(/img/mDino/gopDino.png', 'rgb(129, 129, 185)' )
        modalMenu.appendChild(skinShop.coloredSkinBut.buttonObj)
        modalMenu.appendChild(skinShop.gopSkinBut.buttonObj)
    }
    else{
        buttonPositionX = 15
        buttonPositionY = 0
        modalMenu.style.width = '150px'
        modalMenu.style.height = '75px'
        modalMenu.style.top = '-275px'
        modalMenu.style.left = '280px'
        startButton.style.visibility = 'visible'
        skinShop.coloredSkinBut.buttonObj.remove()
        skinShop.gopSkinBut.buttonObj.remove()
        firstOpen = true
    }

}

document.addEventListener("DOMContentLoaded", function() {
    startButton.addEventListener("click", startStopGame);
    shopButton.addEventListener("click", openShop);
20});
