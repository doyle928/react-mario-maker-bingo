import React from 'react';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';


function AnimationControls(props) {
    const handleClick = () => {
        props.setpaused(!props.paused)
    }

    return (
        <div className="Animation-Controls">
            {props.paused ? <PlayArrowRoundedIcon onClick={handleClick} /> : <PauseIcon onClick={handleClick} />}
            <span>{`${(props.paused ? "Play" : "Pause") + " Animations"}`}</span>
        </div>
    );
}

export default AnimationControls;
