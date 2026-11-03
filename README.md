# LA-Code portfolio

Personal portfolio for Lawal Oluwafemi, a frontend developer and web designer. Built with HTML, CSS, JavaScript and Bootstrap.

## Explore

- `index.html`: introduction and selected projects.
- `about.html`: background, toolkit and learning focus.
- `work.html`: contributions, walkthroughs, live demos and source links.
- `services.html`: services.
- `contact.html`: email and social links. The enquiry form opens the visitor's email application; it has no backend.

Selected projects: [Fancy Lips](https://github.com/La-Pheme456/Fancy-lips), [Phemcard](https://github.com/La-Pheme456/phemcard), [Ember's Delight](https://github.com/La-Pheme456/Ember-s-Delight) and [Ace VOUGE](https://github.com/La-Pheme456/ace-vouge-website).

## Development

Install Node.js 22.13 or later, then run:

```sh
npm ci
npm start
```

Open http://127.0.0.1:4173. There is no production build step. Run one repository's preview at a time because both development servers use port 4173. Fonts and framework styles load from external CDNs.

## Verification

```sh
npm run check
npx playwright install chromium
npm run test:browser
```

The checks run ESLint, structural HTML validation, local page/asset/fragment checks and Node tests. Playwright exercises interactions in Chromium. GitHub Actions runs the same checks on pushes and pull requests and uploads failure artifacts. External demo availability requires a separate live check.

Use small pull requests describing the visible change with screenshots and check results. Prefer descriptive commits such as `Fix project demo links` over `Update website`.

## Design and testing scope

The About page reuses the existing navigation, profile rail, theme and footer. Closed mobile navigation is excluded from keyboard order. Reduced motion disables decorative CSS and JavaScript effects; changing that preference reloads the page to clean up running effects.

Node tests verify page landmarks. Browser tests cover desktop/mobile navigation, About content, keyboard menu controls and reduced motion.

The Ace VOUGE demo was checked on November 2, 2026: https://ace-vouge-website.vercel.app/ returned 200; the previous Toheeb destination returned DEPLOYMENT_NOT_FOUND.

## Content to supply

The About page uses only information already in this repository. A résumé, employment history and measured performance results have not been supplied and are not invented. Add a real résumé when available. Record future accessibility/performance measurements with the tested URL, viewport and date.

The development-tool lockfile overrides minimatch to the patched 11.x release to address the glob amplification advisory reported by npm audit. Lint, HTML and browser checks verify the tooling with this override.
