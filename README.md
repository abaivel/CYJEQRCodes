# CYJE QR Codes

## Introduction
CYJE QR Codes est le site web de tracking de QR Codes de CY Junior Engineering. Ce site web vous permet de créer des QR Codes, de les télécharger et de consulter leurs statistiques de visites.

## Prérequis techniques
- Python (>= 3.10) : https://www.python.org/downloads/ 
- Node.js (>= 18) : https://nodejs.org/fr/download 
- Git : https://git-scm.com/downloads 
- Visual Studio Code (optionnel mais recommandé)

## Installation
### Dépôt Github

Clonez ce dépôt pour récupérer le code et pour faire fonctionner le projet localement
Le projet contient deux dossiers représentant :
- le frontend développé en React, un framework en Javascript
- le backend développé en Django, un framework en Python

### Installations nécessaires
Pour faire fonctionner le site web localement, quelques installations sont nécessaires. Pour cela, ouvrez le terminal de votre ordinateur. Si vous utilisez Visual Studio Code, vous pouvez utiliser le terminal de l’application.
#### Pour le backend
Dans le terminal, placez-vous dans le dossier “backend” du projet grâce à la commande “cd”.

Installation de Django  
`pip install django`

Installation de Django Rest Framework et django-cors-headers  
`pip install djangorestframework django-cors-headers`

#### Pour le frontend
Dans le terminal, placez-vous dans le dossier “frontend” du projet grâce à la commande “cd”.

Installation des dépendances  
`npm install`

Installation de React Router  
`npm install react-router-dom`

Installation de Material UI  
`npm install @mui/material @emotion/react @emotion/styled @mui/x-data-grid @mui/x-charts @mui/icons-material`

Installation de QR Code React  
`npm install qrcode.react`

Installation de React-Color  
`npm install react-color`

## Fonctionnement
### Démarrage du backend
Dans un premier terminal, placez vous dans le dossier “backend” du projet grâce à la commande “cd”.

Avant le premier démarrage  
`python manage.py migrate`

Pour créer le premier utilisateur
La base de données dans le dépôt est vide donc il faut créer le premier utilisateur, qui sera un “superuser”. Celui-ci aura accès à l’interface administrateur fourni par Django à l’URL “/admin”. 
Pour créer cet utilisateur, tapez cette commande :  
`python manage.py createsuperuser`  
Ensuite, suivez les instructions en entrant un nom d’utilisateur, une adresse email et un mot de passe. Pour que le site marche correctement, mettez la même chose pour le nom d’utilisateur et l’adresse email.

Pour démarrer le serveur  
`python manage.py runserver`

### Démarrage du frontend
Dans un deuxième terminal, placez vous dans le dossier “frontend” du projet grâce à la commande “cd”.

Pour démarrer le site web  
`npm start`

### Vérification des ports utilisés
Le frontend devrait utiliser le port 3000 et le backend devrait utiliser le port 8000. Si ce n’est pas le cas, suivez ces instructions : 
- Dans le dossier “backend/backend”, trouvez le fichier “settings.py” et modifiez les numéros de port aux endroits correspondants
- Dans le dossier “frontend”, trouvez le fichier “package.json” et changez le numéro de port.

### Variables d’environnement
Certaines variables d’environnement sont nécessaires pour le bon fonctionnement du site web et ne sont pas incluses dans le dépôt pour des raisons de sécurité. 
En effet, pour l’envoi de mail, des informations sur la boite mail d’envoi sont nécessaires comme l’adresse mail et le mot de passe. Tout cela se définit dans le fichier “backend/backend/settings.py”. Les variables à renseigner sont en bas du fichier et ne doivent surtout pas être mises sur le dépôt.

## Architecture technique
### Architecture du frontend
Dans le frontend en React, les éléments du dossier “src” sont séparés en 6 dossiers : 
- Pages : ce dossier contient le code des pages
- Components : ce dossier contient le code des composants, principalement des fenêtres de dialogues
- Layout : ce dossier contient les différents layouts possibles, un sans le header et un avec le header
- Style : ce dossier contient les fichiers css définissant le style
- Assets : ce dossier contient les images et les polices de caractères
- Utils : ce dossier contient les fonctions pouvant être utilisées par plusieurs fichiers, comme la fonction pour récupérer les cookies

### Architecture du backend
L’architecture du backend suit l’architecture classique d’une API en Django utilisant Django Rest Framework. Les fichiers importants sont : 
- urls.py : ce fichier contient les urls de l’API
- models.py : ce fichier contient les classes définissant la base de données
- views.py : ce fichier contient les vues, c’est-à-dire les fonctions de l’API
- serializers.py : ce fichier contient les serialisers permettant de définir le format des objets reçus et envoyés par l’API
