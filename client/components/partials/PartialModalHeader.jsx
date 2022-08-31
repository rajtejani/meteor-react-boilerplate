import React from 'react';

const PartialModalHeader = ({title}) => {
	return (
		<div className={"modalHeader PartialModalHeader"}>
			<h1>{title}</h1>
			<span className={"closeIcon"} onClick={UTILS.modal.close}>X</span>
		</div>
	)

};

export default PartialModalHeader;