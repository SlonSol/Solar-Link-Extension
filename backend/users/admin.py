# users/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Profile

# Создаём класс Inline для модели Profile
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Профиль'
    fk_name = 'user'

# Расширяем стандартный UserAdmin, добавляя ProfileInline
class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline, )
    list_display = ('username', 'email', 'first_name', 'last_name', 'get_bio')
    list_select_related = ('profile', )

    def get_bio(self, instance):
        return instance.profile.bio
    get_bio.short_description = 'Биография'

# Пере-регистрируем модель User с новым UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
