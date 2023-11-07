import { Link } from 'react-router-dom';
import './Bottom.scss';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const Bottom = () => {
	return (
		<section className="footer-wrapper">
			<div className="footer">
				<div className="left">
					<div className="socials">
						<Link
							to={'https://github.com/yamini-choudhary'}
							target={'_blank'}>
							<FaGithub />
						</Link>
						<Link
							target={'_blank'}>
							<FaTwitter />
						</Link>
						<Link
							to={'https://www.linkedin.com/in/yamini-choudhary/'}
							target={'_blank'}>
							<FaLinkedin />
						</Link>
					</div>
				</div>
				<div className="right">
					<div>MakeMyTrip Clone © 2023</div>
					<div>Created by Yamini</div>
				</div>
			</div>
			<div className='print-watermark'>MakeMyTrip Clone by Yamini</div>
		</section>
	);
};

export default Bottom;
