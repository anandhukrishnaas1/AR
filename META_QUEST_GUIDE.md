# 🥽 PhobiaVR — Meta Quest Setup Guide

Complete guide to using PhobiaVR on Meta Quest 2, 3, and Pro.

## 📋 System Requirements

- **Meta Quest 2, 3, or Pro**
- **WiFi Connection** (5GHz recommended for best performance)
- **Recent Browser** (Meta Horizon Browser or Firefox)
- **8GB+ RAM** (recommended)

## 🔧 Setup Instructions

### Step 1: Start the Server

On your **Windows/Mac/Linux computer**:

```bash
cd /Users/anandhukrishnaas/Desktop/AR
python3 -m http.server 3009
```

Server will run at: `http://localhost:3009`

### Step 2: Connect to Network

1. **Get Your Computer's IP Address**
   - **Windows**: Open Command Prompt → type `ipconfig` → look for "IPv4 Address" (ex: 192.168.1.100)
   - **Mac/Linux**: Open Terminal → type `ifconfig` → look for "inet" under your network adapter
   
2. **Ensure Both Devices on Same WiFi**
   - Quest and Computer must be on the same network
   - **5GHz WiFi recommended** for better performance

### Step 3: Launch on Quest

1. **Put on your Meta Quest headset**

2. **Open the Browser App**
   - Go to: Meta Horizon Home
   - Look for: **Horizon Browser** or **Firefox**
   - (Or press Meta button + search for "Browser")

3. **Navigate to PhobiaVR**
   - Address bar: `http://<YOUR_COMPUTER_IP>:3009`
   - Example: `http://192.168.1.100:3009`
   - Press **Enter**

4. **Enter VR Mode**
   - Wait for page to load
   - Look for the **VR Goggles Icon** (🥽) in the scene
   - Click with your **right controller trigger**
   - Boom 🎮 — Full immersion!

## 🎮 Quest Controls

### Button Mapping

| Action | Button |
|--------|--------|
| **Look Around** | Head movement |
| **Select Level** | Right Trigger (click) |
| **Go Back** | Left Trigger |
| **Teleport** | Right Thumbstick forward |
| **Turn** | Left/Right Thumbstick |
| **Grab UI** | Grip buttons |

### Hand Controller Tips

- **Point Your Hand** — Aim with your hand
- **Trigger = Click** — Pull right trigger to interact
- **Thumbstick = Move** — Teleport forward/backward
- **Head Tracking** — Natural head movements control view

## ⚡ Performance Tips

### Best Performance
✅ Use **5GHz WiFi** instead of 2.4GHz
✅ Close other apps before starting
✅ Ensure **good WiFi signal** (bars: Full)
✅ Position computer with **clear line of sight** to router
✅ Use **Ethernet** on PC for best stability

### If Experiencing Lag

1. **Check WiFi Signal**
   - Move closer to router
   - Restart WiFi (unplug router for 30 seconds)

2. **Lower Graphics**
   - Scenes auto-optimize, but you can reduce movement speed

3. **Restart**
   - Close browser on Quest
   - Ctrl+C on server
   - Restart both

4. **Use 5GHz Band**
   - In Quest Settings → WiFi → Select 5GHz network

## 🚀 Quick Start

### Complete Workflow

```
1. Computer: Start Server
   $ python3 -m http.server 3009
   
2. Quest: Open Browser
   > Meta Horizon Home → Horizon Browser
   
3. Quest: Enter URL
   > http://192.168.1.100:3009 (replace with your IP)
   
4. Quest: Wait for Landing Page
   > See PhobiaVR cards load
   
5. Quest: Click VR Mode
   > Right Trigger on goggles icon
   
6. Quest: Choose Session
   > Point & Trigger to select phobia
   
7. Quest: Select Level
   > Start with Level 1
   
8. Quest: Explore & Breathe
   > Follow on-screen breathing guide
```

## 🎯 Session Tips

### During a Session

- **Follow the Breathing Guide** — Animated circle shows when to breathe
- **Watch the Anxiety Meter** — Right side shows stress levels
- **Read Comfort Messages** — Appear periodically
- **Take Your Time** — No rush, progress at your pace
- **Exit Anytime** — Press Meta button to leave

### Between Sessions

- **Rest 5-10 Minutes** — Let your body relax
- **Hydrate** — Drink water
- **Document** — Note which levels felt comfortable
- **Gradually Increase** — Move up levels when ready

## 🛠️ Troubleshooting

### Can't Find Server

