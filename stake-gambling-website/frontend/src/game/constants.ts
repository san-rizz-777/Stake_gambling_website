import {pad} from './padding';


//All the constants
export const WIDTH = 800;  //Width of teh canvas
export const HEIGHT = 800;   //Height of the canvas
export const ballRadius = 7;
export const obstacleRadius = 4;

export const gravity = pad(0.6);   //gravity value based on trial n error 
export const horizontalFriction = 0.4;
export const verticalFriction = 0.8;

export const sinkWidth = 36;    //Appropriate width
export const NUM_SINKS = 17;    
