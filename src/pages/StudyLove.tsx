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
            {
                const tr = StudyLoveApp.Transaction.create("state", "set", "game_hobby");
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
            <div class={styles.game} style={{"background": `url(${state.background})`}}>
                <div class={styles.npc}>
                    <img src={state.npc.asset} />
                    </div>
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
                        <div class={styles.upper}>
                            {/* TODO: turn into progress bar */}
                            <div class={styles.meter} style={{ "--meter-value": `${state.meter.value}%` }}></div>
                            <div class={styles.textBox}>{StudyLoveApp.getSpeechBubbleText(state)}</div>
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
                            ) : state.state === "game_hobby" ? (
                                <>{renderHobby(state, setState)}</>
                            ) : <></> }
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}


function renderHobby(state: StudyLoveApp.ApplicationModel, setState: SetStoreFunction<StudyLoveApp.ApplicationModel>) {

        createEffect(() => {
            const list = state.hobbyGame.selectedWordList;
            const list1 = state.npc.hobbies;
           if (list1.length === list.length) {
            setState(produce((state) => {
                state.ledger.push(StudyLoveApp.Transaction.create("state", "set", "choose_game"));
                StudyLoveApp.Transaction.run(state, state.ledger.slice(state.ledgerNdx));
            }));
           }
        });

        const handleEmojiClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
            const wordId = event.currentTarget.getAttribute("data-word-id");
            if (wordId) {
                const word = WordList.getWordById(wordId);
                if (word !== undefined) {
                    if (word.id === state.npc.hobbies[state.hobbyGame.selectedWordList.length].id) {
                        setState(produce((state) => {
                            state.ledger.push(StudyLoveApp.Transaction.create("meter", "set", state.meter.value + 15));
                            StudyLoveApp.Transaction.run(state, state.ledger.slice(state.ledgerNdx));
                        }));
                    }
                    setState("hobbyGame", produce((game) => {
                        game.selectedWordList.push(word);
                    }));
                } else {
                    console.error("hobby game: emoji clicked and data-word-id doesnt corresponsed to a word in the word list");
                }
            } else {
                console.error("hobby game: emoji clicked w/o data-word-id attribute???");
            }
    };

    return (
        <div class={styles.hobbyGame}>
            <For each={state.hobbyGame.wordPool}>{(word) =>
                <div onClick={handleEmojiClick} data-word-id={word.id}>{word.emoji}</div>
            }</For>
        </div>
    )
}

/** dont use this */
function renderSpeechBubbleText(template: string, list: string[]) {
    const result = template.replace(/\{hobby(\d)\}/g, (_, index) => list[index - 1]);
    return result;
}
