# CipherHub

CipherHub is a web application designed to facilitate the encryption and decryption of data using various ciphers. It supports multiple ciphers such as Caesar, Vigenère, Bacon, as well as Base64 and Base32. The app provides an interface for both local encryption/decryption and sharing encrypted data between users.

## Features

- **Encryption and Decryption**: Supports: Supports Caesar, Vigenère, Bacon ciphers, and Base64/Base32 encoding/decoding.
- **Share Results**: Users can create unique links for their encrypted data and share them with others.
- **Share Link Expiration**: Encrypted data links have a set expiration period.

**_For developers:_**

- **Dockerized App**: Easily start the app locally using Docker Compose.

## Technologies Used

- **Next.js**: Framework for building the frontend and backend of the app.
- **Prisma ORM**: For interacting with the PostgreSQL database.
- **PostgreSQL**: Database for storing encrypted data and metadata.
- **Docker**: For containerization, making it easy to run the application and the database together.
- **Cron Jobs**: For scheduling periodic tasks such as clearing expired share data.

## Installation

To get started with CipherHub locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/efkdk/cipher-hub.git
cd cipherhub
```

### 2. Set up environment variables

Create a .env file in the root of the project and add your environment variables:

```env
POSTGRES_USER="admin"
POSTGRES_PASSWORD="password"
POSTGRES_DB="cipherhub_db"

NEXT_PUBLIC_CLIENT_URL="http://localhost:3000"

# if you aren't running app in docker compose use @localhost:5432 instead of @db:5432
DATABASE_URL="postgresql://admin:password@db:5432/cipherhub_db?schema=public"

# it's only for cron jobs on production
CRON_SECRET="secret"
```

### 3. Install dependencies

Install dependencies using your preferred package manager. For example:

```bash
npm install
```

### 4. Run Docker

Run app in docker compose

```bash
docker-compose up -d --build
```

The app will be available at http://localhost:3000.

## Contributing

Contributions are welcome! If you'd like to contribute, feel free to fork the repo, create a new branch, and submit a pull request.
