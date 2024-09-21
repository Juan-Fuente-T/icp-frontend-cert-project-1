# E-commerce App con React e Internet Computer Protocol (ICP)

## Descripción

Esta aplicación es un e-commerce desarrollado con React que utiliza Internet Computer Protocol (ICP) para el backend. Ofrece una experiencia de compra completa con autenticación de usuario, gestión de carrito y proceso de compra.

## Características principales

- Autenticación de usuario con ICP Identity
- Navegación intuitiva con una barra de navegación responsive
- Listado de productos en la página principal
- Gestión completa del carrito de compras
- Proceso de compra con confirmación y datos de envío
- Integración con OpenChat para soporte al cliente

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- dfx (versión más reciente)

## Instalación

1. Clonar el repositorio:

git clone https://github.com/Juan-Fuente-T/icp-frontend-cert-project-1

cd icp-frontend-cert-project-1

2. Instalar dependencias:

npm install

3. Iniciar el canister de Internet Computer:

dfx start --clean --background

4. Desplegar el backend:

dfx deploy

5. Iniciar la aplicación en modo desarrollo:

npm start

# Uso de la Aplicación

Esta aplicación de e-commerce es intuitiva y fácil de usar. A continuación, se describen las funcionalidades principales y cómo interactuar con ellas:

### 1. Autenticación

- Al abrir la aplicación, se mostrará un modal que indica que es necesaria la autenticación para utilizar la app.
- Puedes iniciar sesión utilizando tu identidad ICP. Si no tienes una cuenta, sigue el proceso de registro correspondiente.

### 2. Navegación

- **Barra de Navegación:** En la parte superior, encontrarás una barra de navegación que incluye:
  - Un logo que te lleva a la página principal.
  - Botones para navegar entre inicio y el carrito
  - Un icono de carrito que muestra el número de productos en tu carrito.
  - Un botón para iniciar sesión o cerrar sesión.

### 3. Página Principal

- En la página principal, verás una lista de todos los productos disponibles.
- Cada producto tiene nombre, descripción y precio y un botón para añadirlo al carrito.

### 4. Producto en carrito.

- Al añadir un producto el carrito se abre un modal que muestra el producto que se ha añadido.
- Puedes elegir cerrar o ir al carrito:
  - **Cerrar:** Te permite continuar visualizando los productos.
  - **Carrito:** Te envía directamente al carrito.

### 5. Carrito

- Al hacer clic en carrito en la barra de navegación del header, serás llevado a la página del carrito donde podrás ver todos los productos añadidos.
- Se muestra el coste total por producto (precio unitario × cantidad), y el coste total de la suma de productos.
- Desde aquí puedes:
  - **Incrementar o Decrementar Cantidades:** Usa los botones "+" y "-" junto a cada producto para ajustar la cantidad.
  - **Eliminar Productos:** Haz clic en el botón de eliminar para quitar un producto del carrito.
  - **Proceder a Comprar:** Al hacer clic en el botón "Comprar", se abrirá un modal donde deberás ingresar tus datos de envío.

### 6. Proceso de Compra

- En el modal de compra, completa los campos requeridos (nombre, dirección, teléfono, email).
- Puedes elegir aceptar o cancelar el proceso:
  - **Aceptar:** Si aceptas, se eliminarán los productos del carrito y recibirás un alert por cada uno que se haya borrado. Luego, se mostrará un mensaje indicando que la compra fue exitosa y serás redirigido a la página principal.
  - **Cancelar:** Si decides cancelar, regresarás a la página del carrito sin realizar cambios.

### 7. OpenChat

- La aplicación también incluye una integración con OpenChat para soporte al cliente. Puedes acceder a esta funcionalidad desde cualquier página de la aplicación.

## Estructura del proyecto

/src
/components
/auth
LoginButton.jsx
LogoutButton.jsx
AddProductModal.jdx
AuthModal.jsx
Cart.jsx
CartItem.jsx
Navbar.jsx
OpenChatFrame.jsx
ProductsGrid.jsx
PurchaseModal.jsx
/context
AuthContext.js
CartContext.js
/services
api.js
icp.js
App.jsx
index.js

#### Nota: Esta aplicación utiliza un enfoque basado en componentes en lugar de páginas separadas.

- `App.jsx` actúa como el componente principal
- `ProductsGrid.jsx` se utiliza para mostrar
  la lista de productos en la página principal.

## Tecnologías utilizadas

- React
- Internet Computer Protocol (ICP)
- React Router para navegación
- Context de React para gestión de estado global
- Tailwind CSS para estilos

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## Contacto

Juan Fuente - https://juanfuente.ovh

Link del proyecto: [https://github.com/Juan-Fuente-T/icp-frontend-cert-project-1](https://github.com/Juan-Fuente-T/icp-frontend-cert-project-1)

-----------------********\*********------------------

# `icp-frontend-project-1`

Welcome to your new `icp-frontend-project-1` project and to the Internet Computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with `icp-frontend-project-1`, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd icp-frontend-project-1/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
