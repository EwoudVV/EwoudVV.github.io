export const site = {
  name: "Ewoud",
  url: "https://ewoudvv.github.io",
  github: "https://github.com/EwoudVV",
  updated: "October 14, 2026",
  contactEmail: null,
  description:
    "Electronics and PCB projects by Ewoud, a high school student in Massachusetts. Custom laptop hardware, microcontroller boards, battery circuits, and motor control.",
};
// TODO: Set contactEmail above when a public email address is chosen.

export const projects = [
  {
    slug: "ducktop2",
    number: "01",
    name: "Ducktop2",
    category: "Custom laptop",
    subtitle: "A custom 16-inch laptop with an eight-layer motherboard.",
    summary:
      "A 16-inch laptop I'm designing around the LattePanda Mu Ultra, with a custom eight-layer motherboard and separate I/O boards.",
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
      "I wanted to build a laptop with the exposed hardware and flexibility of a cyberdeck. My earlier build had HDMI and USB-C cables running around the outside. For Ducktop2, I'm designing custom boards for the ports, power, and controls, with a direct eDP connection to the display.",
    sections: [
      [
        "Board layout",
        "The laptop uses a LattePanda Mu Ultra, starting with the 226V module. The center board holds the compute module, embedded controller, charger, and maker microcontroller. The ports are on separate left and right boards. I'm working out how to fit everything around the keyboard, battery, and cooler while keeping the connections accessible.",
      ],
      [
        "High-speed routing",
        "The carrier has PCIe for M.2 NVMe, a separate Wi-Fi/Bluetooth socket, and USB, HDMI, and Ethernet connections. I'm routing the differential pairs and checking their reference planes and connector placement. The PCIe routes are saved, but the Mu Ultra pin-map changes and much of the main-board routing still need work.",
      ],
      [
        "Power and charging",
        "An ISL9241 charger sits on the center board, with a separate BQ76922 board monitoring the three-cell battery. The laptop and battery charging have to share the available input power. I'm aiming for 100 W over USB-C, but I still need to test the boards, cables, temperatures, and switching between power sources.",
      ],
      [
        "Fitting the case",
        "The case CAD includes the display, keyboard, trackpad, boards, battery, and cooling hardware. I've been working on the cooler supports, airflow, cable clearances, and access to the display and keyboard connectors. The fit and cooling still need to be checked with real parts.",
      ],
    ],
    statusDetail:
      "I'm still routing the main boards. The full laptop is not ready for fabrication or power-up. The BMS is routed, but its protection circuits still need bench testing.",
    next: [
      "Finish main-board routing and review the changed high-speed connections.",
      "Check the case, cables, and cooler against real parts.",
      "Make the boards and test the power, charging, protection, and cooling.",
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
    subtitle: "A compact STM32 board with USB-C, microSD, and SWD.",
    summary:
      "A 24 × 44 mm STM32F411 board with USB-C, microSD, and SWD. Four layers, with components on both sides.",
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
      "I wanted a small, breadboard-compatible STM32 board with the connections I'd actually use: USB-C, a microSD socket, GPIO, and SWD for programming and debugging.",
    sections: [
      [
        "Layout",
        "The four-layer layout uses components on both sides. It brings out 22 GPIO pins, including nine analog inputs, with additional header pins for power, boot, reset, and debugging. The MCU is an STM32F411CEU6.",
      ],
      [
        "USB, microSD, and debugging",
        "USB-C carries the MCU’s USB connection, with USB protection on the board. The microSD socket connects over SPI2. SWDIO, SWCLK, reset, ground, and the 3.3 V reference are available on the header so the board can be programmed without relying on a working USB application.",
      ],
      [
        "Manufacturing files and firmware",
        "I've prepared the Gerbers, bill of materials, placement files, and pinout. The starter firmware builds and includes the LED, user button, and USB serial. I haven't tested it on an assembled board yet, and the microSD connection still needs testing too.",
      ],
    ],
    statusDetail:
      "The PCB design and manufacturing files are done. I'm waiting on funding to order assembled boards, so I haven't done the physical bring-up yet.",
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
    subtitle: "Ducktop2's three-cell battery board and charging circuit.",
    summary:
      "The three-cell battery board for Ducktop2, with cell monitoring, current sensing, and separate charge and discharge protection.",
    status: "BMS routed · bench tests pending",
    image: "bms",
    alt: "Top-side CAD render of the rectangular green battery management board with monitoring and protection circuitry",
    caption:
      "BMS board render. The layout is routed; bench testing is still pending.",
    repo: "https://github.com/EwoudVV/ducktop2",
    tags: ["BQ76922", "ISL9241", "3S battery", "Current sensing", "Protection"],
    facts: [
      ["Battery", "3 cells in series"],
      ["BMS", "4 layers"],
      ["Monitor", "BQ76922"],
      ["Charger", "ISL9241"],
    ],
    intro:
      "The battery monitor and protection circuits are on their own board. The center board handles charging and system power. That keeps the cell connections and protection MOSFETs together on the BMS.",
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
        "Charging",
        "An ISL9241 charger on the center board supplies the pack and system power path. The BMS handles individual cell measurements and disconnects. Cell balancing is disabled in the initial prototype profile while the monitoring, temperature, and charging behavior are checked.",
      ],
      [
        "Checks before power-up",
        "The BMS is routed, with no unconnected items or physical DRC findings. I still need to measure its voltage drop and temperature, test the protection circuits, and check the cells. The first assembly leaves the drive-release links out so I can program and test it before enabling the main power path.",
      ],
    ],
    statusDetail:
      "The BMS is routed but still needs bench tests. I haven't verified its current capacity, fault response, or charging behavior on hardware. The charger circuit is saved on the center board, which is still being placed and routed.",
    next: [
      "Assemble the initial board in its disabled configuration.",
      "Calibrate current and cell measurements, then test faults and recovery.",
      "Test the cells, wiring, temperature rise, and connection to the charger.",
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
    subtitle: "A brushless motor controller built around an STM32G4.",
    summary:
      "An STM32G4 controller for brushless motors, with a three-phase power stage, current sensing, and hardware protection.",
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
      "I'm building a reusable, open-source controller for BLDC and PMSM motors, similar to a small VESC. The first test motor is a 26 V Groschopp gearmotor. I plan to get Hall-based control working first, then look at FOC once the hardware is tested.",
    sections: [
      [
        "Three-phase power stage",
        "The circuit uses an STM32G474VET6 and a DRV8353S gate driver with six 60 V MOSFETs. It also has a brake chopper. Before ordering, I still need to confirm the PCB stack and cooling plan.",
      ],
      [
        "Current measurement and protection",
        "Three 1 mΩ phase-current shunts and INA241 sensing circuits feed the measurement path. Hardware overcurrent protection, a watchdog, voltage sensing, and temperature inputs are part of the design. Current ratings remain design targets until the assembled board has been tested.",
      ],
      [
        "Feedback and debugging",
        "There are Hall and encoder inputs for motor feedback, plus SWD, USB-C, UART, and CAN FD connections. The starter firmware can report inputs and ADC readings over UART and read the gate driver's registers when the required checks pass.",
      ],
      [
        "Firmware so far",
        "The starter firmware builds and passes its host tests, but I haven't flashed it to this board. It keeps the bridge and brake PWM outputs low. Commutation, FOC, USB, and CAN code are still to come. I haven't run a motor with it or implemented sensorless control.",
      ],
    ],
    statusDetail:
      "The PCB is fully routed and the fabrication files are prepared. KiCad's saved design checks are clean. I haven't built or powered the board yet, and I still need to check the test motor's sensor pinout.",
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
