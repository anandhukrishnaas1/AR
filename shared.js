/* ============================================
   PhobiaVR — Shared Utilities
   Optimized for Meta Quest & Desktop VR
   ============================================ */

// ========== META QUEST THUMBSTICK LOCOMOTION ==========
// Polls WebXR Gamepad API directly each frame for reliable Quest controller input
// Left stick = walk/strafe relative to head direction, Right stick = snap turn
AFRAME.registerComponent('thumbstick-locomotion', {
  schema: {
    speed: { type: 'number', default: 4 },
    turnSize: { type: 'number', default: 45 }
  },

  init: function () {
    this.moveX = 0;
    this.moveY = 0;
    this.turnX = 0;
    this.turnReady = true;
    this.direction = new THREE.Vector3();
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    this.worldQuat = new THREE.Quaternion();

    // Event-based fallback for desktop testing / non-WebXR
    var self = this;
    this.el.sceneEl.addEventListener('loaded', function () {
      var leftHand = self.el.querySelector('#left-hand');
      var rightHand = self.el.querySelector('#right-hand');
      if (leftHand) {
        leftHand.addEventListener('thumbstickmoved', function (evt) {
          self.moveX = evt.detail.x;
          self.moveY = evt.detail.y;
        });
        leftHand.addEventListener('axismove', function (evt) {
          if (evt.detail.axis && evt.detail.axis.length >= 4) {
            self.moveX = evt.detail.axis[2] || evt.detail.axis[0];
            self.moveY = evt.detail.axis[3] || evt.detail.axis[1];
          }
        });
      }
      if (rightHand) {
        rightHand.addEventListener('thumbstickmoved', function (evt) {
          self.turnX = evt.detail.x;
        });
        rightHand.addEventListener('axismove', function (evt) {
          if (evt.detail.axis && evt.detail.axis.length >= 4) {
            self.turnX = evt.detail.axis[2] || evt.detail.axis[0];
          }
        });
      }
    });
  },

  tick: function (time, delta) {
    if (!delta) return;
    var dt = delta / 1000;
    var rig = this.el;
    var camera = rig.querySelector('[camera]');
    if (!camera) return;

    var mx = this.moveX;
    var my = this.moveY;
    var tx = this.turnX;

    // --- DIRECT WEBXR GAMEPAD POLLING (most reliable for Meta Quest) ---
    try {
      var renderer = this.el.sceneEl.renderer;
      var xrSession = renderer && renderer.xr ? renderer.xr.getSession() : null;
      if (xrSession && xrSession.inputSources) {
        for (var i = 0; i < xrSession.inputSources.length; i++) {
          var src = xrSession.inputSources[i];
          if (src.gamepad) {
            var axes = src.gamepad.axes;
            if (src.handedness === 'left' && axes.length >= 4) {
              mx = axes[2];
              my = axes[3];
            } else if (src.handedness === 'right' && axes.length >= 4) {
              tx = axes[2];
            }
          }
        }
      }
    } catch (e) { /* WebXR not available, use event fallback */ }

    // --- MOVEMENT (left thumbstick) ---
    if (Math.abs(mx) > 0.12 || Math.abs(my) > 0.12) {
      // Use camera WORLD quaternion for correct direction after snap turns
      camera.object3D.getWorldQuaternion(this.worldQuat);
      this.euler.setFromQuaternion(this.worldQuat, 'YXZ');

      this.direction.set(mx, 0, my);
      this.euler.set(0, this.euler.y, 0);
      this.direction.applyEuler(this.euler);

      var speed = this.data.speed * dt;
      rig.object3D.position.x += this.direction.x * speed;
      rig.object3D.position.z += this.direction.z * speed;
    }

    // --- SNAP TURN (right thumbstick) ---
    if (Math.abs(tx) > 0.65 && this.turnReady) {
      this.turnReady = false;
      var sign = tx > 0 ? -1 : 1;
      rig.object3D.rotation.y += THREE.MathUtils.degToRad(this.data.turnSize * sign);
      var self = this;
      setTimeout(function () { self.turnReady = true; }, 300);
    }
    if (Math.abs(tx) < 0.25) {
      this.turnReady = true;
    }
  }
});

