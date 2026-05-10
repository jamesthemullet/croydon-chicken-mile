# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.ts >> nav links scroll to sections
- Location: e2e\homepage.spec.ts:15:1

# Error details

```
Error: expect(locator).toBeInViewport() failed

Locator: getByRole('heading', { name: 'The Mile' })
Expected: in viewport
Error: strict mode violation: getByRole('heading', { name: 'The Mile' }) resolved to 2 elements:
    1) <h2 class="section-title" data-astro-cid-j7pv25f6="">The Mile</h2> aka getByRole('heading', { name: 'The Mile', exact: true })
    2) <h2 data-astro-cid-j7pv25f6="">Find the Mile</h2> aka getByRole('heading', { name: 'Find the Mile' })

Call log:
  - Expect "toBeInViewport" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'The Mile' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]: 🍗 CCM
      - link "The Mile" [ref=e5] [cursor=pointer]:
        - /url: "#the-mile"
      - link "About" [ref=e6] [cursor=pointer]:
        - /url: "#about"
  - banner [ref=e7]:
    - generic [ref=e8]:
      - generic [ref=e9]:
        - paragraph [ref=e10]: Welcome to
        - heading "Croydon Chicken Mile" [level=1] [ref=e11]:
          - text: Croydon
          - text: Chicken
          - text: Mile
        - paragraph [ref=e12]:
          - text: The world's most underrated fried chicken destination.
          - text: Yeah, we said it.
        - link "Show Me The Birds →" [ref=e13] [cursor=pointer]:
          - /url: "#the-mile"
      - generic [ref=e14]:
        - img "A funky cartoon chicken" [ref=e15]
        - generic [ref=e48]:
          - text: I live here
          - text: and I'm
          - text: delicious.
    - generic [ref=e50]: 🍗 CROYDON · THE CHICKEN CAPITAL OF SOUTH LONDON · 🌶 SPICY · CRISPY · LEGENDARY · 🍗 CROYDON · THE CHICKEN CAPITAL OF SOUTH LONDON · 🌶 SPICY · CRISPY · LEGENDARY · 🍗 CROYDON · THE CHICKEN CAPITAL OF SOUTH LONDON · 🌶 SPICY · CRISPY · LEGENDARY ·
  - generic [ref=e53]:
    - generic [ref=e54]:
      - heading "A Love Letter to Croydon's Chicken Scene" [level=2] [ref=e55]
      - paragraph [ref=e56]: They built the Eiffel Tower in Paris. They put a big clock in London. Croydon? Croydon built a mile of the finest fried chicken establishments on the planet, and somehow nobody's written a guide.
      - paragraph [ref=e57]: Until now.
      - paragraph [ref=e58]: The Croydon Chicken Mile is not a Michelin star affair. It's better than that. It's a two-piece and chips at 11pm. It's the crunch you hear three tables over. It's the sauce that requires two napkins, minimum.
      - paragraph [ref=e59]: Come for the chicken. Stay because the tram home doesn't run until 6am anyway.
    - generic [ref=e60]:
      - generic [ref=e61]:
        - generic [ref=e62]: "16"
        - generic [ref=e63]: Chicken Shops
      - generic [ref=e64]:
        - generic [ref=e65]: "1"
        - generic [ref=e66]: Glorious Mile
      - generic [ref=e67]:
        - generic [ref=e68]: ∞
        - generic [ref=e69]: Napkins Required
      - generic [ref=e70]:
        - generic [ref=e71]: "0"
        - generic [ref=e72]: Regrets
  - generic [ref=e74]:
    - generic [ref=e75]:
      - heading "The Mile" [level=2] [ref=e76]
      - paragraph [ref=e77]: Your definitive guide to Croydon's finest chicken establishments. Rated in drumsticks, obviously.
      - paragraph [ref=e78]:
        - text: From BoxPark down through High Street — as defined by the Croydon Tourist Board. There are chicken shops elsewhere. This is
        - emphasis [ref=e79]: the
        - text: Mile.
      - generic [ref=e80]: 🍗🍗🍗🍗🍗 = Life changing 🍗🍗🍗 = Solid outing 🍗 = Still better than a salad
    - generic [ref=e81]:
      - article [ref=e82]:
        - img "Photo of Poor Boys @ BoxPark" [ref=e84]
        - generic [ref=e85]:
          - heading "Poor Boys @ BoxPark" [level=3] [ref=e86]
          - paragraph [ref=e87]: "\"New Orleans Eatery, Reimagined in Croydon\""
          - paragraph [ref=e88]:
            - strong [ref=e89]: "Known for:"
            - text: Chicken
          - paragraph [ref=e90]: 📍 99 George St, Croydon CR0 1LD
      - article [ref=e91]:
        - img "Photo of RAPS @ BoxPark" [ref=e93]
        - generic [ref=e94]:
          - heading "RAPS @ BoxPark" [level=3] [ref=e95]
          - paragraph [ref=e96]: "\"Built for fans of soul food who refuse to choose between health and indulgence.\""
          - paragraph [ref=e97]:
            - strong [ref=e98]: "Known for:"
            - text: Chicken
          - paragraph [ref=e99]: 📍 99 George St, Croydon CR0 1LD
      - article [ref=e100]:
        - generic [ref=e101]: 4am close on Fri/Sat
        - img "Photo of Sam's" [ref=e103]
        - generic [ref=e104]:
          - heading "Sam's" [level=3] [ref=e105]
          - paragraph [ref=e106]: "\"The home of great tasting chicken\""
          - paragraph [ref=e107]:
            - strong [ref=e108]: "Known for:"
            - text: Chicken
          - paragraph [ref=e109]: 📍 46 High St, Croydon CR0 1YB
      - article [ref=e110]:
        - img "Photo of Rio's Piri Piri" [ref=e112]
        - generic [ref=e113]:
          - heading "Rio's Piri Piri" [level=3] [ref=e114]
          - paragraph [ref=e115]: "\"Newly refurbed\""
          - paragraph [ref=e116]:
            - strong [ref=e117]: "Known for:"
            - text: Chicken
          - paragraph [ref=e118]: 📍 48 High St, Croydon CR0 1YB
      - article [ref=e119]:
        - generic "Photo of Dave's Hot Chicken" [ref=e121]:
          - generic [ref=e122]: 🍗
        - generic [ref=e123]:
          - heading "Dave's Hot Chicken" [level=3] [ref=e124]
          - paragraph [ref=e125]: "\"Upper class fried chicken\""
          - paragraph [ref=e126]:
            - strong [ref=e127]: "Known for:"
            - text: Chicken
          - paragraph [ref=e128]: 📍 7, 11 High St, Croydon CR0 1QB
      - article [ref=e129]:
        - generic "Photo of Pepe's" [ref=e131]:
          - generic [ref=e132]: 🍗
        - generic [ref=e133]:
          - heading "Pepe's" [level=3] [ref=e134]
          - paragraph [ref=e135]: "\"The home of fresh flame grilled chicken\""
          - paragraph [ref=e136]:
            - strong [ref=e137]: "Known for:"
            - text: Chicken
          - paragraph [ref=e138]: 📍 52 George St, Croydon CR0 1PD
      - article [ref=e139]:
        - generic "Photo of Popeyes" [ref=e141]:
          - generic [ref=e142]: 🍗
        - generic [ref=e143]:
          - heading "Popeyes" [level=3] [ref=e144]
          - paragraph [ref=e145]: "\"All the way from Louisiana...don't forget the cajun gravy\""
          - paragraph [ref=e146]:
            - strong [ref=e147]: "Known for:"
            - text: Chicken
          - paragraph [ref=e148]: 📍 43 George St, Croydon CR0 1LB
      - article [ref=e149]:
        - generic "Photo of Roosters Piri Piri Croydon" [ref=e151]:
          - generic [ref=e152]: 🍗
        - generic [ref=e153]:
          - heading "Roosters Piri Piri Croydon" [level=3] [ref=e154]
          - paragraph [ref=e155]: "\"Fresh, grilled and healthy\""
          - paragraph [ref=e156]:
            - strong [ref=e157]: "Known for:"
            - text: Chicken
          - paragraph [ref=e158]: 📍 Unit 13, Norfolk House, Wellesley Rd, Croydon CR0 1LH
      - article [ref=e159]:
        - generic "Photo of Chick'n Box" [ref=e161]:
          - generic [ref=e162]: 🍗
        - generic [ref=e163]:
          - heading "Chick'n Box" [level=3] [ref=e164]
          - paragraph [ref=e165]: "\"Hotter than your ex\""
          - paragraph [ref=e166]:
            - strong [ref=e167]: "Known for:"
            - text: Chicken
          - paragraph [ref=e168]: 📍 79 George St, Croydon CR0 1LD
      - article [ref=e169]:
        - generic "Photo of Chicken Valley Croydon" [ref=e171]:
          - generic [ref=e172]: 🍗
        - generic [ref=e173]:
          - heading "Chicken Valley Croydon" [level=3] [ref=e174]
          - paragraph [ref=e175]: "\"Joy in every bite\""
          - paragraph [ref=e176]:
            - strong [ref=e177]: "Known for:"
            - text: Chicken
          - paragraph [ref=e178]: 📍 100 High St, Croydon CR0 1ND
      - article [ref=e179]:
        - generic "Photo of Chicking Croydon" [ref=e181]:
          - generic [ref=e182]: 🍗
        - generic [ref=e183]:
          - heading "Chicking Croydon" [level=3] [ref=e184]
          - paragraph [ref=e185]: "\"It's my choice. It's my chicken.\""
          - paragraph [ref=e186]:
            - strong [ref=e187]: "Known for:"
            - text: Chicken
          - paragraph [ref=e188]: 📍 282 High St, Croydon CR0 1NG
      - article [ref=e189]:
        - generic "Photo of Rooster King - Croydon" [ref=e191]:
          - generic [ref=e192]: 🍗
        - generic [ref=e193]:
          - heading "Rooster King - Croydon" [level=3] [ref=e194]
          - paragraph [ref=e195]: "\"Sizzling taste.\""
          - paragraph [ref=e196]:
            - strong [ref=e197]: "Known for:"
            - text: Chicken
          - paragraph [ref=e198]: 📍 10 S End, Croydon CR0 1DL
      - article [ref=e199]:
        - generic "Photo of Southend Chick-Inn Peri Peri" [ref=e201]:
          - generic [ref=e202]: 🍗
        - generic [ref=e203]:
          - heading "Southend Chick-Inn Peri Peri" [level=3] [ref=e204]
          - paragraph [ref=e205]: "\"Chick -Inn. Peri - Peri.\""
          - paragraph [ref=e206]:
            - strong [ref=e207]: "Known for:"
            - text: Chicken
          - paragraph [ref=e208]: 📍 87 S End, Croydon CR0 1BG
      - article [ref=e209]:
        - generic "Photo of Perfect Fried Chicken - Croydon" [ref=e211]:
          - generic [ref=e212]: 🍗
        - generic [ref=e213]:
          - heading "Perfect Fried Chicken - Croydon" [level=3] [ref=e214]
          - paragraph [ref=e215]: "\"One of the OGs\""
          - paragraph [ref=e216]:
            - strong [ref=e217]: "Known for:"
            - text: Chicken
          - paragraph [ref=e218]: 📍 95a S End, Croydon CR0 1BG
      - article [ref=e219]:
        - generic "Photo of Chicken Tingz" [ref=e221]:
          - generic [ref=e222]: 🍗
        - generic [ref=e223]:
          - heading "Chicken Tingz" [level=3] [ref=e224]
          - paragraph [ref=e225]: "\"Things that are chicken\""
          - paragraph [ref=e226]:
            - strong [ref=e227]: "Known for:"
            - text: Chicken
          - paragraph [ref=e228]: 📍 123 S End, Croydon CR0 1BJ
      - article [ref=e229]:
        - generic "Photo of The Green Dragon" [ref=e231]:
          - generic [ref=e232]: 🍗
        - generic [ref=e233]:
          - heading "The Green Dragon" [level=3] [ref=e234]
          - paragraph [ref=e235]: "\"It's actually a really good pub, but guess what they sell?\""
          - paragraph [ref=e236]:
            - strong [ref=e237]: "Known for:"
            - text: Beer. Also chicken
          - paragraph [ref=e238]: 📍 58-60 High St, Croydon CR0 1NA
    - paragraph [ref=e239]: "* Restaurant details are placeholders — replace with real names, addresses, and opinions. No chickens were harmed in the making of this website. (Some were, however, delicious.)"
  - generic [ref=e241]:
    - heading "Find the Mile" [level=2] [ref=e242]
    - paragraph [ref=e243]: From BoxPark down through High Street. As defined by the Croydon Tourist Board.
    - generic [ref=e244]:
      - generic:
        - generic:
          - button "🍗" [ref=e245] [cursor=pointer]
          - button "🍗" [ref=e246] [cursor=pointer]
          - button "🍗" [ref=e247] [cursor=pointer]
          - button "🍗" [ref=e248] [cursor=pointer]
          - button "🍗" [ref=e249] [cursor=pointer]
          - button "🍗" [ref=e250] [cursor=pointer]
          - button "🍗" [ref=e251] [cursor=pointer]
          - button "🍗" [ref=e252] [cursor=pointer]
          - button "🍗" [ref=e253] [cursor=pointer]
          - button "🍗" [ref=e254] [cursor=pointer]
          - button "🍗" [ref=e255] [cursor=pointer]
          - button "🍗" [ref=e256] [cursor=pointer]
          - button "🍗" [ref=e257] [cursor=pointer]
          - button "🍗" [ref=e258] [cursor=pointer]
          - button "🍗" [ref=e259] [cursor=pointer]
          - button "🍗" [ref=e260] [cursor=pointer]
      - generic:
        - generic [ref=e261]:
          - button "Zoom in" [ref=e262] [cursor=pointer]: +
          - button "Zoom out" [ref=e263] [cursor=pointer]: −
        - generic [ref=e264]:
          - link "Leaflet" [ref=e265] [cursor=pointer]:
            - /url: https://leafletjs.com
            - img [ref=e266]
            - text: Leaflet
          - text: "| ©"
          - link "OpenStreetMap" [ref=e270] [cursor=pointer]:
            - /url: https://www.openstreetmap.org/copyright
          - text: contributors
  - contentinfo [ref=e271]:
    - generic [ref=e272]:
      - img "A funky cartoon chicken" [ref=e274]
      - generic [ref=e307]:
        - paragraph [ref=e308]: Croydon Chicken Mile
        - paragraph [ref=e309]: Made with 🍗 and genuine civic pride.
        - paragraph [ref=e310]: Not affiliated with any chicken. All opinions are the author's own and are delicious.
  - generic [ref=e313]:
    - button "Menu" [ref=e314]:
      - img [ref=e316]
      - generic: Menu
    - button "Inspect" [ref=e320]:
      - img [ref=e322]
      - generic: Inspect
    - button "Audit" [ref=e324]:
      - generic [ref=e325]:
        - img [ref=e326]
        - img [ref=e329]
      - generic: Audit
    - button "Settings" [ref=e332]:
      - img [ref=e334]
      - generic: Settings
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("page title is correct", async ({ page }) => {
  4  | 	await page.goto("/");
  5  | 	await expect(page).toHaveTitle("The Croydon Chicken Mile");
  6  | });
  7  | 
  8  | test("hero heading is visible", async ({ page }) => {
  9  | 	await page.goto("/");
  10 | 	await expect(page.getByRole("heading", { level: 1 })).toContainText(
  11 | 		"Croydon",
  12 | 	);
  13 | });
  14 | 
  15 | test("nav links scroll to sections", async ({ page }) => {
  16 | 	await page.goto("/");
  17 | 	await page.getByRole("link", { name: "The Mile" }).click();
> 18 | 	await expect(page.getByRole("heading", { name: "The Mile" })).toBeInViewport();
     |                                                                ^ Error: expect(locator).toBeInViewport() failed
  19 | });
  20 | 
  21 | test("restaurant cards are rendered", async ({ page }) => {
  22 | 	await page.goto("/");
  23 | 	const cards = page.locator("article.card");
  24 | 	await expect(cards).toHaveCount(16);
  25 | });
  26 | 
  27 | test("mile definition appears in The Mile section", async ({ page }) => {
  28 | 	await page.goto("/");
  29 | 	await expect(page.locator(".mile-definition")).toContainText("BoxPark");
  30 | 	await expect(page.locator(".mile-definition")).toContainText(
  31 | 		"Croydon Tourist Board",
  32 | 	);
  33 | });
  34 | 
```