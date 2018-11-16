import { SubmissionError } from 'redux-form';
import store from '../../store';
import { renameFile } from '../../actions/fileActions';

export default function submit(path, values) {
    const { oldName, newName } = values;
    const rg1=/^[^\\/:*?"<>|]+$/; // forbidden characters \ / : * ? " < > |
    const rg2=/^\./; // cannot start with dot (.)
    const rg3=/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
    if (!oldName === newName) {
        return
    }
    else if (!newName) {
        throw new SubmissionError({
            name: 'new name not specified',
            _error: 'submit failed!',
        });
    }
    else if (!rg1.test(newName)&&rg2.test(newName)&&rg3.test(newName)) {
      
        throw new SubmissionError({
            name: 'invalid file name',
            _error: 'submit failed!',
        });
    } else {
        store.dispatch(renameFile(oldName, newName, path))
    }
};