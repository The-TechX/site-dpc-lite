# Sistema de Workflow - Documentación Completa

## Flujo de Trabajo del Site Document

### Estados del Documento

El sistema maneja los siguientes estados de documento:

1. **Draft** - Documento en creación inicial por PM/PC
2. **Assigned** - Técnico asignado, esperando inicio de trabajo
3. **In Progress** - Técnico trabajando en las fases B-E
4. **Pending Review** - Esperando revisión del PM/PC
5. **Returned** - Devuelto al técnico con comentarios de corrección
6. **Pending CSC Audit** - Esperando auditoría del equipo NOC/CSC
7. **Completed** - Documento finalizado y aprobado

---

## Workflow Detallado

### 1️⃣ Fase Inicial - PM/PC Crea el Documento

**Rol:** PM/PC (Project Manager / Project Coordinator)

1. El PM/PC accede al **Dashboard** (Landing Page `/`)
2. Hace clic en **"Crear Site Document"**
3. Es dirigido a **Phase A - Setup**:
   - Completa **Site Info** (`/site-info`)
   - Completa **Services** (`/services`)

**Estado del documento:** `Draft`

---

### 2️⃣ Asignación de Técnico

**Rol:** PM/PC

Una vez completada la Phase A, el PM/PC debe:

1. Abrir el modal **"Asignar Técnico"**
2. **Campos requeridos:**
   - ✅ **WOT (Work Order Ticket)** - Número de ticket de SNOW (obligatorio para tracking)
   - ✅ **Técnico** - Seleccionar de la lista de Field Engineers disponibles

3. Al confirmar, el sistema:
   - Crea una **Task/Solicitud** asignada al técnico
   - Cambia el estado del documento a `Assigned`
   - El técnico recibe la notificación en su Dashboard

**Estado del documento:** `Draft` → `Assigned`

---

### 3️⃣ Trabajo de Campo - Field Engineer

**Rol:** Field Engineer

1. El técnico accede a su **Dashboard**
2. Ve la tarea pendiente en el panel de **"Mis Tareas Pendientes"**
3. Hace clic en la tarjeta de tarea para comenzar
4. Completa las **Phases B, C, D, E**:
   - **Phase B - Assets:**
     - Phone Numbers (`/phone-numbers`)
     - Racks Info (`/racks`)
     - Equipment Off-Rack (`/equipment-not-on-rack`)
     - Inventory (`/inventory`)
   - **Phase C - Layouts:** Layouts Hub (`/layouts`)
   - **Phase D - Connections:** Connections Hub (`/connections`)
   - **Phase E - Antennas:** Antennas Hub (`/antennas`)

5. Al completar todo el trabajo, marca la tarea como **"Completada"**

**Estado del documento:** `Assigned` → `In Progress` → `Pending Review`

---

### 4️⃣ Revisión - PM/PC

**Rol:** PM/PC

1. El PM/PC ve la solicitud en estado **"Pending Review"** en su Dashboard
2. Hace clic en la tarjeta de tarea para revisar
3. Se abre el **Modal de Revisión** con dos opciones:

#### Opción A: Aprobar ✅

- El PM/PC revisa todo y está conforme
- Hace clic en **"Aprobar y Enviar a CSC"**
- El sistema:
  - Cambia el estado a `Pending CSC Audit`
  - Notifica al equipo NOC/CSC
  - La tarea aparece en el Dashboard del NOC

**Estado del documento:** `Pending Review` → `Pending CSC Audit`

#### Opción B: Devolver con Comentarios ❌

- El PM/PC encuentra errores
- **Acciones:**
  1. Selecciona las **páginas específicas** que tienen errores (checklist)
  2. Agrega **comentarios** para cada página seleccionada
  3. Opcionalmente agrega un **comentario general**
  4. Hace clic en **"Devolver con Comentarios"**

- El sistema:
  - Cambia el estado a `Returned`
  - Guarda todos los comentarios
  - Notifica al técnico
  - La tarea reaparece en el Dashboard del técnico con los comentarios

**Estado del documento:** `Pending Review` → `Returned` → `In Progress` (cuando el técnico corrija)

---

### 5️⃣ Auditoría CSC - NOC

**Rol:** NOC (Network Operations Center)

1. El NOC ve la solicitud en **"Auditorías Pendientes"** en su Dashboard
2. Hace clic en la tarea y es dirigido a **CSC Audit** (`/csc-audit`)
3. Completa el **checklist de auditoría** verificando:
   - Completitud de información
   - Precisión de datos
   - Cumplimiento de estándares
   - Documentación fotográfica

