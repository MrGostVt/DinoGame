
export default class MyObject{
        constructor(name, myX, myY, objectFunc, smth = {}){
            this.name = name
            this.docObj = document.getElementById(name)          
            this.posX = parseInt(window.getComputedStyle(this.docObj).getPropertyValue("left"))
            // this.posX = this.docObjRect.left
            this.posY = parseInt(window.getComputedStyle(this.docObj).getPropertyValue("top"))
            this.width = parseInt(window.getComputedStyle(this.docObj).getPropertyValue("width"))
            this.hight = parseInt(window.getComputedStyle(this.docObj).getPropertyValue("height"))
            this.posMyX = myX
            this.posMyY = myY
            this.diffX = this.posX - myX
            this.diffY = this.posY - myY
            this.objFunc = objectFunc
            this.smth = smth

        }
        changeXY() {

            this.posMyX = parseInt(window.getComputedStyle(this.docObj).getPropertyValue("left")) - this.diffX
            this.posMyY = parseInt(window.getComputedStyle(this.docObj).getPropertyValue("top")) - this.diffY
            return [this.posMyX, this.posMyY]
        }
        getCoords(){
            return [this.diffX + this.posMyX, this.diffY + this.posMyY]
        }
        getMyCoords(){
            return [this.posMyX, this.posMyY]
        }
        startObjectFunc(settings = {}){
            this.changeXY()

            return this.objFunc(settings , this.smth)
            
        }
}

