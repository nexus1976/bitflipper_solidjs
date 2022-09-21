export enum BitnessEnum {
	Bitness8 = 0,
	Bitness16 = 1,
	Bitness32 = 2,
	Bitness64 = 3
};

export const ConverToBitnessEnum = (value: Number): BitnessEnum => {
	if (value === 0) {
		return BitnessEnum.Bitness8;
	} else if (value == 1) {
		return BitnessEnum.Bitness16;
	} else if (value == 2) {
		return BitnessEnum.Bitness32;
	} else if (value == 3) {
		return BitnessEnum.Bitness64;
	}
	return BitnessEnum.Bitness8;
}

export const ConvertToNumber = (value: BitnessEnum): Number => {
	switch (value) {
		case BitnessEnum.Bitness8:
		  return 8;
		case BitnessEnum.Bitness16:
		  return 16;
		case BitnessEnum.Bitness32:
		  return 32;
		case BitnessEnum.Bitness64:
		  return 64;
		default:
		  return 8;
	  }
}
