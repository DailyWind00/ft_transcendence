from django.utils import timezone
from datetime import timedelta

class AnonymizeUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            one_year_ago = timezone.now() - timedelta(days=365)
            if request.user.date_joined <= one_year_ago and not request.user.is_anonymous:
                request.user.username = f"anonymous_{request.user.id}"
                request.user.email = ""
                request.user.first_name = ""
                request.user.last_name = ""
                request.user.is_active = False
                request.user.is_anonymous = True
                request.user.save()
        response = self.get_response(request)
        return response