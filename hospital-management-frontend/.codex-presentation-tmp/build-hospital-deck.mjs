import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const outDir = "C:/Users/Asus/hospital-management-frontend/outputs";
const previewDir = "C:/Users/Asus/hospital-management-frontend/.codex-presentation-tmp/preview";
const finalPptx = path.join(outDir, "Hospital_Management_System_Presentation.pptx");

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function addText(slide, text, position, style = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    fontSize: style.fontSize ?? 22,
    bold: style.bold ?? false,
    color: style.color ?? "slate-700",
    alignment: style.alignment ?? "left",
  };
  return shape;
}

function addTitle(slide, title, subtitle = "") {
  addText(slide, title, { left: 72, top: 56, width: 900, height: 64 }, {
    fontSize: 42,
    bold: true,
    color: "slate-950",
  });

  if (subtitle) {
    addText(slide, subtitle, { left: 74, top: 124, width: 900, height: 40 }, {
      fontSize: 20,
      color: "slate-600",
    });
  }
}

function addFooter(slide, number) {
  addText(slide, `Hospital Management System | ${number}`, {
    left: 72,
    top: 670,
    width: 260,
    height: 24,
  }, {
    fontSize: 12,
    color: "slate-400",
  });
}

function addPanel(slide, left, top, width, height, fill = "white") {
  return slide.shapes.add({
    geometry: "roundRect",
    position: { left, top, width, height },
    fill,
    line: { style: "solid", fill: "slate-200", width: 1 },
    borderRadius: "rounded-xl",
    shadow: "shadow-sm",
  });
}

function addBullets(slide, items, left, top, width, fontSize = 21) {
  addText(slide, items.map((item) => `- ${item}`).join("\n"), {
    left,
    top,
    width,
    height: items.length * 34 + 16,
  }, {
    fontSize,
    color: "slate-700",
  });
}

const deck = Presentation.create({
  slideSize: { width: 1280, height: 720 },
});

const slides = [];
for (let i = 0; i < 7; i += 1) {
  const slide = deck.slides.add();
  slide.background.fill = "slate-50";
  slides.push(slide);
}

// Slide 1
addTitle(slides[0], "Hospital Management System", "Internship project presentation");
addPanel(slides[0], 720, 190, 400, 260, "blue-50");
addText(slides[0], "React + Vite\nMaterial UI\nExpress API\nMongoDB", {
  left: 770,
  top: 240,
  width: 310,
  height: 180,
}, {
  fontSize: 28,
  bold: true,
  color: "blue-900",
  alignment: "center",
});
addText(slides[0], "A web application for managing doctors, patients, and appointments through a clean dashboard and CRUD screens.", {
  left: 72,
  top: 220,
  width: 560,
  height: 140,
}, {
  fontSize: 25,
  color: "slate-700",
});
addFooter(slides[0], 1);

// Slide 2
addTitle(slides[1], "Project Objectives", "What the system is designed to solve");
addBullets(slides[1], [
  "Maintain doctor records",
  "Maintain patient records",
  "Schedule and manage appointments",
  "Show hospital statistics in one dashboard",
  "Provide a simple interface for academic demonstration",
], 96, 210, 720, 25);
addPanel(slides[1], 890, 205, 260, 230, "emerald-50");
addText(slides[1], "Goal\n\nClean, usable, internship-quality hospital management web app.", {
  left: 925,
  top: 245,
  width: 190,
  height: 170,
}, {
  fontSize: 23,
  bold: true,
  color: "emerald-900",
  alignment: "center",
});
addFooter(slides[1], 2);

// Slide 3
addTitle(slides[2], "Technology Stack", "Frontend, backend, and database");
const stack = [
  ["Frontend", "React, Vite, Material UI, React Router"],
  ["Data/API", "Axios service connected to REST endpoints"],
  ["Charts", "Recharts weekly appointment analytics"],
  ["Backend", "Node.js, Express.js, MongoDB, Mongoose"],
];
stack.forEach(([heading, body], index) => {
  const x = index % 2 === 0 ? 92 : 666;
  const y = index < 2 ? 205 : 405;
  addPanel(slides[2], x, y, 500, 130);
  addText(slides[2], heading, { left: x + 28, top: y + 22, width: 420, height: 34 }, {
    fontSize: 24,
    bold: true,
    color: "slate-950",
  });
  addText(slides[2], body, { left: x + 28, top: y + 62, width: 420, height: 44 }, {
    fontSize: 18,
    color: "slate-600",
  });
});
addFooter(slides[2], 3);

