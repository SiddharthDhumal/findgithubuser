import React from "react";
import styles from "./userinfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followersListFn, usernameFn } from "../../store";

const Userinfo = () => {
	const dispatch = useDispatch();

	const userName = useSelector((store) => store.userName);
	const repoList = useSelector((store) => store.repository);

	console.log(repoList);

	function handlefollowersList(usersfollowers) {
		console.log(usersfollowers.owner.login);
		dispatch(usernameFn(usersfollowers.owner.login));
		dispatch(followersListFn(usersfollowers.owner.followers_url));
	}

	return (
		<>
			<h1 className={styles.header}>
				Repository List & Description of {userName}
			</h1>

			<Link className={styles.backBtn} to="/">
				Back to SearchList <span>&#x2192;</span>
			</Link>

			{repoList.length > 0 ? (
				<ul className={styles.repoList}>
					{repoList.map((item) => (
						<li key={item.id}>
							<button onClick={() => handlefollowersList(item)}>
								<Link className={styles.followersBtn} to="/followerslist">
									<span>&#x2190;</span>see the followersList
								</Link>
							</button>
							<div className={styles.repoListItem}>
								<p className={styles.userName}>
									<strong>Repository Name: </strong>
									{item.name}
								</p>
								<p>
									<strong>Repository Description:</strong> {item.description}
								</p>
								<p>
									<strong>Default Branch: </strong>
									{item.default_branch}
								</p>
								<p>
									<strong>Created Date:</strong> {item.created_at}
								</p>
								<p>
									<strong>Visibility:</strong>
									{item.visibility}
								</p>
								<p>
									<strong>Watchers Count:</strong> {item.watchers_count}
								</p>
								<p>
									<strong>Language Used :</strong>
									{item.language ? item.language : <>Not given</>}
								</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<h3 className={styles.norepo}>No Repository Found</h3>
			)}
		</>
	);
};

export default Userinfo;