4. Al finalizar, marca la auditoría como **"Completada"**

**Estado del documento:** `Pending CSC Audit` → `Completed`

---

## Componentes Principales

### 📊 Dashboard (Landing Page)

**Ubicación:** `/` (ruta raíz)

**Características:**
- Vista diferente según el rol del usuario
- **Estadísticas:**
  - Documentos Activos
  - Tareas Pendientes
  - Completados
  - Tasa de Éxito
- **Panel de Tareas Kanban:**
  - PM/PC: Solicitudes Activas
  - Field Engineer: Mis Tareas Pendientes
  - NOC: Auditorías Pendientes
- **Sección informativa** sobre el sistema
- Botón **"Crear Site Document"** (solo PM/PC)

### 🎫 TaskCard (Tarjeta Kanban)

**Información mostrada:**
- Nombre del sitio
- ID del documento
- Técnico asignado
- WOT (Work Order Ticket)
- Estado actual
- Prioridad (Baja/Media/Alta)
- Fecha de vencimiento
- Número de comentarios (si hay)

### 🔨 AssignTechnicianModal

**Campos:**
- **WOT** (obligatorio) - Input de texto
- **Técnico** (obligatorio) - Lista seleccionable de Field Engineers

**Validaciones:**
- WOT no puede estar vacío
- Debe seleccionar un técnico

### ✅ ReviewModal

**Secciones:**
1. **Comentario General** (opcional) - Textarea
2. **Páginas con Errores** (opcional) - Checklist de Phase B, C, D, E:
   - Cada página puede ser seleccionada
   - Al seleccionarla, se abre un textarea para comentarios específicos

**Botones:**
- **"Aprobar y Enviar a CSC"** - Avanza el flujo
- **"Devolver con Comentarios"** - Regresa al técnico

---

## Contexts de React

### 🎭 RoleContext

Maneja los permisos por rol:
- Define qué páginas puede editar cada rol
- Indica qué páginas están en modo solo lectura
- Proporciona el hook `useRole()` y `usePagePermissions()`

### 📋 WorkflowContext

Maneja el estado del workflow:
- Estado actual del documento
- Técnico asignado
- WOT
- Lista de tareas
- Comentarios de revisión
- Flags de completitud de fases

**Hooks disponibles:**
- `useWorkflow()` - Acceso completo al contexto

---

## Requisitos de Tracking

### WOT (Work Order Ticket)

**¿Por qué es obligatorio?**

El sistema requiere un WOT de SNOW (ServiceNow) porque:
- ✅ Trazabilidad completa de modificaciones al sitio
- ✅ Cada técnico requiere un ticket para visitar un sitio
- ✅ Cumplimiento de procesos internos de la empresa
- ✅ Auditoría y reporting

**Formato esperado:** `WOT-YYYY-NNNNNN` (ej: `WOT-2024-001234`)

---

## Visualización de Roles (Demo)

El sistema incluye un selector **"Visualizar como"** en el header que permite:
- Simular diferentes roles para presentaciones
- Ver cómo se comporta la UI según permisos
- Probar el flujo completo desde diferentes perspectivas

**Ubicación:** Header superior, solo visible en desktop (lg+)

**Roles disponibles:**
- Field Engineer
- PM/PC
- NOC

---

## Navegación

### Estructura de la Sidebar

La navegación está organizada en **6 fases**:

- **PHASE A — Setup** (2 páginas)
- **PHASE B — Assets** (4 páginas)
- **PHASE C — Layouts** (1 hub)
- **PHASE D — Connections** (1 hub)
- **PHASE E — Antennas** (1 hub)
- **PHASE F — Closeout** (3 páginas)

### Indicadores Visuales

- ✅ **Verde** - Completado
- 🔵 **Azul** - En progreso
- ⚪ **Gris** - No iniciado
- 🔴 **Rojo** - Bloqueado
- 🔒 **Candado** - Solo lectura (según rol)

---

## Próximos Pasos (Para Producción)

1. **Integración con Supabase:**
   - Persistencia de documentos
   - Autenticación de usuarios
   - Sistema de notificaciones en tiempo real
   - Autosave automático

2. **Funcionalidad Drag & Drop:**
   - Layouts de racks
   - Layouts de antenas
   - Reordenar equipment

3. **Validación Cross-Page:**
   - Validar datos antes de generar reporte
   - Mostrar errores en Generate Report
   - Prevenir envío si hay datos incompletos

4. **Notificaciones:**
   - Email/In-app cuando se asigna una tarea
   - Alertas de vencimiento de WOT
   - Notificaciones de revisiones devueltas
