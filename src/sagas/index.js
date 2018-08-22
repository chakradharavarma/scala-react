import {
    FETCHED_JOBS_FAILED,
    FETCHED_JOBS_SUCCESS,
    FETCHED_CONNECTIONS_FAILED,
    FETCHED_CONNECTIONS_SUCCESS,
    FETCHED_JOBS_STATUS_FAILED,
    FETCHED_JOBS_STATUS_SUCCESS,
    FETCHED_WORKFLOWS_AVAILABLE_SUCCESS,
    FETCHED_WORKFLOWS_AVAILABLE_FAILED,
    FETCHED_SCHEDULES_SUCCESS,
    FETCHED_SCHEDULES_FAILED,
    FETCHED_WORKFLOW_TEMPLATES_FAILED,
    FETCHED_WORKFLOW_TEMPLATES_SUCCESS,
    INIT_APP,
    SUBMIT_NEW_WORKFLOW,
    SUBMIT_WORKFLOW_FAILED,
    SUBMIT_WORKFLOW_SUCCESS,
    DELETE_WORKFLOW,
    DELETE_WORKFLOW_SUCCESS,
    DELETE_WORKFLOW_FAILED,
    CREATE_SCHEDULE,
    CREATE_SCHEDULE_SUCCESS,
    CREATE_SCHEDULE_FAILED,
    DELETE_SCHEDULE,
    DELETE_SCHEDULE_SUCCESS,
    DELETE_SCHEDULE_FAILED,
    RUN_WORKFLOW,
    RUN_WORKFLOW_SUCCESS,
    RUN_WORKFLOW_FAILED,
    DOWNLOAD_KEY_PAIR,
    DOWNLOAD_KEY_PAIR_SUCCESS,
    DOWNLOAD_KEY_PAIR_FAILED,
    CREATE_CONNECTION,
    CREATE_CONNECTION_SUCCESS,
    CREATE_CONNECTION_FAILED,
    DELETE_CONNECTION,
    DELETE_CONNECTION_SUCCESS,
    DELETE_CONNECTION_FAILED,
    FETCHED_DESKTOPS_FAILED,
    FETCHED_DESKTOPS_SUCCESS,
    CREATE_DESKTOP,
    CREATE_DESKTOP_SUCCESS,
    CREATE_DESKTOP_FAILED,
    DELETE_DESKTOP,
    DELETE_DESKTOP_SUCCESS,
    DELETE_DESKTOP_FAILED,
} from '../actions/types';

// import downloader from 'js-file-download'; // TODO delete this pkg json
import axios from 'axios';
import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function getAvailableWorkflows() {
    const url = '/getWorkflows';
    return axios.get(url)
        .catch(err => err);
}

function getWorkflowTemplates() {
    const url = '/getWorkflowTemplates';
    return axios.get(url)
        .catch(err => err);
}

function getSchedules() {
    const url = '/getSchedules';
    return axios.get(url)
        .catch(err => err);
}

function getConnections() {
    const url = '/connectionsAjax';
    return axios.get(url)
        .catch(err => err);
}

function getJobs() {
    const url = '/jobsajax';
    return axios.get(url)
        .catch(err => err);
}

function getDesktops() {
    const url = '/desktopsAjax';
    return axios.get(url)
        .catch(err => err);
}

function getJobsStatus() {
    const url = '/jobstatuscount';
    return axios.get(url)
        .catch(err => err);
}

function getKeyPairURL() {
    const url = '/downloadKeyPair';
    return axios.get(url)
        .catch(err => err);
}

function deleteConnection({id}) {
    const url = `/deleteConnection?shell_id=${id}`;
    return axios.get(url)
        .catch(err => err);
}

function getKeyPair(url) {
    debugger;
    return axios({
        url,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },      
        responseType: 'blob', // important
    }).then((response) => {
        debugger;
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'key.pem');
        debugger;
        document.body.appendChild(link);
        link.click();
    }).catch(err => {
        debugger;
        return err;
    });
    /*
    // TODO fix preflight in S3
    return axios.get(url, config)
        .then(resp => {
            return resp.data
        })
        .then(data => downloader(data, 'key.pem'))
        .catch(err => err);*/
}

// TODO make it a post
function postNewWorkflow(payload) {
    const url = `/startBuildingWorkflow?templateId=${payload.templateId || 'basic'}&name=${payload.name}`;
    return axios.get(url)
        .catch(err => err);
}

