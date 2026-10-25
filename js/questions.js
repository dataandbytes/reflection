// questions.js
// One deep question a day. Each is written to resist a one-line answer:
// it asks you to describe, trace, or reckon with something — not just name it.
// Add your own freely; keep the { category, text } shape.

const QUESTIONS = [
  // ── Identity & Self ──────────────────────────────────────────────
  { category: "Identity & Self", text: "Who were you before the world told you who to be — and what did you quietly trade away to become acceptable?" },
  { category: "Identity & Self", text: "Describe a version of yourself you've let die off. What did they want, and do you miss them?" },
  { category: "Identity & Self", text: "If no one would ever know — no praise, no judgment — what would you stop doing, and what would you finally begin?" },
  { category: "Identity & Self", text: "What is a story you tell about yourself that you're no longer sure is true? Where did it come from, and who did it serve?" },
  { category: "Identity & Self", text: "When you are completely alone, who are you? Describe that person as if you were introducing a stranger." },
  { category: "Identity & Self", text: "What part of yourself do you perform for others, and what do you think it would cost you to set it down?" },

  // ── Relationships & Love ─────────────────────────────────────────
  { category: "Relationships & Love", text: "Think of someone you love. What do they not know about how you see them — and why have you never told them?" },
  { category: "Relationships & Love", text: "Who have you not forgiven, and what are you still protecting by holding on to it?" },
  { category: "Relationships & Love", text: "Describe the last time you felt truly seen by another person. What did they see, and why did it matter so much?" },
  { category: "Relationships & Love", text: "What do you need from the people closest to you that you have never actually asked for? Sit with the silence — where does it come from?" },
  { category: "Relationships & Love", text: "Write about a relationship that ended. What was your part in it that you've never fully admitted, even to yourself?" },
  { category: "Relationships & Love", text: "Who are you pretending is closer to you than they really are — and who are you keeping at a distance they don't deserve?" },

  // ── Fear & Vulnerability ─────────────────────────────────────────
  { category: "Fear & Vulnerability", text: "What are you most afraid people would think if they truly knew you? Walk back to where that fear was born." },
  { category: "Fear & Vulnerability", text: "Describe the thing you're avoiding right now. What are you actually afraid will happen if you turn and face it?" },
  { category: "Fear & Vulnerability", text: "When did you last feel genuine shame? Don't just name it — stay with what it revealed about what you value." },
  { category: "Fear & Vulnerability", text: "What risk have you talked yourself out of, and what would your life look like now if you had taken it?" },
  { category: "Fear & Vulnerability", text: "What would you do differently if you weren't so afraid of being seen as selfish? Be specific, and honest about the cost of your caution." },

  // ── Growth & Change ──────────────────────────────────────────────
  { category: "Growth & Change", text: "What belief did you hold five years ago that you've since abandoned? What actually changed your mind — an argument, or an experience?" },
  { category: "Growth & Change", text: "Describe a time you were wrong about something that mattered. How did you find out, and who did you become afterward?" },
  { category: "Growth & Change", text: "What are you still doing out of habit that no longer fits the person you're becoming?" },
  { category: "Growth & Change", text: "What hard truth about yourself have you started to accept this year, and how has accepting it changed the way you live?" },
  { category: "Growth & Change", text: "If you could sit across from yourself ten years ago, what would you struggle to explain — and what would you apologize for?" },

  // ── Work & Purpose ───────────────────────────────────────────────
  { category: "Work & Purpose", text: "If your work disappeared tomorrow, who would you be? Describe what's left when the title is gone." },
  { category: "Work & Purpose", text: "What are you building your life around — and did you actually choose it, or did you inherit it without noticing?" },
  { category: "Work & Purpose", text: "Describe the kind of work that makes you lose track of time. Be honest about why you aren't doing more of it." },
  { category: "Work & Purpose", text: "Whose definition of success are you chasing? Trace it back to the person it first belonged to." },
  { category: "Work & Purpose", text: "What would 'enough' actually look like for you — and why do you keep quietly moving the line?" },

  // ── The Past ─────────────────────────────────────────────────────
  { category: "The Past", text: "Describe a moment that quietly changed the direction of your life. Did you know it at the time, or only later?" },
  { category: "The Past", text: "What memory do you return to most often, and what does the way you remember it reveal about what you long for?" },
  { category: "The Past", text: "Write, in your mind, the opening line of a letter to someone you can no longer speak to. Then keep going — what else needs to be said?" },
  { category: "The Past", text: "What did you survive that you've never given yourself any credit for?" },
  { category: "The Past", text: "What are you still carrying from childhood — and whose was it, originally, before it became yours?" },

  // ── Mortality & Meaning ──────────────────────────────────────────
  { category: "Mortality & Meaning", text: "If you had one year left with your health intact, what would you stop tolerating immediately?" },
  { category: "Mortality & Meaning", text: "What do you want to be true about your life at the end that isn't true yet? Name the first step you keep postponing." },
  { category: "Mortality & Meaning", text: "Describe what you'd want someone to say about you that has nothing to do with anything you've achieved." },
  { category: "Mortality & Meaning", text: "What are you spending your days on that you won't care about on your last one? Be ruthless, then ask why you let it stay." },
  { category: "Mortality & Meaning", text: "If today were quietly your last, what would you most regret leaving unsaid — and to whom?" },

  // ── Joy & Gratitude ──────────────────────────────────────────────
  { category: "Joy & Gratitude", text: "When did you last feel pure, uncomplicated joy? Rebuild the whole scene in detail — what made it possible?" },
  { category: "Joy & Gratitude", text: "What do you have right now that a younger you would have wept to be told was coming?" },
  { category: "Joy & Gratitude", text: "Describe a small, ordinary thing that reliably makes you feel alive. Why don't you protect it more fiercely?" },
  { category: "Joy & Gratitude", text: "Who made you who you are, quietly, without ever being thanked? Write what you'd say to them if you could." },

  // ── Values & Integrity ───────────────────────────────────────────
  { category: "Values & Integrity", text: "Where in your life are you out of alignment — saying one thing and living another? What keeps you there?" },
  { category: "Values & Integrity", text: "What would you defend even if it cost you everything? How do you actually know that about yourself?" },
  { category: "Values & Integrity", text: "Describe a time you betrayed your own values to be liked or to stay safe. What did it teach you about your limits?" },
  { category: "Values & Integrity", text: "What's a line you swore you'd never cross? Be honest about whether you're closer to it than you'd like to admit." },
  { category: "Values & Integrity", text: "When did you last do the right thing when no one was watching — and when did you last fail to?" },

  // ── Desire & Longing ─────────────────────────────────────────────
  { category: "Desire & Longing", text: "What do you want that you're embarrassed to admit you want? Where does the embarrassment actually come from?" },
  { category: "Desire & Longing", text: "Describe the life you secretly fantasize about. Which small part of it could genuinely begin this week?" },
  { category: "Desire & Longing", text: "What are you hungry for that no achievement has ever managed to feed?" },
  { category: "Desire & Longing", text: "Who do you envy — and what is that envy quietly trying to tell you about your own unlived life?" },

  // ── Solitude & Stillness ─────────────────────────────────────────
  { category: "Solitude & Stillness", text: "What comes up when you finally sit in silence with no distraction? And what do you usually reach for to avoid it?" },
  { category: "Solitude & Stillness", text: "What question have you been avoiding asking yourself? Ask it now, in full, and don't look away." },
  { category: "Solitude & Stillness", text: "If your mind went quiet for a whole day, what do you think it has been trying to tell you underneath the noise?" },

  // ── The Body & Being ─────────────────────────────────────────────
  { category: "The Body & Being", text: "How do you actually treat your body — and what would change if you spoke to it the way you'd speak to someone you love?" },
  { category: "The Body & Being", text: "Where do you hold your stress physically, and if that part of you could speak, what has it been trying to say?" },
];

// Expose for app.js (works both as a module and as a plain <script>).
if (typeof module !== "undefined" && module.exports) module.exports = QUESTIONS;
