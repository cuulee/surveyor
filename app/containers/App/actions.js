import {
  LOAD_ITEM,
  LOAD_ITEM_SUCCESS,
  LOAD_ITEM_ERROR,
  LOAD_OAUTH,
  LOAD_OAUTH_SUCCESS,
  LOAD_OAUTH_ERROR,
  LOAD_SUBMISSIONS_SUCCESS,
  LOAD_SUBMISSIONS_ERROR,
  SAVE_STEP,
  SUBMIT_STEP,
  SUBMIT_STEP_SUCCESS,
  SUBMIT_STEP_ERROR,
  SKIP_STEP,
  SKIP_STEP_SUCCESS,
  SKIP_STEP_ERROR,
  NEXT_STEP,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,
  SET_PANE_MODE,
  SET_PANE_INDEX,
  TOGGLE_METADATA,
  SET_ERROR
} from './constants'

export function nextStep () {
  return {
    type: NEXT_STEP
  }
}

export function saveStep (stepIndex, data) {
  return {
    type: SAVE_STEP,
    stepIndex,
    data
  }
}

export function submitStep (organizationId, id, step, stepIndex, data) {
  return {
    type: SUBMIT_STEP,
    organizationId,
    id,
    step,
    stepIndex,
    data
  }
}

export function stepSubmitted (organizationId, id, step, stepIndex, data) {
  return {
    type: SUBMIT_STEP_SUCCESS,
    organizationId,
    id,
    step,
    stepIndex,
    data
  }
}

export function stepSubmitError (error) {
  return {
    type: SUBMIT_STEP_ERROR,
    error
  }
}

export function skipStep (organizationId, id, step, stepIndex) {
  return {
    type: SKIP_STEP,
    organizationId,
    id,
    step,
    stepIndex
  }
}

export function stepSkipped (organizationId, id, step, stepIndex) {
  return {
    type: SKIP_STEP_SUCCESS,
    organizationId,
    id,
    step,
    stepIndex
  }
}

export function stepSkipError (error) {
  return {
    type: SKIP_STEP_ERROR,
    error
  }
}

export function loadItem (organizationId, id) {
  return {
    type: LOAD_ITEM,
    organizationId,
    id
  }
}

export function itemLoaded (item) {
  return {
    type: LOAD_ITEM_SUCCESS,
    item
  }
}

export function itemLoadingError (error) {
  return {
    type: LOAD_ITEM_ERROR,
    error
  }
}

export function submissionsLoaded (submissions) {
  return {
    type: LOAD_SUBMISSIONS_SUCCESS,
    submissions
  }
}

export function submissionsLoadingError (error) {
  return {
    type: LOAD_SUBMISSIONS_ERROR,
    error
  }
}

export function loadOAuth () {
  return {
    type: LOAD_OAUTH
  }
}

export function oauthLoaded (oauth) {
  return {
    type: LOAD_OAUTH_SUCCESS,
    oauth
  }
}

export function oauthLoadingError (error) {
  return {
    type: LOAD_OAUTH_ERROR,
    error
  }
}

export function setError (error) {
  return {
    type: SET_ERROR,
    error
  }
}

export function logOut () {
  return {
    type: LOG_OUT
  }
}

export function logOutSuccess () {
  return {
    type: LOG_OUT_SUCCESS
  }
}

export function logOutError () {
  return {
    type: LOG_OUT_ERROR
  }
}

export function setPaneMode (mode) {
  return {
    type: SET_PANE_MODE,
    mode
  }
}

export function setPaneIndex (index) {
  return {
    type: SET_PANE_INDEX,
    index
  }
}

export function toggleMetadata () {
  return {
    type: TOGGLE_METADATA
  }
}
