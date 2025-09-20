import {useEffect, useState, useRef}  from "react";
import {useNavigate} from "react-router-dom";
import { BallManager } from "../game/classes/BallManager";
import {pad} from "../game/padding";
import { WIDTH } from "../game/constants";


export const Simulate = () => {
    const navigate = useNavigate();

    const canvasRef = useRef<any>(null);
    let [outputs, setOutputs] = useState<{[key:number] : number[]}>({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
    });

   

}

export default Simulate 