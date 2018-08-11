'''A basic perlin noise generator for Python
See repo for more info: https://github.com/joeiddon/perlin'''

import random, math

gradients = {}

def rand_vect():
    theta = random.random() * 2 * math.pi
    return {'x': math.cos(theta), 'y': math.sin(theta)}

def dot_prod_grid(x, y, vx, vy):
    d_vect = {'x': x - vx, 'y': y -vy}
    if (vx, vy) in gradients:
        g_vect = gradients[(vx, vy)]
    else:
        g_vect = rand_vect()
        gradients[(vx, vy)] = g_vect
    return d_vect['y'] * g_vect['x'] + d_vect['y'] * g_vect['y'];

def smootherstep(x):
    return 6*x**5 - 15*x**4 + 10*x**3

def interp(x, a, b):
    return a + smootherstep(x) * (b-a)

def seed():
    global gradients
    gradients = {}

def get(x, y):
    xf = math.floor(x)
    yf = math.floor(y)
    tl = dot_prod_grid(x, y, xf,   yf)
    tr = dot_prod_grid(x, y, xf+1, yf)
    bl = dot_prod_grid(x, y, xf,   yf+1)
    br = dot_prod_grid(x, y, xf+1, yf+1)
    xt = interp(x-xf, tl, tr)
    xb = interp(x-xf, bl, br)
    return interp(y-yf, xt, xb)

seed()
