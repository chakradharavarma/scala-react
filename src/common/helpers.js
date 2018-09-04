export function createNotification(message, type){  
  return {
    message,
    key: new Date().getTime(),
    type,
  }
}


export function getMode(path) {
  const ext = path.substring(path.lastIndexOf('.'));
  switch(ext){
    case '.js' || '.jsx' :
      return 'javascript'
    case '.sh':
      return 'shell'
    case '.py' || '.pyc':
      return 'python'
    case '.bat':
      return 'batch'
    case '.yml':
      return 'yaml'
    case '.java':
      return 'java'
    default:
      return 'none'
  }
}

export const download = function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName) {
      const blob = new Blob([data], {type: "application/octet-stream"})
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
  };
}();

export const jsonToFormData = object => Object.keys(object).reduce((formData, key) => {
  formData.append(key, object[key]);
  return formData;
}, new FormData());
