---
title: "The Step Everyone Skips"
description: "Geoff Woods' CRIT framework asks the AI to interview you before it does anything. Most people skip that step, and the reason they skip it is exactly why it matters."
date: 2026-08-27
tags: ["ai", "prompting", "decision-making"]
draft: false
hero: "../../assets/essays/default-fallback.jpg"
heroAlt: "Black and white building facade of pointed studs arranged in a swirling wave pattern"
heroCredit: "Photo by Ricardo Gomez Angel on Unsplash"
---

There are two ways to put a language model to work. The first treats it as a task-doer: describe the output you want, receive the output, judge it, move on. The second treats it as a thought partner: something that pushes back, asks what you have not said, and makes your own thinking sharper before any output exists. Most of us default to the first, because the first feels like progress. The second is where the value is, and there is a well-known framework that makes the difference concrete.

## CRIT, and whose idea it is

The framework is not mine. It comes from Geoff Woods, author of [The AI-Driven Leader: Harnessing AI to Make Faster, Smarter Decisions](https://www.simonandschuster.com/books/The-AI-Driven-Leader/Geoff-Woods/9798893313109), and it goes by the acronym CRIT: Context, Role, Interview, Task.

The method, as Woods lays it out, runs in that order. Give the model rich context about your situation: the decision you face, the constraints, the people involved, what you have already tried. Assign it a specific expert role, so it reasons from a useful vantage point rather than a generic one. Then, before asking for anything, invite it to interview you, one question at a time, to surface the context you did not think to share. Only after that interview do you hand over the task.

Woods makes a point that gets repeated in almost every piece of coverage of the book: the Interview step is the one most people skip, and it is the one that most changes the quality of what comes back. His framing throughout is that AI should be a thought partner that challenges your assumptions, not a replacement for your thinking.

I find that claim about the Interview step easy to believe, and I think the interesting question is not whether it is true. The interesting question is why the most valuable step is the one that gets dropped.

## Why we skip the one step that works

Here is the honest answer: being interviewed about your own problem is uncomfortable, and it is slow.

When you ask for output, you are in charge. You are the one with requirements; the machine is the one that serves. When you invite questions, the roles quietly reverse. Now you are the one being examined, and some of the questions will land on things you cannot answer. What does success actually look like? Who has to approve this? What happens if you do nothing? A good interviewer finds the soft spots, and nobody enjoys having their soft spots found, even by software with no opinion of them.

There is also the matter of tempo. Asking for output produces something on screen within seconds, and something on screen feels like progress. Sitting through six questions produces nothing you can show anyone. It feels like delay. So we take the fast path, get a fluent answer to the question as we happened to phrase it, and never learn what the question should have been.

Both instincts are wrong in the same way, and anyone who has built software professionally has seen this exact failure before, wearing different clothes.

## The requirements conversation, again

Every experienced engineer has lived some version of this pattern: a stakeholder asks for a feature, the team builds precisely what was asked, and the result is useless, because the request encoded an assumption nobody examined. The fix was never better building. The fix was a better conversation before the building started. The awkward, meandering requirements discussion, the one where someone finally asks "wait, why does this need to be real time?" and the whole shape of the work changes, is worth more than any fast first implementation. Speed to first draft is not the metric that matters. Speed to the right draft is.

That is what the Interview step is. It is a requirements conversation for your own thinking, with a partner that has no schedule pressure, no fear of looking slow, and no stake in flattering your framing. The discomfort you feel when the questions start is the same discomfort a stakeholder feels when an analyst keeps probing the brief, and it is the same signal: the probing is finding something.

The mechanism is worth spelling out. The context you volunteer up front is, by definition, the context you already know is relevant. The context that sinks projects is the kind you did not know was relevant: the constraint so familiar you forgot it was a constraint, the assumption so old it feels like fact. You cannot volunteer what you cannot see. Questions from outside your own head are one of the few reliable tools for finding it, which is why the step that supplies those questions moves the needle more than any phrasing trick applied to the task itself.

## What this looks like in practice

A CRIT-shaped prompt does not need to be elaborate. Suppose, hypothetically, a manager is weighing whether to rebuild an ageing internal tool or keep patching it. The prompt might read:

```text
Context: I manage a small internal tool that four teams
depend on. It is old, fragile, and expensive to change,
but it works. I am deciding whether to rebuild it or
keep patching it, and I need to recommend a direction
next month.

Role: act as a sceptical engineering director who has
seen rebuilds fail.

Interview: before giving any recommendation, interview
me one question at a time to uncover anything relevant
I have not mentioned. Challenge my assumptions.

Task: after the interview, lay out the trade-offs of
each option and the conditions under which each one
is the right call.
```

The final answer might be good or bad; models vary and so do days. But notice what the structure buys regardless. Somewhere around the fourth question, our hypothetical manager is likely to be asked something like "what would have to be true for patching to be the right answer?", and to realise the recommendation was written in their head before the analysis began. That realisation is the product. The tidy trade-off table at the end is almost a by-product.

## The tell

Credit where it belongs: Woods built a memorable structure around something that is easy to say and hard to practise. The structure earns its keep because it makes the skippable step explicit. Once "Interview" has its own letter, skipping it becomes a visible choice rather than an invisible habit.

The broader lesson holds even if you never use the acronym. If the machine only ever answers you, you have hired a very fast typist. The moment it starts asking you things you cannot immediately answer, it has become something more useful, and the discomfort of that moment is not a cost of the method. It is the evidence the method is working. Next time you feel the urge to skip the questions and get to the output, treat that urge as the tell: it usually means the questions are exactly what you need.
