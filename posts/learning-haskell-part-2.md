---
title: Learning Haskell, Part 2 - More on Types
tags: learn in public,haskell,pragprog
create_date: 2020-11-09 20:52:11
publish_date: 2020-11-14 10:36:20
---

> I'm learning Haskell by following [Learn You a Haskell for Great Good](http://learnyouahaskell.com/chapters). This is a series about learning something new.

> **NOTE:** This and any other related posts are going to be rife with grammar and spelling errors as well as bad advice and misconceptions, so don't take them as a guide.

# Type Information & Typeclasses

In GHCi there's a command (`:t`) to show the type signature of anything, values, variables, functions. Here's some examples of seeing value types:

```shell
ghci> :t 12
12 :: Num p => p
```

In the above it's saying that `12` is of type `p`. What's type `p`? Well `p` implements `Num`. What's `Num`? `Num` is a typeclass! From what I can gather, Haskell typeclasses are something like an interface in Java or a trait in Rust. Members of the `Num` typeclass act like numbers. `Num` is actually a subclass of `Eq` (since all numbers can test for equality) and `Show` (which lets it be printed as a string using the `show` function).

So the above says that `12` is of type `p` which is a member of `Num`.

```shell
ghci> :t 12.3
12.3 :: Fractional p => p
```

The above says `12.3` is of type `p` which is a member of `Fractional` which is a subclass of `Num`. `Fractional`s are non-integer numbers, including floating point numbers. Integers are all members of the `Integral` typeclass.

```shell
ghci> :t True
True :: Bool
ghci> :t 3 == 4
3 == 4 :: Bool
```

So `True` and `False` are a bit different. I _think_ that, since they are reserved words, they directly implement their typeclass, `Bool`. So their definition doesn't abstract anything (meaning `True :: Bool p => p` isn't necessary). And since `3 == 4` evaluates to `False`, its type is also `Bool`.

```shell
ghci> :t 'Z'
'Z' :: Char
```

Pretty straight forward, `'Z'` is a character, so it's a member of the `Char` typeclass.

```shell
ghci> :t "Hello, there"
"Hello, there" :: [Char]
```

A little more interesting. Strings are actually just a list of characters, so instead of a `String` typeclass, strings are actually a list where each item is a member of the `Char` class.

```shell
ghci> :t [1,2,3]
[1,2,3] :: Num a => [a]
```

Other lists are defined ina similar way. In the above, we have a list where each member is a member of `Num`.

## Function Constraints

Using it, you can also see the constraints (input requirements and output types) of a function:

```shell
ghci> :t head
head :: [a] -> a
```

The above says "head is a function that takes in a list whose members are of type `a` and returns a value of type `a`". What is type `a`? In this case it can be anything. Functions can also be typeclass-specific:

```shell
ghci> :t (+)
(+) :: Num a => a -> a -> a
```

This has a few differences:

1. When we use an infix function like `+` with `:t` we need to wrap it in parentheses.
2. Similar to doing `:t 12` in the previous section, we have that `Num a =>`. This is saying `a` is a member of `Num`.
3. To the right of the `=>` that we see `a -> a -> a`. This is the function definition (like `[a] -> a` in the `head` example).

I think this is difficult to read (at least at first). In Haskell the final `-> a` means that the function returns a value of type `a`. Everything before that is a parameter to the function. So in the above this means that `+` takes 2 parameters, both of type `a` and that it returns a value of type `a`.

So the full description of `+` is that it is a function that takes two parameters of type `a` and returns a value of type `a` where `a` is a member of `Num`.

There are a bunch of typeclasses and the basic ones are provided in the Prelude. As of the 2010 version of Haskell, [this is the documentation for the predefined types and classes](https://www.haskell.org/onlinereport/haskell2010/haskellch6.html#x13-1160006).
