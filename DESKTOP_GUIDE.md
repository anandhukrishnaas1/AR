# 💻 PhobiaVR — Desktop/Laptop Guide

Complete guide for using PhobiaVR on Windows, Mac, or Linux with desktop VR headsets or just your computer screen.

## 🖥️ System Requirements

- **Desktop/Laptop Computer** (Windows/Mac/Linux)
- **Modern Web Browser** (Chrome, Firefox, Edge, Safari)
- **4GB+ RAM** (8GB recommended for VR)
- **GPU** (Integrated or dedicated for best performance)
- **VR Headset** (Optional: HTC Vive, Valve Index, etc.)

## 🔧 Setup Instructions

### Step 1: Start the Server

**Windows (Command Prompt)**:
```cmd
cd Desktop\AR
python -m http.server 3009
```

**Mac (Terminal)**:
```bash
cd ~/Desktop/AR
python3 -m http.server 3009
```

**Linux (Terminal)**:
```bash
cd ~/Desktop/AR
python3 -m http.server 3009
```

Output should show:
```
Serving HTTP on :: port 3009 (http://[::]:3009/)
```

### Step 2: Open Browser

1. Open **Chrome**, **Firefox**, **Edge**, or **Safari**
2. Navigate to: `http://localhost:3009`
3. You should see the **PhobiaVR Landing Page** with 4 therapy cards

### Step 3: Choose Your Mode

#### Option A: Desktop Exploration (No VR)
- Use **mouse + keyboard** to navigate
- View on regular monitor
- Best for exploring, learning scenes

#### Option B: VR Headset (If You Have One)
- Connect VR headset (HTC Vive, Valve Index, etc.)
- Click **VR Goggles Icon** (🥽)
- Enter full VR immersion

#### Option C: Full Screen Experience
- **F11** to go fullscreen
- Use mouse/keyboard
- Immersive on regular monitor

## 🎮 Desktop Controls

### Keyboard Controls

| Key | Action |
|-----|--------|
| **W** | Move Forward |
| **A** | Move Left |
| **S** | Move Backward |
| **D** | Move Right |
| **↑** | Move Forward (Arrow) |
| **↓** | Move Backward (Arrow) |
| **←** | Move Left (Arrow) |
| **→** | Move Right (Arrow) |
| **Space** | Jump (if enabled) |
| **Mouse Wheel** | Zoom in/out |

### Mouse Controls

| Action | Function |
|--------|----------|
| **Click + Drag** | Look around |
| **Left Click** | Select/Interact |
| **Right Click** | Context menu |
| **Scroll** | Zoom |

### Optimal Setup for Laptop

```
Physical Setup:
↓ Monitor (eye level, arm's length away)
↑ Keyboard (in lap or desk)
↑ Mouse (right side of keyboard)
→ Comfortable chair with armrest
```

## 🚀 Getting Started

### Session 1: Landing Page Exploration

1. Open browser at `http://localhost:3009`
2. Read the introduction text
3. Notice the 4 therapy cards:
   - 🗣️ Social Anxiety
   - 🏔️ Acrophobia
   - 🌊 Aquaphobia
   - 🌑 Nyctophobia
4. Scroll down to see "How It Works" info

### Session 2: Enter First Phobia

1. Click **one of the therapy cards**
2. Scene loads (may take 2-5 seconds depending on connection)
3. You see the **scene controls**:
   - Level selector at top
   - Breathing guide at bottom
   - Anxiety meter on right
4. **Try the controls**:
   - Move mouse around → Look around
   - Press W/A/S/D → Walk around room
   - Notice breathing circle animating

### Session 3: Explore All Three Levels

For **Social Anxiety** (Example):

**Level 1 (Café)**:
- Quiet, cozy environment
- 2-3 people visible
- Warm lighting, small space
- Click "Level 1: Café" button to stay here

**Level 2 (Classroom)**:
- Larger room with desks
- 8-10 students visible
- Everyone facing forward
- Click "Level 2: Classroom" button to switch

**Level 3 (Auditorium)**:
- Large stage with spotlight
- Hundreds of audience members (silhouettes)
- Stage lights and microphone
- Click "Level 3: Auditorium" button

## 💡 Tips for Best Experience

### Visual Quality
- **Full Screen** (F11) for immersion
- **Dark room** for better visibility
- **Monitor brightness** at 70-80%
- Position **VR headset comfortably** (if using)

### Performance
- **Close Other Tabs/Apps** before session
- **6+ FPS needed** for smooth experience (usually 30+ FPS on desktop)
- **GPU acceleration** enabled in browser
- **Hardware acceleration** on (Chrome: Settings → Advanced)

### Accessibility
- **Enlarge Text** (Ctrl + Plus)
- **Reduce Motion** (Ctrl + Alt + U in Chrome)
- **High Contrast Mode** (Windows: Settings → Ease of Access)
- **Font Size** adjustable in browser settings

## 📊 Tracking Progress

### Session Log Template

```
Date: 3/5/26
Device: Desktop (Laptop)
Phobia: Social Anxiety
Level: 1 (Café)
Duration: 12 minutes

Anxiety Levels:
- Start: 7/10
- Mid: 6/10
- End: 5/10

Breathing Effectiveness: ⭐⭐⭐⭐⭐
Notes: Felt calmer when focusing on breathing. Ready for Level 2 next time.
```

### Weekly Goals

📆 **Week 1**
- [ ] Try all 4 phobias at Level 1
- [ ] Complete 3-5 sessions minimum
- [ ] Get comfortable with controls
- [ ] Test breathing guide effectiveness

