---
title: Learning Haskell, Part 3 - Pattern Matching & Recursion
tags: learn in public,haskell,pragprog
create_date: 2020-11-14 13:11:13
publish_date: 2020-11-14 22:42:07
---

> I'm learning Haskell by following [Learn You a Haskell for Great Good](http://learnyouahaskell.com/chapters). This is a series about learning something new.

> **NOTE:** This and any other related posts are going to be rife with grammar and spelling errors as well as bad advice and misconceptions, so don't take them as a guide.

# Patterns, Patterns Everywhere

In Haskell patterns seem important. This was my experience with Elixir as well. Instead of leaning on control structres like loops and `if`, you rely on pattern matching to do the heavy lifting. So where in JavaScript I might write a function like:

```javascript
const checkZero = (value) => {
  if (value === 0) {
    return 'Yep, that is a zero';
  } else {
    return 'No, that is not a zero';
  }
};
```

In Haskell, you can do pattern matching to achieve the same result:

```haskell
checkZero :: (Integral a) => a -> [Char]
checkZero 0 = "Yep, that is a zero"
checkZero _ = "No, that is not a zero"
```

> In the above we use `_` as a placeholder since we won't use the variable in our function

Obviously this is a _very_ contrived example, but it hits the point. We just sort of overload the function and have a case where the value is `0` and, if it isn't, it falls through to the next definition of that function. If we had more cases we wanted to handle, we could define them as well.

> To use a file in GHCi, you can navigate to the directory the file is in, run `ghci` and then use the command `:l <filename>`. This will load any functions you've defined in that file

```haskell
checkFive :: (Integral a) => a -> [Char]
checkFive 0 = "That is zero"
checkFive 1 = "That is one"
checkFive 2 = "That is two"
checkFive 3 = "That is three"
checkFive 4 = "That is four"
checkFive 5 = "That is five"
checkFive _ = "That is some other number I don't know"
```

Again, very contrived, but it proves the point. We pattern match whenever the argument is 0 through 5 and then have a fallback for any other number. This can be extended to lists and tuples as well:

```haskell
length' :: [a] -> [Char]
length' [] = "That's an empty list!"
length' (_ : []) = "That list has 1 item"
length' (_ : _ : []) = "That list has 2 items!"
length' _ = "That list is too big, I can't count that high!"
```

> The `head:tail` syntax seems to be used a lot. What it does is separate the first item in a list from the rest of the items. So the list `[1, 2, 3]` is actually `1:2:3:[]` (and I actually think the former is syntactic sugar for the latter)

This is basically the same principle. Depending on whether or not we can see a specific number of items in a list, we execute a different function.

What I've noticed so far is that Elixir seems to borrow from Haskell--or maybe they both borrow from some other language, I don't know. A lot of the stuff I love about Elixir is here, including this pattern matching which feels very intuitive to me.

