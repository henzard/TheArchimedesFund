---
title: "When the Problem Is Actually a Graph"
description: "How to tell when nodes and edges are the honest shape of a problem, what traversal really costs, and where graph systems start to break as they grow."
date: 2026-08-27
tags: ["graphs", "engineering", "systems-thinking"]
draft: false
hero: "../../assets/essays/graph-engineering.jpg"
heroAlt: "Close-up of red cords strung between anchor points, crossing to form a web-like net of straight lines"
heroCredit: "Photo by Bernd Dittrich on Unsplash"
---

Most software problems arrive dressed as tables. Rows, columns, foreign keys: the shapes our tools hand us by default. But a surprising number of those problems are graphs in disguise, and the disguise has a cost. You can model a dependency system, a permissions hierarchy, or a payments flow relationally, and it will work right up until someone asks a question about connection rather than about records. Then the joins multiply, the queries grow recursive, and the schema starts fighting the question.

The reverse mistake is just as common. Graphs are intellectually attractive, and it is easy to reach for one because the domain "has relationships". Every domain has relationships. That is not the test.

## The honest test

A graph is the right shape when the relationships are the point, not the decoration. Three questions do most of the work:

First, do your important queries follow connections of unknown length? "Who reports to whom" is a join. "Everyone in this person's reporting line, however deep" is a traversal. If the depth of the question is not fixed at design time, you are asking a graph question.

Second, is the structure irregular? Trees have one parent per node. Tables have uniform rows. If some nodes have two edges and others have two thousand, and edges themselves carry meaning (weight, direction, type), the relational encoding will be awkward and the tree encoding will be wrong.

Third, do you care about paths, or only endpoints? Shortest routes, cycles, reachability, blast radius: these are questions about the journey between things. Relational systems can answer them, but each answer is a small research project. In a graph model they are the native vocabulary.

If you answer no to all three, a graph is probably overkill. A tags table is not a knowledge graph. A category tree is a tree, and pretending otherwise buys you generality you will pay for in tooling, hosting, and hiring, without ever collecting the benefit.

## Traversal is the product

Once a problem really is a graph, the engineering centre of gravity shifts. In relational work you spend your care on the schema; in graph work you spend it on the traversal. The data structure is almost boring. An adjacency list gets you remarkably far:

```python
graph = {
    "billing":   ["auth", "ledger"],
    "auth":      ["sessions"],
    "ledger":    ["auth"],
    "sessions":  [],
}

def reachable(start, graph):
    seen, stack = set(), [start]
    while stack:
        node = stack.pop()
        if node in seen:
            continue
        seen.add(node)
        stack.extend(graph[node])
    return seen
```

That dozen lines answers a genuinely useful question: if `billing` changes, what could be affected? Notice what made it safe. The `seen` set is not an optimisation, it is the difference between a program and an infinite loop, because real dependency graphs contain cycles whether you invited them or not.

Cycles deserve more respect than they usually get. In a build system a cycle is an error to report. In a social graph it is normal life. In a financial reconciliation graph it might be fraud. Same structure, three different meanings, and the traversal code cannot know which one you are in. Deciding what a cycle means in your domain is a design decision, and I would make it explicitly and early, because discovering the answer in production is the expensive way to learn it.

Direction matters in the same way. "A depends on B" and "B is depended on by A" are the same edge read in opposite directions, and many real systems need both readings. If you only store the forward direction, the reverse question ("what breaks if I delete this?") degrades into a full scan. Storing both readings doubles your writes and invites them to drift apart. That trade-off does not disappear because a database vendor abstracts it; it moves into your latency and consistency budgets.

## Where it breaks at scale

Small graphs flatter you. Everything fits in memory, every traversal is fast, and the whiteboard drawing matches the data. Growth breaks this in predictable places.

The first break is the supernode. Most real graphs are wildly skewed: a handful of nodes accumulate an enormous share of the edges. The celebrity account, the shared utility library, the admin role granted to everything. Any traversal that touches a supernode fans out to a huge frontier, and your p99 latency now depends on which node the query happened to enter through. Averages will look fine while specific users have an awful time.

The second break is unbounded depth. A traversal with no depth limit is a query whose cost is decided by your data rather than your code. Somewhere a well-meaning import will create a chain a thousand hops long, and the query that was always instant will not be. Put a depth budget on every traversal and treat hitting it as a signal worth logging, not merely a truncation.

The third break is distribution. Graphs partition badly, because a good partition needs edges to stay local and real edges refuse to cooperate. Once a traversal crosses machines, each hop can become a network round trip, and an algorithm that was linear in edges becomes linear in latency. This is why "we will shard it later" is a more dangerous sentence for graph systems than for most others. Sometimes the honest answer is to keep the graph small enough to stay on one machine, and to be selective about which relationships deserve to be edges at all.

## Choosing edges is the real modelling skill

That last point generalises. The most consequential graph decision is not which database to use. It is which relationships you promote to edges and which you deliberately leave as plain attributes. Every edge type you add makes some new question cheap and every future traversal a little more tangled. A graph where everything connects to everything answers no question well.

So when a problem lands on your desk wearing its table costume, ask the three questions: unknown depth, irregular structure, paths over endpoints. If it fails, keep the boring schema with a clear conscience. If it passes, model the smallest graph that answers your actual questions, decide what cycles mean before your code decides for you, and give every traversal a budget. The discipline is not in drawing the nodes and edges. It is in refusing most of them.
