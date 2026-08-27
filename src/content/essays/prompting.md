---
title: "Prompting Is Specification, Not Incantation"
description: "Why prompt tricks age badly, what actually generalises across models, and how specificity, context, constraint and evaluation turn prompting into engineering."
date: 2026-08-27
tags: ["prompting", "ai", "llm"]
draft: false
hero: "../../assets/essays/prompting.jpg"
heroAlt: "Extreme close-up of a backlit mechanical keyboard with keys glowing teal and amber"
heroCredit: "Photo by Florian Krumm on Unsplash"
---

There is a genre of prompting advice that reads like folk magic. Add this phrase and the model gets smarter. Threaten it, tip it, tell it to take a deep breath. Some of these tricks even worked, briefly, on particular models at particular moments. That is exactly the problem. A trick that exploits a quirk of one model's training is a dependency on an implementation detail you do not control and cannot see. The vendor ships an update, the quirk vanishes, and your carefully tuned incantation is now dead weight in every prompt you own.

What survives model updates is not the tricks. It is the same thing that survives compiler updates: a clear specification of what you actually want. I think the useful frame is that a prompt is a requirements document read by an alien contractor with encyclopaedic knowledge, no context about your situation, and no ability to ask follow-up questions unless you invite them. Everything that makes requirements documents good or bad applies directly.

## Specificity: say the thing you mean

Vague prompts do not produce wrong answers so much as averaged ones. Ask for "a summary" and you get the median summary across every summary the model has ever seen: median length, median tone, median audience. If that happens to fit your need, it is luck.

Compare two versions of the same request:

```text
Summarise this incident report.
```

```text
Summarise this incident report for an executive who has
90 seconds. Three sentences: what broke, customer impact,
what prevents recurrence. No internal jargon or system
names. If the report does not state the impact, say
"impact not stated" rather than guessing.
```

Nothing in the second version is clever. It is length, audience, structure, vocabulary, and a rule for missing information. That last clause matters more than it looks: models fill gaps confidently, so a good prompt says what to do when the input is incomplete, the same way a good function handles the empty list. Unspecified behaviour is where the surprises live, in prompts as in code.

## Context: the model knows everything except your situation

The second discipline is deciding what the model needs to know. Not everything you have, which buries the signal in noise and spends your context window on irrelevance, but what the task genuinely depends on: the schema, the style guide, the two functions the change must not break, the definition of "done" your team actually uses.

A worthwhile exercise is to imagine handing the task to a skilled contractor who started this morning. Whatever they would need to ask you in the first ten minutes is what belongs in the prompt. Whatever they could find in any textbook does not. Most weak prompts fail this test in both directions at once: they omit the local facts only you know while padding the prompt with general instructions the model did not need.

## Constraint: fence the failure modes

Specificity says what you want. Constraint says what you will not accept, and it earns its keep because the expensive failures are usually violations, not omissions. The output that invents a citation. The refactor that quietly changes the public interface. The SQL that helpfully adds a delete.

Constraints work best when they are checkable: "return valid JSON matching this schema", "modify only this file", "every claim must quote its source or be omitted". A constraint you can verify mechanically converts a fuzzy language problem back into an engineering one, because now there is a test, and the prompt either passes it or does not.

## Evaluation: the discipline that makes it engineering

Here is the uncomfortable one. Most prompting is judged by vibes: run it once, the output looks decent, ship it. That is the equivalent of testing a function on one input and declaring it correct. The distinguishing habit of people who do this well is boring: they keep a set of representative inputs, including the ugly ones, and they rerun it whenever the prompt or the model changes.

It does not need heavy tooling to start. A folder of test cases, expected properties for each, and a script that checks the checkable properties will move you from "the prompt feels worse lately" to "the prompt fails cases 7 and 12 since the model update". The first statement starts an argument. The second one starts a fix.

Evaluation is also what lets you delete things. Prompts accrue superstition: instructions someone added during an incident, kept forever because nobody knows if they still matter. With a test set you can remove a line and find out. Without one, every prompt only ever grows, and a prompt that only grows becomes contradictory, and a contradictory specification produces exactly the inconsistency people then blame on the model.

## What this predicts

Treating prompting as specification makes some testable predictions about where the field goes. Techniques that reduce ambiguity (structured output, explicit examples, stated fallback behaviour) should keep working across model generations, because they address the task rather than the model. Techniques that exploit model psychology should keep dying, because they address the model, and the model keeps changing. So far that pattern has held, and I would bet on it continuing.

It also suggests where the skill genuinely lives. Not in phrasing, which is the easy part, but in the older and harder craft of knowing what you want precisely enough to write it down. Suppose a team is getting inconsistent results from the same prompt and concluding the model is unreliable. Before accepting that, hand their prompt to a colleague and ask them to do the task exactly as written, with no charitable interpretation. If the colleague has to guess, the model was guessing too. The model just guesses faster and with more confidence.

That is the transferable test, and it costs nothing. Write the prompt as if a capable stranger will execute it literally, decide in advance how you will know the output is right, and keep the evidence. Everything else is fashion.
