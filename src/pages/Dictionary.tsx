import { Component, For, JSX, createSignal } from "solid-js";
import * as WordList from "../wordlist";

import styles from "./Dictionary.module.css";

export default function Dictionary() {
    const [categoryFilter, setCategoryFilter] = createSignal<string>()

    const filteredWordList = () => {
        const category = categoryFilter();
        if (category) {
            return WordList.getWordsByCategory(category);
        } else {
            return WordList.getAllWords();
        }
    }

    const handleCategoryChange: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
        setCategoryFilter(event.currentTarget.value);
    }

    return (
        <div class={styles.rootContainer}>
            <select
                class={styles.categorySelect}
                value={categoryFilter() || 'all'}
                onChange={handleCategoryChange}
            >
                <For each={WordList.categories}>
                    {(category) =>
                        <option value={category.id}>{category.id}</option>
                    }
                </For>
            </select>

            <ul class={styles.entryList}>
                <For each={filteredWordList()}>
                    {(word) =>
                        <WordEntry word={word} />
                    }
                </For>
            </ul>
        </div>
    )
}

type WordEntryProps = {
    word: WordList.Word
};

const WordEntry: Component<WordEntryProps> = (props) => {
    const [visible, setVisible] = createSignal(false);

    const handleClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
        setVisible((prev) => !prev);
    }

    return (
        <div class={styles.wordEntry}
            onClick={handleClick}>
            <div style={{ "font-size": "2em" }}>{props.word.emoji}</div>
            <div data-korean data-visible={visible()}>{props.word.korean}</div>
            <div data-korean data-visible={visible()}>{props.word.english}</div>
        </div>
    )
}