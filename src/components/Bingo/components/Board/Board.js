import React, { useEffect, useState, useCallback } from "react";
import Square from "../Square";
import db from "../../../../database/db.json";
import _ from "lodash";

function Board(props) {

  const limitArrayTo24 = useCallback((arr) => {
    let newArr = arr;
    shuffleArray(newArr);

    if (newArr.length > 25) newArr = _.take(newArr, 24);
    else {
      while (newArr.length < 25) {
        newArr.push({ card: "free space", selected: true })
      }
      shuffleArray(newArr);
    }

    newArr = addFreeSpace(newArr);

    return newArr;
  }, [])

  const getLocalStorageOrDB = useCallback((refreshBoard) => {
    let arr = [];

    if (refreshBoard) arr = localStorage.getItem('settings')
      ? returnUseOnly(JSON.parse(localStorage.getItem('settings')))
      : limitArrayTo24(_.cloneDeep(db.cards));

    else arr = localStorage.getItem('board')
      ? JSON.parse(localStorage.getItem('board'))
      : localStorage.getItem('settings')
        ? returnUseOnly(JSON.parse(localStorage.getItem('settings')))
        : limitArrayTo24(_.cloneDeep(db.cards));

    function returnUseOnly(baseArr) {
      let storageArr = [];

      baseArr.forEach(item => {
        if (item.use) storageArr.push(item)
      })

      storageArr = limitArrayTo24(storageArr)

      return storageArr;
    }

    return arr;
  }, [limitArrayTo24])

  const [refresh, setRefresh] = useState(false)
  const [bingoCards, setBingoCards] = useState(getLocalStorageOrDB(false))


  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }



  const clickCallback = e => {
    let foundCard = _.indexOf(bingoCards, e);

    if (bingoCards[foundCard].selected) updateStorage(false)
    else if (!bingoCards[foundCard].selected) updateStorage(true)

    function updateStorage(state) {
      let arr = bingoCards;
      arr[foundCard] = { ...arr[foundCard], selected: state };
      setBingoCards(arr)
      localStorage.setItem("board", JSON.stringify(arr));
      setRefresh(!refresh)
    }

  }

  function addFreeSpace(arr) {
    let newArr = arr;
    if (_.find(newArr, ['card', "free space"])) {
      newArr.splice(_.findIndex(newArr, ['card', "free space"]), 1)
      newArr.splice(12, 0, { card: "free space", selected: true });
    } else {
      newArr.splice(12, 0, { card: "free space", selected: true });
    }
    return newArr;
  }

  useEffect(() => {
    if (!_.find(bingoCards, ['card', "free space"]) && bingoCards.length < 25) {
      shuffleBingoAndStore();
    }

    if (props.refreshboard) {
      shuffleBingoAndStore();
      props.setrefreshboard(false)
    }

    function shuffleBingoAndStore() {

      let arr = getLocalStorageOrDB(true);
      // shuffleArray(arr);

      localStorage.setItem("board", JSON.stringify(arr));
      setBingoCards(arr);

    }
  }, [bingoCards, props, getLocalStorageOrDB])


  const cardRow = rowNumber => {
    let row = bingoCards.slice(rowNumber * 5, rowNumber * 5 + 5)
    let arr = [];
    row.map((card, i) => {
      return arr.push(<Square card={card} key={i} clickcallback={clickCallback} />)
    })
    return arr;
  }

  return (
    <div className={`${props.currentpage === "board" ? "" : "hide-page"} Board`} >
      <div className="board-grid">
        {Array(5).fill(1).map((el, i) =>
          <div key={i} className={`bingo-row-${i} bingo-row`} refresh={refresh.toString()}>{cardRow(i)}</div>
        )
        }
      </div></div>
  );

}

export default Board;
