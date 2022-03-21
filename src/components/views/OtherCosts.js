import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
	otherCostsUpdate,
	otherCostsFetch,
} from '../../actions/otherCosts';
import { connect } from 'react-redux';

const renderInput = ({ input, meta, ...props }) => {
	return <input {...input} {...props} />;
};

const OtherCosts = ({ handleSubmit, ...props }) => {
	useEffect(() => {
		props.otherCostsFetch().then();
	}, []);

	useEffect(() => {
		props.initialize(props.otherCosts);
	}, [props.otherCosts]);

	return (
		<div>
			<h2>Other Costs</h2>
			<form
				onSubmit={handleSubmit((formValues) => {
					props.otherCostsUpdate(formValues);
				})}
			>
				<ul>
					<li>Labor ($/hour)</li>
					<Field
						name='labor'
						component={renderInput}
						type='number'
						min='0'
						step='.01'
					/>
					<li>Monthly Fixed Costs</li>
					<Field
						name='fixedCost'
						component={renderInput}
						type='number'
						min='0'
						step='.01'
					/>
				</ul>
				<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
					<button>Save</button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		otherCosts: state.otherCosts,
	};
};

const OtherCostsForm = reduxForm({ form: 'otherCosts' })(OtherCosts);
export default connect(mapStateToProps, {
	otherCostsUpdate,
	otherCostsFetch,
})(OtherCostsForm);
