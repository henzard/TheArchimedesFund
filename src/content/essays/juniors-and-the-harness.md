---
title: "Give Juniors the AI. Build Them a Harness."
description: "The consensus says AI belongs with the senior engineers who can catch its mistakes. I think juniors gain the most from it, provided someone builds the harness that makes a wrong answer safe."
date: 2026-08-27
tags: ["mentoring", "ai"]
draft: false
hero: "../../assets/essays/mentoring.jpg"
heroAlt: "Two hands holding markers, drawing wireframe boxes and notes on a whiteboard"
heroCredit: "Photo by Kaleidico on Unsplash"
---

There is a position on AI and engineering teams that has hardened into common sense: give the tool to the senior developers, because they have the judgement to notice when it is wrong, and keep it away from the juniors, because they do not. It sounds prudent. It is repeated in planning meetings and policy documents as though it were obviously true.

I think it gets the situation backwards. We should enable senior developers to use AI. We should empower juniors with a harness. The difference between those two verbs is the whole argument.

## Why the consensus sounds sensible

The reasoning behind the consensus is easy to reconstruct, and it is not stupid. A modern coding assistant produces output that is confident, fluent, and wrong often enough to matter. A senior engineer reads that output the way an editor reads a plausible first draft: alert to the shortcut that does not generalise, the API that was deprecated, the error path that was never considered. A junior reads the same output and sees an answer. The failure mode writes itself: the junior ships the confident wrong thing, nobody catches it, and the team concludes the tool is dangerous in inexperienced hands.

Every step of that story is plausible. The conclusion drawn from it, restrict the tool to the experienced, is where it goes wrong, because the story smuggles in an assumption that deserves to be examined: that judgement lives only inside individual people, and the only way to get it into the loop is to hire it or wait years for it to grow.

## Judgement is also a property of systems

Engineering has never actually believed that. We do not rely on programmers being careful with memory; we built garbage collectors and borrow checkers. We do not rely on developers remembering to test before merging; we built continuous integration that refuses the merge. We do not rely on anyone typing the deploy commands correctly at 2am; we built pipelines so there is nothing to type. The entire discipline is a long history of taking a quality that once lived only in the heads of experienced practitioners and moving as much of it as possible into the system, where it works on everyone's behalf, every time, without needing to be remembered.

Seen against that history, "give AI to the people with judgement" is a strange position for engineers to hold. It quietly concedes that the tool cannot be made safe, and it treats safety as a scarce personal trait to be rationed rather than a property a system can supply. Restricting access is the resigned answer. Building the harness is the engineering answer.

## What a harness actually is

A harness is not a metaphor for supervision, and it is not a wiki page of guidelines. It is the concrete machinery that makes a confident wrong answer cheap to produce and quick to catch. The parts are unglamorous and mostly already understood.

Tests that must pass before anything merges, written or reviewed by someone who was not the author of the change. Review gates that no change can route around, regardless of who or what produced it. Scope that is deliberately constrained: this service, this module, this well-bounded ticket, so a wrong answer has a small blast radius. Environments where mistakes are reversible, staging that mirrors production, migrations that roll back, feature flags that turn off. And feedback that arrives fast enough to teach: a test that fails in thirty seconds educates in a way a production incident three weeks later never will, because the junior can still remember what they were thinking when they accepted the suggestion.

None of this is exotic. Most of it is what a well-run team wants anyway. The shift is in what you understand it to be for. A harness is not merely how you protect production from a junior with a powerful tool; it is how you turn every wrong answer the tool produces into a safe, fast, legible lesson.

## Why juniors gain more than seniors

Here is the part of the position people push back on hardest, so it deserves to be stated carefully. A senior engineer already carries the harness internally. Years of failure have installed the suspicion of easy answers, the habit of asking what a change breaks, the reflex to check the error path. When such a person picks up an AI assistant, the tool adds speed to a process that was already sound. That is worth having, and it is why the first half of the position is "enable seniors", not "ignore them".

But the addition is modest, because the expensive part of senior work was never typing. It was deciding what to build, noticing what is missing, and knowing which of five plausible approaches will still look sensible in a year. The assistant helps least with exactly those things.

A junior sits in the opposite situation. The thing holding them back is the gap between what they can conceive and what they can execute, and that gap is precisely what the tool closes. Inside a good harness, a junior can attempt work that would previously have been out of reach, produce a wrong version of it safely, find out quickly and specifically why it is wrong, and go again. That loop, attempt, fail cheaply, understand the failure, retry, is how judgement gets built in the first place. The harness does not merely protect the codebase from the junior. It compresses years of experience-gathering into a tighter cycle. The senior gets a faster keyboard; the junior gets a faster apprenticeship. Compounding favours whoever is early in the curve.

## The honest counterargument

The strongest objection is not that juniors will break things. It is that a harness can pass work that is bad in ways the harness does not measure, and a junior cannot always tell. Tests confirm behaviour, not design. A change can be green, reviewed, in scope, and still be the wrong abstraction, quietly expensive, or subtly insecure in a way nobody thought to gate. A senior would smell it; a junior, with the assistant nodding along, ships it.

This is a real cost and I do not want to argue it away. It means the harness is not a substitute for senior attention; it changes where that attention goes. Instead of catching everything by hand, seniors design the gates, review the reviews, and watch for the failure classes the machinery cannot see. There is a second honest cost too: a harness is real work. Someone has to build the pipelines, keep the tests meaningful rather than ritual, and maintain all of it as the codebase moves. A neglected harness is worse than none, because it manufactures false confidence in exactly the people least equipped to notice.

Both objections say the same thing: this approach spends senior time. But it spends it on infrastructure that protects and teaches everyone, instead of on being a human filter for one person's output at a time. One of those investments compounds. The other one is a queue.

## What this means for a team

If the position is right, the practical consequences are fairly direct. Stop writing AI policy as an access-control list ranked by seniority. Start treating harness quality as the variable that decides how much autonomy anyone, junior or tool, can safely be given, and measure your readiness by asking how expensive a confident wrong answer currently is in your system. Where the answer is "very", the honest conclusion is that your harness needs work, and that it needed work before the AI arrived.

And when a junior asks whether they are allowed to use the assistant, notice what the question is really probing: whether your system can afford their mistakes. If it cannot, the tool is not the problem. Build the harness. Then hand them the keys.
