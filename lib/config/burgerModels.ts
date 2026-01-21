// Importar todos los modelos
import carneModel from '../../assets/models/carne.glb';
import lechugaModel from '../../assets/models/lechuga.glb';
import panInferiorModel from '../../assets/models/panInferior.glb';
import panSuperiorModel from '../../assets/models/panSuperior.glb';
import quesoModel from '../../assets/models/queso.glb';
import tomateModel from '../../assets/models/tomate.glb';

// Exportar objeto con todos los modelos
export const burgerModels = {
  panSuperior: panSuperiorModel,
  queso: quesoModel,
  lechuga: lechugaModel,
  tomate: tomateModel,
  carne: carneModel,
  panInferior: panInferiorModel,
};

// Tipos
export type BurgerModelKey = keyof typeof burgerModels;