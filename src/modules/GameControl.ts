//游戏控制器，控制其他所有类
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

class GameControl {
    //定义三个属性
    snake: Snake;
    scorePanel: ScorePanel;
    food: Food;

    //创建一个属性来存储蛇的移动方法(就是按键的方向)
    direction: string = '';

    //创建一个属性用记录游戏是否结束
    isLive = true

    constructor() {
        this.snake = new Snake();
        this.scorePanel = new ScorePanel(10,2);
        this.food = new Food();
        //    实例化对象即调用init()方法，开始游戏
        this.init();
    }

//初始化游戏,调用后游戏即开始
    init() {
        //    使蛇跟随键盘移动，给文档绑定事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        //调用run，使蛇移动
        this.run()
    }

    //    创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        /*考虑两种情况
        * Chrome    IE
        * ArrowUp   UP
        * ArrowDown Down
        * ArrowLeft Left
        * ArrowRight Right
        * */
        let arr = ['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowLeft', 'Left', 'ArrowRight', 'Right']
        //检查event.key的值是否合法
       if (arr.indexOf(event.key)!==-1) {
            //console.log(event.key)
            this.direction = event.key
       }
    }

//    移动蛇头。即修改蛇头的偏移量
//    创建一个控制蛇移动的方法
    run(){
        /*根据方向this.direction来改变蛇的位置
        * 向上top减少
        * 向下top增大
        * 向左left减小
        * 向右left增大*/
        //获取蛇当前的坐标
        let l = this.snake.X
        let t = this.snake.Y
        //根据按键方向来修改偏移量
        switch (this.direction){
            case 'ArrowUp':
            case 'Up':
                t -= 10;
                break;
            case'ArrowDown':
            case'Down':
                t += 10;
                break;
            case 'ArrowLeft':
            case 'left':
                l -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                l += 10;
                break;
            default:
                break;
        }
    //检查蛇是否吃到食物
        this.checkEat(l,t)
    //    修改蛇头的偏移量
       try{
            this.snake.X = l;
            this.snake.Y = t;
        }catch (e:any){
        // //    进入到catch，说明出现了异常，游戏结束，弹出一个提示框
            alert(e.message+'GAME OVER')
        //    将isLive设置为true，设置游戏结束，不再调用run方法
            this.isLive = false
        }


    //    开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level-1)*30)
    }

    //  定义一个方法，检查蛇是否吃到食物
    checkEat(X:number,Y:number){
        //X、Y是蛇头的坐标
        if(X=== this.food.X && Y===this.food.Y){
            //    吃到食物后，食物的位置需要充值
            this.food.change()
            //    分数增加
            this.scorePanel.addScore()
            //    蛇长度增加
            this.snake.addBody()
        }
    }
}

export default GameControl