// ========== REALISTIC PERSON COMPONENT (THREE.js direct) ==========
// Creates detailed humanoid figures from primitives with face, hair, limbs
AFRAME.registerComponent('realistic-person', {
  schema: {
    skin: { type: 'color', default: '#c8a882' },
    shirt: { type: 'color', default: '#2a2a3a' },
    pants: { type: 'color', default: '#1a1a2a' },
    shoes: { type: 'color', default: '#111' },
    hair: { type: 'color', default: '#1a1008' },
    hairStyle: { type: 'string', default: 'short' },
    pose: { type: 'string', default: 'standing' },
    detail: { type: 'string', default: 'high' }
  },
  init: function () {
    var d = this.data;
    var g = new THREE.Group();
    var S = new THREE.MeshStandardMaterial({ color: d.skin });
    var H = new THREE.MeshStandardMaterial({ color: d.shirt });
    var P = new THREE.MeshStandardMaterial({ color: d.pants });
    var SH = new THREE.MeshStandardMaterial({ color: d.shoes });
    var HR = new THREE.MeshStandardMaterial({ color: d.hair });
    var W = new THREE.MeshStandardMaterial({ color: '#ffffff' });
    var D = new THREE.MeshStandardMaterial({ color: '#1a1a1a' });
    var L = new THREE.MeshStandardMaterial({ color: '#884444' });
    var sit = d.pose.indexOf('sit') > -1 || d.pose === 'leaning';
    function bx(w,h,dp,mt,x,y,z,rx,ry,rz) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(w,h,dp), mt);
      m.position.set(x||0,y||0,z||0);
      if(rx||ry||rz) m.rotation.set(rx||0,ry||0,rz||0);
      g.add(m); return m;
    }
    function cy(r,h,mt,x,y,z,rx,ry,rz) {
      var m = new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,8), mt);
      m.position.set(x||0,y||0,z||0);
      if(rx||ry||rz) m.rotation.set(rx||0,ry||0,rz||0);
      g.add(m); return m;
    }
    function sp(r,mt,x,y,z) {
      var m = new THREE.Mesh(new THREE.SphereGeometry(r,10,8), mt);
      m.position.set(x||0,y||0,z||0);
      g.add(m); return m;
    }
    function cn(rb,rt,h,mt,x,y,z,rx,ry,rz) {
      var m = new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,8), mt);
      m.position.set(x||0,y||0,z||0);
      if(rx||ry||rz) m.rotation.set(rx||0,ry||0,rz||0);
      g.add(m); return m;
    }

    // ---- LOW DETAIL (distant crowds) ----
    if (d.detail === 'low') {
      var bH = sit ? 0.6 : 1.0, bY = sit ? 0.7 : 0.55;
      cy(0.15, bH, H, 0, bY, 0);
      var hd = bY + bH/2 + 0.16;
      sp(0.13, S, 0, hd, 0);
      if (d.hairStyle !== 'bald') bx(0.22, 0.07, 0.2, HR, 0, hd+0.09, -0.02);
      sp(0.016, D, -0.035, hd+0.02, 0.11);
      sp(0.016, D, 0.035, hd+0.02, 0.11);
      this.el.setObject3D('mesh', g); return;
    }

    var tY = sit ? 0.78 : 0.88;

    // ---- MEDIUM DETAIL ----
    if (d.detail === 'medium') {
      bx(0.34, 0.4, 0.2, H, 0, tY, 0);
      if (sit) {
        cy(0.055, 0.35, P, -0.09, 0.48, 0.15, 1.3, 0, 0);
        cy(0.055, 0.35, P, 0.09, 0.48, 0.15, 1.3, 0, 0);
        cy(0.048, 0.35, P, -0.09, 0.22, 0.32);
        cy(0.048, 0.35, P, 0.09, 0.22, 0.32);
        bx(0.1, 0.06, 0.17, SH, -0.09, 0.04, 0.35);
        bx(0.1, 0.06, 0.17, SH, 0.09, 0.04, 0.35);
      } else {
        cy(0.058, 0.5, P, -0.09, 0.31, 0);
        cy(0.058, 0.5, P, 0.09, 0.31, 0);
        bx(0.1, 0.06, 0.17, SH, -0.09, 0.04, 0.03);
        bx(0.1, 0.06, 0.17, SH, 0.09, 0.04, 0.03);
      }
      cy(0.04, 0.3, H, -0.22, tY-0.05, 0);
      cy(0.04, 0.3, H, 0.22, tY-0.05, 0);
      sp(0.028, S, -0.22, tY-0.22, 0);
      sp(0.028, S, 0.22, tY-0.22, 0);
      cy(0.04, 0.08, S, 0, tY+0.24, 0);
      var hY = tY + 0.38;
      sp(0.13, S, 0, hY, 0);
      sp(0.017, W, -0.04, hY+0.02, 0.11);
      sp(0.017, W, 0.04, hY+0.02, 0.11);
      sp(0.01, D, -0.04, hY+0.02, 0.122);
      sp(0.01, D, 0.04, hY+0.02, 0.122);
      cn(0.018, 0.008, 0.035, S, 0, hY-0.01, 0.135, -0.3, 0, 0);
      bx(0.04, 0.008, 0.01, L, 0, hY-0.045, 0.125);
      sp(0.025, S, -0.13, hY, 0);
      sp(0.025, S, 0.13, hY, 0);
      if (d.hairStyle === 'short') { bx(0.24, 0.07, 0.2, HR, 0, hY+0.1, -0.02); bx(0.25, 0.12, 0.09, HR, 0, hY+0.04, -0.1); }
      else if (d.hairStyle === 'medium') { bx(0.25, 0.08, 0.22, HR, 0, hY+0.1, -0.02); bx(0.04, 0.12, 0.14, HR, -0.12, hY-0.01, -0.02); bx(0.04, 0.12, 0.14, HR, 0.12, hY-0.01, -0.02); }
      else if (d.hairStyle === 'long') { bx(0.25, 0.08, 0.22, HR, 0, hY+0.1, -0.02); bx(0.22, 0.28, 0.07, HR, 0, hY-0.14, -0.1); bx(0.04, 0.2, 0.14, HR, -0.13, hY-0.08, -0.02); bx(0.04, 0.2, 0.14, HR, 0.13, hY-0.08, -0.02); }
      this.el.setObject3D('mesh', g); return;
    }

    // ---- HIGH DETAIL ----
    bx(0.36, 0.44, 0.22, H, 0, tY, 0);
    bx(0.12, 0.04, 0.06, S, 0, tY+0.22, 0.08);
    sp(0.065, H, -0.2, tY+0.18, 0);
    sp(0.065, H, 0.2, tY+0.18, 0);
    bx(0.37, 0.04, 0.23, SH, 0, tY-0.2, 0);
    // Legs
    if (sit) {
      cy(0.06, 0.38, P, -0.1, 0.50, 0.16, 1.3, 0, 0);
      cy(0.06, 0.38, P, 0.1, 0.50, 0.16, 1.3, 0, 0);
      cy(0.05, 0.38, P, -0.1, 0.24, 0.35);
      cy(0.05, 0.38, P, 0.1, 0.24, 0.35);
      bx(0.11, 0.07, 0.2, SH, -0.1, 0.04, 0.38);
      bx(0.11, 0.07, 0.2, SH, 0.1, 0.04, 0.38);
    } else {
      cy(0.065, 0.4, P, -0.1, 0.46, 0);
      cy(0.065, 0.4, P, 0.1, 0.46, 0);
      cy(0.055, 0.4, P, -0.1, 0.2, 0);
      cy(0.055, 0.4, P, 0.1, 0.2, 0);
      bx(0.12, 0.08, 0.22, SH, -0.1, 0.04, 0.04);
      bx(0.12, 0.08, 0.22, SH, 0.1, 0.04, 0.04);
    }
    // Arms
    if (d.pose === 'sitting-crossed') {
      cy(0.045, 0.3, H, -0.25, tY, 0.02, 0, 0, 0.8);
      cy(0.045, 0.3, H, 0.25, tY, 0.02, 0, 0, -0.8);
      cy(0.04, 0.28, H, -0.1, tY-0.1, 0.1, 0.2, 0, -0.7);
      cy(0.04, 0.28, H, 0.1, tY-0.1, 0.1, 0.2, 0, 0.7);
      sp(0.032, S, 0.12, tY-0.15, 0.12);
      sp(0.032, S, -0.12, tY-0.15, 0.12);
    } else if (d.pose === 'leaning') {
      cy(0.045, 0.3, H, -0.25, tY-0.02, 0.08, 0.5, 0, 0.15);
      cy(0.045, 0.3, H, 0.25, tY-0.02, 0.08, 0.5, 0, -0.15);
      sp(0.035, S, -0.2, tY-0.18, 0.22);
      sp(0.035, S, 0.2, tY-0.18, 0.22);
    } else if (d.pose === 'sitting') {
      cy(0.045, 0.3, H, -0.24, tY-0.02, 0.08, 0.4, 0, 0.1);
      cy(0.045, 0.3, H, 0.24, tY-0.02, 0.08, 0.4, 0, -0.1);
      sp(0.035, S, -0.18, tY-0.18, 0.2);
      sp(0.035, S, 0.18, tY-0.18, 0.2);
    } else {
      cy(0.045, 0.32, H, -0.25, tY-0.02, 0);
      cy(0.045, 0.32, H, 0.25, tY-0.02, 0);
      cy(0.04, 0.28, S, -0.25, tY-0.32, 0);
      cy(0.04, 0.28, S, 0.25, tY-0.32, 0);
      sp(0.032, S, -0.25, tY-0.46, 0);
      sp(0.032, S, 0.25, tY-0.46, 0);
    }
    // Neck
    cy(0.05, 0.1, S, 0, tY+0.27, 0);
    // Head
    var hY = tY + 0.42;
    sp(0.135, S, 0, hY, 0);
    // Face
    sp(0.02, W, -0.045, hY+0.025, 0.115);
    sp(0.02, W, 0.045, hY+0.025, 0.115);
    sp(0.012, D, -0.045, hY+0.025, 0.13);
    sp(0.012, D, 0.045, hY+0.025, 0.13);
    bx(0.05, 0.012, 0.015, HR, -0.045, hY+0.06, 0.115);
    bx(0.05, 0.012, 0.015, HR, 0.045, hY+0.06, 0.115);
    cn(0.022, 0.01, 0.04, S, 0, hY-0.01, 0.14, -0.3, 0, 0);
    bx(0.045, 0.012, 0.01, L, 0, hY-0.05, 0.125);
    sp(0.03, S, -0.14, hY, 0);
    sp(0.03, S, 0.14, hY, 0);
    // Hair
    if (d.hairStyle === 'short') {
      bx(0.24, 0.08, 0.22, HR, 0, hY+0.1, -0.02);
      bx(0.26, 0.13, 0.1, HR, 0, hY+0.04, -0.1);
    } else if (d.hairStyle === 'medium') {
      bx(0.26, 0.1, 0.24, HR, 0, hY+0.1, -0.02);
      bx(0.28, 0.18, 0.12, HR, 0, hY+0.02, -0.1);
      bx(0.04, 0.14, 0.16, HR, -0.13, hY-0.02, -0.02);
      bx(0.04, 0.14, 0.16, HR, 0.13, hY-0.02, -0.02);
    } else if (d.hairStyle === 'long') {
      bx(0.26, 0.1, 0.24, HR, 0, hY+0.1, -0.02);
      bx(0.28, 0.2, 0.12, HR, 0, hY+0.01, -0.1);
      bx(0.24, 0.3, 0.08, HR, 0, hY-0.16, -0.1);
      bx(0.04, 0.22, 0.16, HR, -0.14, hY-0.08, -0.02);
      bx(0.04, 0.22, 0.16, HR, 0.14, hY-0.08, -0.02);
    }
    this.el.setObject3D('mesh', g);
  }
});