function deleteWorkflow(payload) {
    const url = `/deleteWorkflow`;
    return axios.post(url, {
        id: payload.id
    }).catch(err => err);
}

function runWorkflow(payload) {
    const url = `/runWorkflow`;
    return axios.post(url, {
        id: payload.id
    }).catch(err => err);
}

function deleteSchedule(payload) { /* todo test */
    const url = `/deleteSchedule`;
    return axios.post(url, {
        id: payload.workflowId
    }).catch(err => err);
}

function createSchedule(payload) {
    const url = `/createSchedule`;
    return axios.post(url, {
        data: JSON.stringify(payload),
    }).catch(err => err);
}

function createConnection() {
    const url = `/createConnection/`;
    return axios.post(url).catch(err => err);
}

function createDesktop({type}) {
    const url = `/createdesktop/?desktopType=${type}`;
    return axios.get(url)
        .catch(err => err);
}

function deleteDesktop({desktop_id, con_id}) {
    debugger;
    const url = `/deletedesktop/?desktop_id=${desktop_id}&con_id=${con_id}`;
    return axios.get(url)
        .catch(err => err);
}

function* callWorkflowsAvailable() {
    const payload = yield call(getAvailableWorkflows);
    if (payload.data && payload.data.length) {
        yield put({ type: FETCHED_WORKFLOWS_AVAILABLE_SUCCESS, payload });
    } else {
        yield put({ type: FETCHED_WORKFLOWS_AVAILABLE_FAILED, payload });
    }
}

function* callCreateConnection() {
    const payload = yield call(createConnection);
    if (payload.data) {
        yield put({ type: CREATE_CONNECTION_SUCCESS, payload });
        yield callConnections();
    } else {
        debugger;
        yield put({ type: CREATE_CONNECTION_FAILED, payload });
    }
}

function* callDeleteConnection(action) {
    const payload = yield call(deleteConnection, action.payload);
    if (payload.data && payload.data.length) {
        yield put({ type: DELETE_CONNECTION_SUCCESS, payload });
        yield callConnections();
    } else {
        yield put({ type: DELETE_CONNECTION_FAILED, payload });
    }
}

function* callWorkflowTemplates() {
    const payload = yield call(getWorkflowTemplates);
    if (payload.data && payload.data.length) {
        yield put({ type: FETCHED_WORKFLOW_TEMPLATES_SUCCESS, payload });
    } else {
        yield put({ type: FETCHED_WORKFLOW_TEMPLATES_FAILED, payload });
    }
}

function* callDownloadKeyPair() {
    let payload = yield call(getKeyPairURL);
    window.location = payload.data;
    if (payload.data && payload.data.length) {
        yield put({ type: DOWNLOAD_KEY_PAIR_SUCCESS, payload });
    } else {
        debugger;
        yield put({ type: DOWNLOAD_KEY_PAIR_FAILED, payload });
    }
}

function* callSchedules() {
    const payload = yield call(getSchedules);
    if (payload.data) {
        yield put({ type: FETCHED_SCHEDULES_SUCCESS, payload });
    } else {
        yield put({ type: FETCHED_SCHEDULES_FAILED, payload });
    }
}

function* callConnections() {
    const payload = yield call(getConnections);
    if (payload.data) {
        yield put({ type: FETCHED_CONNECTIONS_SUCCESS, payload });
    } else {
        yield put({ type: FETCHED_CONNECTIONS_FAILED, payload });
    }
}

function* callJobs() {
    const payload = yield call(getJobs);
    if (payload.data) {
        yield put({ type: FETCHED_JOBS_SUCCESS, payload });
    } else {
        yield put({ type: FETCHED_JOBS_FAILED, payload });
    }
}

function* callDesktops() {
    const payload = yield call(getDesktops);
    if (payload.data) {
        yield put({ type: FETCHED_DESKTOPS_SUCCESS, payload });
    } else {
        yield put({ type: FETCHED_DESKTOPS_FAILED, payload });
    }
}

function* callJobStatus() {
    const payload = yield call(getJobsStatus);
    if (payload.data) {
        yield put({ type: FETCHED_JOBS_STATUS_SUCCESS, payload });
    } else {
        yield put({ type: FETCHED_JOBS_STATUS_FAILED, payload });
    }
}

function* callInitApp(action) {
    yield callJobs(action);
    yield callJobStatus(action);
    yield callSchedules(action);
    yield callConnections(action);
    yield callDesktops(action);
    yield callWorkflowsAvailable(action);
    yield callWorkflowTemplates(action);
}

