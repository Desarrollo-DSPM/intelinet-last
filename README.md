
# Plantilla creación nuevos proyectos

## Tecnologías

- TypeScript
- React js
- Next.js
- Tailwind CSS
- Shadcn/ui
- Drizzle ORM

## Instrucciones paso a paso

1.- Clonamos el repositorio

```bash
git clone https://github.com/Desarrollo-DSPM/template-app.git

```
2.- Instalamos las dependencias con PNPM (Si no lo tienes debes instalarlo)

```bash
pnpm install

```

3.- Creamos nuestra base de datos de MySQL.

4.- Inicializamos el proyecto

```bash
pnpm db:init
```

5.- Generamos la base de datos

```bash
pnpm db:generate
```

6.- Hacemos las migraciones necesarias

```bash
pnpm db:migrate
```

7.- Realizamos el seed por default

```bash
pnpm db:seed
```

Esto nos generará un usuario por defecto administrador

User: admin@admin.com

Password: admin123

8.- Ejecutar el código en local http://localhost:3000/

```bash
pnpm dev
```
## Autores

- [@jotredev](https://www.github.com/jotredev)

