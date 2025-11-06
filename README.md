# Documentación del Proyecto: TecniTrack (Frontend)

## 1. Introducción y Visión General

Este proyecto es una aplicación web *Single Page Application (SPA)* construida con React.

### Stack Tecnológico

El proyecto utiliza el siguiente conjunto de tecnologías:

* **Framework:** [React](https://react.dev/) (v18)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Bundler:** [Vite](https://vitejs.dev/)
* **Estilos:** [TailwindCSS](https://tailwindcss.com/) (con un sistema de temas personalizado)
* **Routing:** [React Router DOM](https://reactrouter.com/) (v6)
* **Gestión de Formularios:** [React Hook Form](https://react-hook-form.com/)
* **Validación de Esquemas:** [Yup](https://github.com/jquense/yup)
* **Cliente de API:** Auto-generado usando `openapi-typescript-codegen`

## 2. Configuración del Entorno Local

Para ejecutar el proyecto en tu máquina local, sigue estos pasos:

### 2.1. Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y [npm](https://www.npmjs.com/).

### 2.2. Instalación

1.  Clona el repositorio desde GitHub:
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd front-tecnitrack
    ```

2.  Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

### 2.3. Variables de Entorno

Crea un archivo llamado `.env` en la raíz del proyecto. Este archivo es ignorado por Git y contendrá las variables de entorno necesarias para conectarse al backend.

Copia y pega el siguiente contenido en tu archivo `.env`:

```env
VITE_API_URL=[http://desarrollotecnitrack.runasp.net](http://desarrollotecnitrack.runasp.net)
OPENAPI_URL=[http://desarrollotecnitrack.runasp.net/swagger/v1/swagger.json](http://desarrollotecnitrack.runasp.net/swagger/v1/swagger.json)
````

  * `VITE_API_URL`: Es la URL base del backend a la que la aplicación hará las peticiones.
  * `OPENAPI_URL`: Es la URL del `swagger.json` que se usa para generar el cliente de la API.

### 2.4. Ejecutar la Aplicación

Una vez instaladas las dependencias y configurado el `.env`, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto levantará la aplicación en `http://localhost:5173` (o el puerto que tengas disponible).

## 3\. Generación del Cliente de API (¡Importante\!)

El proyecto consume la API del backend a través de un cliente de TypeScript auto-generado, que se encuentra en `src/api`. Este cliente se genera a partir del `swagger.json` definido en la variable de entorno `OPENAPI_URL`.

Si hay cambios en el backend (nuevos *endpoints*, modelos modificados, etc.), deberás regenerar este cliente.

### ⚠️ Advertencia: Proceso Manual Requerido

Existe un paso manual crítico en este proceso. El generador automático (`openapi-typescript-codegen`) sobreescribe una lógica de manejo de errores personalizada que es vital para que la aplicación muestre los mensajes de error correctos del backend.

Si no sigues estos pasos, **el manejo de errores de la aplicación fallará silenciosamente**.

Sigue estos pasos **exactamente** cada vez que necesites regenerar la API:

1.  **Respalda el Código Personalizado:**

      * Abre el archivo `src/api/core/request.ts`.
      * Busca la función `catchErrorCodes`.
      * Copia todo el bloque de código que está *dentro* de esa función. Guárdalo temporalmente en un editor de texto.

    **Código a respaldar:**

    ```typescript
    const error = errors[result.status]
    if (error) {
        console.log(result.body)
        if (
            result.body.errors &&
            Array.isArray(result.body.errors) &&
            result.body.errors.length > 0
        ) {
            console.error(result.body.errors[0])
            throw new ApiError(options, result, `${result.body.errors[0]}`)
        }
        throw new ApiError(options, result, error)
    }
    ```

2.  **Ejecuta el Script de Generación:**
    En tu terminal, corre el siguiente comando:

    ```bash
    npm run gen:api
    ```

    Espera a que termine. Esto actualizará toda la carpeta `src/api` y, en el proceso, borrará el código personalizado del paso 1.

3.  **Restaura el Código Personalizado:**

      * Vuelve a abrir el archivo `src/api/core/request.ts`.
      * Ve a la función `catchErrorCodes` (que ahora estará casi vacía).
      * Pega el bloque de código que respaldaste en el paso 1.

Este proceso asegura que los nuevos *endpoints* estén disponibles y que el manejo de errores siga funcionando como se espera.

## 4\. Arquitectura y Estructura del Proyecto

La filosofía del proyecto es separar lo **global** de lo **modular**.

  * `src/`: Contiene toda la lógica, componentes y hooks que son **globales** y se reutilizan en *toda* la aplicación (Contexts, Controles de Formulario Genéricos, Layouts, etc.).
  * `src/pages/`: Contiene las vistas principales. Cada vista (o grupo de vistas relacionadas) se trata como un **módulo autocontenido**.

### Arquitectura Modular (Dentro de `pages/`)

La clave de la mantenibilidad del proyecto es que cada característica dentro de `pages/` (ej. `pages/Internos/Citas/`) es un mini-proyecto en sí mismo. Estas carpetas pueden (y deben) contener sus propias carpetas de lógica de negocio, como:

  * `adapters/`: Funciones para transformar datos (DTOs) de la API a los modelos del frontend y viceversa, *específicas de este módulo*.
  * `models/`: Definiciones de tipos (schemas de Yup, interfaces TypeScript) *específicas de este módulo*.
  * `services/`: Funciones que realizan las llamadas a la API (fetchers) *específicas de este módulo*.
  * `components/`: Componentes de React usados *solo* dentro de este módulo.
  * `hooks/`: Hooks de React usados *solo* dentro de este módulo.
  * `utils/`: Funciones de utilidad usadas *solo* dentro de este módulo.
  * `constants/`: Constantes usadas *solo* dentro de este módulo.

Esta estructura mantiene la lógica de negocio aislada y fácil de localizar. Si una lógica se repite en más de un módulo, debe ser "promovida" a una carpeta global en `src/` (ej. `src/hooks`, `src/utils`, `src/components/common`).

### Desglose de `src/`

```text
src/
├── adapters/         # Funciones de mapeo (adaptadores) globales (ej. mapper.ts).
├── api/              # (Auto-generado) Cliente de API. NO MODIFICAR MANUALMENTE (ver sección 3).
├── components/       # Componentes React REUTILIZABLES y globales.
│   ├── calendario/   # Lógica y UI para el selector de fechas y horas.
│   ├── common/       # Componentes comunes (Modales, Tabs, Títulos).
│   ├── crud/         # El constructor de CRUDs genérico.
│   ├── dashboard/    # Widgets para tableros (ej. StatCard).
│   ├── ex/           # Componentes de prueba y ejemplos (ej. paleta de colores).
│   ├── form/         # Controles de formulario genéricos (Inputs, Selects).
│   ├── layout/       # Componentes de la estructura principal (Sidebar, Header, Footer).
│   ├── mantenimiento/ # Componentes para el flujo de ingreso de mantenimiento (Orden, Equipo...).
│   └── tecnico/      # Componentes para el flujo de procesamiento del técnico (Diagnóstico...).
├── constants/        # Constantes globales (ej. roles de perfil).
├── context/          # Proveedores de Contexto global (Autenticación, Modales, Temas).
├── hooks/            # Hooks personalizados globales (useAuth, useModalActions, useCitas...).
├── layouts/          # Composiciones de Layout (AuthLayout, MainLayout, InternalLayout).
├── pages/            # Vistas de la aplicación (divididas por rol/módulo).
│   │
│   ├── Internos/     # --- Vistas para usuarios internos (admin/técnico) ---
│   │   ├── Citas/    # CRUD y calendario de gestión de citas.
│   │   ├── Clientes/ # CRUD para clientes (Naturales y Jurídicos).
│   │   ├── Ordenes/  # CRUD para ver y asignar órdenes de mantenimiento.
│   │   ├── catalogo/ # Módulo para administrar catálogos (Localidades, Generales).
│   │   ├── home/     # Dashboard principal para usuarios internos.
│   │   └── usuarios/ # CRUD para la gestión de usuarios internos (empleados, técnicos).
│   │
│   ├── cliente/      # --- Vistas para el cliente final ---
│   │   ├── citas/    # Vista para que el cliente vea y gestione sus citas.
│   │   ├── dashboard/ # Dashboard con codigo quemado para los mantenimientos.
│   │   ├── perfil/   # Vista para que el cliente edite su perfil, contactos y direcciones.
│   │   └── tablero/  # Dashboard y home del cliente.
│   │
│   ├── nologin/      # --- Vistas públicas (sin autenticación) ---
│   │   ├── Login/    # Página de inicio de sesión.
│   │   ├── calendarioCita/ # Vista pública para agendar una nueva cita.
│   │   ├── confirmarEmail/ # Página para validar el email después del registro.
│   │   ├── recuperarContra/ # Formulario para solicitar restablecimiento de contraseña.
│   │   ├── register/ # Formulario de registro de nuevos clientes.
│   │   └── restablecerContra/ # Formulario para ingresar la nueva contraseña.
│   │
│   └── NofoundPage.tsx # Página 404.
│
├── router/           # Configuración de React Router (AppRouter, ProtectedRoute).
├── services/         # Lógica de negocio y llamadas a API globales o muy genéricas.
├── themes/           # Definiciones de temas de color para Tailwind.
├── types/            # Definiciones de tipos (TypeScript) globales.
├── utils/            # Funciones de utilidad globales (ej. parseError, parseFecha).
└── validation/       # Esquemas de YUP globales (ej. validación de Cédula/RUC).
```

## 5\. Kit de Herramientas y Componentes Reutilizables

**Regla de Oro:** Antes de crear un componente de UI o una función de servicio, **revisa esta sección primero**. Es muy probable que ya exista una solución genérica que puedas (y debas) utilizar.

### 5.1. El Contenedor Lógico: `CrudContainer` (Uso Estándar)

  * **Ubicación:** `src/components/crud/CrudContainer.tsx`
  * **Propósito:** Es el *wrapper* (envoltorio) principal y la forma **más rápida** de implementar un CRUD. Su responsabilidad es manejar la **lógica de apertura/cierre de modales y la ejecución de las peticiones (`requests`)** de crear, editar y eliminar.
  * **Cuándo usarlo:** En el 90% de los casos. Úsalo siempre que necesites un CRUD estándar con un formulario en un modal.
  * **Cómo funciona:** Este componente **recibe** la instancia de `useForm` como prop (`form`). El componente padre (la página, ej. `CrudClientes`) es responsable de inicializar `useForm`. `CrudContainer` pasa esta instancia `form` al componente de formulario (definido en `formModalProp`) y al `CrudCrudo` (ver 5.2).

#### Props Clave de `CrudContainer`

| Prop | Tipo | Obligatorio | Descripción |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Sí** | Título principal que se mostrará en la cabecera. |
| `columns` | `ColumnDef<TData>[]` | **Sí** | Array de definición de columnas para la tabla (formato `TanStack Table`). |
| `form` | `UseFormReturn<TForm>` | **Sí** | La instancia de `useForm` creada en el componente padre. **Se debe pasar**. |
| `crudQueries` | `CrudQueries<TData, TForm>` | **Sí** | Objeto con las funciones asíncronas (`fetchData`, `createQuery`, `editQuery`, `deleteQuery`). |
| `formModalProp` | `FormModalProp` | **Sí** | Objeto de configuración para el modal de formulario (ver detalle abajo). |
| `dataToForm` | `(data: TData) => TForm` | No | Función para transformar `TData` (tabla) a `TForm` (formulario) al editar. (Defecto: `data => data`). |
| `FiltersComponent` | `React.ReactNode` | No | Un componente JSX con los filtros adicionales (ej. Selects, Fechas). |
| `mostrar_titulo` | `boolean` | No | Controla si se muestra el título. (Defecto: `true`). |
| `autoLoadOptions` | `{ autoLoad, dependencies }` | No | Controla la carga inicial. `autoLoad`: `true` (defecto). `dependencies`: Array de dependencias (ej. `[id]`) para recargar si cambian. |
| `isModalGrande` | `boolean` | No | Hace el modal de formulario más ancho. (Defecto: `false`). |
| `searchPlaceholder`| `string` | No | Placeholder para la barra de búsqueda (ej. "Buscar por nombre..."). |
| `pageSize` | `number` | No | Cantidad de ítems por página. (Defecto: `10`). |
| `defaultValues` | `TForm` | **No** | **No pasar esta prop**. Pasa los valores por defecto a `useForm` en el componente padre. |

#### Detalle de `formModalProp`

Este objeto es crucial para la comunicación entre `CrudContainer` y tu componente de formulario dentro del modal.

  * `component: React.ElementType`: **(Requerido)** El componente de formulario que se renderizará (ej. `FormCliente`).
  * `propsCambiantes?: object`: (Opcional) Un objeto con props que tu formulario necesita y que **deben** causar un re-render del formulario si cambian. Úsalo para props reactivas (ej. `idExterno`, `estadoActual`).
  * `propsNoCambiantes?: object`: (Opcional) Un objeto con props que tu formulario necesita pero que **no** deben causar un re-render. Úsalo para props estáticas, como funciones *helper* o servicios.
      * **Importante:** Esta prop se creó para optimizar el rendimiento y **evitar errores de "circular JSON"** o bucles infinitos de re-renderizado que pueden ocurrir si pasas funciones o datos complejos que se re-instancian en cada render del componente padre.

#### Ejemplo de Uso (Simplificado)

```tsx
// En tu página, ej. CrudClientes.tsx
// (TData = ClienteDeTabla, TForm = FormularioCliente)

// 1. Definir tipos, columnas y valores por defecto
const defaultValues: IClienteForm = { /* ... */ };
const clienteColumns: ColumnDef<IClienteTabla>[] = [ /* ... */ ];

export const CrudClientes = () => {
    // 2. Inicializar useForm en el padre
    const form = useForm<IClienteForm>({
        resolver: yupResolver(schemaValidacionCliente),
        defaultValues: defaultValues
    });

    // 3. Definir queries (las funciones deben venir de 'services')
    const crudQueries = {
        fetchData: clienteService.getClientes,
        createQuery: clienteService.createCliente,
        editQuery: clienteService.updateCliente,
        deleteQuery: clienteService.deleteCliente,
    };

    // 4. Definir adaptador (si TData y TForm son diferentes)
    const dataToForm = (data: IClienteTabla): IClienteForm => { /* ... */ };

    return (
        <CrudContainer
            title="Gestión de Clientes"
            columns={clienteColumns}
            form={form} // <-- Se pasa la instancia de useForm
            crudQueries={crudQueries}
            formModalProp={{
                component: FormCliente, // Tu componente de formulario
                // (Opcional) Pasa props extra a FormCliente
                propsNoCambiantes: { /* ... */ },
                propsCambiantes: { /* ... */ }
            }}
            dataToForm={dataToForm} // Opcional
            FiltersComponent={<FiltrosCliente />} // Opcional
            searchPlaceholder="Buscar por RUC o Razón Social..."
            isModalGrande={true} // Opcional
        />
    );
}
```

-----

### 5.2. El Contenedor Visual: `CrudCrudo` (Uso Avanzado)

  * **Ubicación:** `src/components/crud/CrudCrudo.tsx`
  * **Propósito:** Es el componente que contiene **toda la lógica visual y de carga de datos** del CRUD. Su responsabilidad es manejar el **`fetch` de datos, los filtros (`FiltersComponent`), la carga (estado `loading`) y renderizar la UI** (Tabla, Toolbar, Paginación).
  * **Cuándo usarlo:** Úsalo directamente **solo si la lógica de creación/edición no es la estándar** (ej. no usa un modal, o necesitas un control muy granular sobre el *fetch* y los filtros, separado de la lógica de formulario que provee `CrudContainer`).
  * **Nota sobre Mejoras:** El componente `CrudCrudo` es monolítico. Una futura mejora sería dividirlo en componentes más pequeños y hooks especializados (ej. `useCrudTable`, `useCrudModal`) para facilitar el mantenimiento.

#### Props Clave (Diferencias con `CrudContainer`)

`CrudCrudo` acepta las mismas props que `CrudContainer`, pero **requiere `form`** y **no usa `defaultValues`**.

| Prop | Tipo | Obligatorio | Descripción |
| :--- | :--- | :--- | :--- |
| `form` | `UseFormReturn<TForm>` | **Sí** | La instancia completa de `useForm` que debe ser creada en el componente padre. |
| ... | ... | ... | (Todas las demás props de `CrudContainer` excepto `defaultValues`) |

-----

### 5.3. Sistema de Formularios

**Regla:** Nunca uses `<input>` o `<select>` nativos. Usa estos componentes genéricos para conectarlos automáticamente a `react-hook-form` y mantener la consistencia de estilos y errores.

**Nota Importante sobre Conexión (Estado Actual vs. Mejora):**

  * **Estado Actual:** La mayoría de los componentes (`GenericTextInput`, `GenericTextArea`, etc.) funcionan pasando directamente `register` (obtenido de `useForm`) y `errors` (de `formState`). Esto se hace manualmente en el componente de formulario.
  * **Excepción:** `GenericSelect` (y los selectores más complejos como `GenericLocalidadesSelect` o `GenericSelectSearch`) internamente usan el componente `<Controller>` de RHF, por lo que a estos se les debe pasar la prop `control`.
  * **Posible Mejora:** Una refactorización ideal sería estandarizar **todos** los componentes de formulario para que utilicen `<Controller>` y reciban la prop `control`. Esto simplificaría su uso y centralizaría la lógica de registro y error, eliminando la necesidad de pasar `register` y `errors` manualmente.

#### Componentes de Formulario (`src/components/form/Controls/`)

| Componente | Props Clave | Conexión RHF |
| :--- | :--- | :--- |
| `GenericTextInput`| `name`, `label`, `register`, `errors` | `register`, `errors` |
| `GenericTextArea` | `name`, `label`, `register`, `errors` | `register`, `errors` |
| `GenericSelect` | `name`, `label`, `control`, `options` **o** `tipoCatalogo` | `control` |
| `GenericSelectSearch`| `name`, `label`, `control`, `searchFunction` | `control` |
| `GenericLocalidadesSelect`| `name`, `control` | `control` |
| `GenericDate` | `name`, `label`, `register`, `errors` | `register`, `errors` |
| `GenericCheckbox` | `name`, `label`, `register` | `register` |

#### Componentes de Layout del Form (`src/components/form/`)

| Componente | Propósito |
| :--- | :--- |
| `GenericForm` | Wrapper principal del formulario. Maneja el `onSubmit` de `react-hook-form`. |
| `GenericRowForm` | Layout helper para poner campos en una fila (`flex-row`) que se adapta en móviles. |
| `GenericSection` | Agrupa visualmente un conjunto de campos bajo un título. |

#### Ejemplo de Uso (Formulario Genérico Independiente)

Este es un ejemplo de cómo crear un formulario que *no* depende del `CrudContainer`.

```tsx
// En tu componente de formulario, ej. MiFormularioIndependiente.tsx

// 1. Definir el schema de validación y el tipo
const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    tipo: yup.string().required('El tipo es requerido'),
    ubicacion: yup.object().nullable(),
});

type MiFormularioData = yup.InferType<typeof schema>;

// 2. Valores por defecto
const defaultValues: MiFormularioData = {
    nombre: '',
    tipo: '',
    ubicacion: null,
};

export const MiFormularioIndependiente = () => {
    // 3. Inicializar useForm DENTRO del componente
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues
    });

    const onSubmit = (data: MiFormularioData) => {
        console.log('Datos del formulario:', data);
        // Aquí iría la lógica de envío (ej. await miServicio.crear(data))
    };

    return (
        // 4. Usar GenericForm para manejar el submit
        <GenericForm onSubmit={handleSubmit(onSubmit)}>
            <GenericSection title="Datos Principales">
                <GenericRowForm>
                    {/* Este usa REGISTER y ERRORS */}
                    <GenericTextInput
                        name="nombre"
                        label="Nombre"
                        register={register}
                        errors={errors}
                    />
                    {/* Este usa CONTROL */}
                    <GenericSelect
                        name="tipo"
                        label="Tipo"
                        control={control}
                        tipoCatalogo="TIPO_GENERICO"
                    />
                </GenericRowForm>
            </GenericSection>
            
            <GenericSection title="Ubicación">
                {/* Este usa CONTROL */}
                <GenericLocalidadesSelect name="ubicacion" control={control} />
            </GenericSection>
            
            <button type="submit" className="bg-primary-auto p-2 rounded-md">
                Guardar
            </button>
        </GenericForm>
    );
}
```

-----

### 5.4. Sistema de Modales (`useModalActions`)

  * **Hook:** `src/hooks/useModalActions.tsx`
  * **Propósito:** Es la forma **única y estandarizada** de mostrar pop-ups (alertas, confirmaciones, carga). **No usar `alert()` o `window.confirm()`**.
  * **Cómo funciona:** Se llama desde cualquier componente que esté dentro del `ModalProvider` (toda la app).

#### Funciones Clave

  * `modalActions.showAlert({ title, message, type: 'success' | 'error' | 'info' })`
  * `modalActions.showConfirm({ title, message, onConfirm: () => ... })`
  * `modalActions.showLoading(message?)`: Devuelve un `id` de string.
  * `modalActions.closeModal(id)`: Cierra un modal (usado comúnmente con el `id` de `showLoading`).

#### Ejemplo de Uso

```tsx
const MiComponente = () => {
    const modalActions = useModalActions();

    const handleDelete = () => {
        modalActions.showConfirm({
            title: 'Confirmar Eliminación',
            message: '¿Estás seguro de que deseas eliminar este registro?',
            onConfirm: async () => {
                const loadingId = modalActions.showLoading('Eliminando...');
                try {
                    // await api.deleteRegistro(id);
                    modalActions.showAlert({ title: 'Éxito', message: 'Registro eliminado', type: 'success' });
                } catch (error) {
                    modalActions.showAlert({ title: 'Error', message: 'No se pudo eliminar', type: 'error' });
                } finally {
                    modalActions.closeModal(loadingId);
                }
            }
        });
    };

    return <button onClick={handleDelete}>Eliminar</button>;
}
```

-----

### 5.5. Sistema de Autenticación (`useAuth`)

  * **Hook:** `src/hooks/useAuth.tsx`
  * **Propósito:** Provee el estado del usuario actual y las funciones de `login` / `logout`.
  * **Propiedades Clave:**
      * `user`: Objeto `{ usuario: string, rol: 'usuario' | 'interno' }` o `null`.
      * `login(email, password, esInterno)`: Función para iniciar sesión.
      * `logout()`: Función para cerrar sesión.

#### Ejemplo de Uso

```tsx
const Header = () => {
    const { user, logout } = useAuth();

    return (
        <nav>
            {user ? (
                <>
                    <span>Hola, {user.usuario} (Rol: {user.rol})</span>
                    <button onClick={logout}>Cerrar Sesión</button>
                </>
            ) : (
                <span>No autenticado</span>
            )}
        </nav>
    );
}
```

## 6\. Temas y Estilos (Theming)

El proyecto utiliza un sistema de temas (Theming) robusto y centralizado sobre **TailwindCSS**.

### 6.1. Concepto Central: Variables CSS

  * **No se hardcodean colores en Tailwind:** En lugar de definir `primary: '#FF0000'` en `tailwind.config.js`, la configuración está mapeada a variables CSS.
  * **Definición de Temas:** Los temas reales (paletas de colores) se definen como objetos en `src/themes/` (ej. `tecniTrack.ts`).
  * **Inyección de Temas:** El `ThemeProvider` en `src/context/ThemContext.tsx` toma uno de estos objetos de tema y lo inyecta como variables CSS en el elemento `:root` de la aplicación.
  * **Configuración de Tailwind:** El archivo `tailwind.config.js` está configurado para leer estas variables CSS.
      * *Ejemplo:* La clase `bg-primary` de Tailwind está mapeada a `rgb(var(--color-primary) / <alpha-value>)`.

### 6.2. La Regla de Oro: Clases `-auto` para Contraste

Para garantizar la accesibilidad y el contraste automático (ej. texto blanco sobre fondo oscuro, texto negro sobre fondo claro), se ha creado un **plugin de Tailwind personalizado**.

Este plugin genera clases especiales con el sufijo `-auto`.

  * **Cómo funciona:** Cuando usas una clase como `bg-primary-auto`, el plugin aplica **dos** propiedades CSS:
    1.  `background-color: var(--color-primary)`
    2.  `color: var(--color-on-primary)`

El color `on-primary` (definido en el tema) es el color de texto con el contraste adecuado para `primary`.

**Regla:** Siempre que vayas a aplicar un color de fondo semántico (como `primary`, `secondary`, `error`, `surface`), **usa la variante `-auto`** para manejar el color del texto automáticamente.

### 6.3. Ejemplo de Uso

```tsx
// ❌ MAL (El texto puede no ser legible si el tema cambia)
<button className="bg-primary text-white">
  Clic
</button>

// ❌ MAL (El texto puede no ser legible si el tema cambia)
<button className="bg-primary text-black">
  Clic
</button>

// ✅ BIEN (El color del texto se ajustará automáticamente)
<button className="bg-primary-auto">
  Clic
</button>

// ✅ BIEN (Para aplicar solo el color de texto)
<span className="text-primary">
  Texto primario
</span>

// ✅ BIEN (Para fondos que no son semánticos, como el fondo de la página)
<div className="bg-background text-on-background">
  Contenido...
</div>
```

### 6.4. Colores Disponibles

El sistema de temas (`src/themes/types.ts`) define la siguiente paleta semántica. Puedes usar cualquiera de estos nombres con los prefijos de Tailwind (`bg-`, `text-`, `border-`) y con el sufijo `-auto` (para fondos).

  * `primary` / `on-primary`
  * `secondary` / `on-secondary`
  * `tertiary` / `on-tertiary`
  * `error` / `on-error`
  * `background` / `on-background`
  * `surface` / `on-surface`
  * `surface-variant` / `on-surface-variant`
  * `outline`

<!-- end list -->

```
```