/* ============================================
   PhobiaVR — Shared Utilities
   Optimized for Meta Quest & Desktop VR
   ============================================ */

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
