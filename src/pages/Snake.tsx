import { createStore, produce } from "solid-js/store";
import styles from "./Snake.module.css";
import { For, createEffect, onMount } from "solid-js";
import * as WordList from "../wordlist";

type SnakeState = {
    gridSize: number,
    tileList: TileState[] | undefined,
    goal: Goal | undefined,
    collectedBlockList: Block[],
};

type TileState = {
    lit: boolean,
    content: string,
};

type Block = {
    tileIndex: number,
    text: string,
};

type Goal = {
    word: WordList.Word,
    blockList: Block[],
};

const initialState: SnakeState = {
    gridSize: 20,
    tileList: undefined,
    goal: undefined,
    collectedBlockList: [],
};

const generateTileList = (state: SnakeState) => {
    if (!state.tileList) {
        return Array
            .from({ length: state.gridSize * state.gridSize })
            .map(() => ({
                lit: false,
                content: '',
            }))
    }

    if (!state.goal) {
        throw Error("no goal n genreate TIles");
    }

    for (let block of state.goal.blockList) {
        state.tileList[block.tileIndex] = {
            lit: true,
            content: block.text,
        };
    }
}

export default function Snake() {
    const [state, setState] = createStore<SnakeState>(initialState);

    onMount(() => {
        setState(produce((state) => {
            state.tileList = generateTileList(state);
            const wordPool = WordList.getAllWords();
            const newWord = wordPool[Math.floor(Math.random() * wordPool.length)];
            state.goal = {
                word: newWord,
                blockList: newWord.korean.split('').map((syllable) => ({
                    tileIndex: Math.floor(Math.random() * state.gridSize * state.gridSize),
                    text: syllable,
                })),
            }
        }));
    });

    // createEffect(() => {
    //     setState("tileList", () => generateTileList(state));
    // });

    return (
        <div
            class={styles.rootContainer}
            style={{
                "--grid-size": `${state.gridSize}`,
                "--tile-size": "20px",
                "--gap": "0px",
            }}
        >
            <For each={state.tileList}>
                {(tile) =>
                    <div data-lit={tile.lit}>{tile.content}</div>
                }
            </For>
        </div>
    )
}