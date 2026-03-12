# Sistema de Permisos por Rol

Este documento explica cómo funciona el sistema de permisos basado en roles implementado en la aplicación.

## Roles Disponibles

### 1. Field Engineer
- **Escritura**: Phase B, C, D, E (Assets, Layouts, Connections, Antennas)
- **Solo Lectura**: Dashboard (Home), Phase A, F (Setup, Closeout incluyendo CSC Audit)

### 2. PM/PC (Project Manager/Project Coordinator)
- **Escritura**: Dashboard (Home), Phase A, B, C, D, E, F (todas las fases excepto CSC Audit)
- **Solo Lectura**: CSC Audit

### 3. NOC
- **Escritura**: CSC Audit únicamente
- **Solo Lectura**: Dashboard (Home) y todas las demás fases (A, B, C, D, E, F)

## Mapeo de Páginas a Fases

```typescript
Dashboard (Home):
  - / (Landing Page)

Phase A (Setup):
  - /site-info
  - /services

Phase B (Assets):
  - /phone-numbers
  - /racks
  - /equipment-not-on-rack
  - /inventory

Phase C (Layouts):
  - /layouts

Phase D (Connections):
  - /connections

Phase E (Antennas):
  - /antennas

Phase F (Closeout):
  - /general-diagram
  - /generate-report

Phase F-CSC (CSC Audit):
  - /csc-audit
```

## Uso en Componentes

### Usando el Context Directamente

```tsx
import { useRole } from '../contexts/RoleContext'

function MyPage() {
  const { currentRole, canEdit, isReadOnly } = useRole()
  
  // Verificar permisos para la página actual
  const canEditThisPage = canEdit(location.pathname)
  
  // Verificar si estamos en modo solo lectura
  const readOnly = isReadOnly(location.pathname)
  
  return (
    <div>
      {canEditThisPage ? (
        <button>Editar</button>
      ) : (
        <span>Sin permisos de edición</span>
      )}
    </div>
  )
}
```

### Usando el Hook de Permisos de Página

```tsx
import { usePagePermissions } from '../contexts/RoleContext'

function MyPage() {
  const { canEdit, isReadOnly } = usePagePermissions()
  
  return (
    <div>
      <input disabled={isReadOnly} />
      {canEdit && <button>Guardar</button>}
    </div>
  )
}
```

## Componente PageShell

El componente `PageShell` automáticamente muestra un banner de solo lectura cuando el usuario no tiene permisos de escritura en la página actual.

```tsx
import { PageShell } from '../components/PageShell'

function MyPage() {
  return (
    <PageShell 
      title="Mi Página"
      phase="PHASE B — ASSETS"
    >
      {/* El banner de solo lectura se mostrará automáticamente si aplica */}
      <div>Contenido de la página</div>
    </PageShell>
  )
}
```

## Selector de Rol en el Header

Los usuarios pueden cambiar entre roles usando el selector "Visualizar como" ubicado en el header de la aplicación (visible solo en desktop). Esto permite simular diferentes permisos para presentaciones a stakeholders.

## Indicadores Visuales

1. **Banner de Solo Lectura**: Aparece en la parte superior de las páginas donde el usuario no tiene permisos de escritura
2. **Ícono de Candado en Sidebar**: Las páginas en modo solo lectura muestran un pequeño ícono de candado en la navegación lateral
3. **Estado del Rol Actual**: El selector de rol en el header muestra el rol actualmente seleccionado

## Implementación en Páginas

Para deshabilitar campos de entrada basados en permisos:

```tsx
import { usePagePermissions } from '../contexts/RoleContext'

function FormPage() {
  const { isReadOnly } = usePagePermissions()
  
  return (
    <PageShell title="Formulario">
      <input 
        type="text" 
        disabled={isReadOnly} 
        placeholder="Nombre del sitio"
      />
      <textarea 
        disabled={isReadOnly}
        placeholder="Descripción"
      />
      <button 
        disabled={isReadOnly}
        onClick={handleSave}
      >
        Guardar Cambios
      </button>
    </PageShell>
  )
}
```