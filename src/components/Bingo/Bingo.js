import React, { useRef, useState } from 'react';
import '../../styles/Bingo/bingo.css';
import Board from './components/Board/Board';
import BingoHeader from './components/BingoHeader';
import { useMediaQuery } from 'beautiful-react-hooks';
import useContainerDimensions from "../../hooks/useContainerDimensions";
import Header from './components/Header';
import Settings from './components/Settings/Settings';

function Bingo() {

    const [headerHeight, setHeaderHeight] = useState(0);
    const [refreshBoard, setRefreshBoard] = useState(false);
    const [currentPage, setCurrrentPage] = useState("board");

    const bingoRef = useRef();
    const boardWxH = {
        width: useContainerDimensions(bingoRef).width,
        height: useContainerDimensions(bingoRef).height
    }
    const isSmall = useMediaQuery('(max-width: 800px)');

    const getChildInfo = ref => {
        setHeaderHeight(ref.current.offsetHeight)
    }

    const handleRefreshBoard = () => {
        setRefreshBoard(!refreshBoard)
    }

    const styles = {
        board: {
            width: `${isSmall ? "85%" : boardWxH.height + "px"}`,
            height: `${isSmall ? boardWxH.width + 100 + "px" : "calc(70% + 100px)"}`,
        },
        row: {
            borderBottom: "3px solid #000"
        }
    }

    return (
        <div className="Bingo" ref={bingoRef} style={styles.board}>
            <Header refresh={handleRefreshBoard} currentpage={currentPage} setcurrentpage={setCurrrentPage} />
            <BingoHeader getchildinfo={getChildInfo} />
            <Board sizinginfo={{ bingoHeight: boardWxH.height, headerHeight: headerHeight }} refreshboard={refreshBoard} setrefreshboard={setRefreshBoard} currentpage={currentPage} />
            <Settings currentpage={currentPage} />
        </div>
    );
}

export default Bingo;
