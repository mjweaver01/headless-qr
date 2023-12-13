# Serverless QR Code Generator

mw-qrcode.netlify.app

[![Netlify Status](https://api.netlify.com/api/v1/badges/0c53510c-8a5b-460f-a70f-65796e87ca5a/deploy-status)](https://app.netlify.com/sites/creative-bublanina-ffd1e1/deploys)

Accepts GET requests with a `text` query parameter and returns a QR code image.

Accepts POST requests with a JSON body of the form `{ "text": "..." }` and returns a QR code image.

### Usage

```bash
yarn && yarn dev
```

### Deploy

```bash
yarn deploy
```
