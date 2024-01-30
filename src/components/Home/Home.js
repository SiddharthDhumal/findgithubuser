import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useDispatch } from "react-redux";
import { followersListFn, userRepoFn, usernameFn } from "../../store";

const Home = () => {
	const [user, setUser] = useState("");
	const [showData, setShowData] = useState([]);
	const dispatch = useDispatch();

	const handleUser = (e) => {
		e.preventDefault();
		if (user.split(" ").join("") === "") {
			window.alert("Please enter user name");
			setUser("");
			return;
		}

		try {
			const getData = async () => {
				const Data = await axios.get(
					`https://api.github.com/users/${user.split(" ").join("")}`
				);

				if (Data.data) {
					setShowData([Data.data]);
				} else {
					window.alert("user does not found");
					setUser("");
				}
			};

			getData();
		} catch (err) {
			throw new err();
		}
	};

	console.log(showData);

	function handlefollowersList(usersfollowers) {
		dispatch(usernameFn(usersfollowers.login));
		dispatch(followersListFn(usersfollowers.followers_url));
		setUser("");
	}

	function handleRepoDescription(userRepo) {
		dispatch(userRepoFn(userRepo.repos_url));
		dispatch(usernameFn(userRepo.login));
	}

	return (
		<div className={styles.home}>
			<form className={styles.inputForm} onSubmit={handleUser}>
				<input
					className={styles.inputBox}
					placeholder="select user"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<button className={styles.inputBtn}>Search</button>
			</form>
			{showData.length > 0 ? (
				<div className={styles.showAllData}>
					{showData.map((item) => (
						<div className={styles.userData} key={item.id}>
							<img
								src={item.avatar_url}
								alt="userimg"
								width="100px"
								height="100px"
							/>
							<div className={styles.userInfo}>
								<p className={styles.userName}>{item.avatar_url}</p>
								<a href={item.html_url} className={styles.githubLink}>
									{item.html_url}
								</a>
								<p>
									<button
										className={styles.userBtn}
										onClick={() => handleRepoDescription(item)}
									>
										<Link className={styles.followersList} to="/userinfo">
											Repository Details
										</Link>
									</button>

									<button
										className={styles.userBtn}
										onClick={() => handlefollowersList(item)}
									>
										<Link className={styles.followersList} to="/followerslist">
											Followers List
										</Link>
									</button>
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<h3 className={styles.selectUser}>No User Selected</h3>
			)}
		</div>
	);
};

export default Home;
