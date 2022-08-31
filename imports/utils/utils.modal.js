import modals from "/client/components/modals/import.modals.js";

UTILS.modal = {
	_useSetModal: () => {},

	open(component, data) {
		const Component = modals[component];

		if(component === 'ModalAlert' && MODEL.users.isAdmin()) {
			if(data.buttonAction) {
				const confirmAction = confirm(`${data.alertMsg}`);

				if(confirmAction)
					return data.buttonAction();
			}
			else {
				return alert(`${data.alertMsg}`);
			}
		}

		UTILS.modal._useSetModal({
			Component: Component,
			data: data,
		});
	},

	close() {
		UTILS.modal._useSetModal(null);
	},

	setSetModal(statefulFunction) {
		UTILS.modal._useSetModal = statefulFunction;
	}
};