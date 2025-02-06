// korean learning micro games
// warioware style timer based games
// first game - click the numbers in order

import { createStore, produce } from "solid-js/store";
import styles from "./Langware.module.css";
import { For, JSX, createEffect, createSignal, onMount } from "solid-js";
import * as WordList from "../wordlist";

const gameList = ["counter", "color"] as const;
type GameName = typeof gameList[number];

type LangWareState = {
    state: "start" | "playing" | "stage_change" | "lose" | "stage_win",
    score: number,
    round: number,
    currentTime: number,
    timeLimit: number,
    intervalId: number | undefined,
    game: {
        current: GameName,
        counter?: CounterGameState,
        color?: ColorGameState,
    } | undefined,
};

const initialLangWareState: LangWareState = {
    state: "start",
    score: 0,
    round: 0,
    currentTime: 0,
    timeLimit: 15,
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


type ColorGameState = {
    pixelList: number[],
    colorMap: (number|undefined)[],
    colorList: WordList.Word[],
    selectedColorIndex: number,
};

const initColorGame = (): ColorGameState => {
    let colorList = WordList.getWordsByCategory("colors");
    return {
        pixelList: pixelArt.heart,
        colorMap: [undefined, undefined, undefined],
        colorList: colorList.sort(() => Math.random() - 0.5),
        selectedColorIndex: 0,
    };
}

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
            // state.game = { current: "color", color: initColorGame() };
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
        // setState("game", "counter", initCounterGame(rootContainer()));
        setState("game", () => {
            return {
                current: "color",
                color: initColorGame(),
                counter: undefined,
            };
        });
        setState("state", "playing");
        setState("currentTime", state.timeLimit);
        setState("intervalId",
            setInterval(() => {
                console.log("interval")
                setState("currentTime", (prev) => Math.max(0, prev - 1));
            }, 1000)
        );
    }


    const handlePlayButton = () => {
        play();
    };

    const handleLoseScreenClick = () => {
        play();
    };

    const handleColorClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
        const target = event.currentTarget;
        const targetIndex = target.getAttribute("data-index");
        if (targetIndex) {
            try {
                const index = parseInt(targetIndex);
                setState("game","color", "selectedColorIndex", index);
            } catch (e) {
                console.error("failed to parse color index");
            }
        }
    };

    const handlePixelClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
        const pixelIndex = event.currentTarget.getAttribute("data-color-index");
        if (pixelIndex) {
            try {
                const index = parseInt(pixelIndex);
                setState("game", "color", "colorMap", produce((map) => {
                    map[index] = state.game?.color?.selectedColorIndex;
                    console.log("handle click", map);
                }));
            } catch (e) {
                console.log("failed to parse pixel index");
            }
        }
    }

    // handle currentTime change
    createEffect(() => {
        if (state.currentTime === 0) {
            if (state.game?.counter) {
                if (state.game?.counter?.count === state.game?.counter?.countGoal) {
                    setState("game", "counter", initCounterGame(rootContainer()));
                    setState("currentTime", state.timeLimit);
                } else {
                    clearInterval(state.intervalId);
                    setState("intervalId", undefined);
                    setState("state", "lose");
                }
            } else if(state.game?.color) {
                if (true) {
                    setState("game", "counter", initCounterGame(rootContainer()));
                    setState("currentTime", state.timeLimit);
                } else {
                    // clearInterval(state.intervalId);
                    // setState("intervalId", undefined);
                    // setState("state", "lose");
                }
            }
        }
    });

    const renderGameState = (state: LangWareState["game"]  | undefined) => {
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
                            {state.counter?.emoji}
                        </div>
                    }</For>
                </>
            );
        }

        if (state.color) {
            return (
                <>
                    <div >
                    <div class={styles.pixelGrid}>
                        <For each={state.color.pixelList}>{(colorIndex) => 
                            <div 
                                data-color-index={colorIndex}
                                onClick={handlePixelClick}
                                style={{
                                    background: state.color?.colorMap[colorIndex] !== undefined ? `${state.color?.colorList[state.color?.colorMap[colorIndex]].english}` : 'none'
                                }}
                                >{colorIndex}</div>
                        }</For>
                    </div>
                        <div style={{
                            display: 'inline-flex',
                            "flex-direction": 'column',
                            gap: '0.25em',
                        }}>
                        <For each={WordList.getWordsByCategory("colors")}>{(color, i) => 
                            <div>
                            <span>{i()}</span>
                            <span>{':'}</span>
                            <span>{color.korean}</span>
                            </div>
                        }</For>
                        </div>
                        </div>
                    <div class={styles.colorList}>
                        <For each={WordList.getWordsByCategory("colors")}>{(color, i) => 
                            <div 
                                onMouseDown={handleColorClick} 
                                data-index={i()} 
                                data-selected-color={i() === state.color?.selectedColorIndex}
                                style={{
                                    background: color.english,
                                    width: '40px',
                                    height: '40px',
                                }}
                                ></div>
                        }</For>
                    </div>
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
                "--time-limit": `${state.timeLimit}s`,
                // scale: `${state.currentTime / state.timeLimit} 1`,
            }}>{state.currentTime}</div>
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

const pixelArt = {
    heart: [
    0, 0, 1, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ]
};
