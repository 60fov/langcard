export default {
    mismatch: {
        keyframes: [
            { transform: 'scale(1)', backgroundColor: 'var(--card-background-error)' },
            { transform: 'scale(1.1) rotate(3deg)', backgroundColor: 'var(--card-background-error)' },
            { transform: 'scale(1.1) rotate(-3deg)', backgroundColor: 'var(--card-background-error)' },
            { transform: 'scale(1.1) rotate(3deg)', backgroundColor: 'var(--card-background-error)' },
            { transform: 'scale(1.1) rotate(-3deg)', backgroundColor: 'var(--card-background-error)' },
            { transform: 'scale(1.1) rotate(3deg)', backgroundColor: 'var(--card-background-error)' },
            { transform: 'scale(1)', backgroundColor: 'var(--card-background-error)' }
        ],
        timing: {
            duration: 800,
            easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
            fill: "forwards" as const
        }
    },
    match: {
        keyframes: [
            { backgroundColor: 'var(--card-background-success)', scale: '1.2' },
            { scale: '1.2' },
            { transform: 'rotate3d(0, 1, 0, 0deg)', scale: '1.2' },
            { backgroundColor: 'var(--card-background-success)', transform: 'rotate3d(0, 1, 0, 90deg)', scale: '1.2' },
        ],
        timing: {
            duration: 500,
            easing: 'ease-in',
            fill: "forwards" as const,
            composite: "replace" as const
        }
    }
}