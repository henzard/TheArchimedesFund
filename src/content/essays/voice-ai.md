---
title: "The Voice Is the Easy Part"
description: "Speech interfaces live or die on latency, turn-taking and honesty about what the system is. On the engineering behind giving an AI a voice with OpenAI and ElevenLabs."
date: 2026-08-27
tags: ["voice", "ai", "speech", "engineering"]
draft: false
hero: "../../assets/essays/voice-ai.jpg"
heroAlt: "A studio microphone in a shock mount, photographed in black and white against a plain light grey background"
heroCredit: "Photo by Klim Musalimov on Unsplash"
---

Modern speech synthesis is good. Startlingly good. Both OpenAI and ElevenLabs will hand you a voice that most listeners would not clock as synthetic in a short clip, and the API call to get it is a few lines of code. Which creates a trap: teams hear the demo, assume the hard part is done, and discover months later that the voice was never the hard part. The hard part is everything around it.

A voice interface is a real-time distributed system wearing a friendly mask. It has a latency budget, a concurrency problem, and a human on the other end running the most unforgiving conformance test there is: a lifetime of conversation with other humans. Get the voice quality right and the timing wrong, and the result is worse than a robotic voice with good timing. People forgive a system that sounds mechanical. They are unsettled by one that sounds human and behaves like a walkie-talkie.

## The budget you spend before anyone speaks

Start with the number that dominates everything: the gap between the moment the user stops talking and the moment your system starts talking back. In human conversation that gap is short, often a fraction of a second, and people are exquisitely sensitive to it. Stretch it and the interaction stops feeling like conversation and starts feeling like leaving voicemail.

Now count what has to happen inside that gap. Speech recognition has to decide the user is actually finished, which is itself a latency trade-off, because deciding too eagerly cuts people off mid-thought. The transcript goes to a language model, which takes time to produce its first tokens. Those tokens go to a synthesis engine, which takes time to produce its first audio. The audio crosses the network and has to fill a playback buffer before the first sound comes out.

Every stage wants its own comfortable margin, and the sum of comfortable margins is an uncomfortable conversation. Voice engineering is mostly the discipline of refusing each stage its margin: overlapping stages instead of queueing them, starting synthesis on the first clause instead of the full reply, and measuring the whole path end to end rather than trusting each component's own favourable accounting of itself.

## Streaming is an architectural decision, not a feature flag

The single biggest structural choice is batch versus streaming synthesis. Batch is the obvious shape: send text, receive an audio file, play it. It is simple, easy to cache, easy to test, and completely fine for anything that is not a conversation. Narrating an article, rendering a notification, generating a podcast segment: batch is the right tool.

Conversation cannot afford it, because batch latency scales with the length of the reply. A three-sentence answer means the user waits for all three sentences to be synthesised before hearing the first word. Streaming inverts the deal: audio chunks arrive while later text is still being generated, so the wait is only ever the time to first sound. Both OpenAI and ElevenLabs support streaming output, and for interactive use it is not optional.

But streaming reshapes your architecture rather than slotting into it. You are now managing a pipeline of partial results: partial transcripts feeding a model producing partial text feeding a synthesiser producing partial audio. Errors can arrive after playback has begun, so you need a story for a reply that fails halfway through being spoken. Text you have already sent to the synthesiser is spent; if the model revises its thinking, tough. And sentence boundaries become load-bearing, because synthesis quality depends on giving the engine coherent phrases rather than a drip of tokens. None of this is exotic engineering, but none of it exists in the batch version, which is why the batch prototype tells you so little about the product.

## Barge-in, or the right to interrupt

Humans interrupt each other constantly, and mostly cooperatively. We talk over the end of a sentence to signal we have got the point. A voice system that cannot handle this, one that ploughs on through its answer while you say "no, stop, I meant the other one", fails a test more basic than sounding human. It fails at listening.

Supporting barge-in means the system listens while it speaks, which drags in a genuinely hard signal-processing problem: the microphone hears the system's own voice, so you need echo cancellation good enough to detect the user underneath it. Then you need policy. Does a cough stop playback? A half-word? How quickly do you resume if the interruption was nothing? Stop too eagerly and the assistant seems jumpy; too reluctantly and it seems oblivious.

There is a quieter design question buried under the flashy one, which is what interruption means. Cutting the audio is easy. Deciding what the conversation state now is, half an answer delivered, an objection raised, requires the dialogue layer to know exactly how much of the reply was actually spoken. Systems that track "what did the user hear" separately from "what did the model say" handle this gracefully. Systems that conflate them produce the familiar absurdity of an assistant referring back to information it never finished saying.

## The uncanny middle

There is a range of voice quality that is good enough to be mistaken for a person and not good enough to behave like one, and most production systems today live in it. This is not primarily an aesthetic problem. It is a calibration problem: the voice makes an implicit promise the system cannot keep.

A convincingly human voice invites human treatment. Callers become more polite, more indirect, more inclined to explain context and expect it to be understood. When the system then mishears a name for the third time, the user recalibrates with a jolt, and the jolt costs more trust than a plainly synthetic voice would ever have lost. My opinion, held with reasonable confidence: for most products, a voice that is pleasant but perceptibly synthetic is the better engineering choice, because it sets expectations the system can meet. Maximum realism is a goal you should have to argue for, not a default.

## Cloning, consent, and saying what you are

Voice cloning sharpens all of this into an ethical edge. The capability is real and increasingly accessible: from a modest sample of someone's speech, a model can produce new speech in their voice. The legitimate uses are also real, including accessibility, localisation, and people preserving their own voice ahead of losing it to illness.

The line, as I see it, is not complicated to state. Clone only with informed consent from the person whose voice it is, with scope agreed in advance, and disclose synthetic speech wherever a reasonable listener would otherwise assume a human. Not buried in terms of service: disclosed where the listening happens. A synthetic voice that answers the phone should say so. This costs almost nothing in practice and buys the entire category legitimacy it will otherwise lose one scandal at a time. Providers enforce their own policies on cloning and consent, and those policies shift, so check the current terms rather than trusting a summary, including this one.

One more honest note on cost, without quoting figures that will be stale by the time you read this: synthesis pricing generally scales with the amount of speech you generate, which means chatty systems are expensive systems. The cheapest optimisation in voice AI is the one nobody puts on a slide: make the assistant say less. Shorter replies cost less, interrupt better, and respect the medium. Conversation was never about monologue.
