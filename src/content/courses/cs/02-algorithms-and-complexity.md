---
title: Algorithms & complexity
module: Algorithms & Data Structures
order: 2
description: Compare linear and binary search and understand how algorithms scale.
---

# Algorithms & complexity

Two algorithms can solve the same problem while doing very different amounts of work. Complexity describes how that work grows as the input gets larger.

## Linear search

Check each element until you find the target. In the worst case, you examine the entire list.

```python
def linear_search(values, target):
    for index, value in enumerate(values):
        if value == target:
            return index
    return -1
```

For **n** elements, the worst-case time complexity is **O(n)**.

## Binary search

With a **sorted** list, compare the target with the middle element and discard half of the remaining search space each time.

```python
def binary_search(values, target):
    low, high = 0, len(values) - 1
    while low <= high:
        middle = (low + high) // 2
        if values[middle] == target:
            return middle
        if values[middle] < target:
            low = middle + 1
        else:
            high = middle - 1
    return -1
```

The worst-case time complexity is **O(log n)**. Sorting an unsorted list is additional work and is not included in that search complexity.

## A quick comparison

| Algorithm | Input requirement | Worst-case time |
| --- | --- | --- |
| Linear search | Any list | O(n) |
| Binary search | Sorted list | O(log n) |

## Try it yourself

- Trace binary search for `7` in `[1, 3, 5, 7, 9, 11, 13]`.
- What happens when the target isn't present?
- Why can't you apply binary search directly to an unsorted list?