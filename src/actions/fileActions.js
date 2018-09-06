import {
    FETCH_FILE,
    FETCH_FOLDER,
    CREATE_FOLDER,
    CLEAR_FILE,
    SAVE_FILE,
    UPDATE_CODE,
    DOWNLOAD_FILE,
    DELETE_FILE,
    UPLOAD_FILES,
    RENAME_FILE,
} from './types';

export const fetchFolder = (path) => {
    return {
        type: FETCH_FOLDER,
        payload: {
            path
        }
    }
}

export const fetchFile = (path) => {
    return {
        type: FETCH_FILE,
        payload: {
            path
        }
    }
}

export const createFile = (name, type, path) => {
    return {
        type: 'create file ' , //CREATE_FILE, todo
        payload: {
            name,
            type,
            path
        }
    }
}

export const createNewFolder = (path) => {
    return {
        type: CREATE_FOLDER,
        payload: {
            path
        }
    }
}

export const downloadFile = (filesToDownload) => {
    return {
        type: DOWNLOAD_FILE,
        payload: {
            filesToDownload
        }
    }
}

export const handleClose = () => {
    return {
        type: CLEAR_FILE,
    }
}

export const handleSave = (path, contents) => {
    return {
        type: SAVE_FILE,
        payload: {
            path,
            contents,
        }
    }
}

export const updateCode = (contents) => {
    return {
        type: UPDATE_CODE,
        payload: {
            contents,
        }
    }
}

export const renameFile = (oldName, newName) => {
    return {
        type: RENAME_FILE,
        payload: {
            oldName,
            newName,
        },
    }
}
export const deleteFile = (file) => {
    return {
        type: DELETE_FILE,
        payload: file,
    }
}

export const uploadFiles = (files, path) => {
    return {
        type: UPLOAD_FILES,
        payload: {
            files,
            path,
        }
    }
}

