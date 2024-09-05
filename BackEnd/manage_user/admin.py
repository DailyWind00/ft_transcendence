from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from manage_user.models import ManageUser

# Register your models here.
class UserProfile(admin.StackedInline):
	model = ManageUser

class UserAd(UserAdmin):
	inlines = (UserProfile,)

admin.site.unregister(User)
admin.site.register(User, UserAd)
