# Multitonic

Application de bureau Electron dédiée au lanceur Multitonic et à TempTaff.

## Utilisation

1. Installez [Node.js 20](https://nodejs.org/).
2. À la racine du dépôt, exécutez `npm install`.
3. Lancez l’application avec `npm start`.

TempTaff se trouve dans `src/projects/TempTaff/index.html`.

## Authentification TempTaff

TempTaff utilise Firebase Authentication avec e-mail et mot de passe. Activez le fournisseur **E-mail/Mot de passe** dans Firebase Console pour le projet configuré dans la page TempTaff. Le flux prend en charge la création d’un compte, la connexion et la déconnexion. Les données Firestore de l’application sont indexées par UID Firebase. Les comptes PIN existants ne sont pas convertis automatiquement.

## Créer l’installeur Windows

Sur Windows, exécutez `npx electron-builder --win --publish never`. L’installeur NSIS `dist/Multitonic-Setup.exe` permet de choisir le dossier d’installation et crée des raccourcis Bureau et menu Démarrer.

GitHub Actions construit l’installeur à la demande (onglet **Actions**, workflow **Build Windows installer**) et à chaque push d’une étiquette `v*`. Une étiquette publiée déclenche une release GitHub contenant l’installeur.
