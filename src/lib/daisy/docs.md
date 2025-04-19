---
title: "Daisy Documentation"
---

Welcome to the official documentation for **Daisylang**, a simple and expressive programming language.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Hello, World](#hello-world)
- [Comments](#comments)
- [Types](#types)
- [Type Inference](#type-inference)
- [Functions](#functions)
- [Structs and Methods](#structs-and-methods)
- [Arithmetic](#arithmetic)
- [Logical Operators](#logical-operators)
- [String Formatting](#string-formatting)
- [String Manipulation](#string-manipulation)
- [Imports and Modules](#imports-and-modules)
- [Input/Output](#inputoutput)
- [RAII and Memory Management](#raii-and-memory-management)

## Getting Started

Daisylang is a lightweight, statically typed programming language designed for simplicity and efficiency. This guide will walk you through the installation process, writing your first program, and understanding the core concepts of the language.

## Installation

To install Daisylang, follow these steps:

1. Download the latest release from the official repository.
2. Extract the package and add the binary to your system path.
3. Verify the installation:

   ```sh
   daisy --version
   ```

   If the installation was successful, this command should print the installed version.

## Hello, World

Let's start with a simple program that prints Hello, World! to the console.

```go
io.out("Hello, World!")
```

Run the script using:

```sh
daisy run hello.daisy
```

## Comments

Daisylang supports both single-line and multi-line comments:

```go
# This is a single-line comment

#* This is a
   multi-line comment *#
```

## Types

Daisylang provides a range of built-in types:

```go
number: int32 = 5
big_num: uint64 = 1
decimal: flt32 = 0.4
double_precision: flt64 = 420.69
words: str = "hi"
c: char = "😖" # Unicode character
array: [3]int32 = {1, 2, 3} # Fixed-size array
```

Strings could be implemented as arrays of char with an associated length field.

## Type Inference

Daisylang supports type inference using :=:

```go
a := 5  # Automatically inferred as int32
```

## Functions

Functions are first-class citizens in Daisylang:

```go
f: func(param1: int32, param2: flt64) (bool) {
  return true
}
```

## Structs and Methods

Daisylang supports struct-like types with methods:

```go
my_type: type {
  a: int32
  b: str
}

my_method: my_type::func() () {
  # Method logic here
}
```

## Arithmetic

Daisylang provides basic arithmetic operations:

```go
a + b  # Addition
b - a  # Subtraction
a * b  # Multiplication
a / b  # Floating point division
a // b # Integer division
a % b  # Modulus
```

## Logical Operators

```go
a == b  # Equal
a != b  # Not equal
a <= b  # Less than or equal
a >= b  # Greater than or equal
```

## String Formatting

Daisylang supports formatted strings:

```go
name: str = "bob"
hello: str = fmt"hello, {name}"
```

## String Manipulation

```go
hello = "hi" + name  # Concatenation
```

(Should strings be mutable or immutable?)

## Imports and Modules

Modules can be imported using the import keyword:

```go
import "io" "mem"
```

## Input/Output

```go
io.out("hi mom") # Print to stdout
input: str = io.in("what's your name?") # Read input
io.err("nooo\n") # Print to stderr

my_file: file = io.open("filename", "rw")
io.write(file, "text")
io.close(file)
```

## RAII and Memory Management

Daisylang supports RAII-style resource management using defer:

```go
{
  ptr: int = mem.alloc(10) # Allocate memory
  defer mem.free(ptr) # Free memory at end of scope
  # Use ptr...
}
```

File handling example:

```go
{
  my_file: file = io.open("filename")
  defer io.close(file)
  io.write(file, "hi")
}
```

More details coming soon!
