// script.js - IoT Smart Home Controller Logic

// =============================================================================
// C++ OOP CONCEPT: Base Device Class
// Equivalent to: class Device { private: ...; public: ...; };
// =============================================================================
class Device {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.powerState = false;
    this.connectivity = "online";
    this.id = Date.now() + Math.random(); // Unique ID generation
  }

  // Toggle power state (member function)
  togglePower() {
    if (this.connectivity === "offline") {
      return { success: false, message: "Device is offline" };
    }
    this.powerState = !this.powerState;
    return {
      success: true,
      message: `Device turned ${this.powerState ? "ON" : "OFF"}`,
    };
  }

  // Get device status (getter method)
  getStatus() {
    return {
      name: this.name,
      type: this.type,
      power: this.powerState ? "ON" : "OFF",
      connectivity: this.connectivity,
    };
  }

  // Set connectivity status
  setConnectivity(status) {
    this.connectivity = status;
  }
}

// =============================================================================
// C++ OOP CONCEPT: Derived Class with Template-like behavior
// Equivalent to: class SmartDevice : public Device { ... };
// Simulates C++ templates with adjustable parameters
// =============================================================================
class SmartDevice extends Device {
  constructor(name, type, hasAdjustable = false, adjustableParam = null) {
    super(name, type); // Call parent constructor
    this.hasAdjustable = hasAdjustable;
    this.adjustableParam = adjustableParam || {
      name: "Level",
      value: 50,
      min: 0,
      max: 100,
    };
  }

  // Update adjustable parameter (polymorphic behavior)
  updateAdjustable(value) {
    if (this.connectivity === "offline") {
      return { success: false, message: "Device is offline" };
    }

    // Validate value within range
    const clampedValue = Math.max(
      this.adjustableParam.min,
      Math.min(this.adjustableParam.max, value)
    );

    this.adjustableParam.value = clampedValue;
    return {
      success: true,
      message: `${this.adjustableParam.name} set to ${clampedValue}`,
    };
  }

  // Override togglePower to handle adjustable parameters
  togglePower() {
    const result = super.togglePower();
    // When turning off, you might want to reset some values
    return result;
  }
}

// =============================================================================
// C++ OOP CONCEPT: Controller Class (Device Management)
// Equivalent to: class DeviceController { vector<Device*> devices; ... };
// Manages collection of devices using array (like C++ vector)
// =============================================================================
class DeviceController {
  constructor() {
    this.devices = []; // Array = C++ vector<Device*>
  }

  // Add device to collection (like vector::push_back)
  addDevice(name, type, connectivity) {
    let device;
    const hasAdjustable = ["light", "fan", "ac", "thermostat"].includes(type);

    // Device-specific parameter configuration
    let adjustableParam = null;

    switch (type) {
      case "light":
        adjustableParam = {
          name: "Brightness",
          value: 50,
          min: 0,
          max: 100,
        };
        break;
      case "fan":
        adjustableParam = {
          name: "Speed",
          value: 3,
          min: 0,
          max: 5,
        };
        break;
      case "ac":
        adjustableParam = {
          name: "Temperature",
          value: 24,
          min: 16,
          max: 30,
        };
        break;
      case "thermostat":
        adjustableParam = {
          name: "Temperature",
          value: 22,
          min: 16,
          max: 30,
        };
        break;
      default:
        adjustableParam = {
          name: "Level",
          value: 50,
          min: 0,
          max: 100,
        };
    }

    // Create SmartDevice instance
    device = new SmartDevice(name, type, hasAdjustable, adjustableParam);
    device.setConnectivity(connectivity);

    // Add to devices array
    this.devices.push(device);

    this.logActivity(`✅ Added new ${type}: "${name}" (${connectivity})`);
    return device;
  }

  // Remove device from collection (like vector::erase)
  removeDevice(deviceId) {
    // Handle both string and number IDs
    const parsedId =
      typeof deviceId === "string" ? parseFloat(deviceId) : deviceId;

    // Find device index
    const index = this.devices.findIndex((d) => d.id === parsedId);

    if (index !== -1) {
      const device = this.devices[index];
      // Remove from array
      this.devices.splice(index, 1);
      this.logActivity(`🗑️ Removed device: "${device.name}"`);
      return true;
    }

    console.error("Device not found:", deviceId, parsedId);
    return false;
  }

  // Get specific device (like accessing vector element)
  getDevice(deviceId) {
    const parsedId =
      typeof deviceId === "string" ? parseFloat(deviceId) : deviceId;
    return this.devices.find((d) => d.id === parsedId);
  }

  // Get all devices (like returning entire vector)
  getAllDevices() {
    return this.devices;
  }

  // Log activity with timestamp
  logActivity(message) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement("div");
    logEntry.className = "log-entry";
    logEntry.innerHTML = `
            <span class="timestamp">[${timestamp}]</span> ${message}
        `;

    const logContainer = document.getElementById("activityLog");
    logContainer.insertBefore(logEntry, logContainer.firstChild);

    // Keep only last 50 entries (memory management)
    while (logContainer.children.length > 50) {
      logContainer.removeChild(logContainer.lastChild);
    }
  }
}

// =============================================================================
// INITIALIZE CONTROLLER (Global instance)
// =============================================================================
const controller = new DeviceController();

// =============================================================================
// UI RENDERING FUNCTIONS
// =============================================================================

