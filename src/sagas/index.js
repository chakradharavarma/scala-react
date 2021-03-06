import * as actions from '../actions/types';
import axios from 'axios';
import moment from 'moment';
import { getMode } from '../common/helpers'
import { JOB_PERFORMANCE_RESOLUTION } from '../common/consts'
import { takeLatest, put, call, fork, all } from 'redux-saga/effects'
import { createBrowserHistory } from "history";
import Amplify, { Auth } from 'aws-amplify';
import { change } from 'redux-form';

const history = createBrowserHistory();

function setAuthConfiguration() {
    return axios.get("/api/config/get")
        .then(payload => payload.data)
        .then(config => {
            // TODO test this by giving nulls
            if (!config.REACT_APP_COGNITO_REGION ||
                !config.REACT_APP_COGNITO_USER_POOL_ID ||
                !config.REACT_APP_COGNITO_CLIENT_ID)
            // !config.REACT_APP_COGNITO_IDENTITY_POOL_ID || todo one day we'll do SAML
            {
                return new Error("Environment is not properly set")
            }

            Amplify.configure({
                Auth: {
                    mandatorySignIn: true,
                    region: config.REACT_APP_COGNITO_REGION,
                    userPoolId: config.REACT_APP_COGNITO_USER_POOL_ID,
                    identityPoolId: config.REACT_APP_COGNITO_IDENTITY_POOL_ID,
                    userPoolWebClientId: config.REACT_APP_COGNITO_CLIENT_ID
                }
            });
        }).catch(err => {
            if (err.response.data.includes('Proxy error')) {
                err.response.data = 'Unable to fetch auth config. Make sure API is live';
            }
            return err
        })
}

function login({ username, password }) {
    return Auth.signIn(username, password)
        .catch(err => err)
}

function register({ username, password, email }) {
    return Auth.signUp({ username, password, attributes: { email } })
        .catch(err => err);
}

function verify({ username, code }) {
    return Auth.confirmSignUp(username, code)
        .catch(err => err)
}

function resendCode({ username }) {
    return Auth.resendSignUp(username)
        .catch(err => err)
}

function impersonateUser({ username, challenge }) {
    const url = '/api/config/tomato';
    const headers = {
        'Tomato-User': username,
        'Tomato-Challenge': challenge,
    }
    return axios.post(url, null, { headers })
        .catch(err => err);
}

function getJobPerformance() {
    const now = (new Date()).getTime()
    const nearestSecond = 15 * 1000
    const end = (now - (now % nearestSecond)) / 1000; // now in UNIX time
    const hours = 1;
    const start = end - (hours * 60 * 60)
    const query = `(100 - (avg by (jobId, resourceType) (irate(node_cpu_seconds_total{mode="idle"}[1m]))) * 100)`
    const url = `/api/v1/query_range?query=${query}&start=${start}&end=${end}&step=${JOB_PERFORMANCE_RESOLUTION}`;
    return axios.get(url)
        .catch(err => err);
}

function getDailyCost() {
    const today = moment().format("YYYY-MM-DD")
    const url = `/api/billing/get/daily/2018-09-01/${today}`
    return axios.get(url)
        .catch(err => err);
}

function getAvailableWorkflows() {
    const url = '/api/workflow/get';
    return axios.get(url)
        .catch(err => err);
}

function getWorkflowTemplates() {
    const url = '/api/workflow/templates';
    return axios.get(url)
        .catch(err => err);
}

function getSchedules() {
    const url = '/api/schedule/get';
    return axios.get(url)
        .catch(err => err);
}

function getConnections() {
    const url = '/api/connection/get';
    return axios.get(url)
        .catch(err => err);
}

function getJobs() {
    const url = '/api/job/get';
    return axios.get(url)
        .catch(err => err);
}

function getComputes() {
    const url = '/api/config/computes';
    return axios.get(url)
        .catch(err => err);
}

function getComputeCost({ region, instanceType }) {
    const url = `/api/pricing/region/${region}/${instanceType.replace('.', '-')}`;
    return axios.get(url)
        .catch(err => err);
}

function restartJob({ jobID }) {
    const url = `/api/job/restart/${jobID}`;
    return axios.post(url)
        .catch(err => err);
}

function cloneWorkflow({ id }) {
    const url = `/api/workflow/copy/${id}`;
    return axios.post(url)
        .catch(err => err);
}

function getDesktops() {
    const url = '/api/desktop/get';
    return axios.get(url)
        .catch(err => err);
}

