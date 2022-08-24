/**
 * 将给定二进制文件流导出成xls文件
 * @param res 下载文件的二进制流
 * @param exportName 导出文件名
 */
const downloadFile = (res: BinaryData, exportName: string) => {
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(new Blob([res], { type: "application/vnd.ms-excel" }));
  link.target = "_blank";
  // 文件名和格式
  link.download = `${exportName}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const df = (res: BinaryData, exportName: string) => {
  const blob = new Blob([res], { type: "application/vnd.ms-excel" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = exportName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
};

export { downloadFile, df };
