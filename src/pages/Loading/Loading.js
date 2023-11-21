import './Loading.scss';
const Loading = () => {
	return (
		<section className="loading-wrapper">
			<div className="loading">
				<img src='https://github.com/GitsOfVivek/MakeMyTrip-Clone/blob/main/client/src/assets/img/flying-airplane.gif?raw=true' alt="loading" />
				<div>Loading...</div>
			</div>
		</section>
	);
};

export default Loading;
