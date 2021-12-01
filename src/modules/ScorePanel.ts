//定义表示记分牌的类
class ScorePanel{
    //score和level用来记录分数和等级
    score = 0;
    level = 1;
    //分数和等级所在的HTML元素,在构造函数中初始化
    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    //设置一个变量来限制等级
    maxLevel:number;

    //设置一个变量来限制升级
    upScore:number;
    constructor(maxLevel:number=10,upScore:number=10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

//    设置一个加分的方法
    addScore(){
        //使得分数自增
        this.scoreEle.innerHTML = ++this.score+'';
        //根据score来判断是否升级,每增加一个upScore就升一级
        if(this.score % this.upScore === 0){
            this.levelUp();
        }
    }
//    设置一个提升等级的方法
    levelUp(){
        //设置等级上限
        if(this.level<this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
}

/*const  scorePanel = new ScorePanel(100,2);
let i= 0
while (i<130){
    scorePanel.addScore();
    i++
}*/
export default ScorePanel
