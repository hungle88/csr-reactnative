
export const reducer = (state, action) => {
    switch (action.type) {
        case "LOG_IN":
            return { ...state, token: action.payload.token, student_id: action.payload.student_id }
        case "LOG_OUT":
            return { ...state, token: null }
        case "GET_COURSES":
            return { ...state, courses: action.payload }
        case "LATEST_POST":
            return { ...state, latestPost: action.payload }
        case "ADD_REQUEST":
            return { ...state, latestPost: [...state.latestPost, action.payload] }
        case "DELETE_POST":
            return { ...state, latestPost: state.latestPost.filter(post => post.student_id !== state.student_id) }
        case "UPDATE_POST":
            return {
                ...state, latestPost: state.latestPost.map(post => {
                    if (post.student_id == state.student_id) {
                        const updatePost = { ...post };
                        updatePost.currentCourse = action.payload.currentCourse;
                        updatePost.desiredCourse = action.payload.desiredCourse;
                        updatePost.message = action.payload.message;
                        return updatePost
                    } else { return post }
                })
            }
        default:
            return state
    }
}