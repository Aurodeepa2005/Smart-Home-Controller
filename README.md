# 🏠 IoT Smart Home Controller

## C++ OOP Concept Implementation in Web Application

A fully functional IoT Smart Home Controller that demonstrates C++ Object-Oriented Programming concepts using HTML, CSS, and JavaScript.

---
## Live Demo
[![Live Demo](https://img.shields.io/badge/VIEW-LIVE-green?style=for-the-badge)](https://aurodeepa2005.github.io/Smart-Home-Controller/)


## 📁 Project Structure

```
iot-smart-home-controller/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and layout
├── script.js           # Core logic with OOP concepts
└── README.md           # This file
```

---

## 🚀 How to Run

### Method 1: Direct File Opening
1. Save all three files (`index.html`, `styles.css`, `script.js`) in the same folder
2. Double-click `index.html` to open in your browser
3. Start adding and controlling devices!

### Method 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Then open: http://localhost:8000
```

---

## 🎯 Features

### ✅ Device Types Supported
- 💡 **Light** - Adjustable brightness (0-100%)
- 🌀 **Fan** - Variable speed control (0-5 levels)
- ❄️ **Air Conditioner (AC)** - Temperature control (16-30°C)
- 🌡️ **Thermostat** - Temperature settings (16-30°C)
- 📹 **Security Camera** - Basic ON/OFF control

### ✅ Key Functionalities
- ➕ Add new devices with custom names
- 🔄 Toggle device power (ON/OFF)
- ⚙️ Adjust device parameters (brightness, speed, temperature)
- 🌐 Online/Offline connectivity simulation
- 🗑️ Delete devices from system
- 📋 Real-time activity logging with timestamps
- 📱 Responsive design for all screen sizes

---

## 🎓 C++ OOP Concepts Implemented

### 1. **Classes & Objects**
```javascript
class Device {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
```
**C++ Equivalent:**
```cpp
class Device {
private:
    string name;
    string type;
public:
    Device(string n, string t) : name(n), type(t) {}
};
```

### 2. **Inheritance**
```javascript
class SmartDevice extends Device {
    constructor(name, type) {
        super(name, type); // Call parent constructor
    }
}
```
**C++ Equivalent:**
```cpp
class SmartDevice : public Device {
public:
    SmartDevice(string n, string t) : Device(n, t) {}
};
```

### 3. **Encapsulation**
- Private data through class properties
- Public methods for controlled access
- Getter/setter methods for data manipulation

### 4. **Polymorphism**
```javascript
togglePower() {
    const result = super.togglePower(); // Override parent method
    return result;
}
```

### 5. **Data Structures (Vector-like behavior)**
```javascript
class DeviceController {
    constructor() {
        this.devices = []; // Like C++ vector<Device*>
    }
    
    addDevice(device) {
        this.devices.push(device); // Like vector::push_back()
    }
}
```

### 6. **Template-like Behavior**
Different device types with varying parameters:
- Light: `{name: 'Brightness', min: 0, max: 100}`
- Fan: `{name: 'Speed', min: 0, max: 5}`
- AC: `{name: 'Temperature', min: 16, max: 30}`

---

## 🔧 Code Architecture

### Device Class Hierarchy

```
Device (Base Class)
├── Properties: name, type, powerState, connectivity, id
├── Methods: togglePower(), getStatus(), setConnectivity()
│
└── SmartDevice (Derived Class)
    ├── Additional Properties: hasAdjustable, adjustableParam
    └── Additional Methods: updateAdjustable()
```

### Controller Pattern

```
DeviceController
├── devices[] (Array/Vector of devices)
├── addDevice()      → Add new device
├── removeDevice()   → Delete device
├── getDevice()      → Retrieve specific device
├── getAllDevices()  → Get all devices
└── logActivity()    → Log system events
```

---

## 📊 System Workflow

```
User Input
    ↓
Add Device Form
    ↓
DeviceController.addDevice()
    ↓
Create SmartDevice Instance
    ↓
Push to devices array
    ↓
Render UI (renderDevices())
    ↓
User Interaction (Toggle/Adjust)
    ↓
Device Method Called
    ↓
Update State
    ↓
Log Activity
    ↓
Re-render UI
```

---

## 🎨 UI Components

### Device Card States
- **Online + ON**: Green gradient background
- **Online + OFF**: Gray gradient background
- **Offline**: Orange gradient background (controls disabled)

### Control Elements
- **Power Toggle Button**: Changes color based on state
- **Range Slider**: For adjustable parameters (disabled when OFF)
- **Delete Button**: Removes device with confirmation
- **Status Badge**: Shows current state (ON/OFF/OFFLINE)

---

## 🐛 Debugging Tips

### Common Issues & Solutions

1. **Delete not working?**
   - Check browser console for errors
   - Ensure `deviceId` is being passed correctly
   - Verify `parseFloat()` is converting ID properly

2. **Slider not updating?**
   - Check if device is powered ON
   - Verify `oninput` and `onchange` events are firing
   - Check console for device object

3. **Styles not loading?**
   - Ensure all files are in same directory
   - Check file names match exactly (case-sensitive)
   - Try hard refresh (Ctrl+F5)

4. **Devices not rendering?**
   - Open browser console (F12)
   - Check for JavaScript errors
   - Verify `renderDevices()` is being called

### Browser Console Commands

```javascript
// Check all devices
console.log(controller.getAllDevices());

// Get specific device
console.log(controller.getDevice(deviceId));

// Check device count
console.log(controller.devices.length);

// Force re-render
renderDevices();
```

---

## 🔍 Testing Checklist

- [ ] Add device with all types (Light, Fan, AC, Thermostat, Security)
- [ ] Toggle device ON/OFF
- [ ] Adjust sliders when device is ON
- [ ] Verify sliders disabled when device is OFF
- [ ] Test offline device (controls should be disabled)
- [ ] Delete device and confirm removal
- [ ] Check activity log updates
- [ ] Test responsive design on mobile
- [ ] Verify empty state when no devices

---

## 📝 Sample Devices Pre-loaded

1. **Living Room Light** (Light, Online)
2. **Bedroom Fan** (Fan, Online)
3. **Main AC** (AC, Online) ❄️ **NEW!**
4. **Main Thermostat** (Thermostat, Offline)

---

## 🎯 Learning Objectives Achieved

✅ Understanding class-based OOP in JavaScript  
✅ Implementing inheritance and polymorphism  
✅ Managing object collections (like C++ vectors)  
✅ Event-driven programming  
✅ DOM manipulation and rendering  
✅ State management without frameworks  
✅ Modular code organization  
✅ Debugging and error handling  

---

## 🚀 Future Enhancements

- [ ] Add persistence with localStorage
- [ ] Implement device scheduling
- [ ] Add user authentication
- [ ] Create device groups/rooms
- [ ] Add data visualization (charts)
- [ ] Implement voice control
- [ ] Add device notifications
- [ ] Create mobile app version

---

## 📄 License

Free to use for educational purposes.

---

## 👨‍💻 Developer Notes

This project demonstrates how C++ OOP concepts translate to modern JavaScript:

- **Classes** → ES6 Classes
- **Inheritance** → `extends` keyword
- **Vectors** → JavaScript Arrays
- **Pointers** → Object references
- **Member functions** → Class methods
- **Constructors** → `constructor()` method

The code is intentionally structured to mirror C++ OOP patterns while leveraging JavaScript's dynamic capabilities.

---

## 📞 Support

If you encounter any issues:
1. Check the browser console (F12)
2. Verify all files are in the same directory
3. Ensure file names match exactly
4. Try a different browser
5. Clear cache and hard refresh

---

**Built with ❤️ to demonstrate C++ OOP concepts in web development**
