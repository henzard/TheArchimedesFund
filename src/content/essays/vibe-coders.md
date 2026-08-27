---
title: "The Vibe Coders Are Shipping"
description: "People without engineering backgrounds are building real software with AI. What they get right, where the danger actually sits, and how engineers can be useful to them."
date: 2026-08-27
tags: ["ai", "collaboration", "software"]
draft: false
hero: "../../assets/essays/vibe-coders.jpg"
heroAlt: "Two people seen from behind, working at computer monitors displaying lines of code"
heroCredit: "Photo by Jonathan Richard (Compagnons) on Unsplash"
---

Somewhere right now, a person who has never heard of a linked list is running a business on software they built by describing what they wanted to an AI. The tool works. Customers pay. And a certain kind of engineer is waiting, with something between concern and satisfaction, for it all to fall over.

I want to argue that the waiting-for-collapse posture is both unkind and, more to the point, wrong about where the risk actually is. The interesting question is not whether non-engineers should be shipping software. They are shipping it, the same way spreadsheet users have quietly run critical business logic for decades without asking anyone's permission. The interesting question is what failure modes actually matter, and what a useful engineer looks like standing next to this.

## What they are getting right

Start with the uncomfortable admission: vibe coders are often better than trained engineers at the part of the job that most determines whether software matters.

They start from a real problem. Nobody describes an app to an AI for fun for six weeks; they do it because invoicing is eating their Sundays or their club's scheduling is chaos. The software exists because a need exists, which is a discipline plenty of engineer-led projects never manage.

They ship and iterate at a pace that should embarrass us. No sprint ceremonies, no architecture review for a feature that might not survive the week. Try it, show a customer, change it. That loop, kept honestly, is most of what agile was supposed to be.

And they hold none of our sunk costs. They will delete a feature, or the entire app, without grief, because they never confused the code with the asset. The asset is the working business. This is a correct valuation that engineers, who fall in love with structure, frequently get wrong.

## Where the danger actually sits

The classic engineering critiques (no tests, duplicated logic, inconsistent naming) mostly describe things that make software expensive to change. Annoying, real, and survivable. The failures that actually end small operations sit elsewhere, and they cluster in four places.

Data is the first and largest. Code can be regenerated in an afternoon; the customer database cannot. Questions that decide outcomes here: are there backups, has a restore ever actually been tested, and can one wrong click or one wrong AI-generated migration destroy records permanently? A vibe-coded app with tested restores is in better shape than a beautifully engineered one without them.

Auth is the second. Authentication and authorisation failures are invisible until they are catastrophic, and they are exactly the kind of thing that looks finished when it is not. The app works when you log in; whether it also works when someone edits a URL to reach another customer's invoice is a question the happy path never asks. This is a well-documented class of vulnerability, broken access control, precisely because it is so easy to ship without noticing.

Cost is the third. Cloud services and AI APIs default to elastic billing, and elasticity means a bug, a scraper, or one enthusiastic user can convert directly into an invoice. Engineers have been burned into setting spending alerts and rate limits; someone new to the ecosystem has no scar tissue telling them to. It is a five-minute fix that nobody makes until they know to.

Irreversibility ties the other three together. The one-way doors: emails sent to the whole list, money moved, records deleted, personal data exposed. Most of a small app can be wrong safely. These parts cannot, and the skill of knowing which is which is genuinely an engineering skill, because nothing on the surface of the code marks the difference.

Notice what this list is not. It is not "you did not use the right framework". Every item is about consequences, not craft.

## How to be useful

If a vibe coder asks an engineer for help, the temptation is a full review, delivered with raised eyebrows. This helps no one. The code style feedback is noise to them, and the important findings drown in it.

The useful engagement is narrower and more respectful. Ask consequence questions rather than implementation questions. What happens if this database vanishes tonight? Who can see this page if I paste the link in a group chat? What is the most this could bill you in a bad month? Which button in this app does something that cannot be undone? These questions are answerable by the person who built it, they surface the real risks in an hour, and they teach the risk categories rather than just patching one instance.

Then help fix the small set of things that matter: automated backups with one tested restore, a billing alert, a rate limit, a second look at anything touching money or personal data. Resist rebuilding. If the tool is working and changeable, it does not need your architecture; it needs its blast radius contained.

There is also something to receive in the other direction, if we are honest enough to take it. Watching someone build at description speed, unburdened by ceremony, is a live demonstration of how much of our process is load-bearing and how much is habit. Some of it will turn out to be habit.

## The dividing line

The engineering profession has been here before. Compilers, spreadsheets, and website builders each triggered the same argument about real programmers, and each time the field grew instead of collapsing, while engineers moved up a level to the problems the new tools created.

That is the honest frame for this moment. The dividing line that matters is not trained versus untrained. It is reversible versus irreversible, and helping more builders see that line clearly is better work than guarding the old one.
