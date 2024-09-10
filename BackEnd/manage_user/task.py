from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model

User = get_user_model()

def anonymiser_utilisateurs():
    # Calculer la date limite (1 an en arrière)
    date_limite = timezone.now() - timedelta(days=365)

    # Filtrer les utilisateurs à anonymiser (par exemple, ceux inscrits il y a plus d'un an)
    utilisateurs_a_anonymiser = User.objects.filter(date_joined__lt=date_limite)

    # Parcourir et anonymiser les utilisateurs
    for utilisateur in utilisateurs_a_anonymiser:
        utilisateur.username = 'Anonyme'
        utilisateur.email = f'anonyme_{utilisateur.id}@example.com'
        utilisateur.save()