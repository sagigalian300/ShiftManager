import {
  Calendar,
  Clock,
  Briefcase,
  Printer,
  AlertCircle,
  X 
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl"; 
import { getWeekDataForExcelDocument } from "../../services/shifts";

// פונקציות עזר לצבעים
const getShiftColorStyles = (type) => {
  if (type === 0) {
    return {
      header: "bg-orange-100 text-orange-900 border-orange-200",
      body: "bg-orange-50/50",
      border: "border-orange-200",
      roleIcon: "text-orange-400",
    };
  }
  if (type === 1) {
    return {
      header: "bg-indigo-100 text-indigo-900 border-indigo-200",
      body: "bg-indigo-50/50",
      border: "border-indigo-200",
      roleIcon: "text-indigo-400",
    };
  }
  return {
    header: "bg-gray-100 text-gray-900 border-gray-200",
    body: "bg-gray-50/50",
    border: "border-gray-200",
    roleIcon: "text-gray-400",
  };
};

const VisualizeWholeWeek = ({ week_id, onClose }) => {
  const t = useTranslations("VisualizeWholeWeek"); 
  const [weekData, setWeekData] = useState(null);

  useEffect(() => {
    if (week_id) {
      getWeekDataForExcelDocument(week_id).then((data) => {
        setWeekData(data.weekData);
      });
    }
  }, [week_id]);

  const getShiftTypeLabel = (type) => {
    if (type === 0) return t('morning');
    if (type === 1) return t('evening');
    return `${t('other')} (${type})`;
  };

  if (!weekData || !Array.isArray(weekData.days)) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 text-gray-500">
        <AlertCircle className="w-10 h-10 mb-2 opacity-50 animate-pulse" />
        <p>{t('loading')}</p>
        {onClose && (
            <button onClick={onClose} className="mt-4 text-sm underline">{t('close')}</button>
        )}
      </div>
    );
  }

  return (
    // הוספתי id="print-section" כדי שנוכל להתייחס אליו ב-CSS
    <div id="print-section" className="fixed inset-0 z-50 flex flex-col h-screen w-screen bg-gray-50 text-gray-800 overflow-hidden font-sans" dir="rtl">
      
      {/* --- Header --- */}
      <header className="flex-none bg-white border-b border-gray-200 px-4 py-2 shadow-sm z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-1.5 rounded text-blue-600">
              <Calendar size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">{t('title')}</h1>
              <div className="text-xs text-gray-500 mt-0.5">
                {t('weekStarting')} <span className="font-medium text-gray-700">{weekData.start_date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-3 py-1.5 rounded text-xs font-medium transition-colors print:hidden"
            >
                <Printer size={14} />
                <span>{t('print')}</span>
            </button>

            {onClose && (
                <button 
                    onClick={onClose}
                    className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors print:hidden"
                    title={t('closeTooltip')}
                >
                    <X size={20} />
                </button>
            )}
          </div>
        </div>
      </header>

      {/* --- גוף הטבלה --- */}
      <div className="flex-1 p-2 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-x-auto">
            <div className="grid grid-cols-7 gap-1 h-full w-full min-w-[800px]">
            {weekData.days.map((day, dayIndex) => {
                const hasShifts = Array.isArray(day.shifts) && day.shifts.length > 0;

                return (
                <div
                    key={dayIndex}
                    className="flex flex-col h-full bg-white rounded border border-gray-300 shadow-sm overflow-hidden"
                >
                    {/* כותרת יום */}
                    <div className="flex-none bg-gray-50 border-b border-gray-200 p-1.5 text-center">
                        <div className="font-bold text-sm text-gray-800 truncate">{t(day.date_name.toLowerCase())}</div>
                        <div className="text-[10px] text-gray-400 font-mono truncate">{day.date}</div>
                    </div>

                    {/* אזור המשמרות */}
                    <div className="flex-1 overflow-y-auto p-1 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {!hasShifts ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-300 opacity-50">
                            <span className="text-xs italic select-none">{t('noShifts')}</span>
                        </div>
                    ) : (
                        day.shifts.map((shift, sIndex) => {
                        const styles = getShiftColorStyles(shift.type);
                        const assignments = shift.shift_assignments || [];

                        return (
                            <div
                            key={sIndex}
                            className={`rounded border ${styles.border} ${styles.body} flex flex-col`}
                            >
                            {/* כותרת משמרת */}
                            <div className={`flex justify-between items-center px-1.5 py-1 border-b ${styles.header} ${styles.border}`}>
                                <span className="text-[10px] font-bold truncate">{getShiftTypeLabel(shift.type)}</span>
                                <div className="flex items-center gap-0.5 text-[9px] opacity-80 font-mono shrink-0">
                                <Clock size={9} />
                                <span>{shift.start_time?.slice(0, 5)}-{shift.end_time?.slice(0, 5)}</span>
                                </div>
                            </div>

                            {/* רשימת עובדים */}
                            <div className="p-0.5 space-y-0.5">
                                {assignments.length === 0 ? (
                                <div className="text-[9px] text-center opacity-40 py-0.5">{t('emptyAssignments')}</div>
                                ) : (
                                assignments.map((assign, aIndex) => (
                                    <div
                                    key={aIndex}
                                    className="flex items-center justify-between bg-white/70 rounded px-1 py-0.5 border border-black/5 shadow-sm"
                                    >
                                    <div className="flex items-center gap-1 overflow-hidden">
                                        <Briefcase size={9} className={`${styles.roleIcon} shrink-0`} />
                                        <span className="text-[10px] text-gray-600 truncate max-w-[45px]" title={assign?.roles?.name}>
                                        {assign?.roles?.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center shrink-0">
                                        <span className="text-[10px] font-bold text-gray-800 truncate max-w-[60px]" title={`${assign?.workers?.first_name} ${assign?.workers?.last_name}`}>
                                        {assign?.workers?.first_name}
                                        </span>
                                    </div>
                                    </div>
                                ))
                                )}
                            </div>
                            </div>
                        );
                        })
                    )}
                    </div>
                </div>
                );
            })}
            </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar { width: 3px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
        
        @media print {
          @page { 
            size: landscape; 
            margin: 4mm; 
          }
          
          /* טריק להעלמת כל שאר האתר */
          body * {
            visibility: hidden;
          }

          /* הפיכת הקומפוננטה שלנו לנראית ומיקומה בראש הדף */
          #print-section, #print-section * {
            visibility: visible;
          }
          
          #print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: white;
            margin: 0;
            padding: 0;
            /* ביטול גלילות ופיקסד */
            overflow: visible !important;
            z-index: 9999;
          }

          /* הסתרת כפתורים */
          header button { display: none; }
          
          /* סידור הגריד והגבהים להדפסה */
          .overflow-y-auto { overflow: visible !important; height: auto !important; }
          .overflow-x-auto { overflow: visible !important; }
          .grid { display: grid; grid-template-columns: repeat(7, 1fr) !important; gap: 4px; }
        }
      `}</style>
    </div>
  );
};

export default VisualizeWholeWeek;