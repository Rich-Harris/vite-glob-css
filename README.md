# vite-glob-css

Repro for what I _think_ is a bug in Vite's handling of glob imports.

This app has three entry points — `src/a.js`, `src/b.js` and `src/c.js`. Two of those entry points import a module, `stuff.js`, which imports some asset URLs using `import.meta.glob`. Importantly, one of these assets is a `.css` file.

Running `vite build` produces a `dist` folder containing a `.vite/manifest.json` file, along with the entry points (`a`, `b` and `c`), the shared chunks (`stuff.js`) and the assets (`styles.css` and `text.txt`).

```json
{
  "/path/to/project/src/stuff/styles.css": {
    "file": "assets/styles.css",
    "src": "/path/to/project/src/stuff/styles.css"
  },
  "_stuff.js": {
    "file": "chunks/stuff.js",
    "name": "stuff",
    "assets": [
      "assets/text.txt"
    ]
  },
  "src/a.js": {
    "file": "a.js",
    "name": "a",
    "src": "src/a.js",
    "isEntry": true,
    "imports": [
      "_stuff.js"
    ]
  },
  "src/b.js": {
    "file": "b.js",
    "name": "b",
    "src": "src/b.js",
    "isEntry": true,
    "imports": [
      "_stuff.js"
    ]
  },
  "src/c.js": {
    "file": "c.js",
    "name": "c",
    "src": "src/c.js",
    "isEntry": true
  },
  "src/stuff/text.txt": {
    "file": "assets/text.txt",
    "src": "src/stuff/text.txt"
  }
}
```

Here's the bug: it should be possible to know from the manifest which assets are imported by which entry points. For example, the `src/c.js` entry point has no `assets` and no `imports`. But both `src/a.js` and `src/b.js` import `_stuff.js`, and the `_stuff.js` chunk has an array of `assets` containing `assets/text.txt`, so we know that those entry points depend on that asset.

That array should also include `assets/styles.css`.

(As an aside, looking at the manifest it's clear that One Of These Things Is Not Like The Others. It seems like something... weird is going on with `.css` files in the manifest?)
