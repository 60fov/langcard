import { createEffect, createSignal, createUniqueId, For, onMount } from "solid-js";
import { getWord, Word } from "../wordlist";
import * as word_list from "../wordlist";
import styles from "./WordMatcher.module.css";
import { createStore, produce } from "solid-js/store";
import animations from "../animations";

type Card = {
    id: string;
    wordId: string;
    type: "emoji" | "text";
    word: string;
    position: { x: number; y: number };
    matched: boolean;
    overlap: boolean;
    rotation: number;
    ref: HTMLDivElement | undefined;
}

type WordMatcherNewState = {
    cards: Card[];
    selectedCardId: string | null;
    dragOffset: { x: number, y: number } | null;
}

const initialState: WordMatcherNewState = {
    cards: [],
    selectedCardId: null,
    dragOffset: null
};

export default function WordMatcherNew() {
    const [count, setCount] = createSignal(10);
    const [showRomanization, setShowRomanization] = createSignal(false);
    const [showEnglish, setShowEnglish] = createSignal(false);

    const [state, setState] = createStore<WordMatcherNewState>(initialState);
    const [containerElement, setContainerElement] = createSignal<HTMLDivElement>();
    const [category, setCategory] = createSignal("animals");

    const wordList = () => word_list.getWordsByCategory(category());

    onMount(() => {
        setState("cards", generateInitialCardState(wordList(), { count: count(), container: containerElement() }));
    });

    createEffect(() => {
        console.log("effect wordList");
        setState("cards", generateInitialCardState(wordList(), { count: count(), container: containerElement() }));
    });

    createEffect(() => {
        if (state.cards.length == 0) {
            setState("cards", generateInitialCardState(wordList(), { count: count(), container: containerElement() }));
            setState("selectedCardId", null);
            setState("dragOffset", null);
        }
    });

    const removeCard = (id: string) => {
        setState("cards", (cards) => cards.filter(card => card.id !== id));
    }

    const handleMatch = async (a: Card, b: Card) => {
        console.log("Match found!");
        setState("cards", (cards) => [a.id, b.id].includes(cards.id), produce((card) => {
            card.matched = true;
        }));

        const aCardAnimation = document.querySelector(`[data-id="${a.id}"]`)
            ?.animate(animations.match.keyframes, animations.match.timing)
        aCardAnimation?.addEventListener("finish", () => {
            aCardAnimation?.cancel();
            aCardAnimation?.commitStyles();
            removeCard(a.id);
        });

        const bCardAnimation = document.querySelector(`[data-id="${b.id}"]`)
            ?.animate(animations.match.keyframes, animations.match.timing)
        bCardAnimation?.addEventListener("finish", () => {
            bCardAnimation?.cancel();
            bCardAnimation?.commitStyles();
            removeCard(b.id);
        });
    }

    const updateCardPosition = (id: string, update: (prev: Card) => { x: number, y: number }) => {
        setState(
            "cards",
            (cards) => cards.id == id,
            produce((card) => {
                const { x, y } = update(card);
                card.position.x = x;
                card.position.y = y;
            })
        );
    }

    const checkForIntersectingCards = (handleIntersect: (a: Card, b: Card) => void) => {
        const cards = () => state.cards;
        const cardElements = document.querySelectorAll(`.${styles.card}`);

        // Convert NodeList to array and map to elements with their data
        const cardsWithBounds = Array.from(cardElements).map(element => {
            const id = element.getAttribute('data-id')!;
            const card = cards().find(c => c.id === id)!;
            const bounds = element.getBoundingClientRect();
            return {
                id,
                card,
                bounds: {
                    x: bounds.x,
                    y: bounds.y,
                    width: bounds.width,
                    height: bounds.height
                }
            };
        });

        // Check for intersecting pairs
        for (let i = 0; i < cardsWithBounds.length; i++) {
            for (let j = i + 1; j < cardsWithBounds.length; j++) {
                const a = cardsWithBounds[i];
                const b = cardsWithBounds[j];

                if (boxIntersects(a.bounds, b.bounds)) {
                    handleIntersect(a.card, b.card);
                }
            }
        }
    }

    const onCardDragMove = (card: Card, event: PointerEvent) => {
        // console.log("Pointer move", event);
        const target = event.currentTarget as HTMLDivElement;
        const id = target.getAttribute("data-id");
        const offset = state.dragOffset;
        if (!offset || !id) return;
        updateCardPosition(id, () => ({ x: event.clientX + offset.x, y: event.clientY + offset.y }));
    }

    const onCardDragStart = (card: Card, event: PointerEvent) => {
        setState("selectedCardId", card.id);
        setState("dragOffset", { x: card.position.x - event.clientX, y: card.position.y - event.clientY });
    }

    const onCardDragEnd = (card: Card, event: PointerEvent) => {
        // check for matches
        if (state.selectedCardId !== null) {
            checkForIntersectingCards((a, b) => {
                // console.log("checkForIntersectingCards", a, b);
                if (a.wordId == b.wordId) {
                    handleMatch(a, b);
                }
            });
        };
        setState("selectedCardId", null);
        setState("dragOffset", null);
    }

    return (
        <div class={styles.container} ref={setContainerElement}>
            <div class={styles.controls}>
                <div style={{ display: "inline-flex", 'flex-direction': "column", gap: "10px", 'align-items': "start" }}>
                    <input type="range" min="1" max="10" value={count()} onInput={(e) => setCount(parseInt(e.currentTarget.value))} />
                    <button onClick={() => setShowRomanization(!showRomanization())}>Show Romanization</button>
                    <button onClick={() => setShowEnglish(!showEnglish())}>Show English</button>
                    <select
                        value={category()}
                        onChange={(e) => setCategory(e.currentTarget.value)}>
                        <For each={word_list.getCategoryList()}>{(category) =>
                            <option value={category}>{category}</option>
                        }</For>
                    </select>
                </div>
            </div>
            <For each={state.cards}>
                {(card) =>
                    <CardComponent
                        card={card}
                        position={card.position}
                        onDragStart={onCardDragStart}
                        onDragMove={onCardDragMove}
                        onDragEnd={onCardDragEnd}
                        showRomanization={showRomanization()}
                        showEnglish={showEnglish()}
                    />
                }
            </For>
        </div >
    );
}

