---
title: "An MCP Server Is Infrastructure, Not a Plugin"
description: "What changes when you move a Model Context Protocol server from a local stdio process to a hosted service on Railway, and why secrets and blast radius are the real work."
date: 2026-08-27
tags: ["mcp", "railway", "ai", "infrastructure"]
draft: false
hero: "../../assets/essays/railway-mcp.jpg"
heroAlt: "Rows of white server cabinets with small windows, seen from above under overhead light rails"
heroCredit: "Photo by Tony Marinescu on Unsplash"
---

The easiest way to misunderstand the Model Context Protocol is to think of it as a plugin format. It looks like one at first: you write a small server, it exposes some tools, an assistant calls them. But the moment you deploy that server somewhere real, a platform like Railway, with a public URL and a process that runs whether or not you are watching it, you have stopped writing a plugin. You are now operating infrastructure, and infrastructure has different rules.

MCP itself is simple enough to state plainly. It is an open protocol that gives AI assistants a defined way to talk to external tools and data. A server declares what it offers: tools the model can invoke, resources it can read, prompts it can use. The client, usually an assistant application, discovers those capabilities and calls them through a standard interface. The value is the standardisation. You write the integration once and any MCP-aware client can use it, instead of every assistant needing its own bespoke connector.

## The stdio comfort zone

Most people meet MCP through a local server: a process the client spawns on your own machine and talks to over stdin and stdout. This arrangement is forgiving in ways that are easy to take for granted.

A stdio server inherits your identity. It runs as you, on your machine, with your files and your environment variables. There is no network exposure, so there is no authentication problem to solve. Its lifetime is tied to the client session, so state can live happily in memory. If it crashes, the client restarts it and nobody notices. And the trust question barely arises, because the only person who can reach it is the person who installed it.

Every one of those comforts disappears when you host the server. A deployed MCP server on Railway is a long-lived process with a URL. Anything that can reach that URL is a potential caller. The process will be restarted by the platform at times you do not choose: deploys, crashes, instance migrations. Whatever assumptions the stdio version made about identity, lifetime and privacy are now wrong, and the interesting engineering is in replacing them deliberately rather than discovering their absence in production.

## What statelessness buys you

The restart problem has a well-worn answer: keep the server stateless. Any request should be able to land on a fresh process and succeed, because everything the request needs is either in the request itself or in a datastore that outlives the process.

This is standard service design, but it pays off unusually well for MCP servers, for a reason specific to how assistants behave. An AI client does not call your tools the way a human uses an app, in a tidy session with a beginning and an end. It calls them opportunistically, sometimes minutes apart, sometimes in bursts, sometimes retrying after its own context got confused. If your server holds conversation state in memory, a platform restart in the middle of that meandering interaction produces a failure the model has to interpret. Models are not good at interpreting infrastructure failures. They retry, or apologise, or invent an explanation.

A stateless server turns all of that into non-events. Deploys become boring. Scaling to a second instance requires no ceremony. The health check that Railway uses to decide whether your service is alive actually means something, because a process that responds is genuinely equivalent to any other process that responds. Statelessness is often sold as a scaling technique. For tool servers, it is better understood as a reliability contract with a caller that cannot reason about your internals.

## Secrets are the actual difficulty

Here is the part that deserves more attention than it usually gets. A useful MCP server almost always wraps something private: an API with a key, a database, an internal system. Hosting the server means those credentials now live in the deployment environment, and the server has become a machine that spends your credentials on behalf of whoever can talk to it.

That sentence should slow you down. Two separate problems hide inside it.

The first is storage and handling, and it is the easier one. Platforms like Railway give you environment variables managed outside your code, so nothing secret needs to live in the repository. The usual hygiene applies: rotate keys, scope tokens to the narrowest permissions the tools genuinely need, and never let a secret appear in a tool response, because anything the server returns can end up in a model's context and from there in a transcript.

The second problem is authentication of the caller, and MCP does not solve it for you by magic. A local stdio server never needed to ask who is calling. A hosted one must, and the honest answer today is that you should treat this as ordinary web service auth: require a bearer token or equivalent on every request, and treat an unauthenticated hosted MCP server as an open proxy to whatever it wraps. The protocol has been evolving on the question of standardised authorisation for remote servers, and I would not want to state its current status from memory with confidence. What I am confident about is the shape of the failure: an unauthenticated tool server with a database credential inside it is an incident report waiting for a timestamp.

## Blast radius, before capability

The last shift in thinking is about the tools themselves. When you design a tool an assistant can call on its own, the question is not what the tool can do. It is what the worst plausible sequence of calls can do, because the caller is a probabilistic system that will occasionally do something you did not anticipate, for reasons that seemed locally sensible to it.

A few design habits follow directly from taking that seriously:

- Separate reading from writing, and make them different tools rather than modes of one tool. A server that only reads has a blast radius of disclosure. That is not nothing, but it is categorically smaller than mutation.
- Make destructive operations either absent or narrow. A tool named `delete_record` with an id argument is a very different object from one named `cleanup` that decides scope for itself.
- Prefer reversible effects. Archiving over deleting, drafting over sending, staging over publishing.
- Return small, structured results. Whatever you return becomes model context, and oversized responses both leak more and cost more.

Suppose you wire a deployment tool into an assistant so it can roll back a bad release. The generous version accepts a service name and does the rest. The safer version accepts a specific deployment id, refuses anything not already marked as a known-good target, and logs the call somewhere the assistant cannot reach. The second one is slightly more annoying to build and dramatically easier to trust.

## Where to start

If you have a local MCP server you like, promoting it to hosted infrastructure is a good weekend of work, and the checklist is short. Make it stateless. Put every secret in the platform environment. Put authentication in front of it and pretend the URL is public knowledge, because it effectively is. Then reread your tool list with one question in mind: if a confused model called this at the worst possible moment, what would I be cleaning up on Monday? The tools that survive that question are the ones worth deploying.
