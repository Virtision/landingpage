
module.exports = AFRAME.registerComponent('camera-height-fix', {
    init: function () {
        console.log("initializing height fix");
        const el = this.el;
        el.sceneEl.addEventListener('enter-vr', function () {
            if(AFRAME.utils.device.isMobile() && !AFRAME.utils.device.checkHeadsetConnected()){
                console.log("DEBUG: applying height fix");
                let position = el.getAttribute('position');
                position.y = 1.6;
                el.setAttribute('position', position);
            }
        });
    }
});

