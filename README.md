# Ascension

Simulateur de carrière en Private Equity. Le joueur incarne un employé qui gravit les échelons
d'une PE fictive (Carl Capital) au Canada, de Analyste à Partner, en résolvant des cas pratiques
réalistes, en gérant un portefeuille d'acquisitions, et en évoluant dans un marché concurrentiel
de 20 fonds.

## Stack

- Vite + React 19
- Tailwind CSS v4
- lucide-react (icônes)
- Persistance : `localStorage` (un seul joueur, un seul appareil)

## Structure

```
src/
  data/        données statiques du jeu (rangs, firmes, scénarios, acquisitions, glossaire...)
  lib/         utilitaires (formatage, calculs de rang, persistance localStorage)
  components/  composants d'UI, un fichier par onglet sous components/tabs/
  App.jsx      état du jeu et logique métier
```

## Démarrer

```
npm install
npm run dev
```

## Build

```
npm run build
```

## Roadmap

Voir le brief de développement pour la feuille de route complète (risques cachés post-acquisition,
deal committee, réputation, due diligence, levier/covenants, buy-and-build, compétences, levée de
fonds LP).

La Priorité 1 (risques cachés post-acquisition) est implémentée : chaque cible du marché des
acquisitions porte un risque caché non visible dans sa fiche financière ; une fois investie
(rang Vice-Président et plus), un risque peut se matérialiser après un délai de quelques
trimestres, avec un impact sur la valeur de la participation et sur le score de la firme. Une
proposition d'investissement disciplinée réduit la probabilité du risque sans jamais l'annuler.
