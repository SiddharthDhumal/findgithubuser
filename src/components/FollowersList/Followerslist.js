import React from "react";
import styles from "./Followerslist.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRepoFn, usernameFn } from "../../store";

const Followerslist = () => {
	const dispatch = useDispatch();

	const userName = useSelector((store) => store.userName);

	const followersList = useSelector((store) => store.followersList);

	function handleRepoDescription(userRepo) {
		dispatch(userRepoFn(userRepo.repos_url));
		dispatch(usernameFn(userRepo.login));
	}

	return (
		<>
			<h1 className={styles.header}>Followers List of {userName}</h1>

			<Link className={styles.backBtn} to="/">
				Back to SearchList <span>&#x2192;</span>
			</Link>
			{followersList.length > 0 ? (
				<div className={styles.showAllFollowers}>
					{followersList.map((item) => (
						<div className={styles.usersFollower} key={item.id}>
							<img
								src={item.avatar_url}
								alt="user img"
								width="100px"
								height="100px"
							/>
							<div className={styles.userInfo}>
								<p className={styles.userName}>{item.login}</p>
								<button
									className={styles.userBtn}
									onClick={() => handleRepoDescription(item)}
								>
									<Link className={styles.followersList} to="/userinfo">
										Repository List
									</Link>
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<h3 className={styles.nofollowers}>No Followers Found</h3>
			)}
		</>
	);
};

export default Followerslist;
