SILVER STATE NOTARY CO. - NETLIFY SAME-PAGE FORM BUILD

The appointment form now submits to Netlify Forms with JavaScript/AJAX.

WHAT CHANGED
- No redirect after form submission.
- No success.html file.
- No /success/ folder.
- The page remains on the booking section.
- After Netlify accepts the POST, the form disappears.
- A branded Thank You panel appears in the same place.
- If submission fails, the form remains visible and displays a phone/email fallback.
- The Netlify form-name field and data-netlify attributes remain in the HTML so Netlify can detect the form during deployment.
- Honeypot spam protection remains enabled.

BUSINESS CONTACT
info@silverstatenc.com
702-389-1063

DEPLOYMENT
Upload/commit these files to the repository root:
- index.html
- styles.css
- script.js
- README.txt
- assets/

Delete any old success.html file and the old success/ directory from GitHub before redeploying.

AFTER DEPLOY
Submit one test request. The browser should remain on the same page. The form should disappear and be replaced by the Thank You message. Also confirm the submission appears in Netlify Forms.
