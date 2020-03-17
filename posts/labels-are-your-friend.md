---
title: Make Your Forms Able with Labels
create_date: 2020-03-15 15:27:45
publish_date: 2020-03-16 22:29:44
---

### Forms Forever

It's no surprise to any web developer that forms and their inputs are at the heart of most of modern web development. From logins to customer feedback to searching, so much is driven by forms.

However, a simple little HTML tag can make your forms _so_ much better: `label`. Labels are exactly what they say they are, they label other elements, or as [the MDN page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label "The MDN page for an HTML label") puts it: they act as a "caption for an item". Most commonly `labels` label `input`s and `textarea`s. The `input` or `textarea` is know as a "control" and, when labelled, it's called a "labeled control". Because of that when this article says "control" it's referring to an `input` or `textarea`.

### Yeah, But Why?

Overall, a `label` provides enhanced functionality:

1. The user gets text that says what the input is meant to do
2. When the user clicks on the label, it will set focus to the control
3. **Accessibility**: when a screen reader focuses on an control, it will announce it using the label text.

That third point is _super_ important (which is why it's bolded). Not to get on a soap box, but the web is meant for everyone. If your site isn't accessible it breaks that "for everyone" principle.

### Basically, It's a Label

The basic way of using a `label` is this:

```html
<label for="title">Title:</label>
<input id="title" name="title" type="text">
```

The `for` attribute of the label must be the `id` of the control it is meant to label. It's that simple.

### Nestled All Snug in a Label

There's another form which a `label` can take. A `label` can wrap the control it's meant to label:

```html
<label for="title">
  Title
  <input id="title" name="title" type="text">
</label>
```

But there's a nice trick that can be used when nesting the control inside the label:

```html
<label>
  Title
  <input name="title" type="text">
</label>
```

If the control is nested, it doesn't need an `id` and the `label` doesn't need a `for` attribute because the association between the `label` and the control is implicit.

### And Always Let Your Labels Be Your Guide

That's it. With just one tag you can drastically improve the capabilities of your forms. Adding styling obviously helps and can bring some freshness to your forms. [Here's a simple example on Codepen](https://codepen.io/gonzofish/pen/poJVGEo) (I make no claims of being a good designer):

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="gonzofish" data-slug-hash="poJVGEo" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Label Able">
  <span>See the Pen <a href="https://codepen.io/gonzofish/pen/poJVGEo">
  Label Able</a> by Matt Fehskens (<a href="https://codepen.io/gonzofish">@gonzofish</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
