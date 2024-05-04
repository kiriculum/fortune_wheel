import os
from pathlib import Path

from environ import Env

BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent

env = Env(DEBUG=(bool, False))
Env.read_env(os.path.join(PROJECT_DIR, '.env'))

SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG')

ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1"]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_vite',
    'fortune',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATIC_URL = "static/"
STATIC_ROOT = PROJECT_DIR / "static"

STATICFILES_DIRS = [
    STATIC_ROOT / "react_dist"
]

DJANGO_VITE = {
    "default": {
        "dev_mode": env("DJANGO_VITE_DEV_MODE", default=False, cast=bool),
        "dev_server_port": env("DJANGO_VITE_DEV_SERVER_PORT", default="3000"),
        "manifest_path": STATIC_ROOT / 'react_dist' / 'manifest.json'
    }
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': PROJECT_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LOGIN_URL = 'login'
LOGOUT_URL = 'logout'

WSGI_APPLICATION = 'base.wsgi.application'
ROOT_URLCONF = 'base.urls'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
