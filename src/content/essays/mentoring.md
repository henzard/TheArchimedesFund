---
title: "Mentoring Young Minds When Answers Are Cheap"
description: "How to develop a junior engineer's judgement: asking before telling, productive struggle, feedback that lands, and what changes now that plausible answers are instant."
date: 2026-08-27
tags: ["mentoring", "engineering", "judgement"]
draft: false
hero: "../../assets/essays/mentoring.jpg"
heroAlt: "Two hands holding whiteboard markers, drawing wireframe boxes and notes beside sticky notes on a whiteboard."
heroCredit: "Photo by Kaleidico on Unsplash"
---

The most expensive thing you can give a junior engineer is the answer. It costs you thirty seconds and it costs them the reasoning they would have built by finding it themselves. Good mentoring is largely the discipline of not doing the easy, generous-looking thing.

That discipline matters more now than it ever has, because answers have become nearly free. Any junior with a coding assistant can get a plausible fix in seconds. If your value as a mentor was knowing things, that value is evaporating. If your value is building judgement, it has never been higher. This essay is about the second kind of mentoring: what it looks like in practice, and why the method has to change when recall is no longer the scarce skill.

## Ask before you tell

When someone brings you a problem, the temptation is to pattern-match and prescribe. You have seen this class of bug before, you know the likely cause, and telling them feels efficient. It usually is efficient, for that one bug. It is also a missed rep.

The alternative is to ask the question you would ask yourself. Not a quiz, and not the Socratic performance where the mentor already knows the destination and marches the mentee towards it while both pretend otherwise. A real question: what have you ruled out? What would you expect to see if your theory were true? What is the cheapest experiment that would tell us which of these two explanations is right?

Suppose a mentee brings you a service that intermittently times out. You could say "check the connection pool" and be right four times out of five. Or you could ask "what does intermittent tell you?" and let them work out that intermittence implies contention, load, or state, which narrows the search on its own. The first approach fixes a timeout. The second teaches a way of reading symptoms that transfers to every future timeout, and to problems that look nothing like timeouts.

Asking is slower in the moment. It is faster over any horizon longer than a month, because each answered question is one the mentee never has to bring you again.

## Let them struggle, but stay in the room

There is a version of "let them figure it out" that is really abandonment with a growth mindset sticker on it. Productive struggle has boundaries, and holding those boundaries is the mentor's actual job.

The useful frame, I think, is that struggle is productive while the person is generating and testing hypotheses, and it turns corrosive when they are cycling through the same three ideas or randomly permuting code to see what happens. The signal is not time elapsed. Someone can be stuck for two days and still be learning, or stuck for twenty minutes and already thrashing.

So the intervention is not "I will help after N hours". It is: check in, ask them to narrate where they are, and listen for whether the narration contains new information since last time. If it does, encourage and withdraw. If it does not, do not hand over the fix. Hand over the next foothold: a narrower question, a tool they did not know existed, a suggestion to write down what they actually know versus what they are assuming. Then withdraw again.

The mentee should finish the problem believing, accurately, that they solved it. Your fingerprints belong on the method, not the solution.

## Feedback that actually lands

Most feedback fails before its content is even evaluated, because it arrives as a verdict on the person rather than an observation about the work. The mechanics of feedback that lands are not mysterious, they are just easy to skip when you are busy.

Be specific about the artefact. "This function does three things and its name promises one" can be acted on. "Your code needs to be cleaner" cannot, and reads as a character assessment besides.

Separate standards from preferences, out loud. Some of what you want changed is a genuine standard: this will corrupt data under concurrent writes. Some of it is taste: I would name this differently. Juniors cannot yet tell these apart, so if you deliver both in the same tone, they either treat your preferences as laws or your laws as preferences. Label which is which and you teach the distinction itself.

And give the positive feedback the same specificity you give the critical kind. "Good job" teaches nothing. "You noticed the requirements contradicted each other and asked before building, that instinct is worth more than the code" tells someone exactly which behaviour to repeat.

## Teach the diagnosis, not the fix

A fix is a fact. A diagnosis is a procedure. Facts depreciate; procedures compound.

When you resolve something together, the temptation is to close the loop and move on. The learning is in the retrospective question: how would you find this next time, from scratch, without me? Walk the path backwards. What was the first observable symptom? What distinguished the true cause from the three plausible causes? Which of your early assumptions cost you the most time?

I think of this as teaching someone to be their own second pair of eyes. The goal is that they internalise the questions you ask, so that eventually they hear your questions before you ask them, and then stop needing you to exist in the loop at all. A mentoring relationship that never ends has failed at its purpose.

## What changes when the answer machine is always on

Here is the shift that I believe matters most right now. A junior engineer with an AI assistant no longer struggles to produce an answer. They struggle to evaluate one. The assistant will confidently propose a fix that is correct, or subtly wrong, or correct for a different problem than the one at hand, and it presents all three with identical fluency.

That moves the scarce skill from recall to judgement. The questions worth drilling are no longer "do you know how X works" but "how would you check whether this proposed answer is right?", "what would this break that the explanation did not mention?", and "what context does the tool not have that you do?"

This changes the mentor's job in a way I find genuinely hopeful. You were never going to out-recall a model, and now you do not have to. What you can still do, and what nothing else currently does, is sit with someone while they learn to doubt well: to hold a fluent answer at arm's length, test it against reality, and accept it only once it has earned acceptance. That is judgement, it is built through supervised reps, and it is the thing worth being deliberate about.

If you mentor someone this year, watch one behaviour above all others: what they do in the gap between receiving an answer and acting on it. Widen that gap, fill it with good questions, and most of the rest follows.