function getFolder({ path }) {
    const url = `/api/file/directory/get?path=${path}`;
    return axios.get(url)
        .catch(err => err);
}

function getFile({ path }) {
    const url = `/api/file/get?path=${path}`;
    return axios.get(url)
        .catch(err => err);
}

function saveFile(payload) {
    const url = `/api/file/update`;
    const data = JSON.stringify(payload)
    return axios.patch(url, data)
        .catch(err => err);
}

function uploadFiles({ files, path }) {
    const data = new FormData();
    files.forEach(file => {
        data.append("files", file);
    })
    data.set('path', path);
    const url = '/api/file/upload';
    return axios.post(url, data)
        .catch(err => err);
}

function deleteFile({ path }) {
    const url = `/api/file/delete?path=${path}`;
    return axios.delete(url)
        .catch(err => err);
}

/*
// TODO
function getJobsStatus() {
    const url = '/api/job/statusTODO';
    return axios.get(url)
        .catch(err => err);
}*/

function downloadKeyPair() {
    const url = '/api/connection/keypair';
    return axios.get(url)
        .catch(err => err);
}

function deleteConnection({ id }) {
    const url = `/api/connection/delete/${id}`;
    return axios.delete(url)
        .catch(err => err);
}

function createWorkflow(payload) {
    const url = `/api/workflow/create`;
    const data = JSON.stringify(payload);
    return axios.post(url, data)
        .catch(err => err);
}

function deleteWorkflow({ id }) {
    const url = `/api/workflow/delete/${id}`;
    return axios.delete(url)
        .catch(err => err);
}

function terminateJob({ id }) {
    const url = `/api/job/stop/${id}`
    return axios.delete(url)
        .catch(err => err);
}

function runWorkflow({ id }) {
    const url = `/api/job/start/${id}`;
    return axios.post(url)
        .catch(err => err);
}

function createFolder(payload) {
    const url = `/api/file/directory/create`;
    const data = JSON.stringify(payload)
    return axios.post(url, data)
        .catch(err => err);
}


function checkDesktopJob({ jobID }) {
    const url = `/api/desktop/get/${jobID}`;
    return axios.get(url)
        .catch(err => err);
}

function createDesktopJob(payload) {
    const url = `/api/job/create/desktop`;
    const data = JSON.stringify(payload)
    return axios.post(url, data)
        .catch(err => err);
}

function deleteSchedule({ id }) { /* todo fix form data */
    const url = `/api/schedule/delete/${id}`;
    return axios.delete(url).catch(err => err);
}

function createSchedule(payload) {
    const url = `/api/schedule/create`;
    const data = JSON.stringify(payload);
    return axios.post(url, data).catch(err => err);
}

function updateSchedule(payload) {
    const url = `/api/schedule/update`;
    const data = JSON.stringify(payload);
    return axios.patch(url, data).catch(err => err);
}

function editWorkflow(payload) {
    const url = `/api/workflow/update`;
    const data = JSON.stringify(payload);
    return axios.patch(url, data)
        .catch(err => err);
}

function getJobMetrics({ id }) {
    const url = `/api/job/metrics/${id}`;
    return axios.get(url)
        .catch(err => err);
}

function renameFile(payload) {
    const url = `/api/file/rename`;
    const data = JSON.stringify(payload);
    return axios.patch(url, data)
        .catch(err => err);
}


function download(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        if (typeof blob === "string") {
            a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(blob)
            a.download = filename;
        } else {
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
        }
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
        }, 0)
    }
}


function downloadFile({ path }) {
    const url = `/api/file/download?path=${path}`;
    const headers = {
        responseType: 'blob'
    }
    return axios.get(url, headers)
        .catch(err => err);
}

function createConnection() {
    const url = `/api/connection/create`;
    return axios.post(url)
        .catch(err => err);
}

function createDesktop(payload) {
    const url = `/api/desktop/create`;
    const data = JSON.stringify(payload)
    return axios.post(url, data)
        .catch(err => err);
}

function deleteDesktop({ id }) {
    const url = `/api/desktop/delete/${id}`;
    return axios.delete(url)
        .catch(err => err);
}

function pauseDesktop({ iid }) { // TODO change route name on back end
    const url = `/stopdesktop/?iid=${iid}`;
    return axios.get(url)
        .catch(err => err);
}

function resumeDesktop({ iid }) {
    const url = `/startdesktop/?iid=${iid}`;
    return axios.get(url)
        .catch(err => err);
}

