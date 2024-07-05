import React from "react";

const ProgressBar = (props: {progress: number}) => {
    if(props.progress === 100 || props.progress === Infinity){
        return <></>
    }
    return <div className="ui indicating progress" data-value={props.progress} data-total="100">
        <div className="bar"></div>
        <div className="label">ProgressBar Loading agencies {props.progress} {typeof props.progress}</div>
    </div>
}
export default ProgressBar;