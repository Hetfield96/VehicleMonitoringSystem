# VehicleMonitoringSystem
*Diploma Project, 4 course  
Sergey Roytman  
Moscow, 2021*  

###  *Currently is in active development!*   
\
**VehicleMonitoringSystem** is a system for vehicles monitoring based on the Android devices.
The solution provides services for vehicle fleet managment. It can be used to monitor and manage: taxi fleet, buses, delivery trucks, business trips and others.

### Repository content:
- [Android application](https://github.com/Hetfield96/VehicleMonitoringSystem/tree/main/VehicleMonitoringSystemMobile) (Java 8.0) - for the drivers
- [Web client application](https://github.com/Hetfield96/VehicleMonitoringSystem/tree/main/VMS_Web/VMS_Web/ClientApp) (React + TypeScript) - for the operators and administrators
- [Server side](https://github.com/Hetfield96/VehicleMonitoringSystem/tree/main/VMS_Web/VMS_Web) (ASP .NET Core 3.1)
- [Data processing service](https://github.com/Hetfield96/VehicleMonitoringSystem/tree/main/DataProcessingService) (ASP .NET Core 3.1) - inner app for vehicle data processing.  
- [Documentation](https://github.com/Hetfield96/VehicleMonitoringSystem/tree/main/Documentation) - diploma documentation
       
### Core functionality: 
- Employees & vehicles managment
- Gathering vehicle data: either only via Android app (geolocation), either via Android app (geolocation) + OBD-|| Bluetooth-adapter (speed, fuel consumption, engine temperature, engine revs, errors from CheckEngine system and many more), which connects to the vehicle on-board computer and transmit data from it to Android app over Bluetooth
- Tracking vehicles location and their's movement trajectory within time interval on the Google Map
- Driver's tasks managment
- In-app chat for communication between drivers and operators
- Analytical reports 
- Dashboards with fleet statistics
- ...
