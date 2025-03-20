import { HoverMaterial } from '../components/textureplane/hoverMaterial';
import { OrganicMaterial } from '../components/organicGrowth/growthMaterial';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      hoverMaterial: ReactThreeFiber.Object3DNode<HoverMaterial, typeof HoverMaterial>;
      organicMaterial: ReactThreeFiber.Object3DNode<OrganicMaterial, typeof OrganicMaterial>;
    }
  }
}