---
title: "Encoding Taste So a Machine Can Follow It"
description: "Why 'make it look good' fails as an instruction to an AI coding agent, how TasteSkill turns design judgement into explicit constraints, and where rules stop and taste begins."
date: 2026-08-27
tags: ["design", "ai-agents", "frontend", "taste"]
draft: false
hero: "../../assets/essays/design-taste.jpg"
heroAlt: "A hand holding a fanned stack of colour sample cards above a wooden desk, blueprints faintly visible behind."
heroCredit: "Photo by Karolina Grabowska on Unsplash"
---

Ask an AI coding agent to "make it look good" and you will get the average of everything it has seen. That is not a bug in the model. It is what the instruction means. "Good" without further constraint resolves to the statistical centre of web design: the hero section with a gradient, the three feature cards, the emoji bullet points, the purple-to-blue call-to-action button. The output is not ugly. It is worse than ugly, it is interchangeable.

This is the problem TasteSkill (tasteskill.dev) exists to attack. It is a skill you install into an AI coding agent that does two things: it forces a brief-first workflow, where the agent must establish who the site is for and what it should feel like before writing any markup, and it carries a long, explicit list of anti-patterns the agent is forbidden to produce. I want to use it as a lens on a broader question, because I think the broader question matters more than any one tool: can taste be encoded as constraints a machine can follow, and what is lost in the encoding?

## Why the naive instruction fails

It helps to be precise about why "make it look good" produces slop, because the mechanism points at the fix.

A generative model trained on the visible web has absorbed millions of pages, and the pages it has seen most are the ones built from the same component libraries, the same templates, the same landing-page formulas. When you leave the design direction unspecified, the model fills the gap with its priors, and its priors are the median. You have not asked for good design. You have asked for likely design, and likely design is the stuff you were trying to avoid.

Human designers escape this pull because taste is, in large part, a trained sensitivity to the difference between fitting and generic. A designer looking at a legal practice's homepage and a skate brand's homepage sees two different problems. An unconstrained agent sees one problem, "homepage", and reaches for one solution.

The fix follows directly: if the model fills unspecified gaps with the median, then specify the gaps. That is all a design skill really is. It replaces a vague objective with two concrete artefacts: a positive brief that pins down the actual problem, and a negative list that fences off the attractor the model would otherwise slide into.

## The negative list does most of the work

Here is the part I find genuinely interesting. Of the two halves, the anti-pattern list pulls more weight than the brief, and there is a reason for that.

Positive direction underdetermines output. "Confident, editorial, restrained" is a real brief, but a thousand designs satisfy it, including many bad ones. Negative constraints, by contrast, are checkable. "No default shadows on cards. No gradient hero text. No emoji as icons. No three-column feature grid. No purple-blue gradient buttons." Each of these is a predicate the agent can evaluate against its own output before showing you anything. You cannot verify "elegant". You can verify "contains no centred hero with a gradient blob background".

This mirrors something true about how taste works in people, or at least how it is taught. Ask a good designer to define good design and you get philosophy. Show them something and ask what is wrong with it, and you get a precise, itemised list, delivered instantly. Expert taste is heavily a library of recognised failures. Writing the failures down, exhaustively and concretely, turns out to be a transferable act in a way that writing down "goodness" is not.

There is a discipline benefit for humans too, worth naming. To give an agent a usable brief, you must decide what the thing is for, who it serves, and what it should refuse to look like. Teams skip this constantly when a human designer is there to absorb the ambiguity. The agent cannot absorb ambiguity, it can only fill it with the median, so the tool forces the conversation the project needed anyway.

## What the rules cannot reach

Honesty requires the other half. A rules-based approach to aesthetics has a ceiling, and it is worth being clear about where it sits.

Rules prevent recognised failures. They do not produce invention. An agent following TasteSkill will not hand you the emoji-laden template slop, and that alone lifts it above most generated frontends. But every rule in the list was written by a person who had seen the failure before. The list is a fossil record of past judgement. When a design decision arises that no rule anticipated, the agent is back on its priors, just in a smaller, better-fenced space.

Rules also cannot arbitrate between their own valid outputs. Two layouts can both pass every constraint while one is quietly right for the client and the other is merely compliant. The difference lives in context the rules do not carry: what this organisation is actually like, what its audience has seen too much of, which convention is worth breaking this year and which would read as noise. That judgement call does not compile to a predicate. Someone still has to look.

And there is a horizon problem. Anti-pattern lists describe the clichés of the recent past. Follow any widely-adopted list long enough and its outputs become the new median, at which point the list needs a person with taste to notice and revise it. The encoding is a snapshot of judgement, not a replacement for the faculty that produced it.

## The frame I would actually use

So the honest position is neither "taste cannot be encoded" nor "taste is now a config file". It is narrower and more useful than either.

What encodes well: the floor. Known failures, banned clichés, non-negotiable standards of spacing, hierarchy, and contrast. Encoding the floor is enormously valuable precisely because generated frontends fail at the floor far more often than they fail at the ceiling.

What does not encode: the choice among compliant options, the fit between a design and a specific human context, and the ongoing revision of the rules themselves as yesterday's distinctive moves become today's clichés.

That division suggests how to work. Let the skill hold the floor so that no output below it ever reaches you, and spend your own attention entirely at the ceiling, on the judgement calls the rules cannot see. If you are using an agent to build frontends today, the practical move is to write your negative list before your next project, not after it: every failure you can name in advance is one you will never have to review your way out of.
