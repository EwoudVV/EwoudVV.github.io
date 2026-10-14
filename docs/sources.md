# project sources

Checked October 14, 2026. Only public project files and the supplied school/community details are used on the site.

## ducktop2

Snapshot: [cae3193c5737ebf4bcba2a35e83de740350ad6ff](https://github.com/EwoudVV/ducktop2/tree/cae3193c5737ebf4bcba2a35e83de740350ad6ff).

- `README.md`: 16-inch laptop, Mu Ultra 226V-first plan, eight-layer center and I/O boards, unfinished main-board routing, hardware integration status.
- `ducktop2-center.kicad_pcb`: eight copper layers in the actual board file.
- `03_mu_carrier.kicad_sch`: PCIe, M.2, and USB connections. The site does not claim a validated PCIe speed or successful high-speed operation.
- `01_power_battery.kicad_sch`, `bms/bms.kicad_sch`, `bms/bms.kicad_pcb`, `docs/hardware/power-and-battery.md`, `docs/hardware/power-revision.md`: current BQ76922 BMS and ISL9241 charger, three-cell pack, current measurement, separate charge/discharge protection, disabled prototype balancing, pending bench qualification.
- The BMS's 8 A discharge and 3 A charging values are design targets. The 100 W input is also a design target.
- Older BQ76905, IP2368, and BQ25798 descriptions do not describe the current design.

Images, resized and compressed to WebP without adding or changing circuit details:

| Site asset | Repository source |
| --- | --- |
| `ducktop-open.webp` | `mechanical/flush-case/views/open.png` |
| `ducktop-inside.webp` | `mechanical/flush-case/views/inside.png` |
| `ducktop-routing.webp` | `docs/images/journal/imported/2026-09-30-01.png` |
| `bms.webp` | `manufacturing/bms/front.png` |

The routing screenshot is explicitly dated September 30. CAD renders are labelled as renders. None of these images establish an assembled laptop.

## stm32 development board

Snapshot: [6f57cf8e37cf8c7d87a00e66bd977023c7c8f6cb](https://github.com/EwoudVV/devboard/tree/6f57cf8e37cf8c7d87a00e66bd977023c7c8f6cb).

- `README.md`, `devboard.kicad_pcb`, `devboard.kicad_sch`: STM32F411CEU6, 24 × 44 mm, four layers, USB-C, microSD, two-sided assembly.
- `docs/pinout.md`: 22 GPIO, nine analog inputs, SWD, SPI-connected microSD rather than SDIO.
- `production/`: Gerbers, BOM, and placement files exist.
- `firmware/README.md`: starter firmware builds but has not been tested on physical hardware.
- README status says design finished and assembled boards waiting on funding. The portfolio therefore says design complete, awaiting fabrication.
- `devboard.webp` comes from `image-10.png`; `devboard-layout.webp` comes from `image-9.png`.

## bldc controller

Snapshot: [ce21df9f3471c953ff5188bc8032e9a2f24aad98](https://github.com/EwoudVV/bldc-esc/tree/ce21df9f3471c953ff5188bc8032e9a2f24aad98).

- `README.md`, `manufacturing/design-checks.json`: four-layer routed PCB, 116 × 112 mm, fabrication files, recorded clean design checks, no built/powered/tested hardware.
- Inspected all 17 pages of `manufacturing/schematic.pdf`. The bridge, gate-driver, current-protection, MCU, sensor, and safety sheets support the hardware descriptions.
- STM32G474VET6, DRV8353S, six bridge MOSFETs, three 1 mΩ shunts, INA241 measurement, Hall/encoder inputs, watchdog, protection, and brake chopper are designed hardware.
- `firmware/BUILD.md` and README separate existing bring-up code from pending USB, CAN, commutation, FOC, and physical tests.
- Hall control is planned first. No successful motor operation or sensorless implementation is claimed.
- `esc.webp`: `pcb-render.png`.
- `esc-gate-driver.webp`: rendered page 13 of the published schematic PDF, sheet 12.
- `esc-current-protection.webp`: rendered page 12 of that PDF, sheet 11.

## other sources

- Reviewed the public PCB vise repository as another possible hardware project; it remains in design and is not featured here.
- Education, graduation year, Hack Club membership, Half Life reviewer role, and basic Python/C# level come from the supplied portfolio brief.
- The public contact email and expanded resume were approved on October 14, 2026. The Amateur Extra license class was confirmed directly. No home address or telephone number is published.
- The font is Inter, distributed under the SIL Open Font License. `public/assets/inter-LICENSE.txt` retains the license. The Latin variable WOFF2 is from `@fontsource-variable/inter` 5.3.0.
- The social preview is text drawn on a solid background, not a generated electronics image.

When a board changes, update its status, source snapshot, and images together. Design checks and host firmware tests do not establish hardware performance.

## Expanded resume

The expanded resume was reviewed and approved October 14, 2026.

- [DrawBot](https://github.com/EwoudVV/drawbot) and its [journal](https://github.com/EwoudVV/drawbot/blob/main/journal.md): built CoreXY machine, motion and pen calibration, 100 mm square, and a recorded 35-minute drawing run. Manual homing remains necessary.
- [New England Sci-Tech](https://nescitech.org/leadership): volunteer listing and K1EVV callsign. The old General-class description is superseded by direct confirmation of Amateur Extra.
- [HamXposition committee](https://hamxposition.org/committees/): Youth & Collegiate Activities Committee membership. No chair title, dates, or specific duties were invented.
- [2024 StratoScience manifest](https://ema.arrl.org/2024/08/11/stratoscience-lab-balloon-launches-new-england-sci-tech-natick-august-14-2024/): IMU recorder and downward-camera credit. Local MPU9250/SD code supports the logging description; no altitude or recovered-data result is claimed.
- [Solar tracker](https://github.com/EwoudVV/solar-tracker-ss25) and [image-analysis notebooks](https://github.com/EwoudVV/hab_imageanalasis): servo tracking and OpenCV image-matching work.
- [Unity game](https://ewoudvv.itch.io/3d-worlds-hardest-game), [nnzip on PyPI](https://pypi.org/project/nnzip/), [graphing-calculator OS](https://github.com/EwoudVV/graphing-calculator-os), [RC tank](https://github.com/EwoudVV/rc-tank), and [Tarmo5 modifications](https://github.com/EwoudVV/tarmo5-mods): additional projects. No commercial release, compression ranking, or ownership of the original Tarmo design is claimed.
