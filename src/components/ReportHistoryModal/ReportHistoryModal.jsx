import React, { useState, useEffect } from "react";
import {
  X,
  FileText,
  Calendar,
  User,
  Award,
  Target,
  Trash2,
} from "lucide-react";
import { personalityService } from "../../api/personalityService";

const ReportHistoryModal = ({
  isOpen,
  onClose,
  conversationId,
  conversationTitle,
}) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    if (isOpen && conversationId) {
      loadReports();
    }
  }, [isOpen, conversationId]);

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await personalityService.getReportsByConversation(
        conversationId
      );
      setReports(data);
      if (data.length > 0) {
        setSelectedReport(data[0]);
      }
    } catch (error) {
      console.error("Failed to load reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await personalityService.deleteReport(reportId);
        await loadReports();
        if (selectedReport?._id === reportId) {
          setSelectedReport(reports.length > 1 ? reports[0] : null);
        }
      } catch (error) {
        console.error("Failed to delete report:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Personality Reports</h2>
              <p className="text-blue-100 mt-1">{conversationTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-200px)]">
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-4">
                Report History ({reports.length})
              </h3>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading reports...</p>
                </div>
              ) : reports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No reports found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {reports.map((report) => (
                    <div
                      key={report._id}
                      onClick={() => setSelectedReport(report)}
                      className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                        selectedReport?._id === report._id
                          ? "bg-blue-50 border-blue-300"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-800">
                            Version {report.version}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {report.personalityType}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Calendar size={10} />
                            {formatDate(report.createdAt)}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <User size={10} />
                            {report.messageCount} messages
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteReport(report._id);
                          }}
                          className="p-1 rounded hover:bg-red-100 text-red-500"
                          title="Delete Report"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {selectedReport ? (
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Report Version {selectedReport.version}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Generated on {formatDate(selectedReport.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center pb-6 border-b border-gray-100 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl mb-3">
                    <User className="text-blue-600" size={18} />
                    <span className="text-gray-600 font-medium">
                      Personality Type:
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800">
                    {selectedReport.personalityType}
                  </h4>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <Award className="text-green-600" size={18} />
                    </div>
                    <h5 className="text-lg font-bold text-gray-800">
                      Strengths
                    </h5>
                  </div>
                  <div className="grid gap-2">
                    {selectedReport.strengths.map((strength, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 bg-green-50 rounded-xl border border-green-100"
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">
                          {strength}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-orange-100 rounded-lg">
                      <Target className="text-orange-600" size={18} />
                    </div>
                    <h5 className="text-lg font-bold text-gray-800">
                      Growth Areas
                    </h5>
                  </div>
                  <div className="grid gap-2">
                    {selectedReport.growthAreas.map((area, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 bg-orange-50 rounded-xl border border-orange-100"
                      >
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <FileText className="text-blue-600" size={18} />
                    </div>
                    <h5 className="text-lg font-bold text-gray-800">
                      Detailed Profile
                    </h5>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedReport.profile}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Select a report to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHistoryModal;