One thing about pattern matching that I find difficult is how to reason out problems. As I did exercises in the [Programming Elixir](https://pragprog.com/titles/elixir16/programming-elixir-1-6/) book, I failed to see the solution a lot. However, as soon as I saw someone else's solution it seemed so obvious. I guess functional programming really is a very different way of looking at things.

## Keep Your Guard Up

So pattern matching is great, but it only let's you match against rigid conditions. What if I want to do something if a parameter is `<=` to something other value? Well that's what guards do for you. Guards just let you specify conditions with your function and then use an implementation if it meets a condition.

```haskell
checkAdult :: (Integral a) => a -> [Char]
checkAdult num
  | num < 18 = "Not an adult yet"
  | num < 26 = "Just getting into adulting, eh?"
  | num < 30 = "Forty seems far away doesn't it?"
  | num < 40 = "Now it gets interesting"
  | num < 50 = "Feeling old yet?"
  | otherwise = "More than 50? You probably wake up sore even if you haven't exercised"
```

So the principle here is similar to the other pattern match, but we can do conditionals. If a condition isn't met, the code falls through until it meets a condition. You can see the `otherwise` keyword at the end, that's a catchall in case a condition can't be met--sort of like having `if/else if/else` or `default` with a `case` statement in other languages.

You can perform operations in a guard, too. I'll just use the example from [Learn You a Haskell](http://learnyouahaskell.com/syntax-in-functions#where):

> Just a warning: the code example has harsh language related to weight, so if you're offended by it, my apologies

```haskell
bmiTell :: (RealFloat a) => a -> a -> String
bmiTell weight height
    | weight / height ^ 2 <= 18.5 = "You're underweight, you emo, you!"
    | weight / height ^ 2 <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
    | weight / height ^ 2 <= 30.0 = "You're fat! Lose some weight, fatty!"
    | otherwise                   = "You're a whale, congratulations!"
```

> Sidenote: at my height & weight I was congratulated on being a whale. Time to hit the gym!

In this example we're doing the BMI calculation (`weight / height ^ 2`) in every guard which seems both error-prone and a waste of typing. Luckily guards support a `where` clause:

```haskell
bmiTell :: (RealFloat a) => a -> a -> String
bmiTell weight height
    | bmi <= 18.5 = "You're underweight, you emo, you!"
    | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
    | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"
    | otherwise   = "You're a whale, congratulations!"
    where bmi = weight / height ^ 2
```

Here we took the calculation and assigned it to a variable (`bmi`) using the `where` clause. Now we can just use that in our guards instead of writing out the same exact logic multiple times.

You can even assign multiple variables in the `where` clause:

```haskell
bmiTell :: (RealFloat a) => a -> a -> String
bmiTell weight height
    | bmi <= skinny = "You're underweight, you emo, you!"
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"
    | bmi <= fat    = "You're fat! Lose some weight, fatty!"
    | otherwise     = "You're a whale, congratulations!"
    where bmi = weight / height ^ 2
          skinny = 18.5
          normal = 25.0
          fat = 30.0
```

And you can pattern match to assign variables in the `where` clause, too (although this example feels contrived):

```haskell
bmiTell :: (RealFloat a) => a -> a -> String
bmiTell weight height
    | bmi <= skinny = "You're underweight, you emo, you!"
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"
    | bmi <= fat    = "You're fat! Lose some weight, fatty!"
    | otherwise     = "You're a whale, congratulations!"
    where bmi = weight / height ^ 2
          (skinny, normal, fat) = (18.5, 25.0, 30.0)
```

Guards are really powerful in my experience with Elixir and it feels no different in Haskell.

## The Defintion of Recursion is Recursion

If you don't know what recursion is, its just the idea that a function can call itself to accomplish its task. So instead of using a loop to iterate through a list using a loop, we can use recursion. In a language like JavaScript we would do:

```javascript
const sum = (list) => {
  let total = 0;

  for (let i = 0; i < list.length; i++) {
    total += list[i];
  }

  return total;
};
```

But in Haskell, without loops, we'd use recursion:

```haskell
sum' :: (Num a) => [a] -> a
sum' [] = 0
sum' (x:xs) = x + sum' xs
```

If the function gets an empty list it returns zero, otherwise it adds the first item to the return value of the rest of the list. Here's an example of it working practice:

```
sum' [11, 32, 3, 42]
  11 + sum' [32, 3, 42]
    32 + sum' [3, 42]
      3 + sum' [42]
        42 + sum' []
          return 0
        return 42 + 0
      return 3 + 42
    return 32 + 45
  return 11 + 77
88
```

So to replace loops in Haskell (and a lot of languages) you can use recursion. Recursion, according to Learn You a Haskell, is important in Haskell and is used quite extensively.

> Side note: in JavaScript--as well as other languages--you can use recursion in a similar way

> ```javascript
> function sum(list) {
>  return list.length === 0
>    ? 0
>    : list[0] + sum(list.slice(1))
> }
> ```

The challenge with recursion is that there must be some base case (or base cases) which stop the function from calling itself again. In the above example, the base case was the empty list.

The key to recursion is usually to find 1 or more base cases and make sure they're handled. For everything else there is a more generalized way of handling the input data that will eventually lead to a base case.