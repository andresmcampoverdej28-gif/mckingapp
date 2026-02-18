# 🍔 Burger Viewer 3D

Una aplicación interactiva en React Native con Expo para visualizar y crear hamburguesas en 3D.

## ✨ Características

- **Vista por Capas**: Navega entre ingredientes individuales
- **Vista Ensamblada**: Visualiza la hamburguesa completa
- **Constructor Personalizado**: Arma tu propia hamburguesa
- **Modelos 3D Interactivos**: Rotación automática y selección táctil

---

## 🛠️ Tecnologías

- **React Native** + **Expo** + **TypeScript**
- **Three.js** (`@react-three/fiber`, `@react-three/drei`) - Renderizado 3D
- **Lucide React Native** - Iconos
- **Expo Router** - Navegación basada en archivos

---

## 📁 Estructura del Proyecto
```
├── app/                      # Rutas y lógica (Expo Router)
│   ├── index.tsx            # Pantalla de inicio
│   └── burger-viewer.tsx    # Pantalla principal
│
├── assets/models/           # Modelos .glb
│
├── components/              # UI (Atomic Design)
│   ├── atoms/              # Componentes básicos
│   ├── molecules/          # Combinaciones de átomos
│   ├── organisms/          # Secciones completas
│   └── templates/          # Layouts reutilizables
│
└── lib/config/             # Configuración de modelos 3D
```

---

## 💡 Conceptos Clave

### **Carga de Modelos 3D**
```tsx
// Importar (no usar require)
import model from '../../assets/models/carne.glb';

// Renderizar
<Gltf src={model} position={[0, 0, 0]} scale={2.5} />
```

### **Array Inteligente (Constructor)**
- **Índice 0**: Pan inferior (fijo)
- **Índice final**: Pan superior (se actualiza automáticamente)
- **Intermedios**: Ingredientes agregados dinámicamente

### **Rotación Automática**
```tsx
useFrame((state, delta) => {
  groupRef.current.rotation.y += delta * 0.3;
});
```

### **Interactividad**
```tsx
<Gltf 
  scale={isSelected ? 2.8 : 2.2}
  onClick={() => setSelected(id)}
/>
```

---

## 🎨 Desarrollo

### Agregar ingrediente
1. Colocar modelo en `assets/models/`
2. Importar en `lib/config/burgerModels.ts`
3. Agregar a `AVAILABLE_INGREDIENTS` e `INGREDIENT_MAP`

### Ajustar espaciado
```tsx
const LAYER_SPACING = 0.6; // Cambiar valor
```

---

## 📚 Recursos

- [Expo Docs](https://docs.expo.dev/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Lucide Icons](https://lucide.dev/icons/)

---

**Nota**: Aplicar transformaciones en Blender antes de exportar (`Object → Apply → All Transforms`)

---

**⚠️AVISO⚠️: ESTA APLICACIÓN ESTA TOTALMENTE SEPARA DE DICEAPP, DEBIDO A QUE DICHA APP SUFRIO UN ERROR POR IONICONS**

![Funcionamiento](./assets/video/Demostration.gif)