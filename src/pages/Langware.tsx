// korean learning micro games
// warioware style timer based games
// first game - click the numbers in order

import { createStore, produce } from "solid-js/store";
import styles from "./Langware.module.css";
import { For, JSX, createEffect, createSignal, onMount } from "solid-js";
import * as WordList from "../wordlist";

type LangWareState = {
    state: "start" | "playing" | "stage_change" | "lose" | "stage_win",
    score: number,
    round: number,
    currentTime: number,
    timeLimit: number,
    intervalId: number | undefined,
    game: GameState | undefined,
};

type GameState = {
    counter: CounterGameState,
};

const initialLangWareState: LangWareState = {
    state: "start",
    score: 0,
    round: 0,
    currentTime: 0,
    timeLimit: 10,
    intervalId: undefined,
    game: undefined,
};

type CounterGameState = {
    count: number,
    /** TODO: join these into goal {count, counter} where counter is maps to a set of emojis that can be used */
    countGoal: number | undefined,
    emoji: string | undefined,
    emojiPositionList: { x: number, y: number }[],
};

const initCounterGame = (rootContainer: HTMLDivElement | undefined): CounterGameState => {
    const countGoal = Math.floor(Math.random() * 10) + 1;
    const emoji = WordList.getWordsByCategory("animals").sort(() => Math.random() - 0.5)[0].emoji;
    const counterGameState: CounterGameState = {
        count: 1,
        countGoal,
        emoji,
        emojiPositionList: Array.from({ length: countGoal || 0 }).map(() => (getRandomPosition(rootContainer))),
    };
    return counterGameState;
}

export default function Langware() {
    const [state, setState] = createStore<LangWareState>(initialLangWareState);
    // const [state, setState] = createStore<CounterGameState>(initialCounterGameState);

    const [rootContainer, setRootContainer] = createSignal<HTMLDivElement>();

    onMount(() => {
        setState(produce((state) => {
            state.currentTime = state.timeLimit;
            state.game = { counter: initCounterGame(rootContainer()) };
        }));
    });

    const handleCounterClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = () => {
        setState("game", "counter", "count", (prev) => {
            const next = ((prev) % 10) + 1;
            console.log(prev, "->", next);
            return next;
        });
    };

    createEffect(() => {
        const counterState = state.game?.counter;
        if (counterState) {
            if (counterState.count === counterState.countGoal) {

            }
        }
    });

    const play = () => {
        setState("game", "counter", initCounterGame(rootContainer()));
        setState("state", "playing");
        setState("currentTime", state.timeLimit);
        setState("intervalId",
            setInterval(() => {
                setState("currentTime", (prev) => prev ? prev - 0.1 : 0);
            }, 100)
        );
    }


    const handlePlayButton = () => {
        play();
    };

    const handleLoseScreenClick = () => {

        play();
    }

    // handle currentTime change
    createEffect(() => {
        if (Math.round(state.currentTime * 10) / 10 === 0) {
            if (state.game?.counter.count === state.game?.counter.countGoal) {
                setState("game", "counter", initCounterGame(rootContainer()));
                setState("currentTime", state.timeLimit);
            } else {
                clearInterval(state.intervalId);
                setState("intervalId", undefined);
                setState("state", "lose");
            }
        }
    });

    const renderGameState = (state: GameState | undefined) => {
        if (state === undefined) return <></>;

        if (state.counter) {
            return (
                <>
                    <div class={styles.counterButton} onClick={handleCounterClick}>
                        {getNumberText(state.counter.count)}
                    </div>
                    <For each={state.counter.emojiPositionList} >{(emojiPosition) =>
                        <div
                            style={{
                                "translate": `${emojiPosition.x}px ${emojiPosition.y}px`,
                            }}
                            class={styles.emoji}>
                            {state.counter.emoji}
                        </div>
                    }</For>
                </>
            );
        }
    };

    return (
        <div class={styles.rootContainer} ref={setRootContainer}>
            {state.state === "start" ? (
                <div>
                    <button class={styles.playButton} onClick={handlePlayButton}>play</button>
                </div>
            ) :
                state.state === "lose" ? (
                    <div class={styles.lose} onClick={handleLoseScreenClick}>
                        <span>out of time, click to play again</span>
                    </div>
                ) : renderGameState(state.game)}
            <div class={styles.timer} style={{
                scale: `${state.currentTime / state.timeLimit} 1`,
            }}></div>
        </div>
    );
}


function getNumberText(n: number): string {
    return WordList.getWordsByCategory("native_numbers")[n - 1].korean;
}

function getRandomPosition(element: HTMLDivElement | undefined): { x: number, y: number } {
    if (element === undefined) {
        return { x: 0, y: 0 };
    }

    const margin = 200;

    return {
        x: ((element.clientWidth - margin * 2) + margin) * Math.random(),
        y: ((element.clientHeight - margin * 2) + margin) * Math.random(),
    };
}

function getRandomAngle(): number {
    return (Math.PI / 16 - Math.PI / 32) * Math.random();

}