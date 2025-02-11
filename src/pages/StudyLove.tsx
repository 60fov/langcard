import { createStore } from 'solid-js/store';
import * as StudyLoveApp from './studylove/app';

import styles from './StudyLove.module.css';
import { For, createSignal } from 'solid-js';

export default function StudyLove() {
    const [state, setState] = createStore<StudyLoveApp.ApplicationModel>(StudyLoveApp.appState);

    const [num, setNum] = createSignal<number>(0);

    return (
        <div class={styles.rootContainer}>
            <input type="number" value={num()} onChange={(event) => setNum(event.target.valueAsNumber)} />
            <div class={styles.game}>
                <div class={styles.npc}></div>
                <div class={styles.upper}>
                    {/* TODO: turn into progress bar */}
                    <div class={styles.meter} style={{ "--meter-value": `${num()}%` }}></div>
                    <div class={styles.textBox}>{state.speechBubbleText}</div>
                    <div class={styles.phoneButton}>{num()}</div>
                </div>
                <div class={styles.lower}>
                    {/* TODO: render games here */}
                    <ul class={styles.gameChoiceList}>
                        <For each={StudyLoveApp.gameList}>{(game) =>
                            <li>{game.choice_text}</li>
                        }</For>
                    </ul>
                </div>
            </div>
        </div>
    );
}