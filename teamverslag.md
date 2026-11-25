# Teamverslag – Berlijnse Tovernaars

## Team
| Naam | Git-gebruikersnaam | Ontwerptool | Onderdeel (dag 2) |
| --- | --- | --- | --- |
| Valerio | valeriooooooo | Claude Artifacts (Anthropic) | Basisstructuur en layout + slideshow |
| Jop | *(invullen)* | Claude Artifacts, variant B *(zie opmerking bij overleg 1)* | Omschrijving, motivatie en praktische informatie + route en kaart |

## Teamafspraken
1. **Afwezig of niet af?** Wie afwezig is of zijn deel niet af heeft, meldt dat vóór het begin van de les in de groepsapp en zegt wanneer het wel af is. De ander neemt het alleen over als dat is afgesproken.
2. **Oneens?** We zetten de keuze naast de criteria uit de opdracht (doelgroep CSD, open 2–5 nov, bereikbaarheid, kosten, beeldmateriaal). Komen we er dan nog niet uit, dan beslist de gespreksleider van dat overleg en schrijven we op waarom.
3. **Git:** iedereen werkt zoveel mogelijk in zijn eigen bestanden. Altijd eerst `git pull` en dan pas `git push`. Commitberichten zeggen in het Nederlands wat je hebt gedaan. Aan het einde van elke les pusht iedereen.
4. **Taal en stijl:** de teksten op de website schrijven we zelf, in het Nederlands. Elke bron die we gebruiken komt direct in de bronvermelding.

---

## Dag 1 – Teamstart
**Gespreksleider:** Valerio
**Notulist:** Jop
**Aanwezig:** Valerio, Jop

**Gekozen groepsnaam en waarom:**
**Berlijnse Tovernaars.** Valerio stelde "Berlijnse Tovernaars" voor, Jop stelde "Code Kraut" voor. We kozen voor Berlijnse Tovernaars omdat de naam grappig en makkelijk te onthouden is. Het past ook bij ons vak: met een paar regels code "tover" je een pagina tevoorschijn. Repository: `berlijn-opdracht`.

---

## Dag 1 – Overleg 1: locatie kiezen
**Gespreksleider:** Jop
**Notulist:** Valerio
**Aanwezig:** Valerio, Jop

**Welke locatie kiezen we?**
**Het Computerspielemuseum Berlin** (Karl-Marx-Allee 93a).

**Waarom? (per criterium)**
- **Interessant voor CSD-studenten:** Het museum gaat over de geschiedenis van interactieve software en hardware. Je kunt er klassiekers spelen, van *Pong* tot de *PainStation*. Van alle opties sluit het het best aan bij een softwareopleiding, en ook voor XR- en GD-studenten (interactie, game-art) is het leuk.
- **Open tussen 2 en 5 november:** Ja, het museum is elke dag open van 10:00 tot 20:00 uur. Het is de enige binnenlocatie op ons lijstje die alle vier dagen open is én 's avonds tot 20:00 open blijft.
- **Bereikbaar vanaf het hotel:** Ja, ca. 4 km en ongeveer 25 minuten met S-Bahn + U5, met één keer overstappen op Alexanderplatz.
- **Betaalbaar:** € 8 met studentenkaart. Dat is iets duurder dan de gratis opties, maar goedkoper dan Hamburger Bahnhof.
- **Genoeg informatie en beeldmateriaal:** Ja, de officiële website heeft alle info en op Wikimedia Commons staan tientallen foto's met een vrije licentie.

**Welke locaties zijn afgevallen, en waarom?**
- **East Side Gallery** (Valerio): gratis en altijd open, maar het past minder bij CSD. Veel groepjes in de categorie geschiedenis kiezen dit waarschijnlijk ook.
- **Futurium** (Jop): gratis en dichtbij, maar **dicht op dinsdag 3 november**. Het gaat ook meer over wetenschap dan over kunst en cultuur.
- **Hamburger Bahnhof** (Jop): mooie mediakunst, maar **dicht op maandag 2 november** en met € 8 studententarief niet goedkoper. Voor CSD-studenten is het minder herkenbaar dan games.

**Wie gebruikt welke ontwerptool?**
- Valerio: Claude Artifacts
- Jop: v0 (Vercel) was gepland. Het ontwerp in `ontwerpen/` is voorlopig een tweede variant uit Claude, omdat het v0-ontwerp nog niet geëxporteerd is. *(Jop: vervang `ontwerpen/jop-ontwerp-b.png` door je eigen v0-export en pas dit aan.)*

---

## Dag 1 – Overleg 2: ontwerp en tool
**Gespreksleider:** Valerio
**Notulist:** Jop
**Aanwezig:** Valerio, Jop