function initDirectories() {
    const url = `/api/config/init`;
    return axios.post(url)
        .catch(err => err);
}

function* callWorkflowsAvailable() {
    const payload = yield call(getAvailableWorkflows);
    if (payload.status === 200) {
        yield put({ type: actions.FETCHED_WORKFLOWS_AVAILABLE_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCHED_WORKFLOWS_AVAILABLE_FAILED, payload });
    }
}

function* callCreateConnection() {
    const payload = yield call(createConnection);
    if (payload.status === 200) {
        yield put({ type: actions.CREATE_CONNECTION_SUCCESS, payload });
        yield callConnections();
    } else {
        yield put({ type: actions.CREATE_CONNECTION_FAILED, payload });
    }
}

function* callDeleteConnection(action) {
    const payload = yield call(deleteConnection, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.DELETE_CONNECTION_SUCCESS, payload });
        yield callConnections();
    } else {
        yield put({ type: actions.DELETE_CONNECTION_FAILED, payload });
    }
}

function* callWorkflowTemplates() {
    const payload = yield call(getWorkflowTemplates);
    if (payload.status === 200) {
        yield put({ type: actions.FETCHED_WORKFLOW_TEMPLATES_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCHED_WORKFLOW_TEMPLATES_FAILED, payload });
    }
}

function* callDownloadKeyPair() {
    let payload = yield call(downloadKeyPair);
    if (payload.status === 200) {
        download(payload.data.contents, payload.data.path)
        yield put({ type: actions.DOWNLOAD_KEY_PAIR_SUCCESS, payload });
    } else {
        yield put({ type: actions.DOWNLOAD_KEY_PAIR_FAILED, payload });
    }
}

function* callRenameFile(action) {
    let payload = yield call(renameFile, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.RENAME_FILE_SUCCESS, payload });
        yield callFolder(action);
    } else {
        yield put({ type: actions.RENAME_FILE_FAILED, payload });
    }
}

function* callDownloadFile(action) {
    let payload = yield call(downloadFile, action.payload);
    if (payload.status === 200) {
        download(payload.data, action.payload.path.split('/').pop())
        yield put({ type: actions.DOWNLOAD_FILE_SUCCESS, payload });
    } else {
        yield put({ type: actions.DOWNLOAD_FILE_FAILED, payload });
    }
}

function* callStandardError(action) {
    let payload = yield call(getFile, { path: `/jobs/${action.payload.id}/apperr` });
    if (payload.data) {
        yield put({ type: actions.GET_STD_ERR_SUCCESS, payload });
    } else {
        yield put({ type: actions.GET_STD_ERR_FAILED, payload });
    }
}

function* callStandardOut(action) {
    let payload = yield call(getFile, { path: `/jobs/${action.payload.id}/appout` });
    if (payload.status === 200) {
        yield put({ type: actions.GET_STD_OUT_SUCCESS, payload });
    } else {
        yield put({ type: actions.GET_STD_OUT_FAILED, payload });
    }
}

function* callLogOut() {
    const payload = yield Auth.signOut();
    if (payload) {
        alert('what is this? check the console.') //todo
    }
    yield put({ type: actions.LOG_OUT_SUCCESS, payload });
    window.location.reload()
}

function* callLogIn(action) {
    const payload = yield call(login, action.payload)
    if (payload.code) { // it's an error
        if (payload.code === 'UserNotConfirmedException') {
            yield put({ type: actions.NEEDS_VERIFICATION, payload: action.payload });
        } else {
            yield put({ type: actions.LOG_IN_FAILED, payload });
        }
    } else {
        yield put({ type: actions.FETCH_LOCAL_COGNITO_USER, payload });
    }
}

function* callRegister(action) {
    const payload = yield call(register, action.payload)
    if (payload.code || payload instanceof String || typeof payload === 'string') { // even amazon's not perfect ¯\_(ツ)_/¯
        yield put({ type: actions.REGISTER_FAILED, payload });
    } else if (payload instanceof Object) {
        yield put({ type: actions.REGISTER_SUCCESS, payload });
    } else {
        console.log(payload)
        alert("could be a problem, check console")
    }
}

function* callSchedules() {
    const payload = yield call(getSchedules);
    if (payload.status === 200) {
        yield put({ type: actions.FETCHED_SCHEDULES_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCHED_SCHEDULES_FAILED, payload });
    }
}

