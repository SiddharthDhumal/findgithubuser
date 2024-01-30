import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";

const initialState = {
	followersList: [],
	userName: "",
	repository: [],
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case "user/followersList":
			return { ...state, followersList: action.payload };

		case "user/userName":
			return { ...state, userName: action.payload };

		case "user/repository":
			return { ...state, repository: action.payload };
		default:
			return state;
	}
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export function followersListFn(url) {
	return async function (dispatch, getState) {
		const res = await axios.get(`${url}`);

		const followers = res.data;

		dispatch({ type: "user/followersList", payload: followers });
	};
}

export function usernameFn(name) {
	return { type: "user/userName", payload: name };
}

export function userRepoFn(repo) {
	return async function (dispatch, getState) {
		const res = await axios.get(`${repo}`);
		const repository = res.data;

		dispatch({ type: "user/repository", payload: repository });
	};
}
