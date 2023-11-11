import './Error.scss';
import ErrorInputBox from './../../components/ErrorInputBox/ErrorInputBox';


const Error = () => {
	return (
		<section className="error-comp-wrapper">
			<div className="error">
				<div className="container">
					<ErrorInputBox />
				</div>
			</div>
		</section>
	);
};

export default Error;
