import {gravity,horizontalFriction, verticalFriction}  from "../constants";
import { Obstacle,Sink } from "../objects";
import {pad,unpad} from "../padding";

//Ball class for the all properties of the ball
export class Ball{
private x: number;
private y: number;
private radius : number;
private color : string;
private vx : number;
private vy : number;
private ctx : CanvasRenderingContext2D;
private obstacles : Obstacle[];
private sinks : Sink[];
private onFinish : (index : number) => void;

//Intialisation of the class variables
constructor(x:number,y:number,radius:number,color:string,ctx:CanvasRenderingContext2D, obstacles: Obstacle[], sinks: Sink[], onFinish : (index : number) => void)
{
this.x = x;
this.y = y;
this.radius = radius;
this.vx = 0;
this.vy = 0;
this.color = color;
this.ctx = ctx;
this.obstacles = obstacles;
this.sinks = sinks;
this.onFinish = onFinish;
}

draw()
{
    this.ctx.beginPath();   //Start the drawing 
    this.ctx.arc(unpad(this.x), unpad(this.y), this.radius, 0, Math.PI*2);  //Created a circle of x,y coordinate of centre and radius
    this.ctx.fillStyle = this.color;  //Filled with color
    this.ctx.fill();   //Closed the fill
    this.ctx.closePath();  //Closed the path
}

update()
{
    this.vy+=gravity;
    this.x+=this.vx;
    this.y+=this.vy;

    //Collisions with obstacles
    this.obstacles.forEach(obstacle => {
        const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);

        if(dist < pad(obstacle.radius + this.radius))
        {
            //Collosion angle of the obstacle and the ball
        const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
        
        //Reflect speed after the collison
        const speed = Math.hypot(this.vx,this.vy);

        this.vx = Math.cos(angle)*speed*horizontalFriction;
        this.vy = Math.sin(angle)*speed*verticalFriction;

        //Adjust the positions to avoid the sticking 
        const overlap = this.radius + obstacle.radius - unpad(dist);
        this.x += pad(Math.cos(angle)*overlap);
        this.y += pad(Math.sin(angle)*overlap);
        }
    });
    
    //Collisions with sinks
    for(let i=0;i<this.sinks.length;i++)
    {
        const sink = this.sinks[i];

        //If conditon for checking the ball is inside the sink or not 
        //And then stop the ball there 
        if(
            unpad(this.x) > sink.x - sink.width/2 &&
            unpad(this.x)  < sink.x + sink.width/2 &&
            (unpad(this.y) + this.radius) > (sink.y - sink.height/2)
        ){
this.vx = 0;
this.vy = 0;
this.onFinish(i);
break;
        }
        
    }
}
};