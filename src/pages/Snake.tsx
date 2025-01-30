import { createStore, produce } from "solid-js/store";
import styles from "./Snake.module.css";
import { For, createEffect, onMount } from "solid-js";
import * as WordList from "../wordlist";


const east = 0;
const south = 1;
const west = 2;
const north = 3;

type SnakeState = {
    gridSize: number,
    targetWord: WordList.Word | undefined,
    prevWordList: WordList.Word[],
    tileIndexList: number[],
    direction: number,
};

const initialState: SnakeState = {
    gridSize: 20,
    targetWord: undefined,
    prevWordList: [],
    tileIndexList: [],
    direction: east,
};

export default function Snake() {
    const [state, setState] = createStore<SnakeState>(initialState);

    onMount(() => {
        setState(produce((state) => {
            const wordPool = WordList.getAllWords();
            const newWord = wordPool[Math.floor(Math.random() * wordPool.length)];
            state.targetWord = newWord;

            state.tileIndexList = [state.gridSize / 2 + state.gridSize / 2 * state.gridSize];
            state.prevWordList = [WordList.getAllWords().sort(() => Math.random() - 0.5).at(0)!];
        }));
    });

    return (
        <div
            class={styles.rootContainer}
        >
            <div
                class={styles.gridContainer}
                style={{
                    "--grid-size": `${state.gridSize}`,
                    "--tile-size": "20px",
                    "--gap": "1px",
                }}
            >
                <For each={state.tileIndexList}>
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
            </div>
        </div>
    )
}