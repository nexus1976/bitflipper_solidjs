import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import { BitnessSelector } from './components/BitnessSelector';
import { SlideToggle } from './components/SlideToggle';
import { BitnessEnum } from './enums';
import styles from './App.module.css';

const App: Component = () => {
  const [currentBitness, setCurrentBitness] = createSignal(BitnessEnum.Bitness8);
  const [bitMap, setBitMap] = createSignal(new Array<IBitValueObject>());
  
  const getMaxBitPositions = (bitness: BitnessEnum): Number => {
    switch (bitness) {
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
  };
  const hydrateBitMap = (bitnessEnum: BitnessEnum): void => {
    console.log('hydrateBitMap called');
    const bitArray: Array<IBitValueObject> = new Array<IBitValueObject>();
    let maxBitPositions: Number = getMaxBitPositions(bitnessEnum);
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
  
  hydrateBitMap(currentBitness());
  
  return (
    <div class={styles.App}>
      <div>
        <BitnessSelector bitness={currentBitness} setBitness={setCurrentBitness} />
      </div>
      <br />
      <span class={styles.bitfliphorizontal}>
        <For each={bitMap()}>
          {(item, index) => (
            <SlideToggle index={index} bitValue={item} />
          )}
        </For>
      </span>
    </div>
  );
};

export default App;
