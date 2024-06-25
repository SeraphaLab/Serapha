# Serapha
[![Packgist](https://img.shields.io/packagist/v/serapha/framework.svg?style=flat-square&label=core)](https://packagist.org/packages/serapha/framework)  
Serapha is a lightweight, modular PHP framework designed to simplify web application development with a focus on simplicity and performance. Built with modern PHP practices, Serapha leverages powerful libraries such as [`carry0987/template-engine`](https://github.com/carry0987/TemplateEngine) for templating and [`carry0987/sanite`](https://github.com/carry0987/Sanite) for database CRUD operations, ensuring an efficient and streamlined development process.

### Key Features

- **Modular Architecture**: Organized structure to keep your code clean and maintainable.
- **Powerful Templating**: Integrates template engine for fast and flexible templating.
- **Database Abstraction**: Utilizes [`carry0987/sanite`](https://github.com/carry0987/Sanite) for robust and easy-to-use database CRUD operations.
- **Routing System**: Simple and intuitive routing to map URLs to specific controllers and actions.
- **Environment Configuration**: Supports `.env` configuration for managing different environments easily.
- **Middleware Support**: Add custom middleware for request processing and enhance security or performance.

### Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/SeraphaLab/Serapha.git
   cd serapha
   ```

2. **Install dependencies:**
   ```sh
   composer install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and customize it as per your requirements.
   ```sh
   cp .env.example .env
   ```

4. **Run the application:**
   ```sh
   php -S localhost:8000 -t public
   ```

Visit `http://localhost:8000` to see your application in action.

Whether you are building a small website or a large-scale web application, Serapha provides you with the tools and flexibility needed to succeed. Dive into the documentation to explore more features and start building with Serapha today!