**Problem**: "Connection refused" or "Can't reach server"

**Solution**:
- [ ] Check computer IP is correct
- [ ] Ping computer from Quest browser: `ping 192.168.x.x`
- [ ] Restart server on computer: `python3 -m http.server 3009`
- [ ] Whitelist app in firewall (Windows Firewall/Mac Firewall)
- [ ] Try ethernet cable on PC

### VR Mode Not Working

**Problem**: Can't enter VR, no goggles icon, or headset not detected

**Solution**:
- [ ] Update Meta Quest firmware
- [ ] Restart Quest (hold power, select restart)
- [ ] Restart browser
- [ ] Try Firefox instead of Horizon Browser (or vice versa)
- [ ] Check if WebXR is enabled in browser settings

### Performance Issues / Lag

**Problem**: Stuttering, slow movement, lag

**Solution**:
- [ ] Use **5GHz WiFi** (not 2.4GHz)
- [ ] Move closer to router
- [ ] Close background apps on PC and Quest
- [ ] Check WiFi signal strength (Full bars)
- [ ] Restart both devices
- [ ] Lower scene complexity (simpler levels)

### Scenes Look Dark/Washed Out

**Problem**: Graphics seem dim or overly bright

**Solution**:
- [ ] Adjust room lighting
- [ ] Check brightness settings in Quest
- [ ] Clear browser cache: Browser menu → Settings → Clear Cache
- [ ] Try different level (some levels intentionally dark)

### Motion Sickness

**Problem**: Feel dizzy or nauseous

**Solution**:
- [ ] Take a break (5-10 min)
- [ ] Ensure good WiFi (smooth movement reduces nausea)
- [ ] Use teleportation movement instead of continuous
- [ ] Focus on a fixed point while adjusting
- [ ] Start with easier levels
- [ ] Consult a doctor if persistent

## 📊 Monitoring Your Progress

### Track Improvements

Keep a log of sessions:

```
Date: 3/5/26
Phobia: Social Anxiety
Level: 2 (Classroom)
Duration: 10 min
Anxiety Started: 8/10 → Ended: 5/10
Notes: Felt more comfortable after breathing exercise
```

### Goal Progression

- **Week 1-2**: Level 1 only
- **Week 3-4**: Comfortable with L1, start L2
- **Week 5-6**: Master L2, attempt L3
- **Week 7+**: Maintain L3, repeat as needed

## 📞 Support

### In-App Help
- Breathing guide: Bottom of screen
- Anxiety meter: Right side
- Comfort messages: Auto-appear
- Back button: Top left (press trigger)

### Technical Help
- **WiFi Issues**: Contact your ISP or router manufacturer
- **Quest Issues**: Visit Meta Support Portal
- **Browser Issues**: Check browser documentation
- **Performance**: Update drivers and software

## ✅ Performance Checklist

Before each session:
- [ ] WiFi connected (5GHz preferred)
- [ ] Server running on computer
- [ ] Quest fully charged
- [ ] Enough play space (1.5m x 1.5m minimum)
- [ ] Controllers have good battery
- [ ] Headset straps adjusted comfortably
- [ ] Room is safe (clear of obstacles)

## 🎯 Recommended Settings

### WiFi
- Band: 5GHz (higher speed)
- Distance from router: < 10 meters
- No walls between Quest and router (ideally)

### Quest Audio
- Volume: 50-70% (therapeutic)
- Headphones: Built-in fine, or add Quest headphones
- Mic: Off (for privacy)

### Session Timing
- Duration: 10-20 minutes per session
- Frequency: 3-5 times per week
- Time of Day: When you're alert and calm

## 🚀 Advanced Tips

### Custom Network Setup
If you have multiple networks:
```bash
# To use specific network interface:
python3 -m http.server 3009 --bind 192.168.1.100
```

### Monitor Performance
Watch Quest statistics:
- Frame rate should stay 72+ FPS (Quest 2/3)
- 90+ FPS for Quest Pro
- If lower, check WiFi signal

### Record Sessions (Optional)
Use Meta's built-in capture:
- Hold right controller: Menu + Trigger
- Saves to Quest storage

## 📱 Alternative: Using Phone as Hotspot

If WiFi unreliable:
1. Connect PC to phone's hotspot
2. Connect Quest to same hotspot
3. Use local IP on Quest browser

(Note: May have higher latency)

---

**Enjoy your journey toward recovered confidence! 🌟**

For more help, visit: https://www.meta.com/quest/support/
