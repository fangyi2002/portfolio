# Fangyi Li · UX Research Portfolio
This is the complete editable source of portfolio version 25 (commit d667287). The HTML, CSS, JavaScript, artwork and resume match the saved site. No npm install, build step, database or framework is required.

## Preview on your computer
1. Unzip the entire folder, then open it as a folder in your code editor.
2. Open a terminal in the folder containing this README and run:
   `python3 -m http.server 8000 --bind 127.0.0.1 --directory dist`
3. Visit http://localhost:8000/ for the homepage or http://localhost:8000/cutgroup.html for the case study. Save your edits and refresh the browser. Press Ctrl+C in the terminal to stop.

The site loads Lato and Gaegu from Google Fonts; offline it uses fallback fonts. To preview without Python, you can also open dist/index.html directly.

## Which file should I edit?
| Change | File or location |
|---|---|
| Introduction, selected work, contact section | dist/index.html |
| Case-study story, findings, sidebar and image placeholders | dist/cutgroup.html |
| Header/footer on both pages | Edit the header/footer markup in both HTML files; they are separate copies. |
| Shared typography, palette and case-study layout | dist/style.css |
| Homepage layout, responsive sizes and visual effects | dist/homepage.css |
| Image rotation, hover response and reduced-motion behavior | dist/bubble.js |
| Resume | Replace dist/assets/Fangyi-Li-Resume.pdf with the same filename, or change its href in both headers. |
| Bubble and illustrations | dist/assets/ (transparent PNG files) |

The HTML and some CSS rules are compact in the original. Use your editor’s Format Document command if you prefer expanded indentation. See STYLE-GUIDE.md for the design details.

## Common edits
- **Add a project:** duplicate the project entry under Selected work in index.html. Copy cutgroup.html to a new filename, replace the content and section IDs, update the sidebar anchors, and point the homepage card at the new file.
- **Add an illustration:** place a transparent PNG in assets and add its basename (without .png) to the files list in bubble.js. Keep the artwork centered with transparent margins for consistent scale.
- **Replace a research placeholder:** in cutgroup.html replace the relevant .visual block with a figure containing an image, meaningful alt text and a caption. Keep its image in assets and use a relative path.
- **Change the crossfade:** update the opacity transition in homepage.css AND its duration guards in bubble.js. The interval should exceed the full fade time.

## Publish independently
Upload the contents of dist/ to the document root of a static host so that index.html and assets/ are at the same level. For a folder-based hosting workflow, select dist as the publish directory and leave the build command empty. For GitHub Pages, one option is to copy the contents of dist to the root of your Pages publishing branch. Test the case-study link and resume after publishing. Editing this download does not update the existing Sites URL automatically.

.openai/hosting.json records the original Sites project; other hosts do not need it. Keep the README and guide alongside dist as working documents.
