---
title: Engineering for Fun (and Zero Profit!)
create_date: 2020-05-25 11:51:40
publish_date: 2020-05-25 13:35:55
---
I am using [HighlightJS](https://highlightjs.org/) to do code highlighting on this blog, it works pretty simply. If it finds a class of `language-*` it attempts to turn it into a code-highlighted block.

The easiest way of using it is to place the following HTML `<script>` on your page:

```html
<!-- the version number may be different -->
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

Basically you load up their script from a CDN and tell it to parse every `code` tag inside a `pre` tag that it can find and identify the syntax for. This is great, super easy. But I'm a programmer and I don't like easy. I want to over-engineer things for fun.

## What's the Language?

It started with wanting little headers at the top of the code identifying what language the snippet was. Look at the snippet above, see how it says "HTML" above the code? That's what I mean.

Adding this was pretty simple and achieved with only CSS:

```css
.hljs.language-css::before,
.hljs.language-html::before,
.hljs.language-javascript::before,
.hljs.language-js::before,
.hljs.language-scss::before {
  background-color: rgba(0, 0, 0, 0.85);
  display: block;
  font-family: sans-serif;
  margin: 0.5em -0.5em -0.5em;
  padding: 0.5em 0.5em 0.25em;
  text-align: end;
}
.hljs.language-css::before {
  content: "CSS";
}
.hljs.language-html::before {
  content: "HTML";
}
.hljs.language-javascript::before,
.hljs.language-js::before {
  content: "JavaScript";
}
.hljs.language-scss::before {
  content: "SCSS";
}
```

Although it may look like a lot, all we're doing is applying a single styling to all of those `.language-*` blocks' `::before` pseudo-element. And then for each specific language type, setting the content to what we want it to say. This isn't generally good for internationalization, _but_ since we're using acronyms and proper names, it works out.

## Pre-Compiling

One thing I've been doing with this site and blog is trying to keep processing to a minumum. The leaner the JavaScript and CSS, the faster it loads. That being said, having Highlight.js run every time a page loads seemed counter-productive.

So instead of pulling Highlight.js from a CDN and then running it on load, my site's build script does that work for us. To do so I pulled in [cheerio](https://cheerio.js.org/) which I've always enjoyed using.

The steps the build process takes are:

1. Compile all posts to HTML
2. Read the HTML using [the `fs` module](https://nodejs.org/api/fs.html)
3. Using Cheerio parse the post to DOM
4. Identify all of the `pre code` blocks
5. Run the content of those blocks through Highlight.js
6. Replace the blocks' content with the highlighted content
7. Write the new content back to the file using `fs`

Actually pretty straight forward and didn't seem to increase build time by all that much. And now the page loads even faster without the extra processing on load (although I do have JS for a couple things on the page, like the night/dark mode).

## Fun, Fun, Fun

I suppose I didn't _need_ to do this. I'm sure someone far smarter than me has put more time and care into achieving this. On top of that, no one even reads this blog. But it was fun to do and that's all the motivation I need.
