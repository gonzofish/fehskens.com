---
title: JavaScript Arrays - The Basics
create_date: 2020-04-05 22:01:15
tags: arrays, javascript
publish_date: 2020-04-09 22:50:25
---

Programming is all about processing lists. Day in and day out, programmers work on list after list of data. In JavaScript these lists are called "arrays". This post discusses  the basics of arrays, including how to create them and the fundementals of working with them.

Arrays, in concept, are no diferent than having a piece of paper where one item can be written per line. Keep this concept in mind as we go through this post.

> *Note:* I'll be using `console.log(message)` in examples, for those reading that don't know, this just outputs whatever is in the parentheses to the web browser developer console, so just think of it as a function for output values to the screen

## Create an Array

JavaScript comes with a couple ways of creating an array. The simplest of these is to use square brackets (`[]`).

Take the following code snippet:

```javascript
let foods = [];
```

This creates an empty array and assigns it to the variable `foods`. An empty array means there are no items in the list yet. Think of this as the piece of paper with nothing written on it.

If we wanted to create that list with items already in it, we could just do the following:

```javascript
let foods = ['onion', 'parsnip', 'green beans'];
```

Now, instead of an empty array, `foods` has been created with three items inside of it. This would be like having a piece of paper where the first line has `onion` on it, the second line has `parsnip`, and the third line has `green beans`.

### Construct an Array

An alternative syntax for creating an array is to use JavaScripts `Array` constructor, like the following:

```javascript
let foods = new Array();
```

This works the same as using square brackets. Similarly, if we wanted to create the array with items already in it, we could do:

```javascript
let foods = new array('onion', 'parsnip', 'green beans');
```

This works like the square brackets example in the pervious section. Using `new Array()` provides one extra ability, but we'll talk about that later in the post. For now, just know that, 99 times out of 100, using square brackets is your best bet.

## Adding Items

Having an empty array isn't very useful. Lists usually...list things, so having an array with nothing in it is pretty boring. So how do we get something into a list? Well there are a few ways, but the easiest is to use the array's `.push(value)` method.

```javascript
let foods = [];

foods.push('onion');
```

After `foods.push` executes, the `foods` array will actually be `['onion']`. What the code does is "push" the value on to the end of the array.

You can push as many items as your want (or as memory will allow).

```javascript
let foods = [];

foods.push('onion');
foods.push('parsnip');
foods.push('green beans');

console.log(foods); // outputs: ['onion', 'parsnip', 'green beans']
```

After the last `foods.push` the array is `['onion', 'parsnip', 'green beans']`. The order of the `foods.push` calls dictates the order of the array.

Multiple items can be pushed at once, too.

```javascript
let foods = [];

foods.push('onion', 'parsnip');

console.log(foods); // outputs: ['onion', 'parsnip']
```

That's it. You can keep `push`-ing items onto your array.

### Add a Value to the Start of an Array

While `.push(value)` method is probably going to suit most cases, there are instances where adding a value at the start of an array is desireable. For those cases, there is `.unshift(value)`.

```javascript
let foods = ['parsnip', 'green beans'];

foods.unshift('onion');

console.info(foods); // outputs: ['onion', 'parsnip', 'green beans']
```

## Getting the Number of Items in the Array

Once we have items in the array we might want to know how many there are. In a simple example, like the one above, it's easy to keep track of how many foods were added, but in a more complicated program, we might end up with hundreds or thousands of items in our list. JavaScript has a very convenient attribute on all arrays--`.length`.

```javascript
let foods = ['onion', 'parsnip'];

console.log(foods.length); // outputs: 2

foods.push('green beans');

console.log(foods.length); // outputs: 3
```

### Square Brackets vs `new Array`

Here is the biggest difference between creating an array using square brackets and creating an array using the `new` operator.

```javascript
let foods = new Array(3);

console.info(foods.length); // outputs: 3
```

If we create an array and pass a number as the first parameter, JavaScript will create an array with a length of that number.

> *Note:* passing a non-integer will raise an error since non-integers are invalid for the length value of an array

The catch to the whole thing is that the array has a length, but no values. If we tried to read the values (see the next section) it would return `undefined` since no value has been set.

## Accessing a Value

We can now create an array and see how many items are in it, but what if we want to get each value individually?

```javascript
let foods = ['onion', 'parsnip', 'green beans'];

console.info(foods[0]); // outputs: 'onion'
console.info(foods[2]); // outputs 'green beans'
console.info(foods[3]); // outputs: undefined
```

To access the value at a specific place in the array, specify the variable holding the array, followed by square brackets with the number item you want. The only catch is that the way JavaScript counts items in array starts at zero (0). So the first item is 0, the second item is 1, the third is 2, etc.

