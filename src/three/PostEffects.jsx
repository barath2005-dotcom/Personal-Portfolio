import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

const PostEffects = () => {
  return (
    <EffectComposer disableNormalPass>
      <Bloom 
        luminanceThreshold={0.4} 
        intensity={0.8} 
        mipmapBlur 
      />
      <Vignette 
        offset={0.3} 
        darkness={0.7} 
      />
    </EffectComposer>
  );
};

export default PostEffects;