📆 **Week 2**
- [ ] Pick primary phobia to focus on
- [ ] Master Level 1 (multiple sessions until comfortable)
- [ ] Begin Level 2
- [ ] Notice improvements in anxiety levels

📆 **Week 3+**
- [ ] Progress through Level 3
- [ ] Maintain consistent practice
- [ ] Document improvements
- [ ] Consider multiple phobias

## 🎯 Session Recommendations

### Beginner Session (10 minutes)
```
1. Open app (2 min)
2. Choose one phobia at Level 1 (8 min)
3. Close mindfully (no rush)
```

### Intermediate Session (15 minutes)
```
1. Warm-up: Breathing exercise (2 min)
2. Level 1 review (3 min)
3. Level 2 exploration (10 min)
```

### Advanced Session (20+ minutes)
```
1. Breathing prep (1 min)
2. Level 1 (2 min) - warm-up
3. Level 2 (8 min) - main work
4. Level 3 (7 min) - challenge
5. Wrap-up (2 min) - reflect
```

## 🛠️ Troubleshooting

### Page Won't Load

**Problem**: "Cannot reach localhost"

**Solution**:
- [ ] Check server is running (you should see `Serving HTTP...` in terminal)
- [ ] Try: `http://127.0.0.1:3009` instead
- [ ] Check firewall isn't blocking port 3009
- [ ] Try different browser
- [ ] Disable VPN if active

### Scene Loads But Controls Don't Work

**Problem**: Can't move or look around

**Solution**:
- [ ] Click IN the scene area first (to focus)
- [ ] Check **mouse look is enabled** (should auto-enable on click)
- [ ] Try keyboard controls (W/A/S/D)
- [ ] Try refreshing page (F5)
- [ ] Update browser to latest version

### Scenes Look Blurry or Pixelated

**Problem**: Graphics quality poor

**Solution**:
- [ ] Increase browser zoom: Ctrl + Plus
- [ ] Enable GPU acceleration in browser settings
- [ ] Update graphics drivers
- [ ] Close other browser tabs
- [ ] Try 4K monitor for better native resolution

### Performance Issues (Lag/Stuttering)

**Problem**: Scene feels slow/choppy

**Solution**:
- [ ] Close unnecessary apps
- [ ] Reduce browser tabs open
- [ ] Disable browser extensions
- [ ] Update graphics drivers
- [ ] Lower monitor refresh rate if > 144Hz
- [ ] Try at lower resolution

### Breathing Guide Won't Animate

**Problem**: Circle not moving or text not updating

**Solution**:
- [ ] Refresh page (F5)
- [ ] Check browser console (F12)
- [ ] Try different browser
- [ ] Clear browser cache
- [ ] Check JavaScript is enabled

### Anxiety Meter Not Showing

**Problem**: Right side meter is missing or broken

**Solution**:
- [ ] Zoom out (Ctrl + Minus) if too zoomed in
- [ ] Resize browser window (might be off-screen)
- [ ] Full screen (F11)
- [ ] Try different resolution

## ⚙️ Advanced Configuration

### Keyboard Customization

Edit `shared.js` to change key bindings (advanced users):
```javascript
// Example: Add custom callbacks
document.addEventListener('keydown', function(e) {
  if (e.key === 'q') { /* do something */ }
});
```

### Performance Optimization

**For Slower Computers**:
- Reduce scene complexity (but scenes are already optimized)
- Close browser tabs
- Update drivers
- Disable extensions
- Use Chrome instead of Firefox (better performance)

**For Faster Computers**:
- Enable highest quality (auto-detected)
- Multiple monitors supported
- VR headset integration recommended

### Accessibility Setup

```
Windows:
Settings → Ease of Access → Display
→ Turn on High Contrast Mode
→ Increase text size (125-150%)

Mac:
System Preferences → Accessibility
→ Zoom: On
→ Display: Increase Contrast

Linux (GNOME):
Settings → Universal Access
→ Zoom: On
→ Color: Increase Contrast
```

## 🎓 Educational Use

### Classroom Setup

1. **Single Computer** (Instructor):
   ```
   - Connect laptop to projector
   - Full screen app (F11)
   - Demo one phobia per session
   - Discuss therapeutic principles
   ```

2. **Multiple Computers** (Individual Practice):
   ```
   - Each student gets URL
   - Follow at own pace
   - Monitor on instructor screen
   - Debrief afterward
   ```

## 📱 Extending to Mobile

To use on tablets/phones:

1. **Get Your Computer's IP**:
   - Windows: `ipconfig` → IPv4 Address
   - Mac/Linux: `ifconfig` → inet address

2. **Connect Phone to WiFi**

3. **Visit**: `http://YOUR_IP:3009` in phone browser

4. **Enjoy**: Touch controls auto-enable

## 🔒 Privacy & Security

- **No online data** — Everything runs locally
- **No tracking** — No analytics or cookies
- **Privacy respecting** — Works offline after initial load
- **Secure** — HTTPS recommended if exposed to internet

## 🎯 Goals to Track

- [ ] Complete Level 1 of chosen phobia
- [ ] Reach 50% anxiety reduction by end of session
- [ ] Maintain steady breathing pattern for 5+ minutes
- [ ] Progress to Level 2
- [ ] Master all 3 levels
- [ ] Practice consistently 3+ days/week

---

**Start your journey today! Open `http://localhost:3009` and begin. 🚀**

Questions? Check the main [README.md](README.md) or [META_QUEST_GUIDE.md](META_QUEST_GUIDE.md)
