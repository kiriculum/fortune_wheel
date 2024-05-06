FROM --platform=linux/amd64 node:slim as builder-vite

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm i

# COPY vite.config.ts, tsconfig.node.json tsconfig.json. tailwind.config.js, postcss.config.js, fortune/react, .env  ./
COPY . .
RUN npm run build

FROM --platform=linux/amd64 python:slim as app

RUN apt update
RUN apt install -y python3-dev build-essential pkg-config

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
COPY --from=builder-vite /app/static/react_dist /app/static/react_dist/

RUN ./manage.py migrate
RUN ./manage.py check


CMD ["./manage.py", "runserver", "0.0.0.0:8000"]