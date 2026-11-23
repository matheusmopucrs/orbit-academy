---
title: Computational thinking
module: Foundations
order: 1
description: Break problems into steps, recognize patterns, and design your first algorithm.
---

# Computational thinking

Computer science starts with a way of thinking, not a programming language. We turn a problem into precise steps that a computer can follow.

## The four building blocks

| Skill | What it means | Example |
| --- | --- | --- |
| Decomposition | Split a problem into smaller parts | Separate input, processing, and output |
| Pattern recognition | Find similarities | Notice repeated calculations |
| Abstraction | Keep the relevant details | Model a student by ID and grades |
| Algorithms | Describe a sequence of steps | Calculate the average of a list |

## From a question to an algorithm

Suppose you want to calculate the average of a student's grades. The input is a list of numbers. The output is one number.

```python
def average(grades):
    if not grades:
        raise ValueError("At least one grade is required")
    return sum(grades) / len(grades)

print(average([8, 7, 9]))  # 8.0
```

The empty-list check matters: an algorithm should define what happens for unusual inputs, not just the happy path.

## Try it yourself

1. Write the steps for finding the largest number in a list.
2. What should happen if the list is empty?
3. Which steps stay the same if the list contains 10 numbers or 10,000?

> Focus on clear reasoning first. Code is how you express that reasoning.