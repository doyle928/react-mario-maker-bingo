import React, { useRef, useEffect } from "react";
import useContainerDimensions from "../../../hooks/useContainerDimensions";

function BingoHeader(props) {
  const superWxH = useRef();
  const mainHeight = useRef();
  const bingoHeader = useRef();

  const styles = {
    two: {
      fontSize: `${useContainerDimensions(mainHeight).height}px`,
    },
  };

  useEffect(() => {

    props.getchildinfo(bingoHeader)
  }, [props])

  return (
    <div className="Bingo-Header" ref={bingoHeader}>
      <div className="logo">
        <span className="logo-with-number">
          <span className="logo-main" ref={mainHeight}>
            <span className="logo-super" ref={superWxH}>
              super
            </span>
            <span >mario maker</span>
          </span>
          <span className="logo-2" style={styles.two}>
            2
          </span>
        </span>
        <span style={styles.bingo} className="logo-bingo">bingo</span>
      </div>
    </div>
  );
}

export default BingoHeader;
