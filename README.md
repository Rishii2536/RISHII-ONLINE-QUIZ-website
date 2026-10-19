# QuizSpark — Online Quiz Website

A beginner-friendly BCA college project made with HTML, CSS and vanilla JavaScript.

## Files
- `index.html` — page structure
- `style.css` — colors, layout and responsive design
- `script.js` — quiz questions, answer checking, score and review

## Run on your computer
1. Extract the ZIP file.
2. Open the `online_quiz_website` folder in Visual Studio Code.
3. Open `index.html` in your browser. You can also use the Live Server extension in VS Code.

## Publish free with GitHub Pages
1. Sign in to GitHub and create a **public** repository, for example `online-quiz-website`.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under the build/deployment source, select **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then save.
6. Wait for GitHub Pages to deploy. The public URL usually looks like:
   `https://YOUR-USERNAME.github.io/online-quiz-website/`

GitHub Pages free hosting works for static websites. This project does not require a backend or paid API.

## Customize
Edit the `questions` array near the top of `script.js`. Each question has:
- `question`: the question text
- `options`: four choices
- `answer`: the correct option's zero-based index (0 = first option)
- `explanation`: explanation shown after answering

## Important limitation
Scores are calculated in the visitor's browser and are not sent to a database. There are no accounts or shared leaderboards in this version.
