import { For } from 'solid-js';
import { BitnessEnum, ConverToBitnessEnum } from '../enums';

export function BitnessSelector(props: any) {
	const bitnessChange = (e: any): void => {
		const newEnumValue = ConverToBitnessEnum(e.currentTarget.value);
		props.setBitness(newEnumValue);
	};	

	const bvos: IBitnessValueObject[] = [
		{
			bitnessValue: BitnessEnum.Bitness8,
			bitnessDisplay: "8 bits"
		},
		{
			bitnessValue: BitnessEnum.Bitness16,
			bitnessDisplay: "16 bits"
		},
		{
			bitnessValue: BitnessEnum.Bitness32,
			bitnessDisplay: "32 bits"
		}		
	];
	
	return (
		<>
			<span class='bit-flip-bitness'>
			<label><b>Bitness: </b></label>
			<select name='bitness' id='bitness' value={props.bitness()} onchange={bitnessChange}>
				<For each={bvos} fallback={<div>Loading...</div>}>
					{(item) => <option value={item.bitnessValue}>{item.bitnessDisplay}</option>}
				</For>
			</select>
			</span>		
		</>
	)
}
