import { SubmissionError } from 'redux-form';
import store from '../../store';
import { submitNewWorkflow } from '../../actions/workflowActions';

export default function submit(values) {
  if (!values.name) {
    throw new SubmissionError({
      name: 'name not specified',
      _error: 'submit failed!',
    });
  } else {
    store.dispatch(submitNewWorkflow(values))
  }
  return 'done';
};