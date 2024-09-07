from __future__ import absolute_import
import os
from celery import Celery

# Indiquer les paramètres Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Charger les paramètres de configuration de Celery à partir des settings Django
app.config_from_object('django.conf:settings', namespace='CELERY')

# Découvrir les tâches automatiquement dans les apps installées
app.autodiscover_tasks()

