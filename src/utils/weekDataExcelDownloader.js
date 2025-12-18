import * as XLSX from "xlsx-js-style";

/**
 * מוריד קובץ אקסל שבועי רב-לשוני (HE, EN, AR)
 * עם תיקון RTL חזק (רמת Workbook + Worksheet)
 */
export function downloadWeekAssignmentsExcel(weekData) {
  if (!weekData || !Array.isArray(weekData.days)) return;

  const dict = {
    morning: { en: "Morning", he: "בוקר", ar: "صباح" },
    evening: { en: "Evening", he: "ערב", ar: "مساء" },
    role: { en: "Role", he: "תפקיד", ar: "دور" },
    shift: { en: "Shift", he: "משמרת", ar: "وردية" },
    days: {
      sunday: { en: "Sunday", he: "ראשון", ar: "الأحد" },
      monday: { en: "Monday", he: "שני", ar: "الاثنين" },
      tuesday: { en: "Tuesday", he: "שלישי", ar: "الثلاثاء" },
      wednesday: { en: "Wednesday", he: "الأربعבע", ar: "الأربعاء" },
      thursday: { en: "Thursday", he: "חמישי", ar: "الخميس" },
      friday: { en: "Friday", he: "שישי", ar: "الجمعة" },
      saturday: { en: "Saturday", he: "שבת", ar: "السبט" },
    },
  };

  const wb = XLSX.utils.book_new();

  // --- תיקון RTL ברמת חוברת העבודה (Workbook) ---
  if (!wb.Workbook) wb.Workbook = {};
  if (!wb.Workbook.Views) wb.Workbook.Views = [{}];
  wb.Workbook.Views[0].RTL = true; // מאלץ את כל האפליקציה להיפתח מימין לשמאל

  const matrix = [];
  matrix.push([`Weekly Schedule / סידור עבודה שבועי - ${weekData.start_date}`]);

  const headerRow = [
    `${dict.shift.en} / ${dict.shift.he} / ${dict.shift.ar}`,
    `${dict.role.en} / ${dict.role.he} / ${dict.role.ar}`,
  ];

  weekData.days.forEach((d) => {
    const day = dict.days[d.date_name.toLowerCase()];
    headerRow.push(`${day.en} / ${day.he} / ${day.ar}\n(${d.date})`);
  });
  matrix.push(headerRow);

  const allRoles = Array.from(
    new Set(
      weekData.days.flatMap((d) =>
        d.shifts.flatMap((s) => s.shift_assignments.map((a) => a.roles.name))
      )
    )
  );

  const morningLabel = `${dict.morning.en} / ${dict.morning.he} / ${dict.morning.ar}`;
  const eveningLabel = `${dict.evening.en} / ${dict.evening.he} / ${dict.evening.ar}`;

  // גוש בוקר
  const morningStart = matrix.length;
  allRoles.forEach((roleName) => {
    const row = [morningLabel, roleName];
    weekData.days.forEach((day) => {
      const morningShift = day.shifts.find((s) => s.type === 0);
      const assignments =
        morningShift?.shift_assignments.filter(
          (a) => a.roles.name === roleName
        ) || [];
      row.push(
        assignments.length > 0
          ? assignments
              .map((a) => `${a.workers.first_name} ${a.workers.last_name}`)
              .join("\n")
          : "---"
      );
    });
    matrix.push(row);
  });
  const morningEnd = matrix.length - 1;

  matrix.push(new Array(headerRow.length).fill("")); // רווח

  // גוש ערב
  const eveningStart = matrix.length;
  allRoles.forEach((roleName) => {
    const row = [eveningLabel, roleName];
    weekData.days.forEach((day) => {
      const eveningShift = day.shifts.find((s) => s.type === 1);
      const assignments =
        eveningShift?.shift_assignments.filter(
          (a) => a.roles.name === roleName
        ) || [];
      row.push(
        assignments.length > 0
          ? assignments
              .map((a) => `${a.workers.first_name} ${a.workers.last_name}`)
              .join("\n")
          : "---"
      );
    });
    matrix.push(row);
  });
  const eveningEnd = matrix.length - 1;

  const ws = XLSX.utils.aoa_to_sheet(matrix);

  // מיזוג תאים
  ws["!merges"] = [
    { s: { r: morningStart, c: 0 }, e: { r: morningEnd, c: 0 } },
    { s: { r: eveningStart, c: 0 }, e: { r: eveningEnd, c: 0 } },
  ];

  // --- תיקון RTL ברמת הגיליון (Worksheet) ---
  if (!ws["!views"]) ws["!views"] = [{}];
  ws["!views"][0].rtl = true;

  styleFinalSheet(ws, matrix, dict);

  XLSX.utils.book_append_sheet(wb, ws, "Schedule");
  XLSX.writeFile(wb, `Schedule_${weekData.start_date}.xlsx`);
}

function styleFinalSheet(ws, data, dict) {
  const range = XLSX.utils.decode_range(ws["!ref"]);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
      if (!ws[cellRef]) continue;

      ws[cellRef].s = {
        font: { name: "Arial", sz: 10 },
        alignment: { vertical: "center", horizontal: "center", wrapText: true },
        border: {
          top: { style: "thin", color: { rgb: "D3D3D3" } },
          bottom: { style: "thin", color: { rgb: "D3D3D3" } },
          left: { style: "thin", color: { rgb: "D3D3D3" } },
          right: { style: "thin", color: { rgb: "D3D3D3" } },
        },
      };

      if (R === 1) {
        ws[cellRef].s.fill = { fgColor: { rgb: "333333" } };
        ws[cellRef].s.font = { color: { rgb: "FFFFFF" }, bold: true };
      }

      const shiftType = data[R]?.[0] || "";
      if (shiftType.includes(dict.morning.he)) {
        ws[cellRef].s.fill = { fgColor: { rgb: "E3F2FD" } };
      } else if (shiftType.includes(dict.evening.he)) {
        ws[cellRef].s.fill = { fgColor: { rgb: "F3E5F5" } };
      }

      if (C > 1 && R > 1 && data[R][C] !== "---" && data[R][C] !== "") {
        ws[cellRef].s.font.bold = true;
      }
    }
  }
  ws["!cols"] = [{ wch: 22 }, { wch: 18 }, ...new Array(7).fill({ wch: 20 })];
  ws["!rows"] = [{ hpt: 30 }, { hpt: 55 }];
}
