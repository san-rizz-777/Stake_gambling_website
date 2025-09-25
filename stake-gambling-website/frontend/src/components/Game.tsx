import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";

export function Game()
{
    const [ballManager, setBallManager] = useState<BallManager>();
    const canvasRef = useRef<any>(null);

    useEffect(() => {
        if(canvasRef.current)
        {
            const ballManager = new BallManager(canvasRef.current as unknown as HTMLCanvasElement)
            setBallManager(ballManager)
        }
    
    }, [canvasRef])

    return (
        <div>
            <canvas ref={canvasRef} width="800" height="800"></canvas>
            <button onClick ={async() => {             //Function gets called on clicking the Add ball button
                const response = await axios.post("http://localhost:3000/game");     //It gets the starting x from the server
                if(ballManager)
                {
                    ballManager.addBall(response.data.point);        //Passes the startX to the add ball
                }
                        }}>Add Ball</button>
        </div>
    )
}