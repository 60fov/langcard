import { createStore, produce, unwrap } from "solid-js/store";
import styles from "./Snake.module.css";
import { For, JSX, createEffect, onCleanup, onMount } from "solid-js";
import * as WordList from "../wordlist";


const east = 0;
const south = 1;
const west = 2;
const north = 3;

type SnakeState = {
    gridSize: number,
    targetWord: WordList.Word | undefined,
    itemCount: number,
    itemList: {word: WordList.Word, tileIndex: number}[],
    snakeTileIndexList: number[],
    prevWordList: WordList.Word[],
    direction: number,
    moveFreq: number,
    moveIntervalId: number | undefined,
};

const initialState: SnakeState = {
    direction: east,
    /** per second */
    moveFreq: 5,
    gridSize: 20,
    itemCount: 3,
    prevWordList: [],
    snakeTileIndexList: [],
    itemList: [],
    targetWord: undefined,
    moveIntervalId: undefined,
};

export default function Snake() {
    const [state, setState] = createStore<SnakeState>(initialState);

    const moveMs = () => 1000 / state.moveFreq;

    onMount(() => {
        setState(produce((state) => {
            const wordPool = WordList.getAllWords();
            const newWord = wordPool[Math.floor(Math.random() * wordPool.length)];
            state.targetWord = newWord;
            state.snakeTileIndexList = [state.gridSize / 2 + state.gridSize / 2 * state.gridSize];
            state.prevWordList = [WordList.getAllWords().sort(() => Math.random() - 0.5).at(0)!];
            state.itemList = WordList
              .getAllWords()
              .sort(() => Math.random() - 0.5)
              .slice(0, state.itemCount - 1)
              .concat(newWord)
              .map((word) => ({word, tileIndex: Math.floor(Math.random() * state.gridSize ** 2)}))
              .sort(() => Math.random() - 0.5)
        }));
      console.log("init item list", unwrap(state.itemList));

        play();
    });

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyDown);
      // document.removeEventListener('keyup', handleKeyUp);
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        setState("direction", west);
      }
      if (event.code === "ArrowDown" || event.code === "KeyS") {
        setState("direction", south);
      }
      if (event.code === "ArrowRight" || event.code === "KeyA") {
        setState("direction", east);
      }
      if (event.code === "ArrowUp" || event.code === "KeyW") {
        setState("direction", north);
      }
    }

    const play = () => {
        setState("moveIntervalId", setInterval(move, moveMs()));
    };

    const move = () => {
        setState("snakeTileIndexList", produce((tileIndexList) => {
          const headIndex = tileIndexList[0];
          let x = Math.floor(headIndex % state.gridSize);
          let y = Math.floor(headIndex / state.gridSize);
          switch(state.direction) {
              case east: { x += 1; } break;
              case south: { y += 1; } break;
              case west: { x -= 1; } break;
              case north: { y -= 1; } break;
          }
          // clamp
          // x = Math.max(Math.min(x, state.gridSize - 1), 0);
          // y = Math.max(Math.min(y, state.gridSize - 1), 0);
          // wrap
          x %= state.gridSize;
          if (x < 0) x = state.gridSize - 1;
          y %= state.gridSize;
          if (y < 0) y = state.gridSize - 1;

          const newHeadIndex = x + y * state.gridSize;
          tileIndexList.pop();
          tileIndexList.splice(0, 0, newHeadIndex);
        }));
    };

    createEffect(() => {
        const headTileIndex = state.snakeTileIndexList[0];
        const hitItem = state.itemList.find((item) => item.tileIndex === headTileIndex);
        if (!hitItem) return;
        const hitItemIndex = state.itemList.indexOf(hitItem);

        if (hitItem.word === state.targetWord) {
            console.log("hit target word");
            const wordPool = WordList.getAllWords();
            const newWord = wordPool[Math.floor(Math.random() * wordPool.length)];
            setState("targetWord", newWord);
            const newItemList = WordList
              .getAllWords()
              .sort(() => Math.random() - 0.5)
              .slice(0, state.itemCount - 1)
              .concat(newWord)
              .map((word) => ({word, tileIndex: Math.floor(Math.random() * state.gridSize ** 2)}))
              .sort(() => Math.random() - 0.5)
            setState("itemList", newItemList)
        } else {
            console.log("wrong item");
            setState("itemList", produce((itemList) => itemList.splice(hitItemIndex, 1)))
        }
    });

    document.addEventListener('keydown', handleKeyDown);
    // document.addEventListener('keyup', handleKeyUp);

    return (
        <div
            class={styles.rootContainer}
        >
            <div style={{"font-size": "2em"}}>
                {state.targetWord?.korean}
            </div>
            <div
                class={styles.gridContainer}
                style={{
                    "--grid-size": `${state.gridSize}`,
                    "--tile-size": "20px",
                    "--gap": "1px",
                }}
            >
                <For each={state.snakeTileIndexList}>
                    {(tileIndex, index) => {
                        const x = Math.floor(tileIndex % state.gridSize);
                        const y = Math.floor(tileIndex / state.gridSize);
                        return <div
                            style={{
                                "grid-column": `${x}`,
                                "grid-row": `${y}`,
                            }}
                        >{state.prevWordList[index()].emoji}</div>
                    }}
                </For>
                <For each={state.itemList}>
                  {(item) => {
                        const x = Math.floor(item.tileIndex % state.gridSize);
                        const y = Math.floor(item.tileIndex / state.gridSize);
                        return <div
                            style={{
                                "grid-column": `${x}`,
                                "grid-row": `${y}`,
                            }}
                        >{item.word.emoji}</div>
                  }}
                </For>
            </div>
        </div>
    )
}