The term for the number representing an item's place in an array is "index". In the above code sample, the value `'parsnip'` is at index 2 of the `foods` array.

### How to Find the Index of a Value

You may also want to find out where in an array a certain value is. For this, JavaScript provides two very simple methods:

- `.indexOf(value)`: finds the index of the _first_ instance of the specified `value`
- `.lastIndexOf(value)`: finds the index of the _last_ instance of the specified `value`

If a value cannot be found in the array, each of these methods will return `-1`.

> *Note:* these methods check for `value` through strict equality. Read about what strict equality is at [the Mozilla Developer Network web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Strict_equality_using).

```javascript
let foods = ['onion', 'parsnip', 'green beans'];

console.info(foods.indexOf('parsnip')); // outputs: 1
console.info(foods.lastIndexOf('parsnip')); // outputs: 1

foods.push('parsnip');

console.info(foods.indexOf('parsnip')); // outputs: 1
console.info(foods.lastIndexOf('parsnip')); // outputs:

console.info(foods.indexOf('ice cream')); // outputs: -1
console.info(foods.lastIndexOf('pie')); // outputs: -1
```

> *Note:* JavaScript provides a more sophisticated method, `.findIndex(findFunction)`, but that will be discussed in a later post.

### Setting a Value by Index

While a value can be accessed by index, it can also be changed (or set) by index.

```javascript
let foods = ['onion', 'parsnip', 'green beans'];

foods[2] = 'potatoes';
console.log(foods); // outputs: ['onion', 'parsnip', 'potatoes']
```

## Removing an Item from an Array

The last set of methods to discuss are for removing an item from an array. This is a lot less obvious that the previous sections because the general method for removing an item is not obviously named.

The method for removing an item from an array is `.splice(index, itemsToRemove)`. As the signature indicates, you must provide an index and the number of items to remove.

```javascript
let foods = ['onion', 'parsnip', 'green beans'];

let removed = foods.splice(1, 1);

console.info(removed); // outputs: ['parsnip']
console.info(foods); // outputs: ['onion', 'green beans']
```

Calling `.splice(index, itemsToRemove)` not only removes the item from the original array, but also creates a new array with the removed item.

If we wanted to remove more than one (1) item, we would just pass that number as the second argument.

```javascript
let foods = ['onion', 'parsnip', 'green beans'];

let removed = foods.splice(0, 2);

console.info(removed); // outputs: ['onion', 'parsnip']
console.info(foods); // outputs: ['green beans']
```

### Removing the First Item from an Array

There is also a method that allows easy removal of the first item in an array: `.unshift()`. This is the inverse of the `.shift(value)` method discussed earlier.

```javascript
let foods = ['onion', 'parsnip', 'green beans'];

let firstFood = foods.unshift();

console.info(firstFood); // outputs: 'onion'
console.info(foods); // outputs: ['parsnip', 'green beans']
```

As you can see, this method not only removes the first item from the array, but also returns that value as well.

### Removing the Last Item from an Array

Similarly, there is a method that allows easy removal of the last item in an array: `.pop()`. This is the inverse of the `.push(value)` method discussed earlier.

```javascript
let foods = ['onion', 'parsnip', 'green beans'];

let lastFood = foods.pop();

console.info(lastFood); // outputs: 'green beans'
console.info(foods); // outputs: ['onion', 'parsnip']
```

### Clearing an Array

While you can always just create a new array, there may be cases where removing values from the existing array is what is needed. For that, we can set the array's length function.

```javascript
let foods = ['onion', 'parsnip', 'green beans'];

foods.length = 0;

console.info(foods); // outputs: []
```

## Mutability and Arrays

All of the methods described in this post "mutate" the array. Instead of creating a new array any time we want to add or remove an item from the array, we just change the array.

Think of the array as a stack of Legos. Let's say we have a stack in the order (from bottom to top): red, green, yellow, blue. We get a black Lego and attach (`push`) it to the top. This is mutating the original stack. We have the same exact stack of Legos, but we've mutated it by adding another Lego on top.

In contrast, we could also _not_ mutate the original stack by making a duplicate of it and adding the black Lego to the top of the duplicate.

Mutating values, like arrays, in programming is a pretty important topic. You may see people across the internet talking about how you should _never_ mutate data. This is because in complex applications where many parts of the code are using the same data, mutating an array in one part of the code can create unexpected results in other parts. If one part of your code expects five (5) items in an array and some other part of the code mutates that array so that it has four (4) or six (6), it could cause conflicts in what the user sees or how the application behaves.

There are array methods for avoiding this mutation which will be discussed in later posts.

> *Note:* I believe there are many places where mutating data is ok, but that is a personal preference. You should figure out what works best for you and use that.