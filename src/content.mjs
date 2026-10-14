export const site = {
  name: "Ewoud",
  url: "https://ewoudvv.github.io",
  github: "https://github.com/EwoudVV",
  updated: "October 14, 2026",
  // TODO: Add the email address Ewoud wants to make public before sending applications.
  contactEmail: null,
  description:
    "Electronics and PCB projects by Ewoud, a high school student in Massachusetts. Custom laptop hardware, microcontroller boards, battery circuits, and motor control.",
};

export const projects = [
  {
    slug: "ducktop2",
    number: "01",
    name: "Ducktop2",
    category: "Custom laptop",
    subtitle: "A 16-inch laptop, built around custom electronics.",
    summary:
      "My main project: a 16-inch laptop with an eight-layer motherboard split across a center board and two I/O boards.",
    status: "Routing in progress",
    image: "ducktop-open",
    alt: "CAD view of the open Ducktop2 laptop with its display, keyboard area, and trackpad",
    caption:
      "Current case CAD. This is a design render, not an assembled laptop.",
    repo: "https://github.com/EwoudVV/ducktop2",
    tags: [
      "KiCad",
      "8-layer PCB",
      "PCIe",
      "Power electronics",
      "Mechanical CAD",
    ],
    facts: [
      ["Display", "16-inch"],
      ["Main boards", "8 layers"],
      ["Compute", "Mu Ultra"],
      ["Status", "In progress"],
    ],
    intro:
      "I wanted the exposed hardware and flexibility of a cyberdeck in a laptop I could carry around. Ducktop2 replaces the external cables of my earlier build with a custom carrier, direct eDP display connection, and dedicated boards for power, ports, and controls.",
    sections: [
      [
        "Making the boards work together",
        "The design is built around the LattePanda Mu Ultra, with a 226V module planned first. The center board carries the compute module, embedded controller, charger, and maker microcontroller. Separate left and right boards carry the ports. Keeping those connections serviceable while fitting the keyboard, battery, and cooler into the case is a large part of the work.",
      ],
      [
        "High-speed routing",
        "The carrier includes PCIe for M.2 NVMe, a separate Wi-Fi/Bluetooth socket, and USB, HDMI, and Ethernet connections. I am working through differential-pair routing, reference planes, connector placement, and the changes needed for the Mu Ultra pin map. Existing PCIe routes are saved; USB, HDMI, Ethernet, and much of the remaining main-board routing still need work.",
      ],
      [
        "Power and battery integration",
        "The current design uses an ISL9241 buck-boost charger and a separate three-cell BMS with a BQ76922 monitor. USB-C input, system load, and battery charging share a power budget. The revised circuit targets 100 W input, but that is a design target awaiting board, cable, thermal, and source-transition tests.",
      ],
      [
        "Mechanical work",
        "The case CAD brings the display, keyboard, trackpad, boards, battery, and cooling hardware together. Recent work covers the cooler supports, air path, cable clearances, and access to the display and keyboard connections. The saved geometry still needs physical fit and cooling checks.",
      ],
    ],
    statusDetail:
      "The main boards are not fully routed. The complete laptop is not ready for fabrication or powered integration. The BMS has a routed layout, but assembled-board protection tests are still pending.",
    next: [
      "Finish main-board routing and review the changed high-speed connections.",
      "Check the case, cables, and cooler against real parts.",
      "Fabricate and bring up the boards, then qualify charging, protection, and thermal behavior.",
    ],
    gallery: [
      [
        "ducktop-routing",
        "KiCad view of the center board showing dense component placement and unfinished routing",
        "Center-board routing snapshot from September 30, 2026. Unfinished connections are visible.",
      ],
      [
        "ducktop-inside",
        "CAD view of the internal boards, battery spaces, and copper-colored cooling path",
        "Current internal layout CAD, including the cooling and battery arrangement.",
      ],
    ],
    sources: [
      ["Build status", "README.md#build-status"],
      ["Power and battery", "docs/hardware/power-and-battery.md"],
      ["Mechanical files", "mechanical/flush-case"],
    ],
  },
  {
    slug: "stm32-devboard",
    number: "02",
    name: "STM32 development board",
    category: "Microcontroller hardware",
    subtitle: "A small board for learning, debugging, and connecting hardware.",
    summary:
      "A 24 × 44 mm, four-layer STM32F411 board with USB-C, microSD, and accessible SWD debugging.",
    status: "Design complete · awaiting fabrication",
    image: "devboard",
    alt: "KiCad 3D render of the compact green STM32 board with USB-C, buttons, and two rows of header pads",
    caption: "KiCad 3D render. Assembled boards are still pending.",
    repo: "https://github.com/EwoudVV/devboard",
    tags: ["STM32F411", "4-layer PCB", "USB-C", "SPI", "SWD"],
    facts: [
      ["Board", "24 × 44 mm"],
      ["Copper", "4 layers"],
      ["MCU", "STM32F411"],
      ["GPIO", "22 pins"],
    ],
    intro:
      "I designed this board to be small enough for breadboard use while keeping the connections I would want during development: USB-C, a microSD socket, GPIO, and a direct SWD connection.",
    sections: [
      [
        "Fitting the hardware",
        "The four-layer layout uses components on both sides. It brings out 22 GPIO pins, including nine analog inputs, with additional header pins for power, boot, reset, and debugging. The MCU is an STM32F411CEU6.",
      ],
      [
        "Connections that are easy to debug",
        "USB-C carries the MCU’s USB connection, with USB protection on the board. The microSD socket connects over SPI2. SWDIO, SWCLK, reset, ground, and the 3.3 V reference are available on the header so the board can be programmed without relying on a working USB application.",
      ],
      [
        "Preparing for the first boards",
        "The repository includes Gerbers, a bill of materials, placement files, and a documented pinout. Starter firmware builds for the board and covers the LED, user button, and USB serial. Physical USB operation and SD-card use have not been verified on an assembled board.",
      ],
    ],
    statusDetail:
      "The PCB design is complete and manufacturing files are prepared. The project is waiting on funding for assembled boards. There are no confirmed physical bring-up results yet.",
    next: [
      "Order and inspect the first assembled boards.",
      "Check the supply rail and program the MCU over SWD.",
      "Test USB serial, buttons, GPIO, and the microSD connection.",
    ],
    gallery: [
      [
        "devboard-layout",
        "Four-layer STM32 development board shown in KiCad with routed copper and component labels",
        "The routed PCB in KiCad.",
      ],
    ],
    sources: [
      ["Project and manufacturing files", "README.md"],
      ["Pinout", "docs/pinout.md"],
      ["Starter firmware status", "firmware/README.md"],
    ],
  },
  {
    slug: "battery-management",
    number: "03",
    name: "Battery management & charging",
    category: "Ducktop2 subsystem",
    subtitle: "Monitoring and protecting a three-cell laptop battery.",
    summary:
      "A routed four-layer BMS for Ducktop2, with cell monitoring, current sensing, and independent protection circuitry.",
    status: "BMS routed · bench tests pending",
    image: "bms",
    alt: "Top-side CAD render of the rectangular green battery management board with monitoring and protection circuitry",
    caption:
      "Current BMS board render from the manufacturing directory. Hardware qualification is pending.",
    repo: "https://github.com/EwoudVV/ducktop2",
    tags: ["BQ76922", "ISL9241", "3S battery", "Current sensing", "Protection"],
    facts: [
      ["Battery", "3 cells in series"],
      ["BMS", "4 layers"],
      ["Monitor", "BQ76922"],
      ["Charger", "ISL9241"],
    ],
    intro:
      "The laptop’s battery is a separate engineering problem from its compute board. I split cell monitoring and protection onto a dedicated BMS, while the center board handles charging and the system power path.",
    sections: [
      [
        "Cell monitoring and disconnects",
        "The current BMS uses a TI BQ76922 to monitor the three-cell pack. High-side charge and discharge MOSFETs control the main current path. Cell-temperature inputs and a limited startup branch are part of the protection design.",
      ],
      [
        "Measuring current",
        "A four-terminal 2 mΩ shunt provides separate force and sense connections. INA381 circuits provide independent charge and discharge current guards. The board targets 8 A discharge and up to 3 A charging; these are targets, not measured current ratings.",
      ],
      [
        "Separating charging from protection",
        "An ISL9241 charger on the center board supplies the pack and system power path. The BMS handles individual cell measurements and disconnects. Cell balancing is disabled in the initial prototype profile while the monitoring, temperature, and charging behavior are checked.",
      ],
      [
        "Layout checks and hardware checks",
        "The repository records a routed BMS with zero unconnected items and no physical DRC findings. Those checks do not establish current capacity, protection performance, or cell suitability. The first assembly leaves the drive-release links out for programming and bench tests.",
      ],
    ],
    statusDetail:
      "The BMS layout is routed. Its protection, current capacity, temperature response, and charging behavior still need assembled-hardware tests. The laptop’s revised charger circuit is saved, with main-board placement and routing still in progress.",
    next: [
      "Assemble the initial board in its disabled configuration.",
      "Calibrate current and cell measurements, then test faults and recovery.",
      "Qualify the cells, wiring, thermal behavior, and charger integration.",
    ],
    gallery: [],
    sources: [
      ["Power and battery design", "docs/hardware/power-and-battery.md"],
      ["Power revision", "docs/hardware/power-revision.md"],
      ["BMS source files", "bms"],
    ],
  },
  {
    slug: "bldc-controller",
    number: "04",
    name: "BLDC motor controller",
    category: "Power electronics",
    subtitle: "A reusable controller for brushless motors.",
    summary:
      "A four-layer STM32G4 motor-controller design with three-phase gate drive, phase-current sensing, and hardware protection.",
    status: "PCB routed · not powered yet",
    image: "esc",
    alt: "CAD render of the BLDC motor controller showing power capacitors, three-phase bridge components, MCU, and connectors",
    caption:
      "PCB render of the routed controller. No powered motor tests have been completed.",
    repo: "https://github.com/EwoudVV/bldc-esc",
    tags: [
      "STM32G4",
      "DRV8353S",
      "MOSFET inverter",
      "Current sensing",
      "Motor control",
    ],
    facts: [
      ["Board", "116 × 112 mm"],
      ["Copper", "4 layers"],
      ["MCU", "STM32G474"],
      ["Gate driver", "DRV8353S"],
    ],
    intro:
      "I am building an open-source controller for BLDC and PMSM motors, similar in concept to a small VESC. The first test motor is a 26 V Groschopp gearmotor. My plan is to start with Hall-based control and work toward more advanced control once the hardware is checked.",
    sections: [
      [
        "Three-phase power stage",
        "The circuit uses an STM32G474VET6 and a DRV8353S gate driver with six 60 V bridge MOSFETs. The board includes the gate-driving circuitry, power input, motor connections, and a brake chopper. Cooling and the final manufacturing stack still need qualification.",
      ],
      [
        "Current measurement and protection",
        "Three 1 mΩ phase-current shunts and INA241 sensing circuits feed the measurement path. Hardware overcurrent protection, a watchdog, voltage sensing, and temperature inputs are part of the design. Current ratings remain design targets until the assembled board has been tested.",
      ],
      [
        "Feedback and debugging",
        "Hall and encoder inputs provide connections for motor feedback. The hardware also includes SWD, USB-C, UART, and CAN FD. The starter firmware supports UART commands, input and ADC reporting, and gate-driver register reads under guarded conditions.",
      ],
      [
        "What the firmware does today",
        "The starter firmware builds and has host-side tests recorded in the repository. It keeps the bridge and brake PWM outputs low. It has not been flashed to this board. Motor commutation, FOC, USB, and CAN firmware remain future work; there is no verified sensorless operation or successful motor run.",
      ],
    ],
    statusDetail:
      "The PCB is fully routed and fabrication files are prepared. The repository records clean design checks. The board has not been built, powered, or tested, and the test motor’s sensor pinout still needs checking.",
    next: [
      "Confirm the fabrication stack, impedance, component availability, and cooling plan.",
      "Assemble the board and verify supplies, current readings, protection, and gate signals.",
      "Bring up Hall-based commutation on the test motor before attempting FOC or sensorless operation.",
    ],
    gallery: [],
    sources: [
      ["Design and current status", "README.md"],
      ["Complete schematics (PDF)", "manufacturing/schematic.pdf"],
      ["Bring-up firmware", "firmware/BUILD.md"],
      ["Saved design checks", "manufacturing/design-checks.json"],
    ],
  },
];

export const skillGroups = [
  [
    "Board design",
    [
      "KiCad",
      "Schematic design",
      "Multilayer PCB layout",
      "Differential-pair routing",
      "Component selection",
    ],
  ],
  [
    "Electronics",
    [
      "Power electronics",
      "Microcontroller hardware",
      "Battery circuits",
      "Motor-controller design",
    ],
  ],
  ["Tools & software", ["Git & GitHub", "Linux", "Basic Python", "Basic C#"]],
];
