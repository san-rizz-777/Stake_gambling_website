import  {HEIGHT, WIDTH, ballRadius, obstacleRadius, sinkWidth} from "../constants";
import  { createObstacles, createSinks } from "../objects";
import type {Obstacle,Sink} from "../objects";
import {pad,unpad} from "../padding";
import {Ball} from "./Ball"

//Ball Manager class for the addition of balls and rendering for canvas after adding it 
export class BallManager{
private balls: Ball[];
private canvasRef : HTMLCanvasElement;
private ctx : CanvasRenderingContext2D;
private obstacles : Obstacle[];
private sinks : Sink[];
private requestId? : number;
private onFinish? : (index:number , startX?:number) => void;

//Constructor for initalisation of the data members
constructor(canvasRef: HTMLCanvasElement, onFinish? : (index : number, startX?:number) => void)
{
    this.balls = [];
    this.canvasRef = canvasRef;
    this.ctx = this.canvasRef.getContext("2d")!;
    this.obstacles = createObstacles();
    this.sinks = createSinks();
    this.update();
    this.onFinish = onFinish;
}

//Instantiating object of Ball class(adding a ball to canvas)
addBall(startX?:number)
{
    const newBall = new Ball(startX || pad(WIDTH/2 + 13), pad(50), ballRadius, 'red', this.ctx, this.obstacles, this.sinks, (index) => {
this.balls = this.balls.filter(ball => ball!==newBall);
this.onFinish?.(index,startX);
    });

    this.balls.push(newBall);
}

//Rendering the obstacles in the canvas
drawObstacles()
{
    this.ctx.fillStyle = 'white';

    //Renders the obstacles after every ball addition
    this.obstacles.forEach(obstacle => {
    this.ctx.beginPath();
    this.ctx.arc(unpad(obstacle.x),unpad(obstacle.y),obstacle.radius, 0, Math.PI*2);
    this.ctx.fill();
    this.ctx.closePath();
    });
}

//Based on index returns color for the sinks
getColor(index:number){
    if(index<3 || index>this.sinks.length - 3)
    {
return {background: '#ff003f', color: 'white'};
    }

    if(index<6 || index>this.sinks.length - 6)
    {
 return {background: '#ff7f00', color: 'white'};
    }

    if(index<9 || index>this.sinks.length - 9)
    {
return {background: '#ffbf00', color: 'black'};
    }

    if(index < 12 || index > this.sinks.length - 12)
    {
return {background: '#ffff00', color: 'black'};
    }

    if(index < 15 || index > this.sinks.length - 15)
    {
 return {background: '#bfff00', color: 'black'};
    }

    return {background: '#7fff00', color: 'black'};
}

//Rendering the sinks after every ball addition
drawSinks()
{
this.ctx.fillStyle  = 'green';
const SPACING = obstacleRadius*2;   //This is the spacing between the two sinks

for(let i=0;i<this.sinks.length;i++)
{
    this.ctx.fillStyle = this.getColor(i).background;
    const sink = this.sinks[i];

    this.ctx.font = 'normal 13px Arial';
    this.ctx.fillRect(sink.x,sink.y - sink.height/2, sink.width - SPACING, sink.height);
    this.ctx.fillStyle = this.getColor(i).color;
    this.ctx.fillText((sink?.multiplier)?.toString() + "x", sink.x - 15 + sinkWidth/2, sink.y);
};

}

//This draw function clears the canvas and renders the obstacles, sinks and balls after addition of new ball
draw()
{
    this.ctx.clearRect(0,0,WIDTH,HEIGHT);
    this.drawObstacles();
    this.drawSinks();
    this.balls.forEach(ball => {
        ball.draw();
        ball.update();
    });
}


//Updates the canvas after each animation frame
update()
{
    this.draw();
    this.requestId = requestAnimationFrame(this.update.bind(this));
}

stop()
{
    if(this.requestId)
    {
        cancelAnimationFrame(this.requestId);
    }
}


};


