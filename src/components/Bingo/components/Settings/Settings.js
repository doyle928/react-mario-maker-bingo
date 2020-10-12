import React, { useEffect, useState, useCallback } from "react";
import db from "../../../../database/db.json";
import _ from "lodash";
import AddForm from "./components/AddForm";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

function Settings(props) {

    const [refresh, setRefresh] = useState(false);

    const [using, setUsing] = useState(0);

    let dbList = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : db.cards;

    const handleCheckChange = (e) => {
        let foundCard = _.indexOf(dbList, _.find(dbList, ["card", e.target.value]));

        if (e.target.checked) updateStorage(true)
        else updateStorage(false)

        function updateStorage(state) {
            dbList[foundCard] = { ...dbList[foundCard], use: state };
            localStorage.setItem("settings", JSON.stringify(dbList));
            amountUsing();
        }
    }

    const amountUsing = useCallback(() => {
        let x = 0;
        dbList.forEach(item => { if (item.use) x++; });
        return setUsing(x);
    }, [dbList])

    const handleSubmit = (e) => {
        dbList.push({
            card: e,
            selected: false,
            use: true,
            added: true
        })
        localStorage.setItem("settings", JSON.stringify(dbList));
        amountUsing();
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        dbList.splice(_.findIndex(dbList, ['card', e.target.closest("svg").getAttribute("value")]), 1)
        localStorage.setItem("settings", JSON.stringify(dbList));
        amountUsing();
        setRefresh(!refresh)
    }

    useEffect(() => {
        amountUsing();
    }, [amountUsing, using])

    const styles = {
        check: {
            color: "#517C2A",
            width: "28px",
            height: "28px"
        },
        x: {
            color: "#F10C22",
            width: "28px",
            height: "28px"
        },
        trash: {
            position: "absolute",
            right: "-28px",
            color: "#F10C22",
            width: "28px",
            height: "28px",
            cursor: "pointer"
        }
    }


    return (
        <div className={`${props.currentpage === "settings" ? "" : "hide-page"} Settings`}>
            <div className="settings-info">
                <h3>Selected items have a chance to show up</h3>
                <p>minimum of 24 to fill bingo board - {using} of 24 </p>
            </div>
            <div className="settings-list-container">

                {dbList.map((item, i) => (
                    <span key={i} refresh={refresh.toString()}>
                        <label >
                            {item.use ? <CheckRoundedIcon style={styles.check} /> : <CloseRoundedIcon style={styles.x} />}
                            <input type="checkbox" defaultChecked={item.use} value={item.card} onChange={handleCheckChange} />
                            {item.card}

                        </label>
                        {item.added ? <DeleteForeverRoundedIcon data="no" style={styles.trash} value={item.card} onClick={handleDelete} /> : ""}
                    </span>
                ))}
            </div>
            <AddForm handlesubmit={handleSubmit} />
        </div>
    );
}

export default Settings;
