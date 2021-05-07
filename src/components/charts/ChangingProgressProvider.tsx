import React from "react";

interface ChangingProgressProviderProps {
	values: any;
	interval: any;
	children: any;
	repeat: boolean;
}

interface ChangingProgressProviderState {
	valuesIndex: number;
}

class ChangingProgressProvider extends React.Component<
	ChangingProgressProviderProps,
	ChangingProgressProviderState
> {
	static defaultProps = {
		interval: 1000,
	};

	state = {
		valuesIndex: 0,
	};

	componentDidMount() {
		if (this.props.repeat) {
			setInterval(() => {
				this.setState({
					valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
				});
			}, this.props.interval);
		} else {
			this.setState({
				valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
			});
		}
	}

	render() {
		return this.props.children(this.props.values[this.state.valuesIndex]);
	}
}

export default ChangingProgressProvider;