function* callSubmitNewWorkflow(action) {
    const payload = yield call(postNewWorkflow, action.payload);
    if (payload.data) {
        yield put({ type: SUBMIT_WORKFLOW_SUCCESS, payload });
        yield callWorkflowsAvailable(action);
    } else {
        yield put({ type: SUBMIT_WORKFLOW_FAILED, payload });
    }
}

// TODO: Test this
function* callDeleteWorkflow(action) {
    const payload = yield call(deleteWorkflow, action.payload);
    if (payload.data) {
        yield put({ type: DELETE_WORKFLOW_SUCCESS, payload });
        yield callWorkflowsAvailable(action);
    } else {
        yield put({ type: DELETE_WORKFLOW_FAILED, payload });
    }
}

function* callCreateSchedule(action) {
    const payload = yield call(createSchedule, action.payload);
    if (payload.data) {
        yield put({ type: CREATE_SCHEDULE_SUCCESS, payload });
        yield callSchedules(action);
    } else {
        yield put({ type: CREATE_SCHEDULE_FAILED, payload });
    }
}

function* callCreateDesktop(action) {
    const payload = yield call(createDesktop, action.payload);
    if (payload.data) {
        yield put({ type: CREATE_DESKTOP_SUCCESS, payload });
        yield callDesktops(action);
    } else {
        debugger;
        yield put({ type: CREATE_DESKTOP_FAILED, payload });
    }
}

function* callDeleteDesktop(action) {
    const payload = yield call(deleteDesktop, action.payload);
    if (payload.data) {
        yield put({ type: DELETE_DESKTOP_SUCCESS, payload });
        yield callDesktops();
    } else {
        debugger;
        yield put({ type: DELETE_DESKTOP_FAILED, payload });
    }
}

function* callDeleteSchedule(action) {
    const payload = yield call(deleteSchedule, action.payload);
    if (payload.data) {
        yield put({ type: DELETE_SCHEDULE_SUCCESS, payload });
        yield callSchedules(action);
    } else {
        yield put({ type: DELETE_SCHEDULE_FAILED, payload });
    }
}

function* callRunWorkflow(action) {
    const payload = yield call(runWorkflow, action.payload);
    if (payload.data) {
        yield put({ type: RUN_WORKFLOW_SUCCESS, payload });
        // todo put in refresh task
    } else {
        yield put({ type: RUN_WORKFLOW_FAILED, payload });
    }
}

function* getInitSaga() {
    yield* takeLatest(INIT_APP, callInitApp)
}

function* getSubmitWorkflowSaga() {
    yield* takeLatest(SUBMIT_NEW_WORKFLOW, callSubmitNewWorkflow)
}

function* getDeleteWorkflowSaga() {
    yield* takeLatest(DELETE_WORKFLOW, callDeleteWorkflow)
}

function* getCreateConnectionSaga() {
    yield* takeLatest(CREATE_CONNECTION, callCreateConnection)
}

function* getCreateDesktopSaga() {
    yield* takeLatest(CREATE_DESKTOP, callCreateDesktop)
}

function* getDeleteDesktopSaga() {
    yield* takeLatest(DELETE_DESKTOP, callDeleteDesktop)
}

function* getDeleteConnectionSaga() {
    yield* takeLatest(DELETE_CONNECTION, callDeleteConnection)
}

function* getCreateScheduleSaga() {
    // todo test    
    yield* takeLatest(CREATE_SCHEDULE, callCreateSchedule)
}

function* getDeleteScheduleSaga() {
    // todo test
    yield* takeLatest(DELETE_SCHEDULE, callDeleteSchedule)
}

function* getRunWorkflowSaga() {
    // todo test
    yield* takeLatest(RUN_WORKFLOW, callRunWorkflow)
}

function* getDownloadKeyPairSaga() {
    yield* takeLatest(DOWNLOAD_KEY_PAIR, callDownloadKeyPair)
}


export default function* root() {
    yield [
        fork(getInitSaga),
        fork(getSubmitWorkflowSaga),
        fork(getDeleteWorkflowSaga),
        fork(getCreateScheduleSaga),
        fork(getDeleteScheduleSaga),
        fork(getRunWorkflowSaga),
        fork(getDownloadKeyPairSaga),
        fork(getCreateConnectionSaga),
        fork(getDeleteConnectionSaga),
        fork(getCreateDesktopSaga),
        fork(getDeleteDesktopSaga),
    ]
}