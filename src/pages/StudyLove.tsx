import { SetStoreFunction, createStore, produce, unwrap } from 'solid-js/store';
import * as StudyLoveApp from './studylove/app';

import styles from './StudyLove.module.css';
import { For, JSX, createEffect, createSignal } from 'solid-js';

import * as WordList from '../wordlist';

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
            if (!state.playedGameList.includes(selectedGame as StudyLoveApp.GameName)) {
                const tr = StudyLoveApp.Transaction.create("state", "set", `game_${selectedGame}`);
                runTransaction(tr);
            } else {
                console.error(`choose game: tried to play game that has been played (${selectedGame})`);
            }
            // StudyLoveApp.selectGame(testAppState, selectedGame);
        } else {
            console.error("clicked on game choice but there is no data-game value on that element");
        }
    };

    const handlePhoneButtonClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
        console.log("ui: phone button click");
        console.log(state.meter.value / 100);
        if (state.meter.value / 100 > Math.random()) {
            // success
            const tr = StudyLoveApp.Transaction.create("state", "set", "phone_number");
            runTransaction(tr);
        } else {
            const tr = StudyLoveApp.Transaction.create("state", "set", "end_lose");
            runTransaction(tr);
            // TODO: set dialog via transaction then timeout to set to end_lose game state
            // setTimeout(() => {
            //     const tr = StudyLoveApp.Transaction.create(...);
            //     runTransaction(tr);
            // }, 1000);
        }
    };

    const handleStart: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
        console.log("ui: start click");
        {
            const tr = StudyLoveApp.Transaction.create("state", "set", "intro");
            runTransaction(tr);
        }
    };

    const handleIntro: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
        console.log("ui: handle intro");

        runTransaction(StudyLoveApp.Transaction.create("meter", "set", state.meter.value + 25));
        runTransaction(StudyLoveApp.Transaction.create("state", "set", "choose_game"));

    };

    const handleFlee: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
        console.log("ui: handle flee");
        const tr = StudyLoveApp.Transaction.create("state", "set", "end_lose");
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
            <div class={styles.game} style={{ "background-image": `url(${state.background})` }}>
                <div class={styles.npc}>
                    <img src={state.npc.asset} />
                </div>
                {state.state === "start" ? (
                    <div class={styles.startScreen} onClick={handleStart}>
                        <img src={StudyLoveApp.Assets.title} width="100%" />
                    </div>
                ) : state.state === "end_win" ? (
                    <>
                        <div class={styles.endScreen} onClick={handleEndScreenClick}>
                            nice job getting their number, click to play again
                        </div>
                    </>
                ) : state.state === "end_lose" ? (
                    <>
                        <div class={styles.endScreen} onClick={handleEndScreenClick}>
                            you failed to get their number, click to play again
                        </div>
                    </>
                ) : (
                    <>
                        <div class={styles.upper}>
                            {/* TODO: turn into progress bar */}
                            <div class={styles.meter} style={{ "--meter-value": `${state.meter.value}%` }}></div>
                            <div class={styles.textBox}>{StudyLoveApp.getSpeechBubbleText(state)}</div>
                            <div class={styles.phoneButton} onClick={handlePhoneButtonClick}>
                                📞
                            </div>
                        </div>
                        <div class={styles.lower}>
                            {/* TODO: render games here */}
                            {state.state === "intro" ? (
                                <>
                                    <div class={styles.introScreen}>
                                        <div class={styles.choiceButton} onClick={handleIntro}>introduce self</div>
                                        <div class={styles.choiceButton} onClick={handleFlee}>flee</div>
                                    </div>
                                </>
                            ) : state.state === "choose_game" ? (
                                <ul class={styles.gameChoiceList}>
                                    <For each={StudyLoveApp.gameList}>{(game) =>
                                        <li
                                            data-disabled={state.playedGameList.includes(game.name)}
                                            class={styles.choiceButton}
                                            onClick={handleGameChoiceClick}
                                            data-game={game.name}>
                                            {game.choice_text}
                                        </li>
                                    }</For>
                                </ul>
                            ) : state.state === "game_hobby" ? (
                                <>{renderHobby(state, setState)}</>
                            ) : state.state === "game_mbti" ? (
                                <>{renderMBTI(state, setState)}</>
                            ) : state.state === "phone_number" ? (
                                <>{renderPhone(state, setState)}</>
                            ) : <></>}
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
                state.ledger.push(StudyLoveApp.Transaction.create("game_played", "", "hobby"));
                StudyLoveApp.Transaction.run(state, state.ledger.slice(state.ledgerNdx));
            }));
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

