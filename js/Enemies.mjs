import MyObject from "./MyObject.mjs";
//TODO: Update enemies structure and idea.
class Enemy extends MyObject{
    constructor(name, coords, enemyType, enemyFunc = () =>{}, smth = {}){
        super(name, coords[0], coords[1], enemyFunc, smth);
        this.enemyType = enemyType;
    }
}
export default Enemy;