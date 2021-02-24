
module.exports = AFRAME.registerComponent('gamma-fix', {
    init: function () {
        //as per https://github.com/aframevr/aframe/issues/3509
        var gammaFactor = 1.8;
        console.log("Setting gamma to " + gammaFactor);
        const el = this.el;
        el.renderer.gammaInput = true;
        el.renderer.gammaOutput = true;
        el.renderer.gammaFactor = gammaFactor;
        
        el.addEventListener('loaded', function (e) {
          el.object3D.traverse(function (o) {
            if (o.isMesh && o.material.map)  {
              o.material.map.encoding = THREE.sRGBEncoding;
              o.material.needsUpdate = true;
            }
          });
        });
    }
});