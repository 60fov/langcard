import * as WordList from "../../wordlist";

export const stateList = [
  "start",
  "intro",
  "choose_game",
  "playing_game",
  "phone_number",
  "end",
] as const;

export type State = (typeof stateList)[number];

export type Meter = {
  value: number;
  /** per unit of time */
  fallRate: number;
  /** per interaction */
  growRate: number;
};

export type NPC = {
  name: string;
  phoneNumber: string;
  hobbies: WordList.Word[];
  /** figure out what this is */
  asset: string;
  //   outfit?: string; // TBD
  //   mbti?: string; // TBD
};

export type Game = HobbyGame | PhoneGame;
export const gameList = [
  {
    name: "hobby",
    choice_text: "ask about hobbies",
  },
  {
    name: "mbti",
    choice_text: "ask about mbti",
  },
  {
    name: "job",
    choice_text: "ask about job",
  },
  {
    name: "outfit",
    choice_text: "ask about outfit",
  },
] as const;

// TODO: how can i limit type to be one of game list
export type HobbyGame = {
  type: "hobby";
  wordPool: WordList.Word[];
  selectedWordList: WordList.Word[];
};

export type PhoneGame = {
  type: "phone";
  state: "phone" | "name";
  phoneNumberInput: string;
  nameInput: string;
};

export type ApplicationModel = {
  state: State;
  speechBubbleText: string;
  background: string;
  time: number;
  meter: Meter;
  npc: NPC;
  game?: Game;
};

export type PhraseTable = typeof phraseTable;
export const phraseTable = {
  intro: ["안녕하세요, 저는 {name}(이에요/예요)"],
  hobby: ["{hobby1}, {hobby2}, 그리고 {hobby3}(을/를) 좋아합니다"],
};

export const appState: ApplicationModel = {
  state: "start",
  speechBubbleText: "",
  background: "",
  time: 0,
  meter: {
    value: 0,
    fallRate: 1,
    growRate: 10,
  },
  npc: {
    name: "",
    asset: "",
    hobbies: [],
    phoneNumber: "",
  },
  game: undefined,
};
