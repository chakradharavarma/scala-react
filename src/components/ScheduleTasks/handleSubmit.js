import { SubmissionError } from 'redux-form';
import store from '../../store';
import { createSchedule } from '../../actions/scheduleActions';

export default function submit(values) {
  if (!values.workflowId) {
    throw new SubmissionError({
      name: 'workflow not specified',
      _error: 'submit failed!',
    });
  }
  else if (!values.cron) {
      throw new SubmissionError({
        name: 'cron not specified',
        _error: 'submit failed!',
      });
    } else {
    store.dispatch(createSchedule(values.workflowId, values.cron))
  }
  return 'done';
};