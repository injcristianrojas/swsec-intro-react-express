# React-Express Software Security

Based on https://github.com/Joao-Henrique/React_Express_App_Medium_Tutorial

# Launch

## Launch API

```shell
cd api
npm install
npm start
```

## Launch SPA (client)

```shell
cd spa
npm install
npm start
```

# Security

## SAST

### ESLint

```shell
npm install eslint@5.16.0 eslint-plugin-security eslint-plugin-react --save-dev
npm init @eslint/config
npx eslint .
```

### Semgrep

```shell
python3 -m pip install --user semgrep
semgrep --config "p/react"
semgrep --config "p/expressjs"
```

## SCA

### NPM Audit

```shell
npm audit
```

### Trivy

(Install from repo. Not available for Windows)

```shell
trivy fs .
```

## Secrets detection

TODO add secrets

