import React from "react";
import mario from "../../../styles/images/mario.png";


function Square(props) {
  const styles = {
    sq: {
      backgroundColor: `${props.card.card === "free space" ? "#fff" : "#FFE9B8"}`
    },
    img: {
      opacity: `${props.card.selected ? .3 : 0}`
    }
  }

  return (
    <div className="Square" style={styles.sq} key={props.dataid} onClick={e => props.clickcallback(props.card)}>
      <span >
        <p>{props.card.card}</p>
        <img src={mario} alt="mario-stamp" style={styles.img} />
      </span>
    </div>
  );
}

export default Square;