type CardProps = {
    card: Card;
    showRomanization: boolean;
    showEnglish: boolean;
    position: { x: number, y: number };
    onDragStart: (card: Card, event: PointerEvent) => void;
    onDragMove: (card: Card, event: PointerEvent) => void;
    onDragEnd: (card: Card, event: PointerEvent) => void;
}

function CardComponent(props: CardProps) {
    let ref: HTMLDivElement | undefined;

    onMount(() => {
        ref?.animate([
            { transform: 'translate(50dvw, 50dvh) scale(0) rotate(0deg)' },
            { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
        ], {
            duration: 200,
            easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            fill: "forwards",
        });
    });

    const handlePointerDown = async (event: PointerEvent) => {
        const target = event.currentTarget as HTMLDivElement;
        target.setPointerCapture(event.pointerId);
        target.addEventListener("pointermove", handlePointerMove);
        props.onDragStart(props.card, event);

        if (ref) {
            console.log("startDragAnimation");
            const startDragAnimation = ref.animate([
                { scale: 1 },
                { scale: 1.2 }
            ], {
                duration: 200,
                easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                fill: "forwards",
            });

            await startDragAnimation.finished;
            startDragAnimation.commitStyles();
            startDragAnimation.cancel();
        }
    }

    const handlePointerUp = async (event: PointerEvent) => {
        const target = event.currentTarget as HTMLDivElement;
        target.releasePointerCapture(event.pointerId);
        target.removeEventListener("pointermove", handlePointerMove);
        props.onDragEnd(props.card, event);

        if (ref) {
            console.log("endDragAnimation", ref);
            const endDragAnimation = ref.animate([
                { scale: 1.2 },
                { scale: 1 }
            ], {
                duration: 200,
                easing: "cubic-bezier(0.36, 0, 0.66, -0.56)",
                fill: "forwards",
            });

            await endDragAnimation.finished;
            endDragAnimation.commitStyles();
            endDragAnimation.cancel();
        }
    }

    const handlePointerMove = (event: PointerEvent) => {
        props.onDragMove(props.card, event);
    }

    return <div
        ref={ref}
        classList={{
            [styles.card]: true,
            [styles.emoji]: props.card.type == "emoji",
            // [styles.matched]: card.matched,
            [styles.overlap]: props.card.overlap,
        }}
        style={{
            '--x': `${props.position.x}px`,
            '--y': `${props.position.y}px`,
            '--random-rotation': `${props.card.rotation}rad`,
        }}
        data-id={props.card.id}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={(e) => e.preventDefault()}
    >
        {props.card.word}
        {props.showRomanization && props.card.type == "text" && <span class={styles.romanization}>{romanize(getWord(props.card.wordId)!, "yale")}</span>}
        {props.showEnglish && props.card.type == "text" && <span class={styles.english}>{getWord(props.card.wordId)!.english}</span>}
    </div>;
}

type InitialCardStateParams = {
    count: number;
    container: HTMLDivElement | undefined;
}

function generateInitialCardState(wordList: Word[], { count, container }: InitialCardStateParams): Card[] {
    if (!container) {
        console.warn("Container element is not defined. not sure what this means, me either :shrug:");
        return [];
    }
    let words = wordList.sort(() => Math.random() - 0.5).slice(0, count);
    let cards: Card[] = [];
    cards.push(...words.map((word) => ({
        id: createUniqueId(),
        wordId: word.id,
        word: word.emoji,
        type: "emoji" as const,
        position: { x: Math.random() * (container.clientWidth - 120), y: Math.random() * (container.clientHeight - 120) },
        matched: false,
        overlap: false,
        rotation: (Math.random() - 0.5) * Math.PI / 8,
        ref: undefined,
    })));
    cards.push(...words.map((word) => ({
        id: createUniqueId(),
        wordId: word.id,
        word: word.korean,
        type: "text" as const,
        position: { x: Math.random() * (container.clientWidth - 120), y: Math.random() * (container.clientHeight - 120) },
        matched: false,
        overlap: false,
        rotation: (Math.random() - 0.5) * Math.PI / 8,
        ref: undefined,
    })));
    return cards;
}

function boxIntersects(a: { x: number, y: number, width: number, height: number }, b: { x: number, y: number, width: number, height: number }) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function romanize(word: Word, type: "yale" | "mcr" | "revised") {
    if (type == "yale") {
        return "yale romanization";
    } else if (type == "mcr") {
        return "mcr romanization";
    } else if (type == "revised") {
        return "revised romanization";
    }
}
