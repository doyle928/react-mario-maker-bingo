import React from "react";
import AutorenewRoundedIcon from '@material-ui/icons/AutorenewRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

function Header(props) {


    const styles = {
        icons: {
            width: "32px",
            height: "32px",
            color: "#fff",
            margin: "14%"
        },
        hidden: {
            opacity: props.currentpage === "settings" ? 0 : 1,
            cursor: `${props.currentpage === "settings" ? "default" : "pointer"}`
        }
    }

    const RenderButton = () => {
        if (props.currentpage === "board") return (<span onClick={() => props.setcurrentpage("settings")}><SettingsIcon style={styles.icons} className="gear-icon" /></span>)
        else if (props.currentpage === "settings") return (<span onClick={() => props.setcurrentpage("board")}><CloseRoundedIcon style={styles.icons} /></span>)
    }

    return (
        <div className="Header">
            <span onClick={props.refresh} style={styles.hidden}>
                <AutorenewRoundedIcon style={styles.icons} />
            </span>
            <RenderButton />
        </div>
    );
}

export default Header;
