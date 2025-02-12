import { createStore } from 'solid-js/store';
import * as StudyLoveApp from './studylove/app';

import styles from './StudyLove.module.css';
import { For, JSX, createSignal } from 'solid-js';

import * as WordList from '../wordlist';

const testAppState: StudyLoveApp.ApplicationModel = {
  state: "choose_game",
  speechBubbleText: "",
  background: "",
  time: 0,
  meter: {
    value: 0,
    fallRate: 1,
    growRate: 10,
  },
  npc: {
    name: "mina",
    asset: "",
    hobbies: WordList.getWordsByCategory("hobbies").slice(0, 3),
    phoneNumber: "3471896",
  },
  game: undefined,
};

export default function StudyLove() {
    const [state, setState] = createStore<StudyLoveApp.ApplicationModel>(testAppState);

    const handleGameChoiceClick: JSX.EventHandler<HTMLLIElement, MouseEvent> = (event) => {
        const selectedGame = event.currentTarget.getAttribute("data-game");
        if (selectedGame) {

            setState("meter", "value", (prev) => prev + 10);
            // StudyLoveApp.selectGame(testAppState, selectedGame);
        } else {
            console.error("clicked on game choice but there is no data-game value on that element");
        }
    };

    return (
        <div class={styles.rootContainer}>
            <div class={styles.game}>
                <div class={styles.npc}></div>
                <div class={styles.upper}>
                    {/* TODO: turn into progress bar */}
                    <div class={styles.meter} style={{ "--meter-value": `${state.meter.value}%` }}></div>
                    <div class={styles.textBox}>{state.speechBubbleText}</div>
                    <div class={styles.phoneButton}></div>
                </div>
                <div class={styles.lower}>
                    {/* TODO: render games here */}
                    <ul class={styles.gameChoiceList}>
                        <For each={StudyLoveApp.gameList}>{(game) =>
                            <li onClick={handleGameChoiceClick} data-game={game.name}>{game.choice_text}</li>
                        }</For>
                    </ul>
                </div>
            </div>
        </div>
    );
}
