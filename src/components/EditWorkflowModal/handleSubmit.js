import store from '../../store';
import { editWorkflow } from '../../actions/workflowActions';

export default function submit(values) {
  store.dispatch(editWorkflow(values))
  return 'done';
};