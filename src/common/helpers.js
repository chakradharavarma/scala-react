import moment from 'moment'

export function createNotification(message, type) {
  return {
    message,
    key: new Date().getTime(),
    type,
  }
}

export function formatErrorMessage(message) {
  return message.replace("ERROR: ", "")
}

export function getMode(path) {
  const file = path.substring(path.lastIndexOf('/'))
  const ext = file.substring(file.lastIndexOf('.'));
  switch (ext) {
    case '.js' || '.jsx':
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
    case '.wps' || '.input' || '.tbl' || '/appout' || '/slurm' || '/apperr' || '.txt':
      return 'text'
    default:
      return 'text'
  }
}

export const download = function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName) {
    const blob = new Blob([data], { type: "application/octet-stream" })
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}();


export const getDuration = function (start, end) {
  const createdDate = moment(start)
  const modifiedDate = moment(end)
  const days = modifiedDate.diff(createdDate, "days")
  const hours = modifiedDate.diff(createdDate, "hours") - (days * 24)
  const minutes = modifiedDate.diff(createdDate, "minutes") - ((days * 24 * 60) + hours * 60)
  const seconds = modifiedDate.diff(createdDate, "seconds") % 60
  return `${days ? `${days} ${days === 1 ? 'day' : 'days'}` : ''} \
                    ${hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : ''} \
                    ${minutes && !days ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : ''} \
                    ${seconds && !(hours || days) ? `${seconds} seconds` : ''} \
                    `
}

/*
export const jsonToFormData = object => Object.keys(object).reduce((formData, key) => {
  formData.append(key, object[key]);
  return formData;
}, new FormData());
*/
