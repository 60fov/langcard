import { Component, JSX, ParentComponent, createEffect } from "solid-js";
import { For, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import * as WordList from "../wordlist";
import { PauseIcon, PlayIcon, ReloadIcon } from "../components/icons";

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
};

const initialState: ScattergoriesState = {
  time: 120,
  categoryCount: 10,
  categoryList: [],
  initalLetter: "ㄹ",
  isPlaying: false,
  intervalId: null,
};

export default function Scattergories() {
  const [state, setState] = createStore<ScattergoriesState>(initialState);

  const timerEnd = () => {
    if (state.intervalId) {
      clearInterval(state.intervalId);
    }
    setState("intervalId", null);
  }

  const getRandomCategoryList = (length: number) => {
    return WordList.getCategoryList()
      .sort(() => Math.random() - 0.5)
      .slice(0, length);
  }

  onMount(() => {
    // get random list of categories numbered by categoryCount
    setState("categoryList", getRandomCategoryList(state.categoryCount));
  });

  // 
  createEffect(() => {
    if (state.time <= 0) {
      setState("isPlaying", false);
      timerEnd();
    }
  });

  // change the category list when the category count changes
  createEffect(() => {
    setState("categoryList", getRandomCategoryList(state.categoryCount));
  });

  const handleTogglePlay = () => {
    setState("isPlaying", (prevState) => !prevState);
    if (state.isPlaying) {
      if (state.time <= 0) setState("time", 120);
      const intervalId = setInterval(() => {
        setState("time", state.time - 1);
      }, 1000);
      setState("intervalId", intervalId);
    } else {
      timerEnd();
    }
  };

  const handleCategoryCountChange: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    const target = event.currentTarget;
    const value = target.value;
    try {
      console.log(target, value);
      setState("categoryCount", parseInt(value));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    timerEnd();
    setState("time", 120);
    setState("isPlaying", false);
  };

  return (
    <div class={styles.rootContainer}>
      <div class={styles.sidebar}>
        <SidebarItem text={state.isPlaying ? "Pause" : "Play"}>
          <div style={{
            "display": "flex",
            "padding": "0 0 1em 0",
            "justify-content": "end",
          }}>
            <button
              class={styles.button}
              onClick={handleReset}>
              <ReloadIcon style={{ "font-size": "16px" }} />
            </button>
          </div>
          <button
            onClick={handleTogglePlay}
            style={{ "font-size": "4em" }}
            class={styles.button}
          >{state.isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
        </SidebarItem>
        <SidebarItem text="# of categories">
          <input
            type="number"
            min="1"
            max={WordList.getCategoryList().length}
            value={state.categoryCount}
            onInput={handleCategoryCountChange}
          />
        </SidebarItem>
        <SidebarItem text="timer">
          <Timer currentTime={state.time} duration={120}></Timer>
        </SidebarItem>
        <SidebarItem text="starts with">
          <span style={{ "font-size": "2em" }}>{state.initalLetter}</span>
        </SidebarItem>
      </div>
      <ol class={styles.categoryList}>
        <For each={state.categoryList}>
          {(category, index) => (
            <li>
              <CategoryInput category={category} />
              <span
                style={{
                  "position": "absolute",
                  "inset": 0,
                  "display": "inline-block",
                  "background-color": "black",
                  "right": state.isPlaying ? "100%" : "0",
                  "transition": `all 0.20s ease-in`,
                  "transition-delay": `${index() * (200 / state.categoryList.length)}ms`,
                }}
              ></span>
            </li>
          )}
        </For>
      </ol>
    </div>
  );
}

type SidebarItemProps = {
  text: string,
};

const SidebarItem: ParentComponent<SidebarItemProps> = (props) => {
  return (
    <div class={styles.sidebarItem}>
      <span class={styles.sidebarItemContent}>{props.children}</span>
      <span class={styles.sidebarItemText}>{props.text}</span>
    </div>
  );
}

type CategoryProps = {
  category: string,
};

const CategoryInput: Component<CategoryProps> = (props) => {
  return (
    <div class={styles.categoryInput}>
      <input type="text" />
      <label>{props.category}</label>
    </div>
  )
}

type TimerProps = {
  currentTime: number;
  duration: number;
};

const Timer: ParentComponent<TimerProps> = (props) => {

  const angle = () => (props.currentTime / props.duration) * Math.PI * 2;

  return (
    <div class={styles.timer}>
      <div
        style={{
          "--a": `${angle()}rad`,
        }}
      >
      </div>
      <span>{props.currentTime}</span>
    </div>
  );
}