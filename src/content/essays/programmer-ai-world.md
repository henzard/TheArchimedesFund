---
title: "Still a Programmer"
description: "An honest accounting of what AI changes about programming and what it does not: where the work moves, where judgment still lives, and what is worth practising now."
date: 2026-08-27
tags: ["ai", "career", "programming"]
draft: false
hero: "../../assets/essays/programmer-ai-world.jpg"
heroAlt: "A laptop on a wooden desk showing a code editor, with a pair of glasses resting beside it"
heroCredit: "Photo by Daniil Komov on Unsplash"
---

Two stories about programming in the AI era are competing for your attention, and both are selling something. One says the profession is ending, usually told by people with an automation product to promote. The other says nothing important has changed, usually told by people whose identity is invested in the old shape of the work. Neither survives contact with an ordinary week of actually building software with these tools. Something real has changed. It is just not the thing either story claims.

## What actually changed

The honest version: the cost of producing plausible code has collapsed. Not correct code, plausible code. Text that compiles, follows conventions, and looks like what a competent person would write. That used to be expensive enough that its existence was evidence someone had thought about the problem. Now it is nearly free, and the evidence is gone.

This rearranges the job the way cheap manufacturing rearranged craft trades. When making the artefact is cheap, value moves to deciding what to make, and to verifying what was made. Programmers spend visibly less time typing and visibly more time specifying, reading, and judging. Reading code you did not write, long the skill everyone claimed mattered and nobody practised deliberately, is now the daily centre of the work.

The volume changes things too. A generation of tools that produce ten options in the time one used to take shifts the bottleneck from generation to selection. Selection is a different mental activity from creation, and it fails differently: not by writer's block but by fatigue, by rubber-stamping, by losing the will to say "none of these" when none of these is the right answer.

## What did not change

The computer still does exactly what the instructions say, and the gap between what was asked and what was meant is still where all the interesting failures live. AI moved that gap from the keyboard to the conversation; it did not close it. Ambiguity in, confident ambiguity out.

Systems still fail at boundaries: between services, between teams, between what the code assumes and what production delivers. No model output changes the fact that the hard bugs are interactions, and that understanding an interaction requires holding a mental model of the whole system, which is precisely the thing that cannot be pasted into a context window.

And responsibility did not move at all. When the generated migration drops the wrong column, no one accepts "the AI wrote it" from the person who ran it, and rightly so. The tools have no skin. Every consequence still routes to a human, which means the human's understanding is still the load-bearing element, however the code got typed.

## Where judgment lives now

If typing is cheap and consequences are not, the valuable skills are the ones that sit between them. Three seem durable to me.

The first is specification: knowing what you want precisely enough to state it, including what should happen at the edges and what must never happen at all. This was always the hard part of programming; languages just forced us to do it one line at a time. AI removes the forcing without removing the need, and people who never learned to do it deliberately are now discovering that the discipline was the job.

The second is verification: the ability to look at working-looking code and determine whether it works. Tests, yes, but also the older skills of reading suspiciously, reasoning about invariants, and knowing which parts of a change deserve paranoia. Verification effort should follow consequence, not surface area. The generated CSS deserves a glance; the generated auth check deserves an interrogation.

The third is taste over systems: judging not whether this function is right but whether this design will still be workable after two years of change, whether this dependency is worth its weight, whether this abstraction clarifies or merely decorates. Models are trained on the average of what exists, and the average of what exists is mediocre design. Knowing when to accept the average and when to refuse it is not something you can delegate to the thing producing the average.

## The apprenticeship problem

One change deserves naming without a tidy answer attached. Much of how programmers historically developed judgment was by doing the low-stakes work: the small bug fixes and boring features where you could be slow and wrong cheaply. That is exactly the work AI now does fastest, and it is not obvious what replaces it as training ground.

I do not think this makes juniors obsolete; demand for people who can verify and specify is growing, not shrinking. But I do think anyone learning now has to be deliberate where previous generations could be passive. Reading generated code and predicting what it does before running it, rebuilding something small without assistance to check the muscles still work, asking why an approach was chosen rather than only whether it runs. Judgment still comes from reps. The reps just have to be chosen on purpose now.

## The honest position

So: not doom, because the scarce thing was never typing and the actually scarce things, clear thinking about problems and accountability for consequences, are scarcer than ever relative to the volume of code being produced. Not hype either, because the gap between demo and dependable is as wide as it ever was, and someone still has to carry systems across it.

The identity that does not survive is the programmer as typist, the person whose value was converting decisions into syntax. The identity that gets stronger is the programmer as the person responsible for a system being correct, comprehensible, and safe to change, whoever or whatever produced the text.

If you want a practical response rather than a mood, mine is this: use the tools fully, and spend the time they return on the two activities they cannot do for you. Understand your systems more deeply than the code requires. And practise saying, with reasons, "this looks right and is wrong". That sentence was always the most valuable one in the profession. It just used to be optional.
