import type { Component } from 'solid-js';
import { createSignal, createEffect, For } from 'solid-js';
import { BitnessSelector } from './components/BitnessSelector';
import { SlideToggle, IBitValueObject } from './components/SlideToggle';
import { BitnessEnum, ConvertToNumber } from './enums';
import './App.css';

const App: Component = () => {
  const [currentBitness, setCurrentBitness] = createSignal(BitnessEnum.Bitness8);
  const [bitMap, setBitMap] = createSignal(new Array<IBitValueObject>());
  const [bitsValue, setBitsValue] = createSignal('');
  const [decimalValue, setDecimalValue] = createSignal(0);
  const [hexValue, setHexValue] = createSignal('0');
  
  const hydrateBitMap = (bitnessEnum: BitnessEnum): void => {
    const bitArray: Array<IBitValueObject> = new Array<IBitValueObject>();
    const maxBitPositions: Number = ConvertToNumber(bitnessEnum);
    let currentBitPos: number = 1;
    for (let index = 0; index < maxBitPositions; index++) {
      const el: IBitValueObject = {
        bitPos: currentBitPos,
        bitValue: false
      };
      bitArray.push(el);
      currentBitPos = currentBitPos * 2;
    }
    bitArray.sort((a, b) => b.bitPos - a.bitPos);
    setBitMap(bitArray);
  };
  const hydrateBitsValue = (arr: Array<IBitValueObject>): void => {
    let bitValue = '';
    for (let index = 0; index < arr.length; index++) {
      bitValue += (arr[index].bitValue ? '1' : '0');
    }
    setBitsValue(bitValue);
  };
  const hydrateDecimalValue = (arr: Array<IBitValueObject>): void => {
    let decimalValue = 0;
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].bitValue) {
        decimalValue += arr[index].bitPos;
      }
    }
    setDecimalValue(decimalValue);
  };
  const hydrateHexValue = (nbr: number): void => {
    let newHexValue = '';
    if (nbr === 0)
    {
      newHexValue = '0';
    } else {
      let keepProcessing = true;
      while (keepProcessing) {
        const newNbr = Math.trunc(nbr / 16);
        const remainder = nbr % 16;
        nbr = newNbr;
        newHexValue += getHexDigit(remainder);
        if (nbr === 0 && remainder === 0) {
          keepProcessing = false;
        }
      }
      newHexValue = newHexValue.split('').reverse().join('').replace(/^0+/, '');
    }
    setHexValue(newHexValue);
  };
  const getHexDigit = (decDigit: number): string => {
    if (decDigit < 10) {
      return decDigit.toString();
    }
    switch (decDigit) {
      case 10:
        return 'A';
      case 11:
        return 'B';
      case 12:
        return 'C';
      case 13:
        return 'D';
      case 14:
        return 'E';
      case 15:
        return 'F';
      default:
        return '';
    }
  }
  const bitValueChanged = (e: IBitValueObject): void => {
    hydrateBitsValue(bitMap());
    hydrateDecimalValue(bitMap());
    hydrateHexValue(decimalValue());
  };
  
  createEffect(() => hydrateBitMap(currentBitness()));
  createEffect(() => hydrateBitsValue(bitMap()));
  createEffect(() => hydrateDecimalValue(bitMap()));
  createEffect(() => hydrateHexValue(decimalValue()));
  
  return (
    <div class={'App'}>
      <div>
        <BitnessSelector bitness={currentBitness} setBitness={setCurrentBitness} />
      </div>
      <br />
      <span class={'bitfliphorizontal'}>
        <For each={bitMap()}>
          {(item, index) => (
            <SlideToggle index={index()} componentData={item} changeEvent={bitValueChanged} />
          )}
        </For>
      </span>
      <br />
      <br />
      <span><label class={'bitslabel'}>Bits: </label>{bitsValue()}</span>
      <br />
      <span><label class={'bitslabel'}>Decimal Value: </label>{decimalValue()}</span>
      <br />
      <span><label class={'bitslabel'}>Hexadecimal Value: </label>{hexValue()}</span>
      <br />            
    </div>
  );
};

export default App;
