# Forge
Install the dependencies:
```bash
sudo npm i
```

create config/environment.json file:
```bash
copy all the key/values from config/environment-sample.json and past here
```

## local:
```bash
npm run nodemon-dev
```

## Create build:
```bash
npm run build
```
## Dev:
```bash
npm run pm2-dev
```

## Staging:
```bash
npm run pm2-staging
```

## Production:
```bash
npm run pm2-prod
```

App will run on 8080 port, you can update in server.ts
