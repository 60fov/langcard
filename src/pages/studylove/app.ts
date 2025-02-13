import * as WordList from "../../wordlist";

export const stateList = [
  "start",
  "intro",
  "choose_game",
  "game_hobby",
  "game_mbti",
  "phone_number",
  "end_win",
  "end_lose",
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
  asset: string;
  name: string;
  phoneNumber: string;
  hobbies: WordList.Word[];
  mbti: string;
  //   outfit?: string; // TBD
  //   mbti?: string; // TBD
};

export type Game = HobbyGame | PhoneGame;
export type GameName = (typeof gameList)[number]["name"];
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
// TODO: do we need game state on app state?
export type HobbyGame = {
  type: "hobby";
  wordPool: WordList.Word[];
  selectedWordList: WordList.Word[];
};

export const initialHobbyGameState: HobbyGame = {
  type: "hobby",
  wordPool: [],
  selectedWordList: [],
};

export type PhoneGame = {
  type: "phone";
  state: "phone" | "name";
  phoneNumberInput: string;
  nameInput: string;
};

export type ApplicationModel = {
  ledger: StateTransaction[];
  ledgerNdx: number;
  state: State;
  speechBubbleText: string;
  background: string;
  time: number;
  meter: Meter;
  npc: NPC;
  // TODO: remove this
  hobbyGame: HobbyGame;
  playedGameList: GameName[];
};

export type PhraseTable = typeof phraseTable;
export const phraseTable = {
  intro: ["안녕하세요, 저는 {name}(이에요/예요)"],
  hobby: ["{hobby1}, {hobby2}, 그리고 {hobby3}(을/를) 좋아합니다"],
};

export const initalAppState: ApplicationModel = {
  ledger: [],
  ledgerNdx: 0,
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
    mbti: "",
  },
  hobbyGame: structuredClone(initialHobbyGameState),
  playedGameList: [],
};

export type StateTransaction = {
  type: string;
  name: string;
  data?: any;
};

export const Transaction = {
  create(type: string, name: string, data?: any): StateTransaction {
    return { type, name, data };
  },
  move(app: ApplicationModel, count: number) {
    // TODO: ...
  },
  run(app: ApplicationModel, transactionList: StateTransaction[]): boolean {
    for (const tr of transactionList) {
      console.log("running tr", tr);
      switch (tr.type) {
        case "game_played": {
          if (gameList.map((game) => game.name).includes(tr.data as GameName)) {
            app.playedGameList.push(tr.data);
          }
          break;
        }
        case "number": {
          if (tr.name === "set") {
            if (app.npc.phoneNumber === tr.data) {
              app.state = "end_win";
            } else {
              app.state = "end_lose";
            }
          }
          break;
        }
        case "npc": {
          if (tr.name === "set") {
            app.npc = tr.data;
          }
          break;
        }
        case "state": {
          if (tr.name === "set") {
            // TODO: data validation
            app.state = tr.data;
            if (tr.data === "intro") {
              // app = structuredClone(initalAppState);
              app.hobbyGame = structuredClone(initialHobbyGameState);
              app.meter.value = 0;
              app.npc = generateNpc();
              console.log(app.npc);
              app.background = getRandomBackground();
            } else if (tr.data === "game_hobby") {
              const hobbyList = WordList.getWordsByCategory("hobbies");
              const filteredWordList = hobbyList.filter(
                (wordListWord) =>
                  !app.npc.hobbies.find(
                    (npcHobby) => npcHobby.id === wordListWord.id
                  )
              );
              app.hobbyGame.wordPool = shuffle(
                app.npc.hobbies.concat(filteredWordList).slice(0, 6)
              );
              // console.log(app);
            }
          }
          break;
        }
        case "meter": {
          if (tr.name === "set") {
            // TODO: data validation
            app.meter.value = tr.data;
          }
          break;
        }
        default:
          return false;
      }
      app.ledgerNdx += 1;
    }
    return true;
  },
};

function getRandomBackground(): string {
  const fn = ["alley", "sunset_street", "school_hallway"][
    Math.floor(Math.random() * 3)
  ];
  return `src/assets/imgs/bg_${fn}.png`;
}

function generateNpc(): NPC {
  return {
    asset: `src/assets/imgs/char${Math.ceil(Math.random() * 3)}.png`,
    hobbies: shuffle(WordList.getWordsByCategory("hobbies")).slice(0, 3),
    name: shuffle(["mina", "kate", "ashley"]).at(0)!,
    phoneNumber: Array.from({ length: 7 })
      .map(() => Math.floor(Math.random() * 10))
      .join(""),
    mbti: getRandomMbti(),
  };
}

function getRandomMbti(): string {
  return mbtiTable.reduce((prev, curr, ndx) => {
    return prev + mbtiTable[ndx][Math.floor(Math.random() * 2)];
  }, "");
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => 0.5 - Math.random());
}

