---
title: Keeping Labels Stylish
create_date: 2020-03-15 15:27:45
---

### Forms Forever

It's no surprise to any web developer that forms and their inputs are at the heart of most of modern web development. From logins to customer feedback to searching, so much is driven by forms.

However, a simple little HTML tag can make your forms _so_ much better: `label`. Labels are exactly what they say they are, they label other elements, or as [the MDN page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label "The MDN page for an HTML label") puts it: they act as a "caption for an item". Most commonly `labels` label `input`s and `textarea`s. The `input` or `textarea` is know as a "control" and, when labelled, it's called a "labeled control". Because of that when this artcile says "control" it's referring to an `input` or `textarea`.

### Yeah, But Why?

Overall, a `label` provides enhanced functionality:

1. The user gets a visual indicator for which the control is meant
2. When the user clicks on the label, it will set focus to the control
3. **Accessibility**: when a screen reader focuses on an control, it will announce it using the label text.

That third point is _super_ important. Not to get on a soap box, but the web is meant for everyone. If your site isn't accessible it breaks that "for everyone" principle.

### Basically, It's a Label

The basic way of using a `label` is this:

```html
<label for="title">Title:</label> <input id="title" name="title" type="text" />
```

The `for` attribute of the label must be the `id` of the control it is meant to label. It's that simple.

### Nestled All Snug in a Label

There's another form which a `label` can take. A `label` can wrap the control it's meant to label:

```html
<label for="title">
  Title
  <input id="title" name="title" type="text" />
</label>
```

But there's a nice trick that can be used when nesting the control inside the label

```html
<label>
  Title
  <input name="title" type="text" />
</label>
```

If the item is nested, it doesn't need an `id` and the `label` doesn't need a `for` attribute because the association between the `label` and the control is implicit.