// Render all devices in the grid
function renderDevices() {
  const grid = document.getElementById("devicesGrid");
  const devices = controller.getAllDevices();

  // Handle empty state
  if (devices.length === 0) {
    grid.innerHTML = `
            <div class="empty-state">
                <h3>No devices added yet</h3>
                <p>Add your first smart device to get started!</p>
            </div>
        `;
    return;
  }

  // Render device cards
  grid.innerHTML = devices
    .map((device) => {
      const status = device.getStatus();
      const statusClass =
        device.connectivity === "offline"
          ? "offline"
          : device.powerState
          ? "online"
          : "";

      // Build adjustable control HTML
      let adjustableControl = "";
      if (device.hasAdjustable && device.connectivity === "online") {
        const param = device.adjustableParam;
        const disabled = !device.powerState ? "disabled" : "";

        adjustableControl = `
                <div class="control-row">
                    <div class="slider-container">
                        <label>${param.name}:</label>
                        <input 
                            type="range" 
                            class="slider" 
                            min="${param.min}" 
                            max="${param.max}" 
                            value="${param.value}"
                            onchange="updateAdjustable('${
                              device.id
                            }', this.value)"
                            oninput="updateSliderDisplay('${
                              device.id
                            }', this.value)"
                            ${disabled}
                        >
                        <span class="slider-value" id="value-${device.id}">
                            ${param.value}${
          param.name === "Temperature" ? "°C" : ""
        }
                        </span>
                    </div>
                </div>
            `;
      }

      // Get device icon
      const iconMap = {
        light: "💡",
        fan: "🌀",
        ac: "❄️",
        thermostat: "🌡️",
        security: "📹",
      };
      const icon = iconMap[device.type] || "📱";

      return `
            <div class="device-card ${statusClass}">
                <div class="device-header">
                    <div>
                        <div class="device-type">${icon} ${status.type.toUpperCase()}</div>
                        <div class="device-name">${status.name}</div>
                    </div>
                    <span class="device-status ${
                      device.connectivity === "offline"
                        ? "status-offline"
                        : device.powerState
                        ? "status-on"
                        : "status-off"
                    }">
                        ${
                          device.connectivity === "offline"
                            ? "OFFLINE"
                            : status.power
                        }
                    </span>
                </div>
                <div class="device-controls">
                    <div class="control-row">
                        <button 
                            class="btn-toggle ${
                              !device.powerState ? "off" : ""
                            }" 
                            onclick="toggleDevice('${device.id}')"
                            ${
                              device.connectivity === "offline"
                                ? "disabled"
                                : ""
                            }
                        >
                            ${device.powerState ? "🔴 Turn OFF" : "🟢 Turn ON"}
                        </button>
                        <button 
                            class="btn-delete" 
                            onclick="deleteDevice('${device.id}')"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                    ${adjustableControl}
                </div>
            </div>
        `;
    })
    .join("");
}

// =============================================================================
// EVENT HANDLERS
// =============================================================================

// Add device form submission
document.getElementById("addDeviceForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("deviceName").value.trim();
  const type = document.getElementById("deviceType").value;
  const connectivity = document.getElementById("connectivity").value;

  // Validate input
  if (!name) {
    alert("Please enter a device name");
    return;
  }

  // Add device through controller
  controller.addDevice(name, type, connectivity);

  // Re-render devices
  renderDevices();

  // Reset form
  e.target.reset();
  document.getElementById("deviceName").focus();
});

// Toggle device power
function toggleDevice(deviceId) {
  const device = controller.getDevice(deviceId);

  if (!device) {
    console.error("Device not found:", deviceId);
    return;
  }

  const result = device.togglePower();

  if (result.success) {
    controller.logActivity(
      `${device.powerState ? "🟢" : "🔴"} ${device.name}: ${result.message}`
    );
    renderDevices();
  } else {
    controller.logActivity(`❌ ${device.name}: ${result.message}`);
    alert(result.message);
  }
}

// Update adjustable parameter (on slider change)
function updateAdjustable(deviceId, value) {
  const device = controller.getDevice(deviceId);

  if (!device) {
    console.error("Device not found:", deviceId);
    return;
  }

  const result = device.updateAdjustable(parseInt(value));

  if (result.success) {
    const unit = device.adjustableParam.name === "Temperature" ? "°C" : "";
    document.getElementById(`value-${deviceId}`).textContent = value + unit;
    controller.logActivity(`⚙️ ${device.name}: ${result.message}`);
  } else {
    alert(result.message);
  }
}

// Update slider display in real-time (on slider input)
function updateSliderDisplay(deviceId, value) {
  const device = controller.getDevice(deviceId);
  if (device) {
    const unit = device.adjustableParam.name === "Temperature" ? "°C" : "";
    document.getElementById(`value-${deviceId}`).textContent = value + unit;
  }
}

// Delete device
function deleteDevice(deviceId) {
  const device = controller.getDevice(deviceId);

  if (!device) {
    console.error("Device not found:", deviceId);
    alert("Device not found!");
    return;
  }

  // Confirm deletion
  if (confirm(`Are you sure you want to delete "${device.name}"?`)) {
    const success = controller.removeDevice(deviceId);

    if (success) {
      renderDevices();
    } else {
      alert("Failed to delete device. Please try again.");
    }
  }
}

// =============================================================================
// INITIALIZATION - Add sample devices and render
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Add sample devices for demonstration
  controller.addDevice("Living Room Light", "light", "online");
  controller.addDevice("Bedroom Fan", "fan", "online");
  controller.addDevice("Main AC", "ac", "online");
  controller.addDevice("Main Thermostat", "thermostat", "offline");

  // Initial render
  renderDevices();

  // Log system start
  controller.logActivity("🚀 System initialized successfully");
});