/** TODO: speech bubble text should instead be set by transactions */
export function getSpeechBubbleText(app: ApplicationModel): string {
  switch (app.state) {
    case "intro": {
      return `안녕하세요, 저는 ${app.npc.name}입니다. 만나서 반가워요!`;
    }
    case "game_hobby": {
      return `${app.npc.hobbies[0].korean}, ${app.npc.hobbies[1].korean}, 그리고 ${app.npc.hobbies[2].korean} 좋아합니다`;
    }
    case "phone_number": {
      return `${app.npc.phoneNumber
        .split("")
        .map((num) => numberList[parseInt(num)])
        .join("")}`;
    }
    case "game_mbti": {
      return `${mbtiPhraseTable[app.npc.mbti][0]}`;
    }
  }
  return "";
}

const numberList = ["공", "일", "이", "삼", "사", "오", "육", "칠", "발", "구"];

export const mbtiTable = [
  ["E", "I"],
  ["N", "S"],
  ["T", "F"],
  ["J", "P"],
];

const mbtiPhraseTable: Record<string, string[]> = {
  ISTJ: [
    "나는 혼자 있고 계획하는 걸 좋아해요.",
    "감정보다 사실이 중요해요.",
    "나는 변화를 싫어하고 규칙을 잘 지켜요.",
  ],
  ISFJ: [
    "나는 조용한 곳이 좋고 남을 돕고 싶어요.",
    "나는 변화를 싫어하고 계획이 필요해요.",
    "나는 세심하고 책임감이 많아요.",
  ],
  INFJ: [
    "나는 혼자 생각하고 깊은 이야기를 좋아해요.",
    "나는 감정을 잘 이해하고 미래를 꿈꿔요.",
    "나는 의미를 찾고 가능성을 생각해요.",
  ],
  INTJ: [
    "나는 혼자 공부하고 미래를 계획해요.",
    "나는 감정보다 논리가 중요해요.",
    "나는 목표가 필요하고 효율이 좋아요.",
  ],
  ISTP: [
    "나는 혼자가 편하고 직접 해보는 게 좋아요.",
    "나는 감정보다 효율이 중요하고 즉흥적이에요.",
    "나는 이론보다 실험을 좋아하고 말이 적어요.",
  ],
  ISFP: [
    "나는 혼자 있는 게 좋고 감성이 많아요.",
    "나는 자유롭게 살고 순간을 즐겨요.",
    "나는 내 방식이 좋고 남을 돕는 게 좋아요.",
  ],
  INFP: [
    "나는 상상하고 감정을 중요하게 생각해요.",
    "나는 현실보다 가능성을 보고 자유롭게 살아요.",
    "나는 꿈이 크고 나만의 세계가 있어요.",
  ],
  INTP: [
    "나는 혼자 생각하고 아이디어를 분석해요.",
    "나는 감정보다 논리가 중요하고 자유롭게 생각해요.",
    "나는 새로운 방법을 찾고 깊이 고민해요.",
  ],
  ESTP: [
    "나는 가만히 있는 게 싫고 직접 해봐야 해요.",
    "나는 감정보다 논리가 중요하고 즉흥적이에요.",
    "나는 행동이 중요하고 현실적으로 생각해요.",
  ],
  ESFP: [
    "나는 사람들과 어울리고 분위기를 즐겨요.",
    "나는 즉흥적이고 감정을 솔직하게 표현해요.",
    "나는 계획보다 지금을 즐기고 에너지가 많아요.",
  ],
  ENFP: [
    "나는 사람들과 이야기하고 새로운 걸 배워요.",
    "나는 감정을 중요하게 생각하고 자유롭게 살아요.",
    "나는 아이디어가 많고 모험을 좋아해요.",
  ],
  ENTP: [
    "나는 토론하는 게 좋고 아이디어가 많아요.",
    "나는 감정보다 논리가 중요하고 정해진 방법을 싫어해요.",
    "나는 도전을 좋아하고 변화를 즐겨요.",
  ],
  ESTJ: [
    "나는 사람들과 함께 일하고 현실적인 게 좋아요.",
    "나는 감정보다 논리가 중요하고 계획이 필요해요.",
    "나는 규칙을 지키고 목표를 이루고 싶어요.",
  ],
  ESFJ: [
    "나는 사람들과 함께 있고 감정을 잘 표현해요.",
    "나는 분위기를 맞추고 계획대로 움직여요.",
    "나는 단체 활동을 좋아하고 남을 돕는 게 좋아요.",
  ],
  ENFJ: [
    "나는 사람들과 이야기하고 감정을 잘 이해해요.",
    "나는 미래를 생각하고 계획을 세워요.",
    "나는 분위기를 조절하고 사람들을 도와요.",
  ],
  ENTJ: [
    "나는 사람들과 일하고 목표를 중요하게 생각해요.",
    "나는 논리적으로 생각하고 미래를 계획해요.",
    "나는 효율을 중요하게 생각하고 리더십이 있어요.",
  ],
};
