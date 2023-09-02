import React from "react";
import { ReactComponent as WhaleImg } from "../images/whaledefaultimg.svg";

interface Props{
    block: string;
    color: "Blue" | "Yellow" | "Green" | "Purple" | "Orange" | "Pink" | "Default"
};

const ZengaBigBlock = ({block, color}: Props) => {
    let whaleColor : string;
    if(color === "Blue"){
        whaleColor = '#8FC9FF'
    }
    else if(color === "Yellow"){
        whaleColor = '#FFE18E'
    }
    else if(color === "Green"){
        whaleColor = '#A8EB89'
    }
    else if(color === "Purple"){
        whaleColor = '#B38FFF'
    }
    else if(color === "Orange"){
        whaleColor = '#FFA285'
    }
    else if(color === "Pink"){
        whaleColor = '#FF8F9C'
    }
    else{
        whaleColor = '#DEBB87'
    }
    return(
        <>
            <div
                style={{ borderRadius: '3px', height: '44px',
                        backgroundImage: `url(${block})`, width: '100%',
                        backgroundPosition: '50% 50%', backgroundSize: 'cover',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center'
            }}>
                <WhaleImg fill={whaleColor}></WhaleImg>
            </div>
        </>
    );
}

export default ZengaBigBlock;