# Fangyi’s portfolio · style guide
The homepage has a white canvas, navy type and a handwritten voice for personal details. The CUTgroup case study uses a quieter off-white background, blue highlights and a narrower reading column. Both pages load style.css; the homepage loads homepage.css afterward, so its more specific rules take precedence.

## Palette
| Use | Color |
|---|---|
| Homepage background / primary ink | #FFFFFF / #013A63 |
| Homepage nav / degree and interests | #4A6FA5 / #4F6D7A |
| Shared paper / ink / secondary text | #FAF9F7 / #233D50 / #526B7B |
| Project art, contact panel and impact highlight | #DFEDFA |
| Shared dividers / interactive accent | #CFDFEB / #325F83 |
| Research placeholders: background / dashed border | #F0F6FC / #9BB7CE |

## Type
| Element | Desktop specification |
|---|---|
| Homepage name / navigation | Gaegu 700 40px / Gaegu 400 24px. Nav links become 700 on hover or keyboard focus. |
| Homepage headline | Lato 700, 64px with 70px line height |
| “I ask why…” introduction | Lato 400, 24px / 45px; inline question words switch to Gaegu |
| Degree and interests | Gaegu 400, 24px, normal line height |
| Case-study name / nav / shared footer | Gaegu 700 34px / Gaegu 400 23px / Gaegu 400 20px |
| Case-study title / section headings / finding headings | Lato 700; title scales from 40–62px, section headings 32px, findings 21px |
| Shared body / secondary body | Lato 400, 17px / 170%; secondary text uses the muted color |
| Project card heading / numbers | Lato 700, 36px / 52px |
| Case-study lead / quotations | Lato 400, 20px / 24px respectively |
| Project overview | Labels 13px; values 15px / 145%; role 20px bold, impact 17px bold |
| Captions / sidebar / table | 13px / 14px / 16px respectively |

## Layout and responsive behavior
- Homepage: centered 1280px wrapper; desktop horizontal padding 61px left and 40px right. Header height 66px. The hero is a flex column at least one small viewport tall minus the header. The bio uses an automatic top margin and 32px bottom padding; content can grow on short screens.
- At 1000px or narrower: headline becomes 54px, side padding 32px, cloud 290px. At 600px or narrower: headline 42px, intro 20px, side padding 24px, cloud 210px and nav 21px.
- Shared case-study wrapper: 1120px maximum width, 44px side padding. The desktop reading grid pairs a 185px sticky contents column with an article up to 770px wide.
- At 760px or narrower, project and case-study grids stack, the contents list becomes inline, and the overview uses two columns. At 420px or narrower, overview values and case-study navigation use smaller type. Use the overrides at the end of the CSS files when checking effective values.

## Thought-bubble interaction
- One 368px desktop button holds the cloud, two fixed tail dots, and a stack of six decoded illustrations. The two inline question bubbles are 76px, mirrored horizontally, at 80% opacity; their dots are clipped.
- At rest, a new illustration appears every 5 seconds with a 1.5-second opacity crossfade. Hover entry requests a change; click, tap and keyboard activation can also advance. Active fades are guarded against interruption.
- Only the cloud shell follows pointer movement, with stretch capped at 3.5%. On a brush it fades to 70% opacity over 450ms. The dots and interior artwork keep their shape and position.
- Reduced-motion mode stops automatic cycling and disables stretch and fade transitions. A hidden document stops the rotation timer.
- In homepage.css, .thought-shell and .thought-dots clip complementary regions of the same PNG. If replacing the bubble silhouette, check both clips and the .thought-images inset.

## Before publishing an edit
Check the homepage at a wide and a phone-sized width. Tab through the header links and bubble button; verify resume, LinkedIn, case-study navigation and return links. Check that the bio clears the intro and that research images keep readable captions.