// Breathing guide controller
class BreathingGuide {
  constructor() {
    this.el = document.querySelector('.breath-circle');
    this.phases = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
    this.durations = [4000, 2000, 4000, 2000];
    this.currentPhase = 0;
    if (this.el) this.start();
  }

  start() {
    this.update();
  }

  update() {
    if (!this.el) return;
    this.el.textContent = this.phases[this.currentPhase];
    setTimeout(() => {
      this.currentPhase = (this.currentPhase + 1) % this.phases.length;
      this.update();
    }, this.durations[this.currentPhase]);
  }
}

// Detect if in VR mode
function isInVRMode() {
  return document.querySelector('a-scene').is('vr-mode');
}

// Detect device type
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Meta|Quest/.test(ua)) return 'quest';
  if (/Mobile|Android|iPhone/.test(ua)) return 'mobile';
  return 'desktop';
}

// Optimize scene for Quest
function optimizeForQuest() {
  const scene = document.querySelector('a-scene');
  scene.setAttribute('inspector', 'url: https://cdn.jsdelivr.net/npm/aframe-inspector@7.0.0/dist/aframe-inspector.min.js');
  // Reduce shadow casting on Quest
  document.querySelectorAll('a-light').forEach(light => {
    light.setAttribute('cast-shadow', false);
  });
}

