# 🏄 Surf the Web

StumbleUpon, but make it beachy. Hit **Catch a wave** and a lil surfer rides a big curling wave across your screen to drop you somewhere random, weird and wonderful on the internet.

## Features

- **Wave transitions**: a wave rolls in, the surfer rides it while the next site loads underneath, then it rolls off to show the new page
- **Breaks (categories)**: Toys, Games, Chill, Science, Art, Music, Travel, Weird
- **Quiver**: hit 🤙 to save sites you love (stored in your browser)
- **Postcards**: sites that refuse to load in an iframe show a postcard with a "Ride it ↗" link instead. If a site stays blank, hit **Wiped out** and it'll use a postcard from then on
- **Shareable waves**: the URL hash holds the current site, so you can send someone straight to it
- **Keyboard**: `Space`/`→` next wave · `←` previous · `S` save · `Esc` close the quiver
- Respects `prefers-reduced-motion`

## Run it

It's plain HTML/CSS/JS with no build step:

```sh
cd surf
python3 -m http.server 8000
# open http://localhost:8000
```

Deploy anywhere that serves static files (GitHub Pages, Vercel, Netlify…).

## Adding sites

Add entries to `sites.js`:

```js
{ url: "https://example.com/", title: "Example", blurb: "One line of stoke.", tags: ["toys"] },
```

Add `frame: false` for sites that block embedding (their `X-Frame-Options` / CSP `frame-ancestors` headers forbid it).