**Welk ontwerp kiezen we, en waarom?**
We kiezen **ontwerp A (Valerio, "Berlijnse stijl")**: een lichte betonachtergrond met blokken als geplakte affiches. De kleuren komen uit de stad zelf: rood-wit-rood van de Berlijnse vlag, zwart en BVG-geel van de OV-borden, en groen (S-Bahn) en bruin (U5) voor de route. De koppen staan in een smal hoofdletterfont (Bebas Neue), zoals op affiches en stationsborden. Waarom:
- Het geheel is een pagina in een gezamenlijke **Berlijn**-website. Met deze stijl voel je meteen dat het over Berlijn gaat en past de pagina bij die van de andere groepjes. Een "game-stijl" zou alleen bij het museum passen, niet bij de stad.
- De route ziet eruit als een lijnenkaart met echte S- en U5-badges, zodat je in Berlijn dezelfde kleuren en borden herkent.
- Het is mobile-first ontworpen: één kolom en grote knoppen voor de slideshow, die je ook met je duim kunt bedienen.
- De praktische info staat bovenaan op een zwart-geel "vertrekbord" (adres, open, prijs, reistijd), zodat je in Berlijn snel ziet wat je moet weten.

Uit ontwerp B nemen we over: de **routestappen als genummerde lijst met icoontjes** en de "tip"-blokjes.

**Welke tool kiezen we, en waarom?**
**Claude Artifacts.** De tool levert direct werkende HTML/CSS/JS die we in de browser kunnen testen. De code lijkt op wat wij zelf schrijven (geen React/Tailwind zoals bij v0), dus we kunnen het ontwerp makkelijk zelf nabouwen in gewone HTML, CSS en JavaScript, zoals de opdracht eist. Nadeel: je moet goed nakijken of de gegenereerde tekst klopt. Prijzen en openingstijden hebben we daarom zelf op de officiële site gecontroleerd.

---

## Dag 2 – Taakverdeling en afbeeldingen
**Gespreksleider:** Jop
**Notulist:** Valerio
**Aanwezig:** Valerio, Jop

**Wie doet welk onderdeel?**
Omdat we maar met twee zijn, hebben we de vijf onderdelen samengevoegd tot twee pakketten:
| Onderdeel | Wie |
| --- | --- |
| Basisstructuur en layout (HTML-structuur, responsive CSS, kleuren, lettertypes) | Valerio |
| Slideshow (zelf geprogrammeerd in JavaScript) | Valerio |
| Omschrijving en motivatie (eigen woorden + bronnen) | Jop |
| Praktische informatie (adres, openingstijden, kosten) | Jop |
| Route en interactieve kaart (Leaflet + OpenStreetMap) | Jop |

**Hoe hebben we de afbeeldingen op elkaar afgestemd?**
- **Bron/licentie:** alleen foto's van Wikimedia Commons met een vrije licentie (CC BY, CC BY-SA). Per foto noteren we maker en licentie in `onderzoek/` en op de pagina.
- **Verhouding:** alles liggend en bijgesneden tot **3:2 (1200 × 800 px)**, zodat de slideshow niet verspringt. Staande foto's (Space Invaders, Pole Position) vielen daarom af.
- **Kleur/stijl:** we kozen foto's met veel kleur: de lime-groene vitrines, de oranje woonkamers en het rode licht van de PainStation. Die vormen een levendig contrast met de rustige beton-, zwart- en roodtinten van het ontwerp. Bijna alle foto's komen van binnen het museum, met één buitenfoto als opening.
- **Kwaliteit en web:** scherpe originelen van minimaal 2000 px, verkleind en gecomprimeerd tot **75–275 KB per stuk** (max. 300 KB).
- **Volgorde:** eerst buiten, dan de woonkamers (jaren 70 → 80), dan de PainStation, de Wall of Hardware en losse klassiekers. Zo "loop" je als het ware door het museum.

**Stand-up: waar liepen we tegenaan, en wat hebben we afgesproken?**
- Valerio: de slideshow sprong bij afbeeldingen met een andere hoogte. **Afspraak:** alle foto's 3:2 bijsnijden (zie hierboven) en `aspect-ratio` in CSS gebruiken.
- Jop: de exacte reistijd verschilt per routeplanner (22–28 min). **Afspraak:** we noemen "ca. 25 minuten" en geven de tijd per stap.
- Wikimedia gaf soms een fout bij te veel downloads achter elkaar. Rustig één voor één downloaden werkte wel.

---

## Dag 3 – Presentatie en feedback
**Welke feedback kregen we?**
*(Notulist: vul hier de feedback in die jullie tijdens de presentatie krijgen.)*
- 
- 

**Wat hebben we daarmee gedaan?**
- 
