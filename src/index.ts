//引入样式
import './style/index.less'
import GameControl from "./modules/GameControl";
//定义类===>需要什么属性,使用什么方法
/*import Food from './modules/Food'
import ScorePanel from "./modules/ScorePanel";
const food = new Food();
food.change();
console.log(food.X,food.Y);

const  scorePanel = new ScorePanel(100,2);
let i= 0
while (i<130){
    scorePanel.addScore();
    i++
}*/
//实例化一个GameControl表示游戏开始
new GameControl();
