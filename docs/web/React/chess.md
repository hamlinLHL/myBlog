---
title: React + Ts 实现三子棋小游戏  
date: 2019-9-12
categories: 
- frontend
tags:
- react
- ts
---
# 还记得当年和同桌在草稿纸上下三子棋的时光吗
今天我们就用代码来重温一下年少（假设你有react基础，没有也行，只要你会三大框架的任意一种，上手react不难）
## 游戏规则
+ 双方各执一子，在九宫格内一方三子连成线则游戏结束
+ 九宫格下满未有三子连线则视为平局

[你可以点击这里来体验最终效果，样式有点丑，请见谅](http://honglinliu.com/demo/game/)
# 准备阶段
建议先全局安装typescript 和 create-react-app（<strong>安装过请忽略</strong>）
```
npm install typescript create-react-app -g
```
使用typescript初始化项目
```
create-react-app demo --typescript
```
初始化成功后ts环境已经配好了，不需要你手动加ts配置</br>
此时就是tsx语法，我们就可以愉快的写ts了</br>
src文件夹就是开发目录，所有代码都写在src文件夹下</br>
我们使用sass来写样式,先安装sass
```
npm install node-sass --save
```
运行项目
```
npm run start
```
删掉初始化界面的一些代码

# 开发阶段
## 组件化
开发一个项目其实就是开发组件</br>
把一个项目拆分一个个小组件，方便后期维护以及复用
1. 棋子组件
2. 棋盘组件
3. 游戏规则组件
4. 游戏状态组件

react中组件分为类组件和函数组件</br>
需要管理状态的最好使用类组件</br>
所以我们先把App改成类组件
```js{3}
import React from 'react';
import './App.css';
class App extends React.Component{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="App">
            </div>
        );
    }
};

export default App;
```
## 开发棋子组件
在src下新建component文件夹，在component文件夹下新建ChessComp.tsx,ChessComp.css</br>
以后我们的组件都放在component文件夹下</br>
棋子组件我们使用函数组件，思考需要传入组件的属性的类型：
1. type(棋子的类型)
2. onClick(点击棋子触发的回调函数)

棋子类型有三种（红子 ，黑子， 空），</br>
为了约束棋子类型，我们使用一个枚举类型，</br>
在src下新建types文件夹，专门放类型约束，</br>
在types下新建enums.ts约束棋子类型</br>
```js{1}
export enum ChessType {
    none,
    red,
    black
}
```
并在棋子tsx中导入</br>
传入tsx的所有属性用一个IProps接口约束</br>
```js{1}
interface IProps {
    type: ChessType
    onClick?: () => void
}
```
全部tsx代码：
```js{1}
import React from 'react';
import {ChessType} from "../types/enums";
import './ChessComp.css';

interface IProps {
    type: ChessType
    onClick?: () => void
}
function ChessComp ({type, onClick}: IProps) {
    let chess = null;
    switch (type) {
        case ChessType.red:
            chess = <div className="red chess-item"></div>;
        break;
        case ChessType.black:
            chess = <div className="black chess-item"></div>;
        break;
        default:
            chess = null;
    }
    return (
        <div className="chess" onClick={() => {
            if (type === ChessType.none && onClick) {
                onClick();
            }
        }}>
            {chess}
        </div>
    )
};
export default ChessComp;
```
其中棋子只有为none类型时才能被点击
scss 代码：</br>
棋子我们用背景颜色径向渐变来模拟
```js{1}
$borderColor: #dddddd;
$redChess: #ff4400;
$blackChess: #282c34;
.chess{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 2px solid $borderColor;
    box-sizing: border-box;
    cursor: pointer;
    .chess-item{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .red{
        background: radial-gradient(#fff, $redChess);
    }
    .black{
        background: radial-gradient(#fff, $blackChess);
    }
}
```
## 开发棋盘组件
同理在component文件夹下新建BoardComp.tsx,BoardComp.scss</br>
棋盘组件我们需要传递三个参数：</br>
1. 棋子的数组
2. 游戏是否结束
3. 点击事件函数

循环数组渲染棋子， 并给游戏是否结束一个默认值
全部tsx代码：
```js{1}
import React from 'react';
import {ChessType} from "../types/enums";
import ChessComp from "./ChessComp";
import "./BoardComp.scss";
interface IProps {
    chesses: ChessType[];
    isGameOver?: boolean
    onClick?: (index: number) => void
}
const BoardComp: React.FC<IProps> = function(props) {
    // 类型断言
    const isGameOver = props.isGameOver as boolean;
    // 非空断言
    // const isGameOver = props.isGameOver!;
    const list = props.chesses.map((type, index) => {
        return (
            <ChessComp
                type={type}
                key={index}
            onClick={() => {
                if (props.onClick && !isGameOver) {
                    props.onClick(index)
                }
            }}/>
        )
    });
    return (
        <div className="board">
            {list}
        </div>
    )
};
BoardComp.defaultProps = {
  isGameOver: false
};
export default BoardComp;
```
scss 代码：</br>
使用flex布局
```scss{1}
.board{
    display: flex;
    flex-wrap: wrap;
    width: 150px;
    height: 150px;
}
```

## 开发游戏规则组件
在component文件夹下新建Game.tsx,Game.scss</br>
游戏规则组件不需要传参，我们使用类组件来管理状态</br>
在types文件夹下的enums.ts里新增游戏状态的枚举类型
```js{1}
export enum ChessType {
    none,
    red,
    black
}
export enum GameStatus {
    /**
     * 游戏中
     */
    gaming,
    /**
     * 红方胜利
     */
    redWin,
    /**
     * 黑方胜利
     */
    blackWin,
    /**
     * 平局
     */
    equal,
}
```
核心的代码就是如何判断游戏的状态，我的方法有点死，你们可以自己重构，
```js{1}
import React from 'react';
import {ChessType, GameStatus} from "../types/enums";
import BoardComp from "./BoardComp";
import GameStatusComp from "./GameStatusComp";
import './Game.scss';

/**
 * 棋子的数组
 * 游戏状态
 * 下一次下棋的类型
 */
interface Istate {
    chesses: ChessType[],
    gameStatus: GameStatus,
    nextChess: ChessType.red | ChessType.black
}
class Game extends React.Component<{}, Istate> {
    state: Istate = {
        chesses: [],
        gameStatus: GameStatus.gaming,
        nextChess: ChessType.black
    };

    /**
     * 组件挂载完初始化
     */
    componentDidMount(): void {
        this.init();
    }
    /**
     * 初始化9宫格
     */
    init() {
        const arr: ChessType[] = [];
        for (let i = 0; i < 9; i ++) {
            arr.push(ChessType.none)
        }
        this.setState({
            chesses: arr,
            gameStatus: GameStatus.gaming,
            nextChess: ChessType.black
        })
    }

    /**
     * 处理点击事件，改变棋子状态和游戏状态
     */
    handleChessClick(index: number) {
        const chesses: ChessType[] = [...this.state.chesses];
        chesses[index] = this.state.nextChess;
        this.setState(preState => ({
            chesses,
            nextChess: preState.nextChess === ChessType.black? ChessType.red : ChessType.black,
            gameStatus: this.getStatus(chesses, index)
        }))
    }

    /**
     * 获取游戏状态
     */
    getStatus(chesses: ChessType[], index: number): GameStatus {
        // 判断是否有一方胜利
        const horMin = Math.floor(index/3) * 3;
        const verMin = index % 3;
        // 横向， 纵向， 斜向胜利
        if ((chesses[horMin] === chesses[horMin + 1] && chesses[horMin + 1] === chesses[horMin + 2]) ||
            (chesses[verMin] === chesses[verMin + 3] && chesses[verMin + 3] === chesses[verMin + 6]) ||
            (chesses[0] === chesses[4] && chesses[4] === chesses[8] && chesses[0] !== ChessType.none) ||
            ((chesses[2] === chesses[4] && chesses[4] === chesses[6] && chesses[2] !== ChessType.none))) {
            return chesses[index] === ChessType.black ? GameStatus.blackWin : GameStatus.redWin;
        }
        // 平局
        if (!chesses.includes(ChessType.none)) {
            return GameStatus.equal;
        }
        // 游戏中
        return GameStatus.gaming;
    }
    render(): React.ReactNode {
        return <div className="game">
            <h1>三子棋游戏</h1>
            <GameStatusComp next={this.state.nextChess} status={this.state.gameStatus}/>
            <BoardComp
                chesses={this.state.chesses}
                isGameOver={this.state.gameStatus !== GameStatus.gaming}
                onClick={this.handleChessClick.bind(this)}/>
                <button onClick={() => {
                this.init()}
                }>重新开始</button>
        </div>;
    }
}

export default Game;
```
样式
```scss
.game{
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  top: 100px;
  width: 250px;
  height: 400px;
  left: 50%;
  transform: translateX(-50%);
}
```
## 开发显示游戏状态的组件
这个组件用来显示状态，在component文件夹下新建GameStatus.tsx,GameStatus.scss</br>
没什么好说的，直接上代码
```js{1}
import React from 'react';
import {ChessType, GameStatus} from "../types/enums";
import './GameStatus.scss';
interface Iprops {
    status: GameStatus
    next: ChessType.red | ChessType.black
}
function GameStatusComp(props: Iprops) {
    let content: JSX.Element;
    if (props.status === GameStatus.gaming) {
        if (props.next === ChessType.red) {
            content = <div className="next red">红方落子</div>
        } else {
            content = <div className="next black">黑方落子</div>
        }
    } else {
        if (props.status === GameStatus.redWin) {
            content = <div className="win red">红方胜利</div>
        } else if (props.status === GameStatus.blackWin) {
            content = <div className="win black">黑方胜利</div>
        } else {
            content = <div className="win equal">平局</div>
        }
    }
    return (
        <div className="status">
            {content}
        </div>
    )
}

export default GameStatusComp;
```
```scss{1}
.status {
  width: 150px;
  .next,.win{
    font-size: 18px;
  }
  .win{
    border: 2px solid;
    border-radius: 5px;
    width: 100%;
    padding: 10px 0;
  }
  .equal{
    background-color: antiquewhite;
  }
  .red{
    color: #ff4400;
  }
  .black{
    color: #282c34;
  }
}
```
## 收尾
最后在app.tsx里调用game组件
```js{1}
import React from 'react';
import './App.scss';
import Game from "./component/Game";

class App extends React.Component{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="App">
                <Game/>
            </div>
        );
    }
};

export default App;
```