// Slide 4
addTitle(slides[3], "Main Modules", "The application is organized around four main views");
["Dashboard", "Doctors", "Patients", "Appointments"].forEach((moduleName, index) => {
  const x = 92 + index * 285;
  addPanel(slides[3], x, 220, 235, 240, ["blue-50", "emerald-50", "amber-50", "violet-50"][index]);
  addText(slides[3], moduleName, { left: x + 24, top: 260, width: 185, height: 44 }, {
    fontSize: 26,
    bold: true,
    color: "slate-950",
    alignment: "center",
  });
  addText(slides[3], [
    "Stats and recent records",
    "Doctor CRUD and search",
    "Patient CRUD and search",
    "Booking and status update",
  ][index], { left: x + 22, top: 330, width: 190, height: 80 }, {
    fontSize: 18,
    color: "slate-700",
    alignment: "center",
  });
});
addFooter(slides[3], 4);

// Slide 5
addTitle(slides[4], "API Integration", "Frontend communicates with backend REST APIs");
addText(slides[4], "Base URL: http://localhost:5000/api", {
  left: 92,
  top: 185,
  width: 760,
  height: 36,
}, {
  fontSize: 24,
  bold: true,
  color: "slate-950",
});
addBullets(slides[4], [
  "/api/doctors for doctor records",
  "/api/patients for patient records",
  "/api/appointments for appointment booking",
  "CRUD operations use GET, POST, PUT, and DELETE",
], 96, 270, 740, 22);
slides[4].charts.add("bar", {
  position: { left: 840, top: 240, width: 300, height: 260 },
  categories: ["Doctors", "Patients", "Appointments"],
  series: [{ name: "Modules", values: [1, 1, 1], fill: "accent1" }],
  hasLegend: false,
  dataLabels: { showValue: false },
});
addFooter(slides[4], 5);

// Slide 6
addTitle(slides[5], "Testing And Demo Flow", "How to show the working project");
addBullets(slides[5], [
  "Run backend server and frontend dev server",
  "Add sample doctors and patients",
  "Create appointments from existing records",
  "Edit and delete one sample record",
  "Return to dashboard and verify updated counts",
], 96, 205, 790, 24);
addPanel(slides[5], 895, 230, 250, 210, "rose-50");
addText(slides[5], "Verified\n\nnpm run lint\nnpm run build", {
  left: 930,
  top: 270,
  width: 180,
  height: 150,
}, {
  fontSize: 22,
  bold: true,
  color: "rose-900",
  alignment: "center",
});
addFooter(slides[5], 6);

// Slide 7
addTitle(slides[6], "Conclusion And Future Scope", "Current result and possible improvements");
addBullets(slides[6], [
  "The project demonstrates a working hospital management frontend",
  "Core CRUD screens and dashboard are ready for demonstration",
  "Future scope includes login, reports, billing, reminders, and deployment",
], 96, 210, 780, 24);
addPanel(slides[6], 910, 230, 230, 210, "slate-900");
addText(slides[6], "Thank You", {
  left: 940,
  top: 310,
  width: 170,
  height: 52,
}, {
  fontSize: 30,
  bold: true,
  color: "white",
  alignment: "center",
});
addFooter(slides[6], 7);

await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

for (const [index, slide] of deck.slides.items.entries()) {
  const stem = `slide-${String(index + 1).padStart(2, "0")}`;
  await writeBlob(path.join(previewDir, `${stem}.png`), await deck.export({ slide, format: "png", scale: 1 }));
  await fs.writeFile(path.join(previewDir, `${stem}.layout.json`), await (await slide.export({ format: "layout" })).text());
}

await writeBlob(path.join(previewDir, "deck-montage.webp"), await deck.export({
  format: "webp",
  montage: true,
  scale: 1,
}));

const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(finalPptx);
console.log(finalPptx);