// Anxiety meter controller
class AnxietyMeter {
  constructor() {
    this.fill = document.querySelector('.meter-fill');
    this.level = 30;
    this.targetLevel = 30;
  }

  setLevel(val) {
    this.targetLevel = Math.max(5, Math.min(100, val));
    this.animate();
  }

  animate() {
    if (!this.fill) return;
    const step = () => {
      if (Math.abs(this.level - this.targetLevel) < 1) {
        this.level = this.targetLevel;
        this.fill.style.height = this.level + '%';
        return;
      }
      this.level += (this.targetLevel - this.level) * 0.1;
      this.fill.style.height = this.level + '%';
      requestAnimationFrame(step);
    };
    step();
  }

  increase(amount = 10) { this.setLevel(this.targetLevel + amount); }
  decrease(amount = 10) { this.setLevel(this.targetLevel - amount); }
}

// Comfort messages
const comfortMessages = [
  "You're safe. This is a virtual environment. 💚",
  "Take a deep breath. You're in control.",
  "It's okay to feel uncomfortable. That means you're growing.",
  "You can leave anytime. There's no pressure.",
  "Focus on your breathing. In... and out...",
  "You're doing amazing. One step at a time.",
  "This feeling will pass. You are strong.",
  "Remember: courage isn't the absence of fear.",
];

