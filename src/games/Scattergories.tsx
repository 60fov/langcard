import { createEffect } from "solid-js";
import { For, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import * as WordList from "../wordlist";

import styles from "./Scattergories.module.css";


// TODO
// enter your answer for the category
// random/choose initial letter
// category filter
// change round duration
// reset button
// multiplayer
// optional grading

type ScattergoriesState = {
    time: number;
    categoryCount: number;
    categoryList: string[];
    initalLetter: string;
    isPlaying: boolean;
    intervalId: number | null;
}

const initialState: ScattergoriesState = {
    time: 120,
    categoryCount: 10,
    categoryList: [],
    initalLetter: "ㄹ",
    isPlaying: false,
    intervalId: null,
}

export default function Scattergories() {

    const [state, setState] = createStore<ScattergoriesState>(initialState);

    onMount(() => {
        // get list of categories numbered by categoryCount
        const categoryList = WordList
            .getCategoryList()
            .sort(() => Math.random() - 0.5)
            .slice(0, state.categoryCount);
        setState("categoryList", categoryList);
    });


    createEffect(() => {
        if (state.time <= 0) {
            setState("isPlaying", false);
        }
    });

    createEffect(() => {
        const categoryList = WordList
            .getCategoryList()
            .sort(() => Math.random() - 0.5)
            .slice(0, state.categoryCount);
        setState("categoryList", categoryList);
    });

    const handleTogglePlay = () => {
        setState("isPlaying", (prevState) => !prevState);
        if (state.isPlaying) {
            const intervalId = setInterval(() => {
                setState("time", state.time - 1);
            }, 1000);
            setState("intervalId", intervalId);
        } else {
            if (state.intervalId) {
                clearInterval(state.intervalId);
            }
            setState("intervalId", null);
        }
    }

    const handleCategoryCountChange = (event: Event & {
        currentTarget: HTMLInputElement;
        target: HTMLInputElement;
    }) => {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;
        try {
            setState("categoryCount", parseInt(value));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={styles.scattergoriesContainer}>
            <div>
                <div class={styles.intialLetterContainer}>
                    <span>initial letter</span>
                    {state.initalLetter}
                </div>
                <div>
                    <span>time</span>
                    {state.time}
                </div>
                <button onClick={handleTogglePlay}>{state.isPlaying ? 'Pause' : 'Play'}</button>
            </div>
            <div>
                <input
                    type="number"
                    min="1"
                    max={WordList.getCategoryList().length}
                    value={state.categoryCount}
                    onInput={(event) => handleCategoryCountChange(event)}
                />
            </div>
            <ol class={styles.categoryList}>
                <For each={state.categoryList}>
                    {(word) =>
                        <li>
                            <span>{word}</span>
                            <span
                                style={{
                                    "position": "absolute",
                                    "inset": 0,
                                    "display": "inline-block",
                                    "background-color": "black",
                                    "opacity": state.isPlaying ? 0 : 1,
                                }}
                            >
                            </span>
                        </li>
                    }
                </For>
            </ol>
        </div>
    );
}