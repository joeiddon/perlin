perlin.js
=========

#### A JavaScript Perlin Noise Generator

This short js library allows you to easily incorporate <a href='https://en.wikipedia.org/wiki/Perlin_noise'>perlin noise</a> into your projects.

---

### Python

Note that I have also translated the js code into Python, but I have not written any documentation as this library will mainly be used in js.

---

### Installation

Simply include the source in your application's HTML, no downloading required:

```html
<script src='http://joeiddon.github.io/perlin/perlin.js'></script>
```

or you can use the, slightly shorter, `git.io` redirect:

```html
<script src='http://git.io/perlin.js'></script>
```

---

### Usage

There are 2 main functions that are provided: `perlin.seed` and `perlin.get`.

The `perlin.get` function has the format:

```javascript
perlin.get(x, y)
```
where `x` and `y` are floating point numbers.

The function will return a float in the range `-1.0` to `1.0` representing the 'noise-intensity' at that point. As for the scale, the coordinate system is setup as a grid with vertexes at integer coordinates. These vertexes are the peaks and troughs of the noise. All floating point coordinates between inside cells will give smoothly interpolated values between.

All that `perlin.seed()` does (to be called with no arguments), is reset the stored noise so that you can generate fresh noise. On each reload of the library, this will be reset anyway, and if you were to just offset all your `perlin.get` calls away from your previous calls, you would achieve the same effect of generating new noise. However, by doing this, you are of course sacrificing some memory as the previous noise remains saved (this is negligible, but is something to bare in mind).

---

### Examples

I created a basic example of the noise being generated which you can see its source in this GitHub repository. The demo creates the most basic display of noise, but I added a heatmap-style effect to it (using the hsl() colour format) which makes the result clearer. You can view it in action <a href='http://joeiddon.github.io/perlin/demo'>here</a>.

Obviously that demo is the most basic use of the library. Feel free to browse <a href='http://joeiddon.github.io'>my website</a> to see some other uses.