function* callConnections() {
    const payload = yield call(getConnections);
    if (payload.status === 200) {
        yield put({ type: actions.FETCHED_CONNECTIONS_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCHED_CONNECTIONS_FAILED, payload });
    }
}

function* callJobs() {
    let payload = yield call(getJobs);
    if (payload.status === 200) {
        payload.data = payload.data.map(job => ({
            ...job,
            created: new Date(job.created),
            modified: new Date(job.modified),
        })).map(job => ({
            ...job,
            duration: job.modified - job.created,
        }))

        yield put({ type: actions.FETCHED_JOBS_SUCCESS, payload });
        const hasRunningJobs = payload.data.find(job => job.status === 'RUNNING')
        if (hasRunningJobs) {
            yield put({ type: actions.FETCH_JOB_PERFORMANCE, payload });
        }
    } else {
        yield put({ type: actions.FETCHED_JOBS_FAILED, payload });
    }
}

function* callRestartJob(action) {
    const payload = yield call(restartJob, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.RESTART_JOB_SUCCESS, payload });
    } else {
        yield put({ type: actions.RESTART_JOB_FAILED, payload });
    }
}

function* callCloneWorkflow(action) {
    const payload = yield call(cloneWorkflow, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.CLONE_WORKFLOW_SUCCESS, payload });
        yield callWorkflowsAvailable(action);
    } else {
        yield put({ type: actions.CLONE_WORKFLOW_FAILED, payload });
    }
}

function* callGetComputeCost(action) {
    const payload = yield call(getComputeCost, action.payload);
    if (payload.status === 200) {
        const lowestCost = Math.min(...(payload.data.map(zone => zone.hourly_cost)))
        const lowestCostZone = payload.data.find(zone => zone.hourly_cost === lowestCost)
        if(lowestCostZone) {
            console.log(lowestCostZone.hourly_cost)
            yield put(change('createWorkflow', 'resources.zone', lowestCostZone.zone));
            yield put(change('createWorkflow', 'resources.hourlyCostEstimate', lowestCostZone.hourly_cost));    
        } else {
            yield put({ type: actions.GET_COMPUTE_COST_FAILED, payload });
        }
    } else {
        console.log('--')
        yield put({ type: actions.GET_COMPUTE_COST_FAILED, payload });
    }
}

function* callComputes() {
    const payload = yield call(getComputes);
    if (payload.status === 200) {
        yield put({ type: actions.FETCHED_COMPUTES_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCHED_COMPUTES_FAILED, payload });
    }
}

function* callDesktops() {
    const payload = yield call(getDesktops);
    if (payload.status === 200) {
        yield put({ type: actions.FETCHED_DESKTOPS_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCHED_DESKTOPS_FAILED, payload });
    }
}

function* callUser(action) {
    const payload = yield Auth.currentAuthenticatedUser()
        .catch(err => err)
    if (payload instanceof Object) {
        axios.defaults.headers = {
            ...axios.defaults.headers,
            Authorization: payload.signInUserSession.accessToken.jwtToken
        }
        yield put({ type: actions.FETCH_LOCAL_COGNITO_USER_SUCCESS, payload })
        return true
    } else {
        yield put({ type: actions.FETCH_LOCAL_COGNITO_USER_FAILED, payload })
        return false
    }
}

function* callResendCode(action) {
    const payload = yield call(resendCode, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.RESEND_CODE_SUCCESS, payload });
    } else {
        yield put({ type: actions.RESEND_CODE_FAILED, payload });
    }
}

function* callVerify(action) {
    const payload = yield call(verify, action.payload);
    if (payload === 'SUCCESS' ||
        (typeof payload === 'object'
            && payload.message === 'User cannot be confirm. Current status is CONFIRMED')) {
        yield put({ type: actions.VERIFY_SUCCESS, payload });
    } else {
        yield put({ type: actions.VERIFY_FAILED, payload });
    }
}


function* callImpersonateUser(action) {
    const payload = yield call(impersonateUser, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.IMPERSONATE_USER_SUCCESS, payload: action.payload });
        const { username, challenge } = action.payload
        axios.defaults.headers = {
            ...axios.defaults.headers,
            'Tomato-User': username,
            'Tomato-Challenge': challenge,
        }
        yield callGetData();
    } else {
        yield put({ type: actions.IMPERSONATE_USER_FAILED, payload });
    }
}

function* callJobPerformance(action) {
    const payload = yield call(getJobPerformance, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.FETCH_JOB_PERFORMANCE_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCH_JOB_PERFORMANCE_FAILED, payload });
    }
}

