---
title: Learning Haskell, Part 1
tags: learn in public,haskell,pragprog
create_date: 2020-11-08 09:06:41
publish_date: 2020-11-08 19:55:11
---

> I recently read The Pragmatic Programmer for the first time. One of the first pieces of advice was to "Invest Regularly in Your Knowledge Portfolio". The basic idea is to keep learning and investing in your learning. So I decided to learn Haskell. I also have become a fan of "learning in public". As a result, I'm going to blog my thoughts as I learn Haskell.

> **NOTE:** This and any other related posts are going to be rife with grammar and spelling errors as well as bad advice and misconceptions, so don't take them as a guide.

[Haskell](https://www.haskell.org) is a statically-typed purely functional language.

## Installing Haskell

To use most languages you need a runtime. Haskell has its own set of tools. I have to admit, it was a little confusing what I actually needed. If you go to the [Haskell downloads page](https://www.haskell.org/downloads/) there are 3 install types:

- Minimal: just the compiler and build tools (Cabal & Stack) globally
- Stack: project-centric build tool--seems similar to Cargo or NPM
- Platform: the compiler, Cabal (seems to be the build tool?)

It seems like as you go down that list you get more stuff to work with. Obviously minimal comes with the bare minimum to use Haskell while Platform comes with some Stack and other "useful libraries" installed.

Since I was a newbie, I opted for Platform. I assumed I'd rather have more out of the box than less and try to figure out how to install them individually later. Since I'm on macOS, the recommended way to get Platform was to use the `ghcup` tool (which is like `rustup`) using the following command:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
```

After blindly agreeing to install some things on my system I assume I'm ready to go.

> I just wondered why everything is `ghc`. Turns out it stands for **G**lasgow **H**askell **C**ompiler

## So, Uh, Now What?

I usually try to create "Hello World" and compile it first. However if there's a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), I'll try to use that to play around. Haskell has a REPL, called GHCi (the "i" is for "interactive").

To load it up, I used:

```shell
shell> ghci
GHCi, version 8.8.4: https://www.haskell.org/ghc/  :? for help
Prelude>
```

Why does that say `Prelude`? I'm assuming it's because GHCi loads in some basic libraries to make everything work. Looking at [the user guide](https://downloads.haskell.org/ghc/8.8.1/docs/html/users_guide/ghci.html), that seems to be true. I'm not sure why they make that the prompt, though.

> According to [this tutorial](http://learnyouahaskell.com/starting-out), you can change the prompt with `:set prompt <whatever you want>`, so I used `:set prompt "ghci> "`

To make sure things worked like I thought, I did a simple math equation:

```shell
ghci> 2 + 3
4
```

Okay, seems to be as expected. What about strings?

```shell
ghci> "a" + "b"

<interactive>:84:1: error:
    • No instance for (Num [Char]) arising from a use of ‘+’
    • In the expression: "a" + "b"
      In an equation for ‘it’: it = "a" + "b"
```

Okay, so I guess I can't use `+` to join strings. Looking at [this tutorial](http://learnyouahaskell.com/starting-out), it looks like `++` is the right operator.

```shell
ghci> "a" ++ "b"
"ab"
```

Okay, I think it's time to learn about types then.

## Basic Functions

Functions seem fairly plain to define:

```shell
ghci> double x = x * 2
ghci> double 8
16
ghci> double(8)
16
ghci> double double 8

<interactive>:127:1: error:
    • Non type-variable argument in the constraint: Num (a -> a)
      (Use FlexibleContexts to permit this)
    • When checking the inferred type
        it :: forall a. (Num a, Num (a -> a)) => a
ghci> double(double 8)
32
```

The function we declared here is a "prefix" function, meaning the function is called by using its name (in this case `double`) and then providing parameters to that function. This is similar to most languages except that I was able to call `double` without parentheses. However, if I wanted to do a function call within a function call, I would need parentheses on the outer call.

There are also "infix" functions. The operators we saw before, `+` and `++`, are both infix functions, meaning you provide 1 argument, then the function name, and then another argument. You can actually use a prefix function as an infix function. The catch here is that the function name is called using backticks:

```shell
ghci> multiBy x y = x * y
ghci> multiBy 3 4
12
ghci> 3 `multiBy` 4
12
```

## Types & Lists

Also from that tutorial, I immediately learned a couple more things, mostly related to data types. To start, Haskell has the typical types (strings, characters, integers, floating point numbers, booleans, and lists).

From what I'm reading, in Haskell you can create lists of things. Unlike some loosely typed languages (like JavaScript), those lists must consist of the same type. So while this list is valid:

```shell
ghci> [1, 2, 3, 4, 5]
[1,2,3,4,5]
```

This one is not:

```shell
ghci> ['a', 1, 2]

<interactive>:87:6: error:
    • No instance for (Num Char) arising from the literal ‘1’
    • In the expression: 1
      In the expression: ['a', 1, 2]
      In an equation for ‘it’: it = ['a', 1, 2]
```

I don't _exactly_ know what that error is saying, but it's clear that you can't combine different types in a list. One thing I thought might happen is that if you create a list with integers & floats, it'll coerce the integers to floats:

```shell
ghci> [1, 2.2, 4, 0, 0.1]
[1.0,2.2,4.0,0.0,0.1]
```

As expected, you can create do nested lists:

```shell
ghci> [[1,2,3], [4,5,1]]
[[1,2,3],[4,5,1]]
```

But, inline with lists having 1 type, nested lists must also be the same type:

```shell
ghci> [[1, 2, 3], [True, False, True]]

<interactive>:95:3: error:
    • No instance for (Num Bool) arising from the literal ‘1’
    • In the expression: 1
      In the expression: [1, 2, 3]
      In the expression: [[1, 2, 3], [True, False, True]]
```

In Haskell a string is actually just a list of characters:

```shell
ghci> ['a', 'b', 'c']
"abc"
```

Because a string is a list of characters, you can't make a list containing both:

```shell
ghci> ['a', 'b', 'c', "d"]

<interactive>:97:17: error:
    • Couldn't match expected type ‘Char’ with actual type ‘[Char]’
    • In the expression: "d"
      In the expression: ['a', 'b', 'c', "d"]
      In an equation for ‘it’: it = ['a', 'b', 'c', ....]
```

Because that's actually like doing:

```shell
ghci> ['a', 'b', 'c', ['d']]
```

And those types aren't the same!

> Haskell has a bunch of built-in function for working with lists which you can see in [the tutorial I followed](http://learnyouahaskell.com/starting-out#an-intro-to-lists)

### Tuples vs Lists

Lists are good when you have a set of values all of the same type. However, sometimes you have sets with fixed length and/or different types. Maybe you have a table of data that is gender, age, and country. You could represent one row with a tuple:

```shell
ghci> ('m', 18, "usa")
('m', 18, "usa")
```

You can then use a list for all the data:

```shell
ghci> [('m', 18, "usa"), ('f', 21, "uk"), ('f', 36, "usa"), ('m', 27, "de")]
[('m', 18, "usa"), ('f', 21, "uk"), ('f', 36, "usa"), ('m', 27, "de")]
```

This works because each tuple of the list has the same length and each item has a consistent type (character, number, string). If there was a string for any row's age, we'd get an error:

```shell
ghci> [('m', 18, "usa"), ('f', "21", "uk"), ('f', 36, "usa"), ('m', 27, "de")]

<interactive>:158:8: error:
    • No instance for (Num [Char]) arising from the literal ‘18’
    • In the expression: 18
      In the expression: ('m', 18, "usa")
      In the expression:
        [('m', 18, "usa"), ('f', "21", "uk"), ('f', 36, "usa"),
         ('m', 27, "de")]
```

So the "type" of a tuple is dependent on the length of the tuple and the type of each item in the tuple.

### Smooth Operators

As I learned before, `+` and `++` serve two different functions. While `+` is for adding numbers and it seemed like `++` is for joining strings. But I was wrong. `++` is meant for joining lists, it just so happens that strings are lists of characters, so it works.

```shell
ghci> [1, 2, 3] ++ [4, 5, 6]
[1,2,3,4,5,6]
ghci> ['a', 'b', 'c'] ++ ['d', 'e', 'f']
"abcdef"
ghci> "abc" ++ "def"
"abcdef"
```

What about other operators? I assume that all the typical comparison operators work on numbers like other languages, which they did. But I ran into a problem trying to do "not equal" which I'm used to being `!=`, `!==`, or `<>`:

```shell
ghci> 1 > 2
False
ghci> 2 > 1
True
ghci> 1 >= 1
True
ghci> 2 < 3
True
ghci> 2 <= 3
True
ghci> 2 == 3
False
ghci> 2 == 2
True
ghci> 2 != 3

<interactive>:114:3: error:
    • Variable not in scope: (!=) :: Integer -> Integer -> t
    • Perhaps you meant one of these:
        ‘>=’ (imported from Prelude), ‘==’ (imported from Prelude),
        ‘/=’ (imported from Prelude)
ghci> not 2 == 3

<interactive>:115:5: error:
    • No instance for (Num Bool) arising from the literal ‘2’
    • In the first argument of ‘not’, namely ‘2’
      In the first argument of ‘(==)’, namely ‘not 2’
      In the expression: not 2 == 3
ghci> 2 not = 3

<interactive>:116:1: error: Parse error in pattern: 2
ghci> 2 not == 3

<interactive>:117:1: error:
    • No instance for (Num ((Bool -> Bool) -> Integer))
        arising from the literal ‘2’
        (maybe you haven't applied a function to enough arguments?)
    • In the expression: 2
      In the first argument of ‘(==)’, namely ‘2 not’
      In the expression: 2 not == 3
ghci> 2 <> 3

<interactive>:118:1: error:
    • Ambiguous type variable ‘a0’ arising from a use of ‘print’
      prevents the constraint ‘(Show a0)’ from being solved.
      Probable fix: use a type annotation to specify what ‘a0’ should be.
      These potential instances exist:
        instance (Show a, Show b) => Show (Either a b)
          -- Defined in ‘Data.Either’
        instance Show Ordering -- Defined in ‘GHC.Show’
        instance Show Integer -- Defined in ‘GHC.Show’
        ...plus 23 others
        ...plus 46 instances involving out-of-scope types
        (use -fprint-potential-instances to see them all)
    • In a stmt of an interactive GHCi command: print it
```

I finally saw that you can get not equal by doing the following:

```shell
ghci> not (2 == 3)
True
```

Then I encountered what I assumed was a division assigment operator, `/=`, but turns out to be the not equals comparison operator:

```shell
ghci> 2 /= 3
True
ghci> 2 /= 2.0
False
```

This was a facepalm moment for me.

### List Comprehensions

Up to this point everything was pretty standard fare. I'd encountered similar list/strings handling in Elixir so it wasn't too unfamiliar. List comprehensions aren't new to me, but I really like the Haskell syntax for list comprehensions. Python's syntax has always made me double take every time I read it, Elixir's isn't bad to understand but feels verbose.

[The example I was first presented](http://learnyouahaskell.com/starting-out#im-a-list-comprehension) was really cool in showing how they work. The syntax is very close to both Elixir and Python, but it feels easier to read than both of them. The following will output all numbers from 1 through 10 that, when doubled are >= 12:

```shell
ghci> [x | x <- [1..10], x * 2 >= 12]
[6,7,8,9,10]
```

And to see those numbers:

```shell
ghci> [x * 2 | x <- [1..10], x * 2 >= 12]
[12,14,16,18,20]
```

> In the above examples I used the range creation syntax [start..end]; in Haskell when you create a range it's inclusive of the first and last values. So `[1..10]` creates the list `[1,2,3,4,5,6,7,8,9,10]`

I'm not strong at math, but the notation being very close to how set comprehension notation is what makes it hit home so easy.

You can also have multiple predicates to filter the list values. The following gets all the even numbers from 1 through 10 that when doubled are greater or equal to 12:

```shell
ghci> [x | x <- [1..10], mod x 2 == 0, x * 2 >= 12]
[6,8,10]
```

Comprehensions are even neater when you create a function that uses one. `boomBangs` will print `"BOOM"` for any odd number under 10 and "BANG" for any odd number greater than or equal to 10:

```shell
ghci> boomBangs list = [if item < 10 then "BOOM!" else "BANG!" | item <- list, odd item]
ghci> boomBangs [7..13]
["BOOM!","BOOM!","BANG!","BANG!"]
```

> The above example uses an `if`/`else` statement. `if`/`else` is also an expression, so the value after `then` and `else` needs to return something, some languages like Elixir and Rust allow this. Unlike other languages, however, in Haskell the `else` is required.

We can also use several lists in a single comprehension. The following multiple every item in the first list by every item in the second list:

```shell
ghci> [x * y | x <- [2, 4, 6, 8], y <- [3, 5, 7, 8]]
[6,10,14,16,12,20,28,32,18,30,42,48,24,40,56,64]
```

That's a lot of numbers! We can still use predicates to pair that list down further. Let's get that same list but only the values that are _not_ divisible by 4:

```shell
ghci> [x * y | x <- [2, 4, 6, 8], y <- [3, 5, 7, 8], mod (x * y) 4 /= 0]
[6,10,14,18,30,42]
````

You can also nest comprehensions. In the tutorial the example removes odd numbers from nested lists without flattening the list:

```shell
ghci> lists = [[1,3,2,1,4,5], [6,8,7,9], [1,0,2,9,3,8]]
ghci> [[value | value <- sublist, even value] | sublist <- lists]
[[2,4],[6,8],[0,2,8]]
```

This is the same as doing:

```shell
ghci> evenNumbers list = [value | value <- list, even value]
ghci> [evenNumbers sublist | sublist <- lists]
[[2,4],[6,8],[0,2,8]]
```