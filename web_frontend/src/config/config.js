const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

export const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/auth/signin`,
  REGISTER: `${API_BASE_URL}/auth/signup`,
  CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
  HOSPITAL_PROFILE: `${API_BASE_URL}/hospital/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/hospital/update-profile`,
  REQUEST_HISTORY: `${API_BASE_URL}/request/hospital-requests`,
  BLOOD_REQUEST_DETAILS: (id) => `${API_BASE_URL}/request/blood-requests/${id}`,
  PENDING_REQUESTS: (hospitalId) => `${API_BASE_URL}/request/blood-request/pending?hospitalId=${hospitalId}`,
  FIND_DONORS: (requestId) => `${API_BASE_URL}/request/donors/find/${requestId}`,
  SEND_NOTIFICATION: `${API_BASE_URL}/notifications/send`,
  GET_HOSPITALS: `${API_BASE_URL}/hospitals`,
  GET_DONORS: `${API_BASE_URL}/donors`,
  CREATE_BLOOD_REQUEST: `${API_BASE_URL}/request/request-blood`,
  GET_NOTIFICATIONS: (hospitalId) => `${API_BASE_URL}/notifications/hospital/${hospitalId}`,
  MARK_NOTIFICATION_READ: (notificationId) => `${API_BASE_URL}/notifications/mark-read/${notificationId}`,
  DELETE_NOTIFICATION: (notificationId) => `${API_BASE_URL}/notifications/delete/${notificationId}`,
  SENT_NOTIFICATIONS: (hospitalId) => `${API_BASE_URL}/notifications/hospital/sentbox/${hospitalId}`,
  CREATE_POST: `${API_BASE_URL}/community/create`,
  GET_POSTS: `${API_BASE_URL}/community`,
  DELETE_POST: (id) => `${API_BASE_URL}/community/${id}`,
  SEARCH_DONORS: `${API_BASE_URL}/donors`,
  COMPLETE_REQUEST: (requestId) => `${API_BASE_URL}/request/complete/${requestId}`,
  CANCEL_REQUEST: (requestId) => `${API_BASE_URL}/request/cancel/${requestId}`,
  GET_HOSPITAL_REQUESTS:`${API_BASE_URL}/admin/hospital-requests`,

};