function* callDailyBilling(action) {
    const payload = yield call(getDailyCost, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.FETCHED_DAILY_COSTS_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCHED_DAILY_COSTS_FAILED, payload });
    }
}

function* callInitDirectories(action) {
    const payload = yield call(initDirectories, action);
    if (payload.status === 200) {
        yield put({ type: actions.INITIALIZE_DIRECTORIES_SUCCESS, payload });
    } else {
        yield put({ type: actions.INITIALIZE_DIRECTORIES_FAILED, payload });
    }
}

function* callConfigureAuth(action) {
    // payload is an error in this case
    const payload = yield call(setAuthConfiguration)
    if (!payload) {
        yield put({ type: actions.FETCHED_AUTH_CONFIG_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCHED_AUTH_CONFIG_FAILED, payload });
    }
}

function* callFolder(action) {
    action.payload = action.payload ? action.payload : { path: '/' }; // TODO clean up
    let payload = yield call(getFolder, action.payload);
    if (payload.status === 200) {
        payload.path = action.payload.path
        history.replace(`${window.location.pathname}#${action.payload.path}`);
        payload.data = payload.data.map(file => ({
            ...file,
            modified: new Date(file.modified),
        }))
        yield put({ type: actions.FETCHED_FOLDER_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCHED_FOLDER_FAILED, payload });
    }
}


function* callFile(action) {
    if (!getMode(action.payload.path)) {
        action.payload.response = { data: "Unable to open this file type. Please try to download it instead." }
        yield put({ type: actions.FETCHED_FILE_FAILED, payload: action.payload });
        return;
    }
    let payload = yield call(getFile, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.FETCHED_FILE_SUCCESS, payload });
    } else {
        yield put({ type: actions.FETCHED_FILE_FAILED, payload });
    }
}

function* callSaveFile(action) {
    let payload = yield call(saveFile, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.SAVE_FILE_SUCCESS, payload });
    } else {
        yield put({ type: actions.SAVE_FILE_FAILED, payload });
    }
}

function* callUploadFiles(action) {
    let payload = yield call(uploadFiles, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.UPLOAD_FILES_SUCCESS, payload });
        yield callFolder(action);
    } else {
        yield put({ type: actions.UPLOAD_FILES_FAILED, payload });
    }
}

function* callDeleteFile(action) {
    let payload = yield call(deleteFile, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.DELETE_FILE_SUCCESS, payload });
        action.payload.path = action.payload.path.substring(0, action.payload.path.lastIndexOf('/')) || '/';
        yield callFolder(action);
    } else {
        yield put({ type: actions.DELETE_FILE_FAILED, payload });
    }
}

function* callTerminateJob(action) {
    let payload = yield call(terminateJob, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.TERMINATE_JOB_SUCCESS, payload });
        yield callJobs(action);
        // TODO yield callJobStatus(action);
    } else {
        yield put({ type: actions.TERMINATE_JOB_FAILED, payload });
    }
}
/* TODO
function* callJobStatus() {
    const payload = yield call(getJobsStatus);
    if (payload.status === 200) {
        yield put({ type: actions.FETCHED_JOBS_STATUS_SUCCESS, payload });
    } else {
        // TODO yield put({ type: actions.FETCHED_JOBS_STATUS_FAILED, payload });
    }
}*/

function* callGetData(action) {
    // first, init the dirs, then do all these async
    yield callInitDirectories(action);
    yield all([
        callWorkflowsAvailable(action),
        callComputes(action),
        callJobs(action),
        callJobPerformance(action),
        // TODO callJobStatus(action),
        callSchedules(action),
        callWorkflowTemplates(action),
        callConnections(action),
        callDesktops(action),
        callJobPerformance(action),
        callDailyBilling(action),
    ])

}

function* callInitApp(action) {
    yield callConfigureAuth(action)
    const loggedIn = yield callUser(action)
    if (loggedIn) {
        yield callGetData(action);
    }
}

function* callCreateWorkflow(action) {
    let payload = yield call(createWorkflow, action.payload);
    if (payload.status === 200) {
        const id = payload.data;
        if (action.payload.files.length) {
            payload = yield uploadFiles({
                files: action.payload.files,
                path: `/workflow/${id}/`,
            });
            if (payload.status !== 200) {
                payload = yield deleteWorkflow({ id })
                if (payload.status === 200) {
                    yield put({ type: actions.CREATE_WORKFLOW_FAILED, payload });
                } else {
                    yield put({ type: actions.UNKNOWN_ERROR });
                }
                return;
            }
        } 
        yield callWorkflowsAvailable(action);
        yield put({ type: actions.CREATE_WORKFLOW_SUCCESS, payload });
    } else {
        yield put({ type: actions.CREATE_WORKFLOW_FAILED, payload });
    }
}

