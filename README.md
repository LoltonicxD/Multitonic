# Multitonic

Application de bureau Electron qui regroupe le lanceur Multitonic, TempTaff et regieHM.

## Utilisation

1. Installez [Node.js 20](https://nodejs.org/).
2. À la racine du dépôt, exécutez `npm install`.
3. Lancez l’application avec `npm start`.

Les projets se trouvent dans `src/projects`. Pour en ajouter un, ajoutez ses fichiers puis une entrée `id`, `name` et `file` au tableau `projects` dans `main.js`.

Les icônes de l’application sont générées par le workflow de build.

## Créer l’installeur Windows

GitHub Actions construit l’installeur à la demande (onglet **Actions**, workflow **Build Windows installer**, bouton **Run workflow**) et à chaque push d’une étiquette `v*`. Une étiquette publiée déclenche une release GitHub contenant `Multitonic-Setup.exe`.

En local, sur Windows : `npx electron-builder --win --publish never`.