function renderPhone(state: StudyLoveApp.ApplicationModel, setState: SetStoreFunction<StudyLoveApp.ApplicationModel>) {
    const [phoneNumber, setPhoneNumber] = createSignal<string>("");

    const handleNumClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
        const num = event.currentTarget.getAttribute("data-number");
        if (num) {
            if (phoneNumber().length < 7) {
                setPhoneNumber((prev) => prev + num);
            }
        } else {
            console.error("phone: number clicked but no data-number attribute???");
        }
    };

    const handleDel: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
        if (phoneNumber().length > 0) {
            setPhoneNumber((prev) => prev.slice(0, prev.length - 1));
        }
    };

    const handleSave: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
        setState(produce((state) => {
            state.ledger.push(StudyLoveApp.Transaction.create("number", "set", phoneNumber()));
            StudyLoveApp.Transaction.run(state, state.ledger.slice(state.ledgerNdx));
        }));
    };

    return (
        <div class={styles.phone}>
            <div data-num-entry>{phoneNumber()}</div>
            <div data-numpad>
                <button data-number="1" onClick={handleNumClick}>1</button>
                <button data-number="2" onClick={handleNumClick}>2</button>
                <button data-number="3" onClick={handleNumClick}>3</button>
                <button data-number="4" onClick={handleNumClick}>4</button>
                <button data-number="5" onClick={handleNumClick}>5</button>
                <button data-number="6" onClick={handleNumClick}>6</button>
                <button data-number="7" onClick={handleNumClick}>7</button>
                <button data-number="8" onClick={handleNumClick}>8</button>
                <button data-number="9" onClick={handleNumClick}>9</button>
                <span></span>
                <button data-number="0" onClick={handleNumClick}>0</button>
                <button data-del onClick={handleDel}>del</button>
            </div>
            <button data-save onClick={handleSave}>save</button>
        </div>
    );
}


function renderMBTI(state: StudyLoveApp.ApplicationModel, setState: SetStoreFunction<StudyLoveApp.ApplicationModel>) {
    const [mbti, setMbti] = createSignal<number[]>([0, 0, 0, 0]);
    const [guessList, setGuessList] = createSignal<string[]>([]);

    const mbtiTable = StudyLoveApp.mbtiTable;

    function getMbtiString(): string {
        return mbtiTable.reduce((prev, curr, ndx) => {
            return prev + mbtiTable[ndx][mbti()[ndx]];
        }, "");
    }

    createEffect(() => {
        const outOfGuesses = guessList().length === 3;
        if (outOfGuesses) {
            // end game
            setState(produce((state) => {
                state.ledger.push(StudyLoveApp.Transaction.create("game_played", "", "mbti"));
                StudyLoveApp.Transaction.run(state, state.ledger.slice(state.ledgerNdx));
            }));
            setState(produce((state) => {
                state.ledger.push(StudyLoveApp.Transaction.create("state", "set", "choose_game"));
                StudyLoveApp.Transaction.run(state, state.ledger.slice(state.ledgerNdx));
            }));
        }
    });

    const handleToggle: JSX.EventHandler<HTMLInputElement, Event> = (event) => {
        const mbtiNdxAttrib = event.currentTarget.getAttribute("data-index");
        if (mbtiNdxAttrib !== null) {
            setMbti((prev) => {
                const mbtiNdx = parseInt(mbtiNdxAttrib);
                const result = [...prev];
                result[mbtiNdx] = prev[mbtiNdx] === 0 ? 1 : 0;
                return result;
            });
        } else {
            console.error("mbti: tile clicked but no data-index attribute???");
        }
    };

    const handleSubmit: JSX.EventHandler<HTMLButtonElement, Event> = (event) => {
        const guessCorrect = getMbtiString() === state.npc.mbti;
        console.log("getmbti()", getMbtiString(), "npc mbti", state.npc.mbti);
        if (guessCorrect) {
            // give points
            setState(produce((state) => {
                state.ledger.push(StudyLoveApp.Transaction.create("meter", "set", state.meter.value + 30));
                StudyLoveApp.Transaction.run(state, state.ledger.slice(state.ledgerNdx));
            }));
            setState(produce((state) => {
                state.ledger.push(StudyLoveApp.Transaction.create("state", "set", "choose_game"));
                StudyLoveApp.Transaction.run(state, state.ledger.slice(state.ledgerNdx));
            }));
        }

        setGuessList((prev) => [...prev, getMbtiString()]);
    };

    return (
        <div class={styles.mbti}>
            <div data-tile>
                <label for="extra_intro">{mbtiTable[0][mbti()[0]]}</label>
                <input id="extra_intro" type="checkbox" data-index={0} onChange={handleToggle} />
            </div>
            <div data-tile>
                <label for="intu_obser">{mbtiTable[1][mbti()[1]]}</label>
                <input id="intu_obser" type="checkbox" data-index={1} onChange={handleToggle} />
            </div>
            <div data-tile>
                <label for="think_feel">{mbtiTable[2][mbti()[2]]}</label>
                <input id="think_feel" type="checkbox" data-index={2} onChange={handleToggle} />
            </div>
            <div data-tile>
                <label for="judge_prosp">{mbtiTable[3][mbti()[3]]}</label>
                <input id="judge_prosp" type="checkbox" data-index={3} onChange={handleToggle} />
            </div>
            <button onClick={handleSubmit}>guess {guessList().length + 1} / 3</button>
        </div>
    );
}

/** dont use this */
function renderSpeechBubbleText(template: string, list: string[]) {
    const result = template.replace(/\{hobby(\d)\}/g, (_, index) => list[index - 1]);
    return result;
}