// TODO: Test this
function* callDeleteWorkflow(action) {
    const payload = yield call(deleteWorkflow, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.DELETE_WORKFLOW_SUCCESS, payload });
        yield callWorkflowsAvailable(action);

        // Delete dangling schedules
        const workflows = yield call(getAvailableWorkflows);
        const schedules = yield call(getSchedules);
        if (workflows.data && schedules.data) {
            for (let i = 0; i < schedules.data.length; i++) {
                let schedule = schedules.data[i];
                const workflow = workflows.data.find(workflow =>
                    schedule.workflowId === workflow.id);
                if (!workflow) {
                    yield deleteSchedule({ payload: schedule });
                }
            };
        }

    } else {
        yield put({ type: actions.DELETE_WORKFLOW_FAILED, payload });
    }
}

function* callCreateSchedule(action) {
    const payload = yield call(createSchedule, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.CREATE_SCHEDULE_SUCCESS, payload });
        yield callSchedules(action);
    } else {
        yield put({ type: actions.CREATE_SCHEDULE_FAILED, payload });
    }
}

function* callEditSchedule(action) { // todo, make a real edit
    const payload = yield call(updateSchedule, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.EDIT_SCHEDULE_SUCCESS, payload });
        yield callSchedules(action);
    } else {
        yield put({ type: actions.EDIT_SCHEDULE_FAILED, payload });
    }
}

function* callEditWorkflow(action) { // TODO make API calls parallel
    let payload = yield call(editWorkflow, action.payload);
    if (payload.status === 200) {
        const id = action.payload.id;
        if (action.payload.files) {
            payload = yield uploadFiles({
                files: action.payload.files,
                path: `/workflow/${id}/`,
            });
            if (payload.status !== 200) {
                yield put({ type: actions.EDIT_WORKFLOW_FAILED, payload });
                return
            }
        } 
        yield put({ type: actions.EDIT_WORKFLOW_SUCCESS, payload });
        yield callWorkflowsAvailable(action);
    } else {
        yield put({ type: actions.EDIT_WORKFLOW_FAILED, payload });
    }
}

function* callGetJobMetrics(action) {
    const payload = yield call(getJobMetrics, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.GET_JOB_METRICS_SUCCESS, payload });
        yield callWorkflowsAvailable(action);
    } else {
        yield put({ type: actions.GET_JOB_METRICS_FAILED, payload });
    }
}

function* callCreateDesktop(action) {
    const payload = yield call(createDesktop, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.CREATE_DESKTOP_SUCCESS, payload });
        yield callDesktops(action);
    } else {
        yield put({ type: actions.CREATE_DESKTOP_FAILED, payload });
    }
}

function* callCreateFolder(action) {
    const payload = yield call(createFolder, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.CREATE_FOLDER_SUCCESS, payload });
        action.payload.path = action.payload.path.substring(0, action.payload.path.lastIndexOf('/')) || '/';
        yield callFolder(action);
    } else {
        yield put({ type: actions.CREATE_FOLDER_FAILED, payload });
    }
}

function* callCreateDesktopJob(action) {
    let payload = yield call(checkDesktopJob, action.payload);
    if (payload.status === 200) {
        const { conn } = payload.data;
        if (!conn) {
            yield put({ type: actions.PROMPT_JOB_DESKTOP_DNE, payload });
            payload = yield call(createDesktopJob, action.payload);
            if (payload.data) {
                yield put({ type: actions.CREATE_DESKTOP_JOB_SUCCESS, payload });
                yield callDesktops(action);
            } else {
                yield put({ type: actions.CREATE_DESKTOP_JOB_SUCCESS, payload });
            }
        } else {
            var { data } = payload;
            var instance = data.desktop;
            var state = instance.State.Name;

            var serverIp = window.location.hostname;

            var connectionID = data.conn.identifier;
            var base = btoa([connectionID, "c", "postgresql"].join("\x00"));

            var now = moment();
            var launchDate = moment(instance.LaunchTime);
            var duration = moment.duration(now.diff(launchDate));

            if (state === "running" && duration.asMinutes() > 10) {
                let connect = "http://" + serverIp + ":8080/guacamole/#/client/" + base + "?token=" + data.token;
                window.open(connect, '_blank')
                yield put({ type: actions.LAUNCHED_DESKTOP, payload });
            } else {
                yield put({ type: actions.DESKTOP_NOT_READY, payload });
            }
        }

    } else {
        yield put({ type: actions.CREATE_DESKTOP_JOB_FAILED, payload });
    }
}

