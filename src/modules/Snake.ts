class Snake{
    //获取表示蛇头的元素
    head:HTMLElement;
    //获取蛇的身体[包括蛇头]
    //HTMLCollection是一个集合，集合会实时刷新新添加的元素，
    bodies:HTMLCollection;
    //获取蛇的容器
    snake:HTMLElement;
    constructor() {
        this.snake = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div')!;
        this.bodies = this.snake.getElementsByTagName('div')
    }
//    获取蛇头的坐标
    get X(){
        return this.head.offsetLeft
    }
    get Y(){
        return this.head.offsetTop
    }
//    设置蛇的坐标
    set X(val:number){
        //如果新值和旧值相同，直接返回，不再修改
        if(this.X == val ){
            return
        }

        //判断是否撞墙，判断X的合法范围0-290
        if(val<0 || val > 290){
        //    进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        //禁止调头
        //修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        //先检查有没有第二节身体，若蛇头的坐标和第二节身体的坐标一样，则发生掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val){
        //    进入判断则代表发生掉头
        //    如果发生掉头，应该让蛇向反方向继续移动
            if(val > this.X){
                // 新值大于this.X，则代表蛇在向右，此时发生掉头，则应该使蛇继续向左走
                val = this.X - 10
            }else {
                val = this.X + 10
            }
        }
        //移动身体
        this.moveBody();
        this.head.style.left = val + 'px'
        //检查有没有撞到自己
        this.checkHeadBody()
    }
    set Y(val:number){
        //如果新值和旧值相同，直接返回，不再修改
        if(this.Y == val ){
            return
        }
        if(val<0 || val > 290){
            //    进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        //禁止调头
        //修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        //先检查有没有第二节身体，若蛇头的坐标和第二节身体的坐标一样，则发生掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val){
            //    进入判断则代表发生掉头
            //    如果发生掉头，应该让蛇向反方向继续移动
            if(val > this.Y){
                // 新值大于this.Y，则代表蛇在向右，此时发生掉头，则应该使蛇继续向左走
                val = this.Y - 10
            }else {
                val = this.Y + 10
            }
        }
        //移动身体
        this.moveBody();
        this.head.style.top = val +  'px'
        //检查有没有撞到自己
        this.checkHeadBody()
    }
//    蛇增加div的方法
    addBody(){
        //向element中添加一个div
        this.snake.insertAdjacentHTML("beforeend","<div></div>")
    }

//    蛇移动身体的方法
    moveBody(){
        /*
        * 将后边的身体设置为前面身体的位置，修改位置时要从后往前修改
        * */
    //    遍历获取所有的身体，从后向前遍历
        for(let i = this.bodies.length-1;i>0;i--){
            let preBodyX = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let preBodyY = (this.bodies[i-1] as HTMLElement).offsetTop;
        //    将这个值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = preBodyX + 'px';
            (this.bodies[i] as HTMLElement).style.top = preBodyY + 'px';

        }
    }
//    检查蛇头和身体有没有相撞
    checkHeadBody(){
    //    获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i = 1;i<this.bodies.length;i++){
            let bd =this.bodies[i] as HTMLElement
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
            //    进入判断说明蛇头撞到了身体，游戏结束
                throw  new Error('撞到自己了~~~')
            }
        }

    }
}
export default Snake
