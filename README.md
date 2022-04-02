# VehicleMonitoringSystem
*Diploma Project, 4 course  
Sergey Roytman  
Moscow, 2021*  

**VehicleMonitoringSystem** is a system for vehicles monitoring based on the Android devices.
The solution provides services for vehicle fleet managment. It can be used to monitor and manage: taxi fleet, buses, delivery trucks, business trips and others.

### Demo
Demo version is avaliable at https://fms.infostrategic.com/. In order to see some data on the map time range from 2021-01-01 should be picked

### Presentation
- **Demonstration videos:**
    - [Web client application - English](https://youtu.be/ZCvslu-jak0)
    - [Android application - English](https://youtu.be/2JxMwKI8YyI)
    - [Web client application - Russian](https://youtu.be/4txVzwEXWP0)
    - [Android application - Russian](https://youtu.be/vYEBtTtEsDI)
- **Power point presentation:**
    - [Presentation - English](https://github.com/Hetfield96/VehicleMonitoringSystem/blob/main/Documentation/Presentation/Presentation%20-%20English.pptx)
    - [Presentation - Russian](https://github.com/Hetfield96/VehicleMonitoringSystem/blob/main/Documentation/Presentation/Presentation%20-%20Russian.pptx)

### Repository content:
- [Android application](https://github.com/Hetfield96/VehicleMonitoringSystem/tree/main/VehicleMonitoringSystemMobile) (Java 8.0) - for the drivers
- [Web client application](https://github.com/Hetfield96/VehicleMonitoringSystem/tree/main/VMS_Web/VMS_Web/ClientApp) (React + TypeScript) - for the operators and administrators
- [Server side](https://github.com/Hetfield96/VehicleMonitoringSystem/tree/main/VMS_Web/VMS_Web) (ASP .NET Core 3.1)
- [Data processing service](https://github.com/Hetfield96/VehicleMonitoringSystem/tree/main/DataProcessingService) (ASP .NET Core 3.1) - inner app for vehicle data processing.  
- [Documentation](https://github.com/Hetfield96/VehicleMonitoringSystem/tree/main/Documentation) -- diploma documentation & presentation

### Core functionality: 
- Employees & vehicles managment
- Gathering vehicle data: either only via Android app (geolocation), either via Android app (geolocation) + OBD-|| Bluetooth-adapter (speed, fuel consumption, engine temperature, engine revs, errors from CheckEngine system and many more), which connects to the vehicle on-board computer and transmit data from it to Android app over Bluetooth
- Tracking vehicles location and their's movement trajectory within time interval on the Google Map
- Driver's tasks management
- In-app chat for communication between drivers and operators
- Vehicles position map-visualization
- Analytical reports 
- Dashboards with fleet statistics
- Geofences, used for access restrictions for particlular vehicles (can't enter or can't leave - operator will get a notification)