function* callDeleteDesktop(action) {
    const payload = yield call(deleteDesktop, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.DELETE_DESKTOP_SUCCESS, payload });
        yield callDesktops();
    } else {
        yield put({ type: actions.DELETE_DESKTOP_FAILED, payload });
    }
}

function* callResumeDesktop(action) { // TODO delete?
    const payload = yield call(resumeDesktop, action.payload);
    if (payload.data) { // TODO check data len?
        yield put({ type: actions.RESUME_DESKTOP_SUCCESS, payload });
        yield callDesktops();
    } else {
        yield put({ type: actions.RESUME_DESKTOP_FAILED, payload });
    }
}

function* callPauseDesktop(action) { // TODO delete?
    const payload = yield call(pauseDesktop, action.payload);
    if (payload.data) { // TODO check data len?
        yield put({ type: actions.PAUSE_DESKTOP_SUCCESS, payload });
        yield callDesktops();
    } else {
        yield put({ type: actions.PAUSE_DESKTOP_FAILED, payload });
    }
}

function* callDeleteSchedule(action) {
    const payload = yield call(deleteSchedule, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.DELETE_SCHEDULE_SUCCESS, payload });
        yield callSchedules(action);
    } else {
        yield put({ type: actions.DELETE_SCHEDULE_FAILED, payload });
    }
}

function* callRunWorkflow(action) {
    const payload = yield call(runWorkflow, action.payload);
    if (payload.status === 200) {
        yield put({ type: actions.RUN_WORKFLOW_SUCCESS, payload: action.payload });
        yield callJobs(action);
        // TODO yield callJobStatus(action);
    } else {
        yield put({ type: actions.RUN_WORKFLOW_FAILED, payload });
    }
}

function* getInitSaga() {
    yield takeLatest(actions.INIT_APP, callInitApp)
}

function* getCreateWorkflowSaga() {
    yield takeLatest(actions.CREATE_WORKFLOW, callCreateWorkflow)
}

function* getDeleteWorkflowSaga() {
    yield takeLatest(actions.DELETE_WORKFLOW, callDeleteWorkflow)
}

function* getCreateConnectionSaga() {
    yield takeLatest(actions.CREATE_CONNECTION, callCreateConnection)
}

function* getCreateDesktopSaga() {
    yield takeLatest(actions.CREATE_DESKTOP, callCreateDesktop)
}

function* getDeleteDesktopSaga() {
    yield takeLatest(actions.DELETE_DESKTOP, callDeleteDesktop)
}

function* getPauseDesktopSaga() {
    yield takeLatest(actions.PAUSE_DESKTOP, callPauseDesktop)
}

function* getResumeDesktopSaga() {
    yield takeLatest(actions.RESUME_DESKTOP, callResumeDesktop)
}

function* getFolderSaga() {
    yield takeLatest(actions.FETCH_FOLDER, callFolder)
}

function* getFileSaga() {
    yield takeLatest(actions.FETCH_FILE, callFile)
}

function* saveFileSaga() {
    yield takeLatest(actions.SAVE_FILE, callSaveFile)
}

function* uploadFilesSaga() {
    yield takeLatest(actions.UPLOAD_FILES, callUploadFiles)
}

function* deleteFileSaga() {
    yield takeLatest(actions.DELETE_FILE, callDeleteFile)
}

function* terminateJobSaga() {
    yield takeLatest(actions.TERMINATE_JOB, callTerminateJob)
}

function* createFolderSaga() {
    yield takeLatest(actions.CREATE_FOLDER, callCreateFolder)
}

function* createDesktopJobSaga() {
    yield takeLatest(actions.CREATE_DESKTOP_JOB, callCreateDesktopJob)
}

function* getDeleteConnectionSaga() {
    yield takeLatest(actions.DELETE_CONNECTION, callDeleteConnection)
}

function* getCreateScheduleSaga() {
    // todo test
    yield takeLatest(actions.CREATE_SCHEDULE, callCreateSchedule)
}

function* getEditScheduleSaga() {
    // todo test
    yield takeLatest(actions.EDIT_SCHEDULE, callEditSchedule)
}

