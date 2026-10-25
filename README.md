# Reflection

One deep question a day, at a time you choose.

You don't answer in the app — you answer in a paper notebook. No account, no
sign-in, no answers stored anywhere. Just you, a pen, the paper, and your
thoughts.

- **A question a day.** A new one each day, drawn so you don't repeat until
  you've worked through every one.
- **Nothing to scroll.** A single quiet screen. The question, and the nudge to
  pick up your pen.
- **A time you choose.** Pick a time and the app hands you a recurring
  calendar reminder — it lives in your own calendar, not here.
- **Nothing saved.** Your reflections never touch the app. The only thing kept
  on your device is which questions you've already seen, so you don't repeat.

It's plain HTML, CSS and JavaScript — no build step, no dependencies, no
backend. That's what makes "nothing saved" honest.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Host it free on GitHub Pages

1. Create a new repository on GitHub (e.g. `reflection`).
2. Push this folder to it:

   ```bash
   git remote add origin https://github.com/<your-username>/reflection.git
   git branch -M main
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment**. Set **Source** to
   *Deploy from a branch*, pick **main** / **/ (root)**, and save.
4. After a minute it's live at
   `https://<your-username>.github.io/reflection/`.

The `.nojekyll` file tells GitHub Pages to serve the files as-is.

## Writing your own questions

All questions live in [`js/questions.js`](js/questions.js) as a list of
`{ category, text }`. Add, remove, or reword freely — the app picks up whatever
is in the list. Each one is written to resist a one-word answer: it asks you to
describe, trace, or reckon with something, not just name it.

## License

MIT — see [`LICENSE`](LICENSE).
