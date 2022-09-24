import { createSignal } from 'solid-js';
import './SlideToggle.css';

export interface ISlideToggleProps {
	index: number,
	componentData: IBitValueObject,
	changeEvent: (componentData: IBitValueObject) => void
}
export interface IBitValueObject {
	bitPos: number,
	bitValue: boolean
}
const getLabelClass = (bitPos: number): String => {
	if (bitPos <= 9) {
		return 'bit-flip-single-digit';
	} else if (bitPos <= 99) {
		return 'bit-flip-double-digit';
	} else if (bitPos <= 999) {
		return 'bit-flip-triple-digit';
	} else if (bitPos <= 9999) {
		return 'bit-flip-four-digit';
	} else if (bitPos <= 99999) {
		return 'bit-flip-five-digit';
	} else if (bitPos > 99999) {
		return 'bit-flip-big-digit';
	}
	
	return '';
};
export function SlideToggle(props: ISlideToggleProps) {
	const [getChecked, setChecked] = createSignal(false);
	const bitFlipped = (e: any): void => {
		setChecked(!getChecked());
		props.componentData.bitValue = getChecked();
		props.changeEvent(props.componentData);
	};
	return (
		<div class='slide-toggle-container'>
			<label class={'slide-toggle-pos-label' + ' ' + getLabelClass(props.componentData.bitPos)}>
				{props.componentData.bitPos.toString()}
			</label>
			<div class='slide-toggle' classList={{ ['checked']: getChecked()}}>
				<label class='slide-toggle-label' for={'slide-toggle-input-' + props.index}>
					<span class='slide-toggle-bar'>
						<input 
							id={'slide-toggle-input-' + props.index} 
							class={'slide-toggle-input'} 
							type='checkbox' 
							role='switch' 
							tabIndex={0} 
							checked={getChecked()} 
							onClick={bitFlipped}
						>
						</input>
						<span class='slide-toggle-thumb-container'>
							<span class='slide-toggle-thumb'></span>
							<span class='slide-toggle-focus-indicator'>
								<span class='slide-toggle-persistent-ripple'></span>
							</span>
						</span>
					</span>
				</label>
			</div>
			<label class='slide-toggle-bit-label'>{getChecked() ? '1' : '0'}</label>
		</div>
	);
}
