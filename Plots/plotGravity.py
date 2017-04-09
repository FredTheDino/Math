#!/usr/bin/python
"""
A simple plot using pyplot
"""
import matplotlib.pyplot as plt

def fib(n):
    a = 1
    b = 1
    c = 1
    series = [a, b]
    for i in range(n):
        a = b
        b = c
        c = a + b
        series.append(c)
    
    return series

def plot():
    fib_nums = fib(100)
    fib_scale = []
    for i in range(1, len(fib_nums) - 1):
        fib_scale.append(fib_nums[i + 1] / fib_nums[i])
    
    plt.plot(fib_scale)
    plt.title("Scale of fibinatcci numbers")
    plt.show()



if __name__ == "__main__":
    plot()
