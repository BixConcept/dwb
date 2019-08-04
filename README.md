# dwb frontend

This **open-source project** was developed by the 3nt3rt41ment GbR [niels, ayberk & sanberk] in 2019 as part of a computer science project. It is the frontend counterparrt for the [dwb api](https://git.3nt3.de/3nt3/dwb).
Installation of the api is **required**.

## installation

### step 1: Install [NodeJS](https://nodejs.org/en/) because the NodeJS packet manager is needed to run this app.

### step 2: clone the repo

`git clone git.3nt3.de/3nt3/dwb-fronted && cd dwb-frontend` (you also have to install git if you haven't install it yet)

### step 3: run / deploy

#### development

if you want to run dwb for development purposes and just want a development server you can run

```bash
npm start
```

a development server should now be running on `localhost:3000`.

#### production

if you want to run dwb in production you can run the following command and copy the compiled files in `build/` to your webroot.

```bash
npm run build
```
