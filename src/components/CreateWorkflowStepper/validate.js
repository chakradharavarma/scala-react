/*const validate = values => {
    const errors = {}
    if(!values) {
        return errors;
    }
    if (!values.name) {
      errors.name = 'Required'
    }
    if (!values.clusterType) {
      errors.clusterType = 'Required'
    }
    if (!values.taskType) {
      errors.taskType = 'Required'
    }
    if (!values.numOfNodes) {
      errors.numOfNodes = 'Required'
    } else if (!/^[1-9]\d*$/i.test(values.numOfNodes)) {
      errors.numOfNodes = 'Invalid number'
    }
    if (!values.cpusPerNode) {
      errors.cpusPerNode = 'Required'
    } else if (!/^[1-9]\d*$/i.test(values.numOfNodes)) {
      errors.cpusPerNode = 'Invalid number'
    }
    if (!values.tasksPerNode) {
      errors.cpusPerNode = 'Required'
    } else if (!/^[1-9]\d*$/i.test(values.numOfNodes)) {
      errors.tasksPerNode = 'Invalid number'
    }
    if (!values.disk) {
      errors.diskSpace = 'Required'
    } else if (!/^[1-9]\d*$/i.test(values.numOfNodes)) {
      errors.diskSpace = 'Invalid disk space'
    }
    return errors
  }
  
  export default validate
  */

export const required = value => (value ? undefined : 'Required')
export const maxLength = max => value =>
   value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength15 = maxLength(15)
export const minLength = min => value =>
   value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
export const number = value =>
   value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const minValue = min => value =>
   value && value < min ? `Must be at least ${min}` : undefined
export const minValue18 = minValue(18)
export const email = value =>
   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
     ? 'Invalid email address'
     : undefined
export const tooOld = value =>
   value && value > 65 ? 'You might be too old for this' : undefined
export const aol = value =>
   value && /.+@aol\.com/.test(value)
     ? 'Really? You still use AOL for your email?'
     : undefined
export const alphaNumeric = value =>
   value && /[^a-zA-Z0-9 ]/i.test(value)
     ? 'Only alphanumeric characters'
     : undefined
export const phoneNumber = value =>
   value && !/^(0|[1-9][0-9]{9})$/i.test(value)
     ? 'Invalid phone number, must be 10 digits'
     : undefined