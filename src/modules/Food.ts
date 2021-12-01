//定义食物类
class  Food{
    element:HTMLElement;
    constructor() {
        //获取食物id,并赋值给element
        this.element = document.getElementById('food')!
    }

//    获取食物X轴坐标
    get X(){
        return this.element.offsetLeft;
    }
//    获取食物Y轴坐标
    get Y(){return this.element.offsetTop;
    }
//    修改食物的位置
    change(){
        //生成随机的位置
        //食物坐标范围水平0-290,垂直0-290
        //蛇移动一次是一格,一格大小是10,所以要求食物的坐标是整10
        //随机生成0-290的任意10的倍数值
        let top = Math.round(Math.random() * 29)*10;
        let left = Math.round(Math.random() * 29)*10;
        this.element.style.left=left+'px';
        this.element.style.top=top+'px';
    }
}

//测试代码
/*const food = new Food();
food.change();
console.log(food.X,food.Y);*/

export default Food;
