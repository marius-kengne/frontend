# frontend

## Description
Application web de gestion de tâches (Todo List) développée avec React, TypeScript, et Material-UI. Elle permet d'ajouter, modifier et supprimer des tâches avec des notifications de succès ou d'erreur pour améliorer l'expérience utilisateur.


## Décisions et choix techniques

- **react-toastify** : Permet d'afficher des notifications de manière simple et efficace pour informer l'utilisateur des actions réussies. Facile à utiliser
- **DialogActions** : Utilisation des popups pour ajouter une nouvelle tâche de manière intuitive.
- **Séparation des méthodes** : Les actions (ajout, modification, suppression) sont gérées dans des fonctions dédiées, ce qui facilite la maintenance et l'évolution du code.


## Fonctionnalités principales

- **Ajouter une tâche** : Ajoutez une nouvelle tâche via une popup avec validation.
- **Modifier une tâche** : Modifiez le nom d'une tâche existante en cliquant sur le champ de texte correspondant.
- **Supprimer une tâche** : Supprimez une tâche en cliquant sur le bouton "Delete".
- **Afficher le nombre total de tâches** : Le nombre total de tâches est affiché sous le titre principal.
- **Notifications de succès et d'erreur** : Affiche des messages pour informer l'utilisateur des actions réussies ou échouées.


## Améliorations possibles
- **Validation avancée** : Ajouter des règles pour les noms de tâches (longueur minimale, caractères interdits, etc.).
- **Pagination** : Gérer de grandes listes de tâches en ajoutant une pagination.
- **Gestion des erreurs détaillée** : Afficher des messages d'erreur plus spécifiques en cas de problème avec l'API.