function showComfortMessage() {
  const el = document.querySelector('.comfort-msg');
  if (!el) return;
  const msg = comfortMessages[Math.floor(Math.random() * comfortMessages.length)];
  el.textContent = msg;
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, 5000);
}

// Level switching
function switchLevel(levelNum, sceneConfigs) {
  // Update button states
  document.querySelectorAll('.level-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === levelNum - 1);
  });

  // Apply scene config
  if (sceneConfigs && sceneConfigs[levelNum]) {
    sceneConfigs[levelNum]();
  }

  showComfortMessage();
}

// Initialize common UI
function initPhobiaScene(sceneConfigs) {
  const breathGuide = new BreathingGuide();
  const anxietyMeter = new AnxietyMeter();

  // Set initial level
  switchLevel(1, sceneConfigs);

  // Level buttons
  document.querySelectorAll('.level-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      switchLevel(i + 1, sceneConfigs);
      anxietyMeter.setLevel(20 + i * 30);
    });
  });

  // Periodic comfort messages
  setInterval(showComfortMessage, 20000);

  // Show first message after 3 seconds
  setTimeout(showComfortMessage, 3000);

  return { breathGuide, anxietyMeter };
}

// A-Frame component: gentle floating animation
AFRAME.registerComponent('float-anim', {
  schema: {
    amplitude: { type: 'number', default: 0.3 },
    speed: { type: 'number', default: 1500 }
  },
  init: function() {
    const pos = this.el.getAttribute('position');
    this.el.setAttribute('animation', {
      property: 'position',
      to: `${pos.x} ${pos.y + this.data.amplitude} ${pos.z}`,
      dur: this.data.speed,
      easing: 'easeInOutSine',
      loop: true,
      dir: 'alternate'
    });
  }
});

// A-Frame component: look-at-camera
AFRAME.registerComponent('face-camera', {
  tick: function() {
    const camera = document.querySelector('[camera]');
    if (camera) {
      const camPos = camera.getAttribute('position');
      this.el.object3D.lookAt(camPos.x, camPos.y, camPos.z);
    }
  }
});

// A-Frame component: gradual opacity
AFRAME.registerComponent('fade-in', {
  schema: { dur: { type: 'number', default: 2000 } },
  init: function() {
    this.el.setAttribute('material', 'opacity', 0);
    this.el.setAttribute('animation__fadein', {
      property: 'material.opacity',
      from: 0,
      to: 1,
      dur: this.data.dur,
      easing: 'easeInOutQuad'
    });
  }
});

// A-Frame component: realistic material
AFRAME.registerComponent('realistic-material', {
  schema: {
    roughness: { type: 'number', default: 0.6 },
    metalness: { type: 'number', default: 0.2 }
  },
  init: function() {
    this.el.setAttribute('material', {
      roughness: this.data.roughness,
      metalness: this.data.metalness,
      envMap: '#envMap'
    });
  }
});

// Initialize controller detection for Quest
function initControllers() {
  const scene = document.querySelector('a-scene');
  
  // Left controller
  const leftController = document.createElement('a-entity');
  leftController.setAttribute('hand-controls', 'hand: left');
  leftController.setAttribute('raycaster', 'objects: .clickable');
  scene.appendChild(leftController);
  
  // Right controller
  const rightController = document.createElement('a-entity');
  rightController.setAttribute('hand-controls', 'hand: right');
  rightController.setAttribute('raycaster', 'objects: .clickable');
  scene.appendChild(rightController);
}

// Initialize VR scene
function initVRPhobiaApp() {
  const device = getDeviceType();
  if (device === 'quest') {
    optimizeForQuest();
    initControllers();
  }
}
