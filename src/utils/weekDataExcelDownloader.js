import * as XLSX from "xlsx";

/**
 * Download a nicely formatted Excel file with the weekly shift assignments.
 * Adds a Summary sheet and a well-spaced Assignments sheet grouped by day.
 *
 * @param {Object} weekData - week object (see prompt example).
 */
export function downloadWeekAssignmentsExcel(weekData) {
  if (!weekData || !Array.isArray(weekData.days)) {
    console.warn("downloadWeekAssignmentsExcel: invalid weekData");
    return;
  }

  const typeLabel = (t) => (t === 0 ? "Morning" : t === 1 ? "Evening" : `Type ${t ?? ""}`.trim());

  /* ---------------- Summary stats ---------------- */
  let totalShifts = 0;
  let totalAssignments = 0;
  const uniqueWorkers = new Set();
  const uniqueRoles = new Set();

  for (const day of weekData.days) {
    for (const shift of day.shifts || []) {
      totalShifts++;
      const assignments = shift.shift_assignments || [];
      totalAssignments += assignments.length;
      for (const a of assignments) {
        if (a?.workers?.first_name || a?.workers?.last_name) {
          uniqueWorkers.add(`${a.workers.first_name ?? ""} ${a.workers.last_name ?? ""}`.trim());
        }
        if (a?.roles?.name) uniqueRoles.add(a.roles.name);
      }
    }
  }

  const summaryAoa = [
    ["Weekly Shift Assignments"],
    ["Week starting", weekData.start_date || ""],
    ["Generated at", new Date().toISOString()],
    [""],
    ["Totals"],
    ["Days", weekData.days.length],
    ["Shifts", totalShifts],
    ["Assignments", totalAssignments],
    ["Unique workers", uniqueWorkers.size],
    ["Unique roles", uniqueRoles.size],
  ];

  /* ---------------- Assignments sheet ---------------- */
  const assignmentsAoa = [
    ["Weekly Shift Assignments"],
    [`Week starting: ${weekData.start_date || ""}`],
    [""],
  ];

  const dayHeader = ["Shift Type", "Start Time", "End Time", "Role", "Worker First Name", "Worker Last Name"];

  for (const day of weekData.days) {
    assignmentsAoa.push([""]);
    assignmentsAoa.push([`${day.date_name || ""} (${day.date || ""})`]);
    assignmentsAoa.push(dayHeader);

    for (const shift of day.shifts || []) {
      const shiftType = typeLabel(shift.type);
      const start = shift.start_time || "";
      const end = shift.end_time || "";
      const assignments = shift.shift_assignments || [];

      if (assignments.length === 0) {
        assignmentsAoa.push([shiftType, start, end, "", "", ""]);
        continue;
      }

      for (const a of assignments) {
        assignmentsAoa.push([
          shiftType,
          start,
          end,
          a?.roles?.name ?? "",
          a?.workers?.first_name ?? "",
          a?.workers?.last_name ?? "",
        ]);
      }
    }
  }

  /* ---------------- Build workbook ---------------- */
  const wb = XLSX.utils.book_new();

  // Summary sheet
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryAoa);
  wsSummary["!cols"] = [{ wch: 22 }, { wch: 30 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

  // Assignments sheet
  const wsAssign = XLSX.utils.aoa_to_sheet(assignmentsAoa);
  wsAssign["!cols"] = [
    { wch: 12 }, // Shift Type
    { wch: 10 }, // Start Time
    { wch: 10 }, // End Time
    { wch: 16 }, // Role
    { wch: 18 }, // First Name
    { wch: 18 }, // Last Name
  ];
  // Freeze top rows (title + subtitle + blank) and header row repeats per day is not frozen, but keep first 3 rows
  wsAssign["!freeze"] = { xSplit: 0, ySplit: 3 };
  XLSX.utils.book_append_sheet(wb, wsAssign, "Assignments");

  const filename = `week-${weekData.start_date || "schedule"}.xlsx`;
  XLSX.writeFile(wb, filename);
}