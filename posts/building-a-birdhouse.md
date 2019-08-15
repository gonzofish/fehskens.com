---
title: Building a Birdhouse
create_date: 2019-08-14 22:10:33
publish_date: 2019-08-14 22:48:00
---

### OSS and Bird Carpentry

I recently heard someone mention that some forays into open-source software (OSS) are like building a birdhouse. When someone sets out to build a birdhouse t's not so much about making the best or the most innovative birdhouse of all time. No, building a birdhouse is about doing the activity for the sake of doing it. It's about learning how to do it. It's about indulging in the art of craftsmanship.

Some OSS is just that. It's not so much about becoming the greatest library out there, but more about taking time to build something for fun. Recently (the last 26 days to be exact), I've been building my own birdhouse in the form of a static site generator called [Talc](https://github.com/gonzofish/talc).

### Better Birdhouses

Now there are far better, full-feature, glorious birdhouses...I mean static site generators. Just off the top of my head I can think of [Gatsby](https://www.gatsbyjs.org/) and [Jekyll](https://jekyllrb.com/), but I know there are far more. I mean, if you go to Github and look at the ["static-site-generator" topic](https://github.com/topics/static-site-generator) you'll see over a 1,000 repositories. Granted some of those are libraries that act as plugins or extensions of the actual static site generators, but the point stands that there are _great_ libraries out there to accomplish what I'm doing.

So yes, there are other birdhouses I could've "bought", but Talc isn't about having a static site generator, it's about taking my free time and building something. I wanted to code this thing to learn. I wanted to build a project and do it my way. I'm doing this just to do it.

### Blue(bird)prints

I wanted to show myself that I could figure out how to do this. To be honest, even though I know about static site generators, I've never used one. This was probably an advantage since I came in with no preconceived notions on how it's supposed to work.

I sat down with pen and paper and wrote out how I thought I could accomplish this. I gave myself a small domain to work within. My goal was to just be able to write posts, convert them into static HTML pages, and have an index of all the posts I'd written.

I knew I'd need:

- A way of converting content from Markdown into HTML
- Some sort of HTML template to dump that converted content into
- A way to inject other variable data into those posts (like published date or tags)
- An index page to list out all of the posts.

### Birdhouse Built!

Spoiler alert: I did it. This post is powered by Talc. And, compared to Gatsby or Jekyll, Talc **sucks**. I assume it doesn't do 1% of those libraries do. Heck, I can't even put an image in this post because there's no functionality to handle images. I don't have a concept of drafts. There is no situation in which I'd recommend someone use Talc.

But that wasn't the point. The point was to build something. The point was to learn--and I did that, too!

I figured out how to parse an HTML template to do what I needed. I figured out how to inject content and metadata into those templates. Did I do it the best way? I don't really know, to be honest. But I did it in a way that works and makes sense to me. I did it in a way that I could verify worked through testing.

When I needed to add in a more complicated template-parsing algorithm, I not only [created a ticket](https://github.com/gonzofish/talc/issues/1) but I also [made a pull request](https://github.com/gonzofish/talc/pull/2). The project has a [README](https://github.com/gonzofish/talc/blob/master/README.md) that tries its best to explain how to use it.

I also hooked up continuous integration via [Semaphore CI](https://semaphoreci.com/) which passes code coverage results to [Codecov](https://codecov.io/). I didn't need to do that. I'm the only person working on this. I can check code coverage on my own computer (which I do), but I wanted to learn how to hook my Github repository to a CI service which, in turn, talked to a code-coverage service. Here's my Codecov badge:

[![codecov](https://codecov.io/gh/gonzofish/talc/branch/master/graph/badge.svg)](https://codecov.io/gh/gonzofish/talc)

I didn't do this because I thought someone else was going to use it. I did this stuff to practice. I did it to indulge in craftsmanship. I did this so I could work on a project and do things (what I consider) the right way.

All-in-all, I'd call it a success.

### Challenge Yourself

The best part of this exercise is the feeling of accomplishment. Like, I did it. I set a goal to do something I didn't know if I could do and I succeeded.

So don't think that just because there's a birdhouse out there that you're wasting your time building your own. Sometimes it's just fun to build stuff and show yourself that you can do it.