function* getEditWorkflowSaga() {
    yield takeLatest(actions.EDIT_WORKFLOW, callEditWorkflow)
}

function* getJobMetricsSaga() {
    yield takeLatest(actions.GET_JOB_METRICS, callGetJobMetrics)
}

function* getDeleteScheduleSaga() {
    // todo test
    yield takeLatest(actions.DELETE_SCHEDULE, callDeleteSchedule)
}

function* getRunWorkflowSaga() {
    // todo test
    yield takeLatest(actions.RUN_WORKFLOW, callRunWorkflow)
}

function* getDownloadKeyPairSaga() {
    yield takeLatest(actions.DOWNLOAD_KEY_PAIR, callDownloadKeyPair)
}

function* renameFileSaga() {
    yield takeLatest(actions.RENAME_FILE, callRenameFile)
}

function* downloadFileSaga() {
    yield takeLatest(actions.DOWNLOAD_FILE, callDownloadFile)
}

function* getStandardErrorSaga() {
    yield takeLatest(actions.GET_STD_ERR, callStandardError)
}

function* getStandardOutSaga() {
    yield takeLatest(actions.GET_STD_OUT, callStandardOut)
}

function* logoutSaga() {
    yield takeLatest(actions.LOG_OUT, callLogOut)
}

function* loginSaga() {
    yield takeLatest(actions.LOG_IN, callLogIn)
}

function* registerSaga() {
    yield takeLatest(actions.REGISTER, callRegister)
}

function* getDataSaga() {
    yield takeLatest(actions.FETCH_LOCAL_COGNITO_USER_SUCCESS, callGetData)
}

function* getUserSaga() {
    yield takeLatest(actions.FETCH_LOCAL_COGNITO_USER, callUser)
}

function* resendCodeSaga() {
    yield takeLatest(actions.RESEND_CODE, callResendCode)
}

function* verifySaga() {
    yield takeLatest(actions.VERIFY, callVerify)
}

function* impersonateUserSaga() {
    yield takeLatest(actions.IMPERSONATE_USER, callImpersonateUser)
}

function* jobPerformanceSaga() {
    yield takeLatest(actions.FETCH_JOB_PERFORMANCE, callJobPerformance)
}

function* getConnectionsSaga() {
    yield takeLatest(actions.FETCH_CONNECTIONS, callConnections)
}

function* getJobsSaga() {
    yield takeLatest(actions.FETCH_JOBS, callJobs)
}

function* restartJobSaga() {
    yield takeLatest(actions.RESTART_JOB, callRestartJob)
}

function* cloneWorkflowSaga() {
    yield takeLatest(actions.CLONE_WORKFLOW, callCloneWorkflow)
}

function* computeCostSaga() {
    yield takeLatest(actions.GET_COMPUTE_COST, callGetComputeCost)
}

export default function* root() {
    yield all([
        fork(getInitSaga),
        fork(getCreateWorkflowSaga),
        fork(getDeleteWorkflowSaga),
        fork(getCreateScheduleSaga),
        fork(getDeleteScheduleSaga),
        fork(getRunWorkflowSaga),
        fork(getDownloadKeyPairSaga),
        fork(getCreateConnectionSaga),
        fork(getDeleteConnectionSaga),
        fork(getCreateDesktopSaga),
        fork(getDeleteDesktopSaga),
        fork(getEditScheduleSaga),
        fork(getEditWorkflowSaga),
        fork(getPauseDesktopSaga),
        fork(getResumeDesktopSaga),
        fork(getFolderSaga),
        fork(getFileSaga),
        fork(saveFileSaga),
        fork(createFolderSaga),
        fork(uploadFilesSaga),
        fork(deleteFileSaga),
        fork(terminateJobSaga),
        fork(createDesktopJobSaga),
        fork(renameFileSaga),
        fork(getStandardErrorSaga),
        fork(getStandardOutSaga),
        fork(downloadFileSaga),
        fork(getJobMetricsSaga),
        fork(getUserSaga),
        fork(getDataSaga),
        fork(logoutSaga),
        fork(loginSaga),
        fork(registerSaga),
        fork(resendCodeSaga),
        fork(verifySaga),
        fork(impersonateUserSaga),
        fork(jobPerformanceSaga),
        fork(getConnectionsSaga),
        fork(getJobsSaga),
        fork(restartJobSaga),
        fork(cloneWorkflowSaga),
        fork(computeCostSaga),
    ])
}
