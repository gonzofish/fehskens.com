---
title: How I Develop
create_date: 2020-03-29 22:06:53
---

### Everybody's Special!

Developing software is one of those things that is very preference-driven. Everyone does it _their_ way. I mean, "spaces vs. tabs" isn't a meme within software development because people don't have strong opinions. Our tools are super important to our workflows and they drive much of how we work. Here's how I think I'm special.

### Taking a Test Drive

Ok, right off the bat here's a big disclaimer: I _try_ my hardest to develop with a [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD) approach. Every time I do TDD after I have had a lapse in judgement, I say to myself "why don't I always do this?"

For the uninitiated TDD is where you write your tests first and the write code to meet the tests. At first it seems ridiculous and impossible, but the more you do it, the better it gets. It works off of a red-green cycle:

1. Write a test
2. Since you don't have code to satisfy the test, the test will fail (the "red")
3. Write _just_ enough code to satisfy the test
4. The test passes (the "green")
5. Move on to the next test

Over time I've become a faster developer because of testing first. Too many times I'll be writing code while making too many assumptions and too many guesses as to how to accomplish what I want. When I use TDD I keep the guesses and assumptions to a minimum. On top of that, I tend to think about things that the guess-and-check method doesn't drive me towards. Edge cases that would be missed get caught (sometimes serendipitously).

More recently, I've made it a point to not unit test, specifically. I realized that I had fallen into a habit of testing my implementation and not the desired output. What does that mean? Instead of worrying about what the user was going to see and how they were going to interact with the application, I became transfixed on how an input interacted with a form. This is just a bad idea because it makes the tests brittle (a small change can easily break the tests) and was prone to missing real errors.
