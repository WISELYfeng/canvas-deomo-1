
let canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.strokeStyle = "none";
ctx.lineWidth = 6;
ctx.lineCap = "round";


let painting = false;  // 绘画开始标识
let last; // 记录鼠标落下坐标
function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

var isTouchDevice = 'ontouchstart' in document.documentElement;
if(isTouchDevice){  // 检测设备是否支持触屏
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        last = [x,y];
    }
    canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        drawLine(last[0],last[1],x,y)
        last = [x,y]; // 实时更新触屏移动坐标
    }
}else{
    canvas.onmousedown = (e) => {
        painting = true;
        last = [e.clientX,e.cl];
    }

    canvas.onmousemove = (e) => {
        if(painting === true){
            drawLine(last[0],last[1],e.clientX,e.clientY);
            last = [e.clientX,e.clientY];  // 实时更新鼠标移动坐标
        }
    }

    canvas.onmouseup = () => {
        painting = false;
    }
}

