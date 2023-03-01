![banner](./public/images/banner.png)

<div align="center">
![Contributors](https://img.shields.io/github/contributors/nrednav/explorerz.svg?style=for-the-badge)(https://github.com/nrednav/explorerz/graphs/contributors)
![Forks](https://img.shields.io/github/forks/nrednav/explorerz.svg?style=for-the-badge)(https://github.com/nrednav/explorerz/network/members)
![Stars](https://img.shields.io/github/stars/nrednav/explorerz.svg?style=for-the-badge)(https://github.com/nrednav/explorerz/stargazers)
![Issues](https://img.shields.io/github/issues/nrednav/explorerz.svg?style=for-the-badge)(https://github.com/nrednav/explorerz/issues)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)(https://explorerz.vercel.app)
</div>

# Explorerz

Explorerz is a fun, creative and collaborative map building game built to run on
the Flow blockchain.

## Built With

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

The following steps will guide you through getting this project setup locally on your machine.

### Pre-requisites

To build & interact with this project, you will need to have the latest version
of the [Flow CLI](https://developers.flow.com/tools/flow-cli) installed & setup.

You will also need to have [Node.js](https://nodejs.org/en/download/) installed.

### Installation

1. Clone the repository

```bash
git clone https://github.com/nrednav/explorerz.git
```

2. Install dependencies

```bash
npm install
```

### Configuration

There is a `.env.example` file in the project root directory.

Duplicate this, rename it to `.env` and you should be good to continue.

### Setup

You will need a total of 4 terminal sessions:

1. The Next.js app

```bash
npm run dev
```

2. Emulator

```bash
cd flow
flow emulator
```

3. Dev-Wallet

```bash
cd flow
flow dev-wallet
```

4. Project Deployment

```bash
cd flow
flow project deploy --network emulator
```

## Credits

- Game Texture Assets
  - Artist: [Jestan](https://ko-fi.com/jestan)
  - [Texture Pack](https://opengameart.org/content/pixel-texture-pack)
