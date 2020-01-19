import React, { Component } from "react";
import Public from "../../public";
import "../../../scss/Animation/ReactCanvas/WaveRound.scss";

// const { requestNextAnimationFrame } = Public;
window.requestAnimaFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 30);
  };
class WaveRound extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      start: false,
      canvas: "",
      ctx: "",
      width: props.width ? props.width : 108 /* 宽度 */,
      height: props.height ? props.width : 108 /* 高度 */,
      verNum: props.verNum
        ? props.verNum
        : props.width
        ? props.width
        : 108 /* 波浪数 */,
      diffPt: [],
      vertexes: [],
      i: true,
      xx: 50,
      dd: 15 /* 浓度 */,
      autoDiff: 1000
    };
  }
  componentDidMount() {
    this.initCanvas(this.state.width, this.state.height); /* 初始化画布 */
    window.requestAnimaFrame(this.update);
  }
  handleStar = () => {
    this.setState({
      start: !this.state.start
    });
  };
  /* 更新 */
  update = () => {
    console.log("ss");
    if (this.state.i) {
      console.log("ss");
      this.setState({
        i: false
      });
    }
    let ctx = this.state.ctx;
    let canvas = this.state.canvas;
    let xx = this.state.xx;
    let dd = this.state.dd;
    let autoDiff = this.state.autoDiff;
    let diffPt = this.state.diffPt;
    let vertexes = this.state.vertexes;
    let verNum = this.state.verNum;
    ctx.clearRect(0, 0, canvas.width, canvas.height); /* 清除画布 */
    autoDiff -=
      autoDiff * 0.9; /* 初始autoDiff为1000，没update :0.1的n次方*autoDiff */
    diffPt[xx] = autoDiff; /* diffPt.length为250 */
    //左侧
    //差分，使得每个点都是上一个点的下一次的解，由于差分函数出来的解是一个曲线，且每次迭代后，曲线相加的结果形成了不断地波浪
    for (let i = xx - 1; i > 0; i--) {
      let d = xx - i; /* i=xx-1,所以每次d=1+n */
      if (d > dd) d = dd; /* 在for循环16起执行d=dd，所以d<=15 */
      diffPt[i] -=
        (diffPt[i] - diffPt[i + 1]) *
        (1 - 0.01 * d); /* 就是曲线函数，16次后就一样 */
    }
    //右侧
    for (let i = xx + 1; i < verNum; i++) {
      let d = i - xx;
      if (d > dd) d = dd;
      diffPt[i] -= (diffPt[i] - diffPt[i - 1]) * (1 - 0.01 * d);
    }

    //更新点Y坐标
    for (let i = 0; i < vertexes.length; i++) {
      vertexes[i].updateY(diffPt[i]);
    }
    this.setState({
      diffPt: diffPt,
      vertexes: vertexes,
      xx: xx,
      dd: dd /* 浓度 */,
      autoDiff: autoDiff
    });
    this.draw();
  };
  /* 绘画 */
  draw = () => {
    let ctx = this.state.ctx;
    let canvas = this.state.canvas;
    let xx = this.state.xx;
    let dd = this.state.dd;
    let autoDiff = this.state.autoDiff;
    let diffPt = this.state.diffPt;
    let vertexes = this.state.vertexes;
    let height = this.state.height;
    ctx.beginPath();
    ctx.moveTo(0, height); /* 开始 */
    ctx.fillStyle = "#fff"; /* 填充 */
    ctx.lineTo(vertexes[0].x, vertexes[0].y);
    for (let i = 1; i < vertexes.length; i++) {
      ctx.lineTo(vertexes[i].x, vertexes[i].y);
    }
    ctx.lineTo(canvas.width, height);
    ctx.lineTo(0, height);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.fillStyle = "#000";
    ctx.lineTo(vertexes[0].x + 15, vertexes[0].y + 5);
    for (let i = 1; i < vertexes.length; i++) {
      ctx.lineTo(vertexes[i].x + 15, vertexes[i].y + 5);
    }
    ctx.lineTo(canvas.width, height);
    ctx.lineTo(0, height);
    ctx.fill();

    // ctx.fillStyle = "#777";
    // ctx.font = "12px sans-serif";
    // ctx.textBaseline = "top";
    // ctx.fillText("点击该液体的表面", 70, canvas.height / 2 - 20);
    // ctx.fillStyle = "#fff";
    // ctx.fillText("用鼠标滚轮来改变粘度", 70, canvas.height / 2 + 15);
    // ctx.fillText(
    //   "滚轮改变粘稠度 / Viscosity: " + (((dd - 15) * 20) / 7).toFixed(2) + "%",
    //   70,
    //   canvas.height - 20
    // );
  };
  initCanvas = (width = 108, height = 108) => {
    /* 初始化canvas */
    const canvas = this.canvas.current;
    let ctx = "";
    if (canvas.getContext) {
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d");
    }
    console.log(canvas, ctx);

    let cW = this.state.canvas.width;
    let cH = this.state.canvas.height;
    let verNum = this.state.verNum;
    let diffPt = [];
    let vertexes = [];
    for (let i = 0; i < verNum; i++)
      vertexes[i] = new Vertex(
        (cW / (verNum - 1)) * i,
        cH / 2,
        cH / 2
      ); /* (x,y,baseY) */
    for (let i = 0; i < verNum; i++) diffPt[i] = 0;

    this.setState({
      canvas: canvas,
      ctx: ctx,
      diffPt: diffPt,
      vertexes: vertexes
    });
  };
  render() {
    console.log('dsd')
    return (
      <canvas ref={this.canvas} className="WaveRound">
        您的浏览器不支持canvas，请更换浏览器.
      </canvas>
    );
  }
}
function Vertex(x, y, baseY) {
  /* 波浪类,生成波浪基础参数 */
  this.baseY = baseY; /* 初始Y */
  this.x = x;
  this.y = y;
  this.vy = 0; /* y轴上的变化速度 */
  this.targetY = 0; /* 相对Y */
  this.friction = 0.15; /* 摩擦力 */
  this.deceleration = 1; /* 减速（度） */
}
Vertex.prototype.updateY = function(diffVal) {
  /* 波浪Y */
  // console.log(this.friction)
  this.targetY = diffVal + this.baseY; /* 变化+基础=相对 */
  this.vy += this.targetY - this.y; /* 每次变化就是速度，时间可以比做1 */
  this.y +=
    this.vy * this.friction; /* 速度*摩擦系数*时间+上次的位置=最新的位置 */
  this.vy *= this.deceleration; /* 每次*0.95就是说每次减少0.05 */
  /* 反正最后就是不懂，瞎扯的 */
};
export default WaveRound;
