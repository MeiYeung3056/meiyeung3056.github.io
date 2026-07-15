# Personal Website

This repository contains a simple static personal website for internship applications and long-term career development.

## Structure

- `index.html`: Main website content.
- `styles.css`: Layout, typography, colors, and responsive design.
- `script.js`: Lightweight navigation behavior and dynamic footer year.
- `content.js`: Editable content file for profile, education, experience, projects, skills, and links.
- `assets/`: Resume PDF, profile photo, and other static assets.
- `Min_Yang_resume_overleaf/`: LaTeX source files for the resume.
- `build-resume.sh`: Builds the LaTeX resume and updates `assets/resume.pdf`.

## Local Preview

Open `index.html` directly in a browser, or serve the folder with a simple local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editing Website Content

Edit `content.js` to update the website content. You do not need to edit `index.html` for normal content changes.

Keep the quotation marks and commas in place. Replace the placeholder text inside quotation marks with your real content.

Before publishing, update:

- Name, tagline, and professional summary.
- Education and experience details.
- Project titles, descriptions, tools, outcomes, and links.
- Skills list.
- Email, GitHub, LinkedIn, and resume links.
- `assets/resume.pdf` with the current resume file.
- `profileImage` in `content.js` if you want to use a profile photo, such as `assets/profile.jpg`.

## Adding a Profile Photo

1. Put your photo in the `assets/` folder, for example `assets/profile.jpg`.
2. Open `content.js`.
3. Set `profileImage` to the file path:

```js
profileImage: "assets/profile.jpg"
```

If `profileImage` is empty, the homepage shows a simple photo placeholder.

## GitHub Pages Deployment

1. Create a GitHub repository.
2. Push these files to the `main` branch.
3. In GitHub, open the repository settings.
4. Go to Pages.
5. Set the source to deploy from the `main` branch and the root folder.
6. Save and wait for GitHub Pages to publish the site.

## Updating the Resume

Edit the LaTeX files in `Min_Yang_resume_overleaf/`. The entry point is `Min_Yang_resume_overleaf/main.tex`.

After editing the resume, run:

```bash
bash build-resume.sh
```

The script compiles the LaTeX resume and copies the latest PDF to `assets/resume.pdf`, which is the file linked by the website.
