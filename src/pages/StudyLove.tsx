import { SetStoreFunction, createStore, produce } from 'solid-js/store';
import * as StudyLoveApp from './studylove/app';

import styles from './StudyLove.module.css';
import { For, JSX, createEffect, createSignal } from 'solid-js';

import * as WordList from '../wordlist';

// const testAppState: StudyLoveApp.ApplicationModel = {
//     state: "choose_game",
//     speechBubbleText: "",
//     background: "",
//     time: 0,
//     meter: {
//         value: 0,
//         fallRate: 1,
//         growRate: 10,
//     },
//     npc: {
//         name: "mina",
//         asset: "",
//         hobbies: WordList.getWordsByCategory("hobbies").slice(0, 3),
//         phoneNumber: "3471896",
//     },
//     game: undefined,
// };
const testNpc = {
    name: "mina",
    asset: "",
    hobbies: WordList.getWordsByCategory("hobbies").slice(0, 3),
    phoneNumber: "3471896",
};

export default function StudyLove() {
    const [state, setState] = createStore<StudyLoveApp.ApplicationModel>(StudyLoveApp.initalAppState);

    function runTransaction(tr: StudyLoveApp.StateTransaction) {
        setState(produce((state) => {
            state.ledger.push(tr);
            StudyLoveApp.Transaction.run(state, state.ledger.slice(state.ledgerNdx));
        }));
    }

    function prevTransaction() {
        setState(produce((state) => {
            StudyLoveApp.Transaction.move(state, -1);
        }));
    }

    function nextTransaction() {
        setState(produce((state) => {
            StudyLoveApp.Transaction.move(state, 1);
        }));
    }

    const handleGameChoiceClick: JSX.EventHandler<HTMLLIElement, MouseEvent> = (event) => {
        const selectedGame = event.currentTarget.getAttribute("data-game");
        if (selectedGame) {
            const hobbyGame: StudyLoveApp.HobbyGame = {
                selectedWordList: [],
                type: 'hobby',
                wordPool: WordList
                    .getWordsByCategory("hobbies")
                    .filter((wordListWord) => state.npc.hobbies.find((npcHobbyWord) => npcHobbyWord !== wordListWord))
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .concat(state.npc.hobbies)
                    .sort(() => Math.random() - 0.5),
            };
            {
                const tr = StudyLoveApp.Transaction.create("game", "set", hobbyGame);
                runTransaction(tr);
            }
            {
                const tr = StudyLoveApp.Transaction.create("state", "set", "playing_game");
                runTransaction(tr);
            }
            // StudyLoveApp.selectGame(testAppState, selectedGame);
        } else {
            console.error("clicked on game choice but there is no data-game value on that element");
        }
    };

    const handleStart: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
        console.log("ui: start click");
        {
            const tr = StudyLoveApp.Transaction.create("state", "set", "intro");
            runTransaction(tr);
        }
        {
            const tr = StudyLoveApp.Transaction.create("npc", "set", testNpc);
            runTransaction(tr);
        }
    }

    const handleIntro: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
        console.log("ui: handle intro");
        const tr = StudyLoveApp.Transaction.create("state", "set", "choose_game");
        runTransaction(tr);
    };

    const handleFlee: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
        console.log("ui: handle flee");
        const tr = StudyLoveApp.Transaction.create("state", "set", "end");
        runTransaction(tr);
    };

    const handleEndScreenClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
        console.log("ui: handle end");
        const tr = StudyLoveApp.Transaction.create("state", "set", "intro");
        runTransaction(tr);
    };

    return (
        <div class={styles.rootContainer}>
            {/* <div class={styles.debug}>
                <button onClick={() => prevTransaction()}>prev state</button>
                <button onClick={() => nextTransaction()}>next state</button>
            </div> */}
            <div class={styles.game}>
                {state.state === "start" ? (
                    <div class={styles.startScreen} onClick={handleStart}>
                        click to start
                    </div>
                ) : state.state === "intro" ? (
                    <>
                        <div class={styles.introScreen}>
                            <button class={styles.choiceButton} onClick={handleIntro}>introduce self</button>
                            <button class={styles.choiceButton} onClick={handleFlee}>flee</button>
                        </div>
                    </>
                ) : state.state === "end" ? (
                    <>
                        <div class={styles.endScreen} onClick={handleEndScreenClick}>
                            game over click to play again
                        </div>
                    </>
                ) : (
                    <>
                        <div class={styles.npc}></div>
                        <div class={styles.upper}>
                            {/* TODO: turn into progress bar */}
                            <div class={styles.meter} style={{ "--meter-value": `${state.meter.value}%` }}></div>
                            <div class={styles.textBox}>{renderSpeechBubbleText(state.speechBubbleText, state.npc.hobbies.map((word) => word.korean))}</div>
                            <div class={styles.phoneButton}></div>
                        </div>
                        <div class={styles.lower}>
                            {/* TODO: render games here */}
                            {state.state === "choose_game" ? (
                                <ul class={styles.gameChoiceList}>
                                    <For each={StudyLoveApp.gameList}>{(game) =>
                                        <li onClick={handleGameChoiceClick} data-game={game.name}>{game.choice_text}</li>
                                    }</For>
                                </ul>
                            ) : state.state === "playing_game" ? (
                                <>{renderGame(state, setState)}</>
                            ) : (<></>)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function renderGame(state: StudyLoveApp.ApplicationModel, setState: SetStoreFunction<StudyLoveApp.ApplicationModel>) {
    if (state.game === undefined) return <>game broke send halp</>;

    const handleEmojiClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
        if (state.game?.type === "hobby") {
            const wordId = event.currentTarget.getAttribute("data-word-id");
            if (wordId) {
                const word = WordList.getWordById(wordId);
                if (word !== undefined) {
                    setState("game", produce((game) => {
                        if (game?.type === 'hobby') {
                            game.selectedWordList.push(word);
                        }
                    }))
                } else {
                    console.error("hobby game: emoji clicked and data-word-id doesnt corresponsed to a word in the word list");
                }
            } else {
                console.error("hobby game: emoji clicked w/o data-word-id attribute???");
            }
        }
    };

    switch (state.game.type) {
        case "hobby": {
            return (
                <div class={styles.hobbyGame}>
                    <For each={state.game.wordPool}>{(word) =>
                        <div onClick={handleEmojiClick} data-word-id={word.id}>{word.emoji}</div>
                    }</For>
                </div>
            );
        }
        default: return <></>;
    }
}

function renderSpeechBubbleText(template: string, list: string[]) {
    const result = template.replace(/\{hobby(\d)\}/g, (_, index) => list[index - 1]);
    return result;
}