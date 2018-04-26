import { ReadableTimePipe } from './readabletime.pipe';

describe('ReadableTimePipe', () => {
  it('create an instance', () => {
    const pipe = new ReadableTimePipe();
    expect(pipe).toBeTruthy();
  });
});
