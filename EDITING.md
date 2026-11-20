# How to edit your portfolio

Your site is three files in `C:\Users\user\Desktop\Portfolio`:

- **index.html** — all the words and content (your name, bio, projects, links).
- **styles.css** — the look (colours, fonts, spacing).
- **script.js** — the small interactions (clock, tabs, theme toggle). You rarely need this.

Open any of them in a text editor (VS Code is already on your PC). Edit, save, then **double-click index.html** to see your changes in the browser.

## Common edits

**Change the avatar emoji** — in `index.html`, find the line with `avatar-emoji` and change the emoji:
```html
<div class="avatar avatar-emoji" role="img" aria-label="Tatenda">🧑🏾‍💻</div>
```
Try `📊`, `👨🏾‍💻`, `🤓`, `📈`, `🧮`. To use your photo again, replace that whole `<div>` with:
```html
<img src="src/images/tatenda-avatar.jpg" alt="Tatenda" class="avatar">
```

**Change your name / tagline** — in `index.html`, search for `tatenda mukonoweshuro` and the `tagline` line just under it.

**Change a project** — search for the project's name in `index.html` and edit the text next to it. Pictures live in `src/images/`; drop a new image there and point the `src="..."` at it.

**Change the accent colour** — in `styles.css`, near the top, edit `--accent: #c0532b;` (light) and the `--accent` under `[data-theme="dark"]`.

## Publishing your changes (so the live site updates)

After saving, open PowerShell in the project folder and run:
```powershell
cd C:\Users\user\Desktop\Portfolio
git add -A
git commit -m "update portfolio"
git push
```
The live site at https://tatenda1112.github.io/portofolio/ updates in a couple of minutes. Do a hard refresh (Ctrl+F5) to see it.

**Tip:** whenever you change `styles.css` or `script.js`, also bump the version number in the two lines at the top/bottom of `index.html` (`?v=20261120c` → `?v=20261120d`), so browsers load the fresh files instead of an old cached copy.

Or just tell me what you want changed and I'll do